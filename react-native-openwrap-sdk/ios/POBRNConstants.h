#ifndef POBRNConstants_h
#define POBRNConstants_h

#define POBRN_KEYWORDS @"keywords"

// AppInfo Keys
#define POBRN_APP_DOMAIN @"domain"
#define POBRN_STORE_URL  @"storeUrl"
#define POBRN_IS_PAID    @"paid"
#define POBRN_CATEGORIES @"categories"

// Location Keys
#define POBRN_LATITUDE  @"latitude"
#define POBRN_LONGITUDE @"longitude"
#define POBRN_SOURCE    @"source"

// UserInfo Keys
#define POBRN_CITY       @"city"
#define POBRN_BIRTH_YEAR @"birthYear"
#define POBRN_COUNTRY    @"country"
#define POBRN_METRO      @"metro"
#define POBRN_REGION     @"region"
#define POBRN_ZIP        @"zip"
#define POBRN_GENDER     @"gender"

// Log level constants
#define POBRN_LogLevel_ALL     0
#define POBRN_LogLevel_VERBOSE 1
#define POBRN_LogLevel_DEBUG   2
#define POBRN_LogLevel_INFO    3
#define POBRN_LogLevel_WARN    4
#define POBRN_LogLevel_ERROR   5
#define POBRN_LogLevel_OFF     6

#define POBRN_ERROR_DOMAIN                  @"OpenWrapSDK"
#define POBRN_INVALID_REQUEST_FAILURE_MSG   @"Failed to parse ad unit config."

#define POBRN_OW_SDK_VERSION @"ow_sdk_version"

// Event payload data constants
#define POBRN_EVENT_PAYLOAD_EXTRA_KEY       @"ext"
#define POBRN_AD_INSTANCE_ID                @"instanceId"
#define POBRN_EVENT_NAME_KEY                @"eventName"
#define POBRN_ERROR_CODE                    @"errorCode"
#define POBRN_ERROR_MESSAGE                 @"errorMessage"
#define POBRN_REWARD_AMOUNT                 @"rewardAmount"
#define POBRN_REWARD_CURRENCY_TYPE          @"rewardCurrencyType"
#define POBRN_BANNER_FORCE_REFRESH_STATUS   @"forceRefreshStatus"
#define POBRN_BANNER_PROCEED_TO_LOAD_AD_STATUS  @"proceedToLoadAdStatus"
#define POBRN_BID_EXPIRY_STATUS             @"bidExpiryStatus"

// Ad unit details constants
#define POBRN_PUBLISHER_ID          @"publisherId"
#define POBRN_PROFILE_ID            @"profileId"
#define POBRN_AD_UNIT_ID            @"adUnitId"
#define POBRN_AD_UNIT_SIZES         @"adSizes"
#define POBRN_AD_UNIT_WIDTH         @"width"
#define POBRN_AD_UNIT_HEIGHT        @"height"

// Ad request parameters constants
#define POBRN_IS_BID_SUMMARY_ENABLED    @"bidSummary"
#define POBRN_IS_DEBUG_ENABLED          @"debugEnabled"
#define POBRN_IS_TEST_MODE_ENABLED      @"testMode"
#define POBRN_NETWORK_TIMEOUT           @"networkTimeout"
#define POBRN_AD_SERVER_URL             @"serverUrl"
#define POBRN_PROFILE_VERSION_ID        @"versionId"
#define POBRN_REQUEST                   @"request"

// Impression tracking parameter constants
#define POBRN_AD_POSITION       @"adPosition"
#define POBRN_TEST_CREATIVE_ID  @"testCreativeId"
#define POBRN_CUSTOM_PARAMS     @"customParams"
#define POBRN_IMPRESSION        @"impression"

// Bid parameter constants
#define POBRN_BID_PRICE             @"price"
#define POBRN_BID_TARGETING         @"targeting"
#define POBRN_BID_CRTYPE            @"crType"
#define POBRN_BID_PARTNER_NAME      @"partnerName"
#define POBRN_BID_ID                @"bidId"
#define POBRN_BID_IMPRESSION_ID     @"impressionId"
#define POBRN_BID_BUNDLE            @"bundle"
#define POBRN_BID_GROSS_PRICE       @"grossPrice"
#define POBRN_BID_STATUS            @"status"
#define POBRN_BID_CR_ID             @"creativeId"
#define POBRN_BID_NURL              @"nurl"
#define POBRN_BID_LURL              @"lurl"
#define POBRN_BID_CREATIVE          @"creative"
#define POBRN_BID_DEAL_ID           @"dealId"
#define POBRN_BID_REFRESH_INTERVAL  @"refreshInterval"
#define POBRN_ENABLE_GET_BID_PRICE  @"enableGetBidPrice"

typedef NS_ENUM(NSInteger, POBRNFullScreenAdType) {
    POBRNFullScreenAdTypeInterstitial = 0,
    POBRNFullScreenAdTypeRewarded,
};

// Global event as per ad type
#define POBRN_INTERSTITIAL_AD_EVENT @"pob_rn_interstitial_ad_event"
#define POBRN_REWARDED_AD_EVENT     @"pob_rn_rewarded_ad_event"

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
#define POBRN_EVENT_BID_RECEIVED               @"onBidReceived"
#define POBRN_EVENT_BID_RECEIVE_FAILED         @"onBidFailed"

#endif /* POBRNConstants_h */
