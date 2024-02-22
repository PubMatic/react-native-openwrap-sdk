import { POBReward } from "../models/POBReward";
import { POBError } from "../models/POBError";
import { POBRewardedAd } from './POBRewardedAd';


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
