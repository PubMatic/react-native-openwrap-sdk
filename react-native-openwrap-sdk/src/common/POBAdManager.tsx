import { NativeEventEmitter, NativeModules } from 'react-native';
import { POBFullScreenAds } from "../ads/POBFullScreenAds";
import { POBConstants } from './POBConstants';
const POBRNInterstitialModule = NativeModules.POBRNInterstitialModule;
const interstitialEventEmitter = new NativeEventEmitter(POBRNInterstitialModule);
const POBRNRewardedAdModule = NativeModules.POBRNRewardedAdModule;
const rewardedEventEmitter = new NativeEventEmitter(POBRNRewardedAdModule);


/**
 *  Ad Manager class to store ad instances of OW ads
 */
export class POBAdManager {

    private instanceMap: Map<string, POBFullScreenAds>

    private static instance: POBAdManager | null = null;

    /**
     * Factory Method to return singleton instance of POBAdMAnager
     * @returns instance of POBAdMAnager
     */
    static getInstance(): POBAdManager {
        if (!POBAdManager.instance) {
            POBAdManager.instance = new POBAdManager();
        }
        return POBAdManager.instance;
    }

    /**
     * Constructor
     */
    private constructor() {
        this.instanceMap = new Map();
        interstitialEventEmitter.addListener(POBConstants.INTERSTITIAL_AD_EVENT_KEY, (adInfo: string) => {
            this.notifyOnAdEvent(adInfo);
        })
        rewardedEventEmitter.addListener(POBConstants.REWARDED_AD_EVENT_KEY, (adInfo: string) => {
            this.notifyOnAdEvent(adInfo);
        })
    }

    private notifyOnAdEvent(adInfo: string) {
        var adInfoJson = JSON.parse(adInfo);
        if (this.instanceMap.has(adInfoJson.instanceId)) {
            var ad = this.instanceMap.get(adInfoJson.instanceId)
            if (ad != null) {
                ad.onAdEvent(adInfoJson.eventName, adInfoJson.ext);
            }
        }
    }

    /**
     *  Method to put ad object in AdManager map
     */
    put(instanceId: string, ad: POBFullScreenAds): void {
        this.instanceMap.set(instanceId, ad)
    }

    /**
     *  Method to remove ad object with given instance Id in AdManager map
     */
    remove(instanceId: string): void {
        this.instanceMap.delete(instanceId);
    }

}