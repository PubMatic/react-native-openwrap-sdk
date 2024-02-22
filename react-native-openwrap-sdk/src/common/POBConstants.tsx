/**
 * Constants class for OpenWrap SDK Plugin 
 */
export class POBConstants {
    static readonly AD_RECEIVED_EVENT = 'onAdReceived';

    static readonly AD_FAILED_TO_LOAD_EVENT = 'onAdFailedToLoad';

    static readonly AD_FAILED_TO_SHOW_EVENT = 'onAdFailedToShow';

    static readonly AD_CLICKED_EVENT = 'onAdClicked';

    static readonly AD_OPEN_EVENT = 'onAdOpened';

    static readonly AD_CLOSE_EVENT = 'onAdClosed';

    static readonly AD_EXPIRED_EVENT = 'onAdExpired';

    static readonly APP_LEAVE_EVENT = 'onAppLeaving';

    static readonly RECEIVE_REWARD_EVENT = 'onReceiveReward';

    static readonly VIDEO_PLAYBACK_COMPLETED = 'onVideoPlaybackCompleted';

    static readonly BID_RECEIVED = 'onBidReceived';

    static readonly BID_FAILED = 'onBidFailed';

    static readonly INTERSTITIAL_AD_EVENT_KEY = 'pob_rn_interstitial_ad_event';

    static readonly REWARDED_AD_EVENT_KEY = 'pob_rn_rewarded_ad_event';

}