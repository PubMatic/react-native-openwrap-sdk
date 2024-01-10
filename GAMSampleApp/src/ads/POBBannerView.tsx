import React, { Component } from "react";
import { requireNativeComponent } from "react-native";
import { POBAdUnitDetails } from "../models/POBAdUnitDetails";
import { AdSize } from "../models/AdSize";
import { POBError } from "../models/POBError";

// Initializing the native module for Banner View
const POBRNBannerView =
  requireNativeComponent<POBRNBannerViewProps>("POBRNBannerView");

/**
 * Props required for POBBannerView component.
 */
type POBBannerViewProps = {
  /**
   * Ad Unit details required to load banner ad.
   */
  adUnitDetails: POBAdUnitDetails;

  /**
   * Callback event, notifies the ad is loaded successfully.
   * @param adSize the AdSize of the loaded ad.
   * @returns void
   */
  onAdReceived?: (adSize: AdSize) => void;

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
};

/**
 * Banner ad size state. Used when new ad is loaded.
 */
type AdSizeState = {
  width: number;
  height: number;
};

/**
 * This class demonstrates how to use OpenWrap SDK Banner ads through
 * GAM Header Bidding in React Native environments.
 * <p>
 * The component takes props which are required to load the ad.
 * It handles events related to the banner view and provides callbacks for those events.
 * This class can be reused or customized as per the requirement.
 * <p>
 * Usage:
 * <POBBannerView
 *   adUnitDetails={adUnitDetails}
 *   onAdReceived={(adSize: AdSize) => {
 *     console.log(`Banner Ad size: ${adSize.width}, ${adSize.height}`);
 *   }}
 *   onAdFailedToLoad={(error: POBError) => {
 *     console.log(`Banner Ad size: ${error}`);
 *   }}
 */
export class POBBannerView extends Component<POBBannerViewProps, AdSizeState> {
  constructor(props: POBBannerViewProps) {
    super(props);
    // Initializing the state to default values.
    this.state = {
      width: 0,
      height: 0,
    };
  }

  /**
   * Event handler for the onAdReceived event.
   * It updates the state with the received ad size and invokes the onAdReceived callback.
   * @param event - The event object containing the ad size information.
   */
  onAdReceived = (event: any) => {
    const { width, height } = event.nativeEvent;
    this.setState({ width, height });
    const adSize: AdSize = {
      width: width,
      height: height,
    };
    this.props.onAdReceived?.(adSize);
  };

  /**
   * Event handler for the onAdFailedToLoad event.
   * It invokes the onAdFailedToLoad callback with the error object.
   * @param event - The event object containing the error information.
   */
  onAdFailedToLoad = (event: any) => {
    const { errorCode, errorMessage } = event.nativeEvent;
    const error: POBError = {
      errorCode: errorCode,
      errorMessage: errorMessage,
    };
    this.props.onAdFailed?.(error);
  };

  render() {
    return (
      <POBRNBannerView
        style={{ width: this.state.width, height: this.state.height }}
        adUnitDetails={JSON.stringify(this.props.adUnitDetails)}
        onAdReceived={this.onAdReceived}
        onAdFailedToLoad={this.onAdFailedToLoad}
        onAdClicked={this.props.onAdClicked}
        onAdOpened={this.props.onAdOpened}
        onAdClosed={this.props.onAdClosed}
        onAppLeaving={this.props.onAppLeaving}
      />
    );
  }
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
   * Callback event, notifies the ad is loaded successfully.
   * @param adSize the AdSize of the loaded ad.
   * @returns void
   */
  onAdReceived?: (adSize: AdSize) => void;

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
};
