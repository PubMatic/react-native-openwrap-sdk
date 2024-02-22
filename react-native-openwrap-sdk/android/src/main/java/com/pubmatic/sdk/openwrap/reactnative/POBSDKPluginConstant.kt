package com.pubmatic.sdk.openwrap.reactnative

/**
 * Maintains OpenWrap SDK Plugin constants
 */
internal object POBSDKPluginConstant {


    const val KEYWORDS_KEY = "keywords"

    const val KEY_SDK_VERSION = "ow_sdk_version"

    //region: AppInfo keys
    const val APP_INFO_DOMAIN_KEY = "domain"
    const val APP_INFO_STORE_URL_KEY = "storeUrl"
    const val APP_INFO_IS_PAID_KEY = "paid"
    const val APP_INFO_CATEGORIES_KEY = "categories"
    //endregion

    //region: Location keys
    const val LOCATION_LATITUDE_KEY = "latitude"
    const val LOCATION_LONGITUTE_KEY = "longitude"
    const val LOCATOIN_SOURCE_KEY = "source"
    //endregion

    //region: UserInfo keys
    const val USER_INFO_CITY_KEY = "city"
    const val USER_INFO_BIRTH_YEAR_KEY = "birthYear"
    const val USER_INFO_METRO_KEY = "metro"
    const val USER_INFO_REGION_KEY = "region"
    const val LOCATOIN_ZIP_KEY = "zip"
    const val USER_INFO_GENDER_KEY = "gender"
    //region: UserInfo Gender keys
    const val GENDER_OTHER = 0
    const val GENDER_MALE = 1
    const val GENDER_FEMALE = 2
    //endregion
    //endregion

    //region: OpenWrapSDKModule keys
    const val APP_INFO_WARN_MSG = "Unable to set Application Info for value "
    const val LOCATION_WARN_MSG = "Unable to set Location for value "
    const val USERINFO_WARN_MSG = "Unable to set User Info for value "
    const val INVALID_REQUEST_FAILURE_MSG = "Failed to parse ad unit config."
    //endregion


    //Callback Names
    const val INTERSTITIAL_AD_EVENT = "pob_rn_interstitial_ad_event"
    const val REWARDED_AD_EVENT = "pob_rn_rewarded_ad_event"

    const val AD_RECEIVED_EVENT = "onAdReceived"
    const val AD_FAILED_TO_LOAD_EVENT = "onAdFailedToLoad"
    const val AD_FAILED_TO_SHOW_EVENT = "onAdFailedToShow"
    const val AD_CLICKED_EVENT = "onAdClicked"
    const val AD_OPENED_EVENT = "onAdOpened"
    const val AD_CLOSED_EVENT = "onAdClosed"
    const val AD_EXPIRED_EVENT = "onAdExpired"
    const val APP_LEAVE_EVENT = "onAppLeaving"
    const val RECEIVE_REWARD_EVENT = "onReceiveReward"
    const val VIDEO_PLAYBACK_COMPLETED_EVENT = "onVideoPlaybackCompleted"
    const val BANNER_FORCE_REFRESH_EVENT = "onForceRefresh"
    const val BID_RECEIVED_EVENT = "onBidReceived"
    const val BID_FAILED_EVENT = "onBidFailed"
    const val BANNER_BID_EVENT = "onBidExpiryStatusEvent"
    const val BANNER_FORCE_REFRESH_STATUS = "forceRefreshStatus"
    const val BANNER_PROCEED_TO_LOAD_AD_STATUS = "proceedToLoadAdStatus"
    const val BANNER_BID_EXPIRED_STATUS = "bidExpiryStatus"
    // Banner Direct event registration key
    const val BANNER_EVENT_REGISTRATION_KEY = "registrationName"
    const val BANNER_PROCEED_TO_LOAD_AD_EVENT = "onProceedToLoadAd"

    // Banner Commands
    const val BANNER_BID_EXPIRY_COMMAND = "fetchBidExpiryStatus"
    const val BANNER_BID_EXPIRY_COMMAND_VALUE = 1

    // Ad Unit Config
    const val PUBLISHER_ID = "publisherId"
    const val PROFILE_ID = "profileId"
    const val AD_UNIT_ID = "adUnitId"
    const val AD_SIZES = "adSizes"
    const val WIDTH = "width"
    const val HEIGHT = "height"
    const val REQUEST_PARAMS = "request"
    const val IMPRESSION_PARAMS = "impression"
    const val ENABLE_GET_BID_PRICE = "enableGetBidPrice"


    //Keys
    const val EVENT_NAME_KEY = "eventName"
    const val INSTANCE_ID_KEY = "instanceId"
    const val EXT_KEY = "ext"
    const val ERROR_CODE_KEY = "errorCode"
    const val ERROR_MESSAGE_KEY = "errorMessage"
    const val REWARD_AMOUNT_KEY = "rewardAmount"
    const val REWARD_CURRENCY_TYPE_KEY = "rewardCurrencyType"

    // Bid Keys
    const val CR_TYPE = "crType"
    const val PRICE = "price"
    const val TARGETING = "targeting"
    const val PARTNER_NAME = "partnerName"
    const val BID_ID = "bidId"
    const val IMPRESSION_ID = "impressionId"
    const val BUNDLE = "bundle"
    const val GROSS_PRICE = "grossPrice"
    const val STATUS = "status"
    const val CREATIVE_ID = "creativeId"
    const val NURL = "nurl"
    const val LURL = "lurl"
    const val CREATIVE = "creative"
    const val DEAL_ID = "dealId"
    const val REFRESH_INTERVAL = "refreshInterval"

    /**
     * To enable test mode for OpenWrap SDK
     */
    const val POBRN_ENABLE_TEST_MODE_KEY = "testMode"

    /**
     * To enable bid summary for OpenWrap SDK
     */
    const val POBRN_ENABLE_BID_SUMMARY_KEY = "bidSummary"

    /**
     * To enable response debugging for OpenWrap SDK
     */
    const val POBRN_ENABLE_RESPONSE_DEBUGGING_KEY = "debugEnabled"

    /**
     * To set profile version id for OpenWrap SDK
     */
    const val POBRN_VERSION_ID_KEY = "versionId"

    /**
     * To set profile id for OpenWrap SDK
     */
    const val POBRN_SERVER_URL_KEY = "serverUrl"

    /**
     * To set network timeout for OpenWrap SDK
     */
    const val POBRN_NETWORK_TIMEOUT_KEY = "networkTimeout"

    /**
     * To set test creative id for OpenWrap SDK
     */
    const val POBRN_TEST_CREATIVE_ID_KEY = "testCreativeId"

    /**
     * To set custom params for OpenWrap SDK
     */
    const val POBRN_CUSTOM_PARAMS_KEY = "customParams"

    /**
     * To set ad position for OpenWrap SDK
     */
    const val POBRN_AD_POSITION_KEY = "adPosition"


}
