import { NativeModules } from 'react-native';
import { POBRewardedAdListener } from './POBRewardedAdListener';
import { POBFullScreenAds } from './POBFullScreenAds';
import { POBAdManager } from '../common/POBAdManager';
import { POBConstants } from '../common/POBConstants';
import { POBError } from '../models/POBError';
import { POBReward } from '../models/POBReward';
import { POBRequest } from '../models/POBRequest';
import { POBImpression } from '../models/POBImpression';
import { POBBid } from '../models/POBBid';
import { POBBidEventListener } from './POBBidEventListener';
import { POBBidError } from '../models/POBBidError';
import { POBFullScreenBidEvent } from './POBFullScreenBidEvent';
import { POBBidHandler } from '../models/POBBidHandler';

const POBRNRewardedAdModule = NativeModules.POBRNRewardedAdModule;

/**
 * Displays full-screen rewarded ads.
 */
export class POBRewardedAd implements POBFullScreenAds, POBFullScreenBidEvent, POBBidHandler {

    private publisherId?: string;

    private profileId?: number;

    private adUnitId?: string;

    private instanceId: string;

    private listener?: POBRewardedAdListener;

    private bidEventListener?: POBBidEventListener;

    private bid?: POBBid;

    /**
     * Method to get newly allocated rewarded object
     * @param publisherId Identifier of the publisher
     * @param profileId Profile ID of an ad tag
     * @param adUnitId Ad unit id used to identify unique placement on screen
     * @returns newly allocated rewarded object
     */
    static getRewardedAd(publisherId: string, profileId: number, adUnitId: string): POBRewardedAd {
        return new POBRewardedAd(publisherId, profileId, adUnitId);
    }

    /**
     * Constructor.
     * Initializes and returns newly allocated rewarded object for supporting `No Ad Server Configuration`
     *
     * @param publisherId Identifier of the publisher
     * @param profileId   Profile ID of an ad tag
     * @param adUnitId    Ad unit id used to identify unique placement on screen
     */
    private constructor(publisherId: string, profileId: number, adUnitId: string) {
        this.publisherId = publisherId;
        this.profileId = profileId;
        this.adUnitId = adUnitId;
        this.instanceId = new Date().getTime().toString();
        POBRNRewardedAdModule.createAdInstance(
            this.instanceId,
            this.publisherId,
            this.profileId,
            this.adUnitId
        );
    }

    /**
     * Method to receive callback events from native modules
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
            case POBConstants.RECEIVE_REWARD_EVENT:
                var reward = new POBReward(_adInfo.rewardCurrencyType, _adInfo.rewardAmount);
                this.listener?.onReceiveReward(this, reward);
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
     * Initiate the loading of an rewarded ad
     */
    loadAd(): void {
        POBAdManager.getInstance().put(this.instanceId, this);
        POBRNRewardedAdModule.loadAd(this.instanceId);
    }

    /**
     * To set info to skip alert dialog, use/set this before calling {@link #loadAd} method.
     * Note: This method validate parameter values, if one of the parameter is null or empty then the skip alert uses
     * default values.
     *
     * @param title      the title for skip alert dialog
     * @param message    the message for skip alert dialog
     * @param resumeButtonText the resume button title for skip alert dialog
     * @param closeButtonText  the close button title for skip alert dialog
     */
    setSkipAlertDialogInfo(
        title: String,
        message: String,
        resumeButtonText: String,
        closeButtonText: String
    ): void {
        POBRNRewardedAdModule.setSkipAlertDialogInfo(this.instanceId, title, message, resumeButtonText, closeButtonText);
    }

    /**
     * Presents an rewarded ad in full screen view until the user dismisses it. Calling this
     * method has no effect until the ad is received i.e. onAdReceived() gets called. Recommended to
     * check if isReady returns true before calling show().
     */
    show(): void {
        POBRNRewardedAdModule.showAd(this.instanceId);
    }

    /**
     * Invoke this method when your app is about to destroy. It cleans the resources.
     */
    destroy(): void {
        POBRNRewardedAdModule.destroy(this.instanceId);
        POBAdManager.getInstance().remove(this.instanceId);
    }

    /**
     *  To check whether the ad is loaded and ready to show rewarded ad.
     */
    isReady(): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            POBRNRewardedAdModule.isReady(this.instanceId).then((result: number) => {
                resolve(result === 1 ? true : false);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    /**
     * Sets instance of POBRewardedAdListener for getting callbacks
     *
     * @param listener Instance of POBRewardedAdListener
     */
    setListener(listener: POBRewardedAdListener): void {
        this.listener = listener;
    }

    /**
     * Get the bid object for the requested Ad.
     *
     * @returns {@link POBBid} if the Ad is loaded else undefined.
     */
    getBid(): POBBid | undefined {
        return this.bid;
    }

    /**
     * Setter can be used to set request parameters on {@link POBRewardedAd} object.
     * Call this method before loading the Ad to set the request parameters for the Ad.
     * {@link POBRequest} provides the APIs to set {@link POBRequest#testMode}, {@link POBRequest#bidSummary}, {@link POBRequest#serverUrl}, {@link POBRequest#debugEnabled}, {@link POBRequest#versionId} and {@link POBRequest#networkTimeout}.
     * @param request Instance of {@link POBRequest}
     */
    setRequest(request: POBRequest): void {
        const requestString = JSON.stringify(request);
        POBRNRewardedAdModule.setRequestParameters(requestString, this.instanceId);
    }

    /**
     * Setter can be used to set impression parameters on {@link POBRewardedAd} object.
     * Call this method before loading the Ad to set the impression parameters for the Ad.
     * {@link POBImpression} provides the APIs to set {@link POBImpression#testCreativeId}, {@link POBImpression#adPosition} and {@link POBImpression#customParams}.
     * @param impression Instance of {@link POBImpression}
     */
    setImpression(impression: POBImpression): void {
        const impressionString = JSON.stringify(impression);
        POBRNRewardedAdModule.setImpressionParameters(
            impressionString,
            this.instanceId
        );
    }

    /**
     * Sets Bid event listener to notify bid events
     *
     * @param listener reference of {@link POBBidEventListener}
     */
    setBidEventListener(listener: POBBidEventListener) {
        this.bidEventListener = listener;
        POBRNRewardedAdModule.setBidEvent(
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
        POBRNRewardedAdModule.proceedToLoadAd(this.instanceId)
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
        POBRNRewardedAdModule.proceedOnError(
            JSON.stringify(error),
            this.instanceId
        );
    }

    // POBBidHandler method:

    /**
     * Checks whether the bid associated with this instance has expired.
     * Returns a Promise that resolves with a boolean value indicating
     * the bid expiry status.
     *
     * @returns A Promise that resolves with a boolean value.
     *          - `true` if the bid has expired.
     *          - `false` if the bid is still valid.
     */
    isBidExpired(): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            POBRNRewardedAdModule.isBidExpired(this.instanceId)
              .then((result: number) => {
                resolve(result === 1 ? true : false);
              })
              .catch((error: any) => {
                reject(error);
              });
        });
    }
}
