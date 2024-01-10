import { NativeModules, NativeEventEmitter } from "react-native";
import { AppConstants } from "../AppConstants";
import { POBReward } from "../models/POBReward";
import { POBError } from "../models/POBError";

// The reference of the rewarded ad native module.
const POBRNRewardedAdModule = NativeModules.POBRNRewardedAdModule;
// The event emitter to listen to the events emitted from the module.
const rewardedEventEmitter = new NativeEventEmitter(POBRNRewardedAdModule);

/**
 * This class demonstrates how to use OpenWrap SDK Rewarded ads through
 * GAM Header Bidding in React Native environments.
 * <p>
 * The class exposes APIs to create, load, show and check the ready state of the Ad.
 * This class can be reused or customized as per the requirement.
 * <p>
 * Note: The below implementation follows one-to-one mapping
 * i.e you won't be able to create multiple instance of {@link POBRewardAd} simultaneously.
 * The achieve the simultaneous creation of the instance you have to store the
 * objects in a map like structure with a unique key associated with it, on both JS and native side.
 * This is required to pass callbacks and data to appropriate instance using the unique id.
 */
export class POBRewardedAd {
  // Used to transfer the events to the listener, and can be setted using the setListener function.
  private _listener?: POBRewardedAd.POBRewardedAdListener;

  /**
   * Constructor is used to add a new listener to listen fop the events
   * emitted by the native module.
   * It is alse used to create the instance of the Rewarded Ad.
   * It uses the function provided by the module
   * i.e {@link POBRNRewardedAdModule.createAdInstance},
   * and passes the required parameters like, publisher id, profile id,
   * openwrap ad unit and gam ad unit.
   *
   * @param publisherId Identifier of the publisher.
   * @param profileId Profile ID of an ad tag.
   * @param owAdUnitId Ad unit id used to identify unique placement on screen.
   * @param gamAdUnitId Ad unit id used to make request to GAM.
   */
  constructor(
    publisherId: string,
    profileId: number,
    owAdUnitId: string,
    gamAdUnitId: string
  ) {
    // Remove the previously added listeners for the `pob_rn_rewarded_ad_event` key
    // and add the listener before calling the native module in order to
    // listen to the events from native module and not miss any of them.
    rewardedEventEmitter.addListener(
      AppConstants.REWARDED_AD_EVENT_KEY,
      (adInfo: string) => {
        const adInfoJson = JSON.parse(adInfo);
        this._onAdEvent(adInfoJson.eventName, adInfoJson.ext);
      }
    );
    POBRNRewardedAdModule.createAdInstance(
      publisherId,
      profileId,
      owAdUnitId,
      gamAdUnitId
    );
  }

  /**
   * Function to load the rewarded ad using the method
   * {@link POBRNRewardedAdModule.loadAd}.
   * This should be called after {@link onPressCreateAd}.
   */
  loadAd() {
    POBRNRewardedAdModule.loadAd();
  }

  /**
   * Function to check whether the rewarded ad is ready to be shown
   * or is still loading.
   * @returns Promise of type boolean.
   * true -> the ad is ready to be shown.
   * false -> it is shill loading or ad request is failed with some error
   */
  isReady(): Promise<boolean> {
    return POBRNRewardedAdModule.isReady();
  }

  /**
   * Function to show the rewarded ad using the method
   * {@link POBRNRewardedAdModule.showAd}.
   * Make sure to call {@link POBRNRewardedAdModule.showAd},
   * only after the {@link POBRNRewardedAdModule.isReady} has returned true.
   */
  showAd() {
    POBRNRewardedAdModule.showAd();
  }

  /**
   * Function to destroy the rewarded ad using the method
   * {@link POBRNRewardedAdModule.destroyAd}.
   * Also, removes all the event emitter listeners.
   */
  destroyAd() {
    POBRNRewardedAdModule.destroyAd();
    rewardedEventEmitter.removeAllListeners(AppConstants.REWARDED_AD_EVENT_KEY);
  }

  /**
   * Function to set the listener for getting the callbacks for the rewarded ad.
   *
   * @param listener Instance of {@link POBRewardedAd.POBRewardedAdListener}
   * for listener for the callbacks
   */
  setListener(listener: POBRewardedAd.POBRewardedAdListener) {
    this._listener = listener;
  }

