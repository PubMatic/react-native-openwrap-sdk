import React, { Component } from 'react';
import ReactNative, {
    requireNativeComponent,
    UIManager,
    Platform,
  } from 'react-native';
import { POBAdUnitDetails } from '../models/POBAdUnitDetails';
import { POBAdSize } from '../models/POBAdSize';
import { POBError } from '../models/POBError';
import { POBBid } from '../models/POBBid';
import { POBBidError } from '../models/POBBidError';
import { POBBidEventListener } from './POBBidEventListener';
import { POBBidEvent } from './POBBidEvent';
import { POBBidHandler } from '../models/POBBidHandler';

/**
 * Props required for POBBannerView component.
 */
type POBBannerViewProps = {
  /**
   * Ad Unit details required to load banner ad.
   */
  adUnitDetails: POBAdUnitDetails;

  /**
   * Optional prop, when you want to pause or resume banner refresh.
   */
  autoRefreshState?: POBBannerView.AutoRefreshState | undefined;

  /**
   * Optional prop, to forcefully refresh banner ads. Provide new non-zero value every time to apply changes.
   * Use DEFAULT_FORCE_REFRESH value to not apply force refresh. This value can be used initially when you add banner
   * to view hierarchy.
   */
  forceRefresh?: number;

  /**
   * Callback event, notifies the ad is loaded successfully.
   * @param adSize the POBAdSize of the loaded ad.
   * @param bid the POBBid for the Ad Received.
   * @returns void
   */
  onAdReceived?: (adSize: POBAdSize, bid: POBBid) => void;

  /**
   * Callback event, notifies an error occurred while loading an ad.
   * @param error the POBError contains the error information.
   * @returns void
   */
  onAdFailed?: (error: POBError) => void;

  /**
   * Callback event, notifies click event happened on the ad.
   * @returns void
   */
  onAdClicked?: () => void;

  /**
   * Callback event, notifies that the banner ad view will launch a modal on top of the current view.
   * @returns void
   */
  onAdOpened?: () => void;

  /**
   * Callback event, notifies that the banner ad view closed the already opened modal.
   * @returns void
   */
  onAdClosed?: () => void;

  /**
   * Callback event, notifies when the user clicks the app into the background.
   * @returns void
   */
  onAppLeaving?: () => void;

  /**
   * Callback event, notifies force refresh is applied with its status.
   * @param status the status of force refresh, true when successfully applied else false.
   * @returns void
   */
  onForceRefresh?: (status: boolean) => void;

  /**
  * Prop to receive the bid event callbacks.
  */
  bidEventListener?: POBBidEventListener;
};

/**
 * Banner ad state. Used when new ad is loaded.
 */
type BannerViewState = {
  width: number;
  height: number;
  proceedToLoadAdCount: number;
  proceedOnErrorStr: string;
};

const BannerViewName: string = "POBRNBannerView";

/**
 * React component that renders a native POBBannerView of OW SDK.
 * It handles events related to the banner view and provides callbacks for those events.
 * Usage:
 * <POBBannerView
 *   adUnitDetails={adUnitDetails}
 *   autoRefreshState={POBBannerView.AutoRefreshState.DEFAULT}
 *   forceRefresh={POBBannerView.DEFAULT_FORCE_REFRESH}
 *   onAdReceived={(adSize: POBAdSize) => {
 *     console.log(`Banner Ad size: ${adSize.width}, ${adSize.height}`);
 *   }}
 *   onAdFailedToLoad={(error: POBError) => {
 *     console.log(`Banner Ad size: ${error}`);
 *   }}
 * />
 */
export class POBBannerView extends Component<POBBannerViewProps, BannerViewState> implements POBBidEvent, POBBidHandler {

  // Local variable to maintain proceedOnError state count.
  private proceedOnErrorCount: number;

  private resolveProccedToLoadAd?: (value: Boolean | PromiseLike<Boolean>) => void;

  /**
   * A resolver function for the promise that checks the bid expiry status.
   * This function is used to resolve the promise with a boolean value indicating
   * whether the bid is expired or not.
   */
  private isBidExpiredPromiseResolver?: (value: Boolean | PromiseLike<Boolean>) => void;

  constructor(props: POBBannerViewProps) {
    super(props);

    // Check if bidEventListener prop is set, if so enable 'get bid price' feature.
    if (props.bidEventListener != undefined) {
      props.adUnitDetails.enableGetBidPrice = 1;
    }
    // Initialize state
    this.proceedOnErrorCount = 0
    this.state = {
      width: 0,
      height: 0,
      proceedToLoadAdCount: 0,
      proceedOnErrorStr: "",
    };
  }

