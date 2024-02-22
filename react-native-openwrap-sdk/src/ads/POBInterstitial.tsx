import { NativeModules } from 'react-native';
import { POBInterstitialListener } from './POBInterstitialListener';
import { POBVideoListener } from './POBVideoListener';
import { POBFullScreenAds } from './POBFullScreenAds';
import { POBAdManager } from '../common/POBAdManager';
import { POBConstants } from '../common/POBConstants';
import { POBError } from '../models/POBError';
import { POBRequest } from '../models/POBRequest';
import { POBImpression } from '../models/POBImpression';
import { POBBid } from '../models/POBBid';
import { POBBidEventListener } from './POBBidEventListener';
import { POBBidError } from 'src/models/POBBidError';
import { POBFullScreenBidEvent } from './POBFullScreenBidEvent';
import { POBBidHandler } from '../models/POBBidHandler';

const POBRNInterstitialModule = NativeModules.POBRNInterstitialModule;


/**
 * Displays full-screen interstitial ads.
 */
export class POBInterstitial implements POBFullScreenAds, POBFullScreenBidEvent, POBBidHandler {

    private publisherId?: string;

    private profileId?: number;

    private adUnitId?: string;

    private instanceId: string;

    private listener?: POBInterstitialListener;

    private videoListener?: POBVideoListener;

    private bidEventListener?: POBBidEventListener;

    private bid?: POBBid;

    /**
     * Constructor.
     * Initializes and returns newly allocated interstitial object for supporting `No Ad Server Configuration`
     *
     * @param publisherId Identifier of the publisher
     * @param profileId   Profile ID of an ad tag
     * @param adUnitId    Ad unit id used to identify unique placement on screen
     */
    constructor(publisherId: string, profileId: number, adUnitId: string) {
        this.publisherId = publisherId;
        this.profileId = profileId;
        this.adUnitId = adUnitId;
        this.instanceId = new Date().getTime().toString();
        POBRNInterstitialModule.createAdInstance(
            this.instanceId,
            this.publisherId,
            this.profileId,
            this.adUnitId
        );
    }

    /**
     * Method to Receive callback events from native modules
     * @param eventName event name
     * @param adInfo ad info JSON string
     */
    onAdEvent(eventName: string, _adInfo: any): void {
        switch (eventName) {
            case POBConstants.AD_RECEIVED_EVENT:
                this.bid = new POBBid(_adInfo, this);
                this.listener?.onAdReceived(this);
                break;
            case POBConstants.AD_FAILED_TO_LOAD_EVENT:
                var error = new POBError(_adInfo.errorCode, _adInfo.errorMessage);
                this.listener?.onAdFailedToLoad(this, error);
                break;
            case POBConstants.AD_FAILED_TO_SHOW_EVENT:
                var error = new POBError(_adInfo.errorCode, _adInfo.errorMessage);
                this.listener?.onAdFailedToShow(this, error);
                break;
            case POBConstants.AD_CLICKED_EVENT:
                this.listener?.onAdClicked(this);
                break;
            case POBConstants.AD_OPEN_EVENT:
                this.listener?.onAdOpened(this);
                break;
            case POBConstants.AD_CLOSE_EVENT:
                this.listener?.onAdClosed(this);
                break;
            case POBConstants.AD_EXPIRED_EVENT:
                this.listener?.onAdExpired(this);
                break;
            case POBConstants.APP_LEAVE_EVENT:
                this.listener?.onAppLeaving(this);
                break;
            case POBConstants.VIDEO_PLAYBACK_COMPLETED:
                this.videoListener?.onVideoPlaybackCompleted(this);
                break;
            case POBConstants.BID_RECEIVED:
                this.bid = new POBBid(_adInfo, this);
                this.bidEventListener?.onBidReceived(this, this.bid);
                break;
            case POBConstants.BID_FAILED:
                var error = new POBError(_adInfo.errorCode, _adInfo.errorMessage);
                this.bidEventListener?.onBidFailed(this, error);
                break;
            default:
        }
    }

    /**
     * Initiate the loading of an interstitial ad
     */
    loadAd(): void {
        POBAdManager.getInstance().put(this.instanceId, this);
        POBRNInterstitialModule.loadAd(this.instanceId);
    }

    /**
     * Presents an interstitial ad in full screen view until the user dismisses it. Calling this
     * method has no effect until the ad is received i.e. onAdReceived() gets called. Recommended to
     * check if isReady returns true before calling show().
     */
    show(): void {
        POBRNInterstitialModule.showAd(this.instanceId);
    }

