import { NativeModules, NativeEventEmitter } from 'react-native';
import { AppConstants } from '../AppConstants';
import { POBError } from '../models/POBError';

// The reference of the rewarded ad native module.
const POBRNInterstitialModule = NativeModules.POBRNInterstitialModule;
// The event emitter to listen to the events emitted from the module.
const interstitialEventEmitter = new NativeEventEmitter(POBRNInterstitialModule);

/**
 * This class demonstrates how to use OpenWrap SDK interstitial ads through
 * GAM Header Bidding in React Native environments.
 * <p>
 * The class exposes APIs to create, load, show and check the ready state of the Ad.
 * This class can be reused or customized as per the requirement.
 * <p>
 * Note: The below implementation follows one-to-one mapping
 * i.e you won't be able to create multiple instance of {@link POBInterstitial} simultaneously.
 * The achieve the simultaneous creation of the instance you have to store the
 * objects in a map like structure with a unique key associated with it, on both JS and native side.
 * This is required to pass callbacks and data to appropriate instance using the unique id.
 */
export class POBInterstitial {

    private publisherId: string;

    private profileId: number;

    private owAdUnitId: string;

    private gamAdUnitId: string;

    private listener?: POBInterstitial.POBInterstitialListener;

    private videoListener?: POBInterstitial.POBVideoListener;

    /**
     * Constructor.
     * Initializes and returns newly allocated interstitial object for supporting `No Ad Server Configuration`
     *
     * @param publisherId Identifier of the publisher
     * @param profileId   Profile ID of an ad tag
     * @param owAdUnitId  Ad unit id used to identify unique placement on screen
     * @param gamAdUnitId Ad unit id for setup on GAM portal
     */
    constructor(publisherId: string, profileId: number, owAdUnitId: string, gamAdUnitId: string) {

        this.publisherId = publisherId;
        this.profileId = profileId;
        this.owAdUnitId = owAdUnitId;
        this.gamAdUnitId = gamAdUnitId;

        // Add a listener to event emitter which will listen the events from native code
        interstitialEventEmitter.addListener(AppConstants.INTERSTITIAL_AD_EVENT_KEY, (adInfo: string) => {
            const adInfoJson = JSON.parse(adInfo);
            this._onAdEvent(adInfoJson.eventName, adInfoJson.ext);
        });

        POBRNInterstitialModule.createAdInstance(
            this.publisherId,
            this.profileId,
            this.owAdUnitId,
            this.gamAdUnitId
        );
    }

    /**
     * Method to Receive callback events from native modules
     * We have considered only single instance of POBInterstitial will be created if you want to create multiple instance then
     * you need to maintain map of instances in JS & native side and need to route the events to respective interstitial events
     * @param eventName event name
     * @param adInfo ad info JSON string
     */
    _onAdEvent(eventName: string, _adInfo: any): void {
        switch (eventName) {
            case AppConstants.AD_RECEIVED_EVENT:
                this.listener?.onAdReceived(this)
                break;
            case AppConstants.AD_FAILED_TO_LOAD_EVENT:
                var error = new POBError(_adInfo.errorCode, _adInfo.errorMessage);
                this.listener?.onAdFailedToLoad(this, error);
                break;
            case AppConstants.AD_FAILED_TO_SHOW_EVENT:
                var error = new POBError(_adInfo.errorCode, _adInfo.errorMessage);
                this.listener?.onAdFailedToShow(this, error);
                break;
            case AppConstants.AD_CLICKED_EVENT:
                this.listener?.onAdClicked(this);
                break;
            case AppConstants.AD_OPEN_EVENT:
                this.listener?.onAdOpened(this);
                break;
            case AppConstants.AD_CLOSE_EVENT:
                this.listener?.onAdClosed(this);
                break;
            case AppConstants.AD_EXPIRED_EVENT:
                this.listener?.onAdExpired(this);
                break;
            case AppConstants.APP_LEAVE_EVENT:
                this.listener?.onAppLeaving(this);
                break;
            case AppConstants.VIDEO_PLAYBACK_COMPLETED_EVENT:
                this.videoListener?.onVideoPlaybackCompleted(this);
                break;
            default:
        }
    }

    /**
     * Initiate the loading of an interstitial ad
     */
    loadAd(): void {
        POBRNInterstitialModule.loadAd();
    }

    /**
     * Presents an interstitial ad in full screen view until the user dismisses it. Calling this
     * method has no effect until the ad is received i.e. onAdReceived() gets called. Recommended to
     * check if isReady returns true before calling show().
     */
    showAd(): void {
        POBRNInterstitialModule.showAd();
    }

    /**
     * Invoke this method when your app is about to destroy. It cleans the resources.
     */
    destroyAd(): void {
        POBRNInterstitialModule.destroyAd();
        interstitialEventEmitter.removeAllListeners(AppConstants.INTERSTITIAL_AD_EVENT_KEY);
    }

    /**
     *  To check whether the ad is loaded and ready to show InterstitialAd.
     */
    isReady(): Promise<boolean> {
        return POBRNInterstitialModule.isReady();
    }



    /**
     * Sets instance of POBInterstitialListener for getting callbacks
     *
     * @param listener Instance of POBInterstitialListener
     */
    setListener(listener: POBInterstitial.POBInterstitialListener): void {
        this.listener = listener;
    }

    /**
     * Sets instance of POBVideoListener for getting callbacks of VAST based video ad
     *
     * @param videoListener Instance of POBVideoListener
     */
    setVideoListener(videoListener: POBInterstitial.POBVideoListener): void {
        this.videoListener = videoListener;
    }
}

/**
 *  Namespace which contains ad event listeners
 */
export namespace POBInterstitial {

    /**
     *  Listener class used to listen to ad events from interstitial ads
     */
    export abstract class POBInterstitialListener {

        /**
         * Notifies the listener that an ad has been successfully loaded and rendered.
         */
        abstract onAdReceived(interstitial: POBInterstitial): void;

        /**
         * Notifies the listener of an error encountered while loading an ad.
         */
        abstract onAdFailedToLoad(interstitial: POBInterstitial, error: POBError): void;

        /**
         * Notifies the listener of an error encountered while rendering an ad.
         */
        abstract onAdFailedToShow(interstitial: POBInterstitial, error: POBError): void;

        /**
         * Notifies that the user has clicked the ad view.
         */
        abstract onAdClicked(interstitial: POBInterstitial): void;

        /**
         * Notifies listener that the interstitial view has open the ad on top of the current
         * view/screen, as a result of user interaction.
         */
        abstract onAdOpened(interstitial: POBInterstitial): void;

        /**
         * Notifies that the interstitial view has closed the ad on top of the current view.
         */
        abstract onAdClosed(interstitial: POBInterstitial): void;

        /**
         * Notifies the listener that an ad has been expired
         */
        abstract onAdExpired(interstitial: POBInterstitial): void;

        /**
         * Notifies the listener whenever current app goes in the background due to user click
         */
        abstract onAppLeaving(interstitial: POBInterstitial): void;
    }

    /**
     *  Listener class used to listen to video ad events from interstitial ads
     */
    export abstract class POBVideoListener {

        /**
         * Notifies the listener video playback has completed
         */
        abstract onVideoPlaybackCompleted(interstitial: POBInterstitial): void;
    }
}