  /**
   * The function is used to differentiate the event based on the {@link eventName}
   * and use the {@link _adInfo} based on the {@link eventName} to perform different actions.
   *
   * @param eventName The name of the event emitted by the native module.
   * @param _adInfo The additional data passed by the native module.
   */
  _onAdEvent(eventName: string, _adInfo: any) {
    switch (eventName) {
      case AppConstants.AD_RECEIVED_EVENT:
        this._listener?.onAdReceived(this);
        break;
      case AppConstants.AD_FAILED_TO_LOAD_EVENT:
        let loadError = new POBError(_adInfo.errorCode, _adInfo.errorMessage);
        this._listener?.onAdFailedToLoad(this, loadError);
        break;
      case AppConstants.AD_FAILED_TO_SHOW_EVENT:
        let showError = new POBError(_adInfo.errorCode, _adInfo.errorMessage);
        this._listener?.onAdFailedToShow(this, showError);
        break;
      case AppConstants.AD_CLICKED_EVENT:
        this._listener?.onAdClicked(this);
        break;
      case AppConstants.AD_OPEN_EVENT:
        this._listener?.onAdOpened(this);
        break;
      case AppConstants.AD_CLOSE_EVENT:
        this._listener?.onAdClosed(this);
        break;
      case AppConstants.AD_EXPIRED_EVENT:
        this._listener?.onAdExpired(this);
        break;
      case AppConstants.APP_LEAVE_EVENT:
        this._listener?.onAppLeaving(this);
        break;
      case AppConstants.RECEIVE_REWARD_EVENT:
        const reward = new POBReward(
          _adInfo.rewardCurrencyType,
          _adInfo.rewardAmount
        );
        this._listener?.onReceiveReward(this, reward);
        break;
      default:
    }
  }
}

export namespace POBRewardedAd {
  /**
   * Class for interaction with the POBRewardedAd instance.
   * All methods are guaranteed to occur on the main thread.
   */
  export abstract class POBRewardedAdListener {
    /**
     * Notifies the listener that an ad has been received successfully.
     *
     * @param ad The POBRewardedAd instance invoking this method.
     */
    onAdReceived(ad: POBRewardedAd): void { }

    /**
     * Notifies the listener of an error encountered while loading an ad.
     *
     * @param ad POBRewardedAd instance invoking this method.
     * @param error The error encountered while loading the ad.
     */
    onAdFailedToLoad(ad: POBRewardedAd, error: POBError): void { }

    /**
     * Notifies the listener of an error encountered while showing an ad.
     *
     * @param ad POBRewardedAd instance invoking this method.
     * @param error The error encountered while showing the ad.
     */
    onAdFailedToShow(ad: POBRewardedAd, error: POBError): void { }

    /**
     * Notifies that the rewarded ad has been clicked
     *
     * @param ad The POBRewardedAd instance invoking this method.
     */
    onAdClicked(ad: POBRewardedAd): void { }

    /**
     * Notifies that the OpenWrap view will open an ad on top of the current view.
     *
     * @param ad The POBRewardedAd instance invoking this method.
     */
    onAdOpened(ad: POBRewardedAd): void { }

    /**
     * Notifies that the OpenWrap view has closed the ad on top of the current view.
     *
     * @param ad The POBRewardedAd instance invoking this method.
     */
    onAdClosed(ad: POBRewardedAd): void { }

    /**
     * Notifies that the rewarded ad has been expired. After this callback,
     * 'POBRewardedAd' instances marked as invalid and may not be presented and no impression
     * counting is considered. After Expiration callback, POBRewardedAd.isReady() returns
     * 'false'.
     *
     * @param ad The POBRewardedAd instance invoking this method.
     */
    onAdExpired(ad: POBRewardedAd): void { }

    /**
     * Notifies the listener that a user interaction will open another app (e.g. Chrome browser),
     * leaving the current app. To handle user clicks that open the landing page URL in the
     * internal browser, use 'onAdClicked()' instead.
     *
     * @param ad The POBRewardedAd instance invoking this method.
     */
    onAppLeaving(ad: POBRewardedAd): void { }

    /**
     * Notifies that the rewarded ad has completed and user should be rewarded. It is called
     * when the Rewarded Ad playback is completed.
     *
     * @param ad The POBRewardedAd instance invoking this method.
     * @param reward Value of reward as an object of POBReward
     */
    onReceiveReward(ad: POBRewardedAd, reward: POBReward): void { }
  }
}
