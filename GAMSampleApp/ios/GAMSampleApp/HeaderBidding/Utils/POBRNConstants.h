#ifndef POBRNConstants_h
#define POBRNConstants_h

#define POBRN_ERROR_DOMAIN                  @"OpenWrapSDK"
#define POBRN_INVALID_REQUEST_FAILURE_MSG   @"Failed to parse ad unit config"

// Global event of full screen ads
#define POBRN_INTERSTITIAL_AD_EVENT @"pob_rn_interstitial_ad_event"
#define POBRN_REWARDED_AD_EVENT     @"pob_rn_rewarded_ad_event"

// Ad unit details constants
#define POBRN_PUBLISHER_ID          @"publisherId"
#define POBRN_PROFILE_ID            @"profileId"
#define POBRN_AD_OW_UNIT_ID         @"owAdUnitId"
#define POBRN_AD_GAM_UNIT_ID        @"gamAdUnitId"
#define POBRN_AD_UNIT_SIZES         @"adSizes"
#define POBRN_AD_UNIT_WIDTH         @"width"
#define POBRN_AD_UNIT_HEIGHT        @"height"

// Ad callback event name
#define POBRN_EVENT_AD_RECEIVED                @"onAdReceived"
#define POBRN_EVENT_FAILED_TO_LOAD_AD          @"onAdFailedToLoad"
#define POBRN_EVENT_FAILED_TO_SHOW_AD          @"onAdFailedToShow"
#define POBRN_EVENT_DID_CLICK_AD               @"onAdClicked"
#define POBRN_EVENT_AD_OPENED                  @"onAdOpened"
#define POBRN_EVENT_AD_CLOSED                  @"onAdClosed"
#define POBRN_EVENT_AD_EXPIRED                 @"onAdExpired"
#define POBRN_EVENT_WILL_LEAVE_APP             @"onAppLeaving"
#define POBRN_EVENT_VIDEO_PLAYBACK_COMPLETED   @"onVideoPlaybackCompleted"
#define POBRN_EVENT_RECEIVE_REWARD             @"onReceiveReward"

// Event payload data constants
#define POBRN_EVENT_PAYLOAD_EXTRA_KEY @"ext"
#define POBRN_EVENT_NAME_KEY          @"eventName"
#define POBRN_ERROR_CODE              @"errorCode"
#define POBRN_ERROR_MESSAGE           @"errorMessage"
#define POBRN_REWARD_AMOUNT           @"rewardAmount"
#define POBRN_REWARD_CURRENCY_TYPE    @"rewardCurrencyType"

// Enum represents the full screen ad type.
typedef NS_ENUM(NSInteger, POBRNFullScreenAdType) {
    POBRNFullScreenAdTypeInterstitial = 0,
    POBRNFullScreenAdTypeRewarded,
};

#endif /* POBRNConstants_h */