    /**
     * Invoke this method when your app is about to destroy. It cleans the resources.
     */
    destroy(): void {
        POBRNInterstitialModule.destroy(this.instanceId);
        POBAdManager.getInstance().remove(this.instanceId);
    }

    /**
     *  To check whether the ad is loaded and ready to show InterstitialAd.
     */
    isReady(): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            POBRNInterstitialModule.isReady(this.instanceId).then((result: number) => {
                resolve(result === 1 ? true : false);

            }).catch((error: any) => {
                reject(error)
            });
        });
    }

    /**
     * Sets instance of POBInterstitialListener for getting callbacks
     *
     * @param listener Instance of POBInterstitialListener
     */
    setListener(listener: POBInterstitialListener): void {
        this.listener = listener;
    }

    /**
     * Get the bid object for the requested Ad.
     *
     * @returns {@link POBBid} if the Ad is loaded else undefined.
     */
    getBid(): POBBid | undefined {
        return this.bid
    }

    /**
     * Sets instance of POBVideoListener for getting callbacks of VAST based video ad
     *
     * @param videoListener Instance of POBVideoListener
     */
    setVideoListener(videoListener: POBVideoListener): void {
        this.videoListener = videoListener;
    }

    /**
     * Setter for setting the request parameters on the {@link POBInterstitial}.
     * Call this method before loading the Ad to set the request parameters for the Ad.
     * {@link POBRequest} provides the APIs to set {@link POBRequest#testMode}, {@link POBRequest#bidSummary}, {@link POBRequest#serverUrl}, {@link POBRequest#debugEnabled}, {@link POBRequest#versionId} and {@link POBRequest#networkTimeout}.
     * @param request Instance of {@link POBRequest}
     */
    setRequest(request: POBRequest): void {
        const requestString = JSON.stringify(request);
        POBRNInterstitialModule.setRequestParameters(
            requestString,
            this.instanceId
        );
    }

    /**
     * Setter can be used to set impression parameters on {@link POBInterstitial} object.
     * Call this method before loading the Ad to set the impression parameters for the Ad.
     * {@link POBImpression} provides the APIs to set {@link POBImpression#testCreativeId}, {@link POBImpression#adPosition} and {@link POBImpression#customParameters}.
     * @param impression Instance of {@link POBImpression}
     */
    setImpression(impression: POBImpression): void {
        const impressionString = JSON.stringify(impression);
        POBRNInterstitialModule.setImpressionParameters(
            impressionString,
            this.instanceId
        );
    }

    /**
     * Sets Bid event listener to receive bid events.
     *
     * @param listener reference of {@link POBBidEventListener}
     */
    setBidEventListener(listener: POBBidEventListener) {
        this.bidEventListener = listener;
        POBRNInterstitialModule.setBidEvent(
            this.instanceId
        );
    }

    /**
     * Proceeds with bid flow, This method should be called only when {@link POBBidEventListener} is set
     * Note: Unnecessary duplicate call will fail and
     * appropriate errors will be logged with return value `false`
     *
     * @return Returns the boolean value indicating success or failure.
     */
    proceedToLoadAd(): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            POBRNInterstitialModule.proceedToLoadAd(this.instanceId)
              .then((result: number) => {
                resolve(result === 1 ? true : false);
              })
              .catch((error: any) => {
                reject(error);
              });
        });
    }

    /**
     * Proceeds with error, the flow is completed by setting its state to default considering
     * error at client side.
     *
     * @param error the error of type {@link POBBidError}
     *              Example:
     *              Scenario 1 : When bid is failed in client-side in-app auction loss
     *              proceedOnError() with {@link POBBidError.POBBidErrorCode.CLIENT_SIDE_AUCTION_LOSS} errorCode.
     *              <p>
     *              Scenario 2 : When bid is expired
     *              proceedOnError() with {@link POBBidError.POBBidErrorCode.BID_EXPIRED} errorCode.
     */
    proceedOnError(error: POBBidError): void {
        POBRNInterstitialModule.proceedOnError(
            JSON.stringify(error),
            this.instanceId
        );
    }

    // POBBidHandler method

    /**
     * Checks whether the bid associated with this instance has expired.
     * Returns a Promise that resolves with a boolean value indicating
     * the bid expiry status.
     *
     * @returns A Promise that resolves with a boolean value.
     *          - `true` if the bid has expired.
     *          - `false` if the bid is still valid.
     */
    isBidExpired(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            POBRNInterstitialModule.isBidExpired(this.instanceId)
                .then((result: number) => {
                    resolve(result === 1 ? true : false);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }
}
