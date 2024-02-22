import { POBError } from "../models/POBError";
import { POBInterstitial } from "./POBInterstitial";

/**
* Class for interaction with the POBInterstitial instance.
* All methods are guaranteed to occur on the main thread.
*/
export abstract class POBInterstitialListener {

    /**
     * Notifies the listener that an ad has been received successfully.
     *
     * @param ad The POBInterstitial instance invoking this method.
     */
    onAdReceived(ad: POBInterstitial): void { }

    /**
     * Notifies the listener of an error encountered while loading an ad.
     *
     * @param ad POBInterstitial instance invoking this method.
     * @param error The error encountered while loading the ad.
     */
    onAdFailedToLoad(ad: POBInterstitial, error: POBError): void { }

    /**
     * Notifies the listener of an error encountered while showing an ad.
     *
     * @param ad POBInterstitial instance invoking this method.
     * @param error The error encountered while showing the ad.
     */
    onAdFailedToShow(ad: POBInterstitial, error: POBError): void { }

    /**
     * Notifies that the interstitial ad has been clicked
     *
     * @param ad The POBInterstitial instance invoking this method.
     */
    onAdClicked(ad: POBInterstitial): void { }

    /**
     * Notifies that the OpenWrap view will open an ad on top of the current view.
     *
     * @param ad The POBInterstitial instance invoking this method.
     */
    onAdOpened(ad: POBInterstitial): void { }

    /**
     * Notifies that the OpenWrap view has closed the ad on top of the current view.
     *
     * @param ad The POBInterstitial instance invoking this method.
     */
    onAdClosed(ad: POBInterstitial): void { }

    /**
     * Notifies that the interstitial ad has been expired. After this callback,
     * 'POBInterstitial' instances marked as invalid and may not be presented and no impression
     * counting is considered. After Expiration callback, POBInterstitial.isReady() returns
     * 'false'.
     *
     * @param ad The POBInterstitial instance invoking this method.
     */
    onAdExpired(ad: POBInterstitial): void { }

    /**
     * Notifies the listener that a user interaction will open another app (e.g. Chrome browser),
     * leaving the current app. To handle user clicks that open the landing page URL in the
     * internal browser, use 'onAdClicked()' instead.
     *
     * @param ad The POBInterstitial instance invoking this method.
     */
    onAppLeaving(ad: POBInterstitial): void { }

}
