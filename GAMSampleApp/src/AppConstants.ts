/**
 * Constants class for OpenWrap SDK GAM Sample App
 */
export class AppConstants {
    // Ad configuration constants
    // These are test placements, please use your production placements before publishing the app.
    static readonly PUBLISHER_ID = "156276";

    static readonly PROFILE_ID = 1165;

    static readonly VIDEO_PROFILE_ID = 1757;

    static readonly INTERSTITIAL_AD_UNIT_ID =
        "/15671365/pm_sdk/PMSDK-Demo-App-Interstitial";

    static readonly GAM_NTERSTITIAL_AD_UNIT_ID =
        "/15671365/pm_sdk/PMSDK-Demo-App-Interstitial";

    static readonly REWARDED_AD_UNIT_ID =
        "/15671365/pm_sdk/PMSDK-Demo-App-RewardedAd";

    static readonly GAM_REWARDED_AD_UNIT_ID =
        "/15671365/pm_sdk/PMSDK-Demo-App-RewardedAd";

    static readonly BANNER_AD_UNIT_ID =
        "/15671365/pm_sdk/PMSDK-Demo-App-Banner";

    static readonly GAM_BANNER_AD_UNIT_ID =
        "/15671365/pm_sdk/PMSDK-Demo-App-Banner";

    // Event callbacks keys
    static readonly AD_RECEIVED_EVENT = 'onAdReceived';

    static readonly AD_FAILED_TO_LOAD_EVENT = 'onAdFailedToLoad';

    static readonly AD_FAILED_TO_SHOW_EVENT = 'onAdFailedToShow';

    static readonly AD_CLICKED_EVENT = 'onAdClicked';

    static readonly AD_OPEN_EVENT = 'onAdOpened';

    static readonly AD_CLOSE_EVENT = 'onAdClosed';

    static readonly AD_EXPIRED_EVENT = 'onAdExpired';

    static readonly APP_LEAVE_EVENT = 'onAppLeaving';

    static readonly RECEIVE_REWARD_EVENT = "onReceiveReward";

    static readonly VIDEO_PLAYBACK_COMPLETED_EVENT = 'onVideoPlaybackCompleted';

    //event names emitted by full screen ads from native code
    static readonly INTERSTITIAL_AD_EVENT_KEY = 'pob_rn_interstitial_ad_event';

    static readonly REWARDED_AD_EVENT_KEY = "pob_rn_rewarded_ad_event";

    // app side constants
    static readonly ITEMS_IN_LIST = 30;

    static readonly AD_SLOT_SIZE = 4;
}