  /**
   * Event handler for the onAdReceived event.
   * It updates the state with the received ad size and invokes the onAdReceived callback.
   * @param event - The event object containing the ad size information.
   */
  private onAdReceived = (event: any) => {
    const { width, height } = event.nativeEvent;
    this.setState({ width, height });
    const adSize: POBAdSize = new POBAdSize(width, height);
    const bid = new POBBid(event.nativeEvent, this);
    this.props.onAdReceived?.(adSize, bid);
  };

  /**
   * Event handler for the onAdFailedToLoad event.
   * It invokes the onAdFailedToLoad callback with the error object.
   * @param event - The event object containing the error information.
   */
  private onAdFailedToLoad = (event: any) => {
    const { errorCode, errorMessage } = event.nativeEvent;
    const error: POBError = new POBError(errorCode, errorMessage);
    this.props.onAdFailed?.(error);
  };

  /**
   * Event handler for the onBidReceived event.
   * It creates the bid with the received data and invokes the onBidReceived callback.
   * @param event - The event object containing the bid information.
   */
  private onBidReceived = (event: any) => {
    const bid: POBBid = new POBBid(event.nativeEvent, this);
    this.props.bidEventListener?.onBidReceived(this, bid);
  }

  /**
   * Event handler for the onBidFailed event.
   * It creates the error with the received data and invokes the onBidFailed callback.
   * @param event - The event object containing error information.
   */
  private onBidFailed = (event: any) => {
    const { errorCode, errorMessage } = event.nativeEvent;
    const error: POBError = {
      errorCode: errorCode,
      errorMessage: errorMessage,
    };
    this.props.bidEventListener?.onBidFailed(this, error)
  }

  /**
   * The force refresh status event.
   * @param event The event object containing the force refresh state information.
   */
  private onForceRefresh = (event: any) => {
    const { forceRefreshStatus } = event.nativeEvent;
    this.props.onForceRefresh?.(forceRefreshStatus);
  };

  private onProceedToLoadAd = (event: any) => {
    const { proceedToLoadAdStatus } = event.nativeEvent;

    this.resolveProccedToLoadAd?.(proceedToLoadAdStatus === 1 ? true : false);
  }

  /**
   * Callback function invoked upon completion of fetching the bid expiry status.
   * Resolves the promise with the received bid expiry status.
   *
   * @param event The event object containing the bid expiry status.
   */
  private onBidExpiryStatusEvent = (event: any) => {
    const { bidExpiryStatus } = event.nativeEvent;
    this.isBidExpiredPromiseResolver?.(bidExpiryStatus === 1 ? true : false);
  }

  /**
   * Initiates the process to fetch the bid expiry status for the banner view.
   * This method sends a command to the native module to retrieve the bid expiry status.
   */
  private fetchBidExpiryStatus = () => {
    let command;
    const commandConfig = UIManager.getViewManagerConfig(BannerViewName).Commands;
    if (Platform.OS === 'ios') {
      command = commandConfig.fetchBidExpiryStatus;
    } else if (Platform.OS === 'android') {
      command = commandConfig.fetchBidExpiryStatus?.toString();
    }

    if (command !== undefined) {
      UIManager.dispatchViewManagerCommand(
        ReactNative.findNodeHandle(this),
        command,
        [],
      );
    } else {
      console.log(`Unexpectedly 'fetchBidExpiryStatus' command not found on the banner view.`);
    }
  }

  // POBBidEvent interface methods:

  /**
   * Proceeds with bid flow, This method should be called only when onBidReceived and onBidFailed props is set.
   */
  public proceedToLoadAd = (): Promise<Boolean> => {
    var promise = new Promise<Boolean>((resolve, reject) => {
      this.resolveProccedToLoadAd = resolve;
    });
    this.setState({ proceedToLoadAdCount: this.state.proceedToLoadAdCount + 1 });
    return promise;
  }

  /**
   * Proceeds with error, the flow is completed by setting its state to default considering
   * error at client side.
   *
   * @param error the error of type {@link POBBidError}
   *              Example:
   *              Scenario 1 : When bid is failed in client-side in-app auction loss
   *              proceedOnError({@link POBBidError.CLIENT_SIDE_AUCTION_LOSS});
   *              <p>
   *              Scenario 2 : When bid is expired
   *              proceedOnError({@link POBBidError.BID_EXPIRED});
   */
  public proceedOnError = (error: POBBidError) => {
    this.setState({ proceedOnErrorStr: `${JSON.stringify(error)}_${this.proceedOnErrorCount++}` });
  }

  // POBBidHandler method:

  /**
   * Checks if the bid associated with this instance has expired.
   * Returns a Promise that resolves with a boolean value indicating
   * the bid expiry status (true if expired, false if still valid).
   */
  public isBidExpired(): Promise<Boolean> {
    const promise = new Promise<Boolean>((resolve, reject) => {
      // Store the promise resolver and it will be called from
      // `onBidExpiryStatusEvent` event callback with bid expiry status.
      this.isBidExpiredPromiseResolver = resolve;
    });

    this.fetchBidExpiryStatus();
    return promise;
  }

  // Render method:

  render() {
    return (
      <POBRNBannerView
        style={{ width: this.state.width, height: this.state.height }}
        adUnitDetails={JSON.stringify(this.props.adUnitDetails)}
        autoRefreshState={this.props.autoRefreshState}
        forceRefresh={this.props.forceRefresh}
        onAdReceived={this.onAdReceived}
        onAdFailedToLoad={this.onAdFailedToLoad}
        onAdClicked={this.props.onAdClicked}
        onAdOpened={this.props.onAdOpened}
        onAdClosed={this.props.onAdClosed}
        onAppLeaving={this.props.onAppLeaving}
        onBidFailed={this.onBidFailed}
        onBidReceived={this.onBidReceived}
        proceedToLoadAd={this.state.proceedToLoadAdCount}
        onProceedToLoadAd={this.onProceedToLoadAd}
        proceedOnError={this.state.proceedOnErrorStr}
        onForceRefresh={this.onForceRefresh}
        onBidExpiryStatusEvent={this.onBidExpiryStatusEvent}
      />
    );
  }
}

/**
 * Banner namespace for Banner specific constants and types.
 */
export namespace POBBannerView {
  /**
   * Banner ad refresh state.
   */
  export enum AutoRefreshState {
    // Default refresh
    DEFAULT = 0,
    // To Pause banner ad refresh
    PAUSE = 1,
    // To Resume already paused banner ad refresh.
    RESUME = 2,
  }

  /**
   * Default force refresh value, Can be used to not apply force refresh initially.
   */
  export const DEFAULT_FORCE_REFRESH = 0;
}

/**
 * Internal Props for POBRNBannerView Native Component.
 */
type POBRNBannerViewProps = {
  /**
   * The banner ad style
   */
  style: {};

  /**
   * Ad Unit details required to load banner ad.
   */
  adUnitDetails?: string;

  /**
   * Optional prop, when you want to pause or resume banner refresh.
   */
  autoRefreshState?: POBBannerView.AutoRefreshState | undefined;

  /**
   * Optional prop, to forcefully refresh banner ads. Provide new value every time to apply changes.
   */
  forceRefresh?: number;

  /**
   * Callback event, notifies the ad is loaded successfully.
   * @param adSize the POBAdSize of the loaded ad.
   * @returns void
   */
  onAdReceived?: (adSize: POBAdSize) => void;

  /**
   * Callback event, notifies an error occurred while loading an ad.
   * @param error the POBError contains the error information.
   * @returns void
   */
  onAdFailedToLoad?: (error: POBError) => void;

  /**
   * Callback event, notifies click event happened on the ad.
   * @returns void
   */
  onAdClicked?: () => void;

  /**
   * Callback event, notifies that the banner ad view will launch a modal on top of the current view.
   * @returns void
   */
  onAdOpened?: () => void;

  /**
   * Callback event, notifies that the banner ad view closed the already opened modal.
   * @returns void
   */
  onAdClosed?: () => void;

  /**
   * Callback event, notifies when the user clicks the app into the background.
   * @returns void
   */
  onAppLeaving?: () => void;

  /**
   * Callback event, notifies force refresh is applied with its status.
   * @param status the status of force refresh, true when successfully applied else false.
   * @returns void
   */
  onForceRefresh?: (status: boolean) => void;

  /**
   * Callback event, notifies proceedToLoadAd called with its status.
   * @param status  the status of proceedToLoadAd, true when successfully called else false.
   * @returns void
   */
  onProceedToLoadAd?: (status: boolean) => void;

  /**
   * Internal prop to notify proceedToLoadAd to bannerview
   */
  proceedToLoadAd?: number;

  /**
   * Internal prop to notify proceedOnError to bannerview
   */
  proceedOnError?: string;

  /**
   * Callback event, notifies the delegate that bid has been successfully received
   *
   * @param bid the instance of {@link POBBid}
   */
  onBidReceived?: (bid: POBBid) => void;

  /**
   * Callback event, notifies the delegate of an error encountered while fetching the bid
   *
   * @param error the error of type {@link POBError} while fetching bid
   */
  onBidFailed?: (error: POBError) => void;

  /**
   * A callback function invoked when the bid expiry status is fetched.
   * This function is called with the fetched bid expiry status.
   *
   * @param status A boolean value indicating the bid expiry status.
   *               True if the bid has expired, false if it's still valid.
   */
  onBidExpiryStatusEvent?: (status: boolean) => void;
};

const POBRNBannerView =
  requireNativeComponent<POBRNBannerViewProps>(BannerViewName);
