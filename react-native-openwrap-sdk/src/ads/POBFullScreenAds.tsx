import { POBImpression } from '../models/POBImpression';
import { POBRequest } from '../models/POBRequest';

/**
 * Interface for FullScreen ad API's
 */
export interface POBFullScreenAds {
    /**
     * Initiates the loading of an full screen ad
     */
    loadAd(): void;

    /**
     * Presents an full screen ad until the user dismisses it. Calling this
     * method has no effect until the ad is received i.e. onAdReceived() gets called. Recommended to
     * check if isReady returns true before calling show().
     */
    show(): void;

    /**
     * Invoke this method when your app is about to destroy. It cleans the resources.
     */
    destroy(): void;

    /**
     *  To check whether the ad is loaded and ready to show InterstitialAd.
     */
    isReady(): Promise<Boolean>;

    /**
     * Method to Receive callback events from native modules
     * @param eventName event name
     * @param adInfo ad info JSON string
     */
    onAdEvent(eventName: string, adInfo: any): void;

    /**
     * Setter for setting the request parameters on the Ad.
     * Call this method before loading the Ad to set the request parameters for the Ad.
     * @param request Instance of {@link POBRequest} for setting request parameters for the Ad.
     */
    setRequest(request: POBRequest): void;

    /**
     * Setter for setting the impression parameters on the Ad.
     * Call this method before loading the Ad to set the impression parameters for the Ad.
     * @param impression Instance of {@link POBImpression} for setting impression parameters for the Ad.
     */
    setImpression(impression: POBImpression): void;
}
