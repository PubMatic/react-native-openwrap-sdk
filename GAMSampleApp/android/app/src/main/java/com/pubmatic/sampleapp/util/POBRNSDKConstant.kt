package com.pubmatic.sampleapp.util

/**
 * Maintains RN OpenWrap SDK Sample App constants
 */
internal object POBRNSDKConstant {

    //Event Callback Names
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

    // Banner Direct event registration key
    const val BANNER_EVENT_REGISTRATION_KEY = "registrationName"

    // Event payload data keys
    const val EVENT_NAME_KEY = "eventName"
    const val EXT_KEY = "ext"
    const val ERROR_CODE_KEY = "errorCode"
    const val ERROR_MESSAGE_KEY = "errorMessage"
    const val REWARD_AMOUNT_KEY = "rewardAmount"
    const val REWARD_CURRENCY_TYPE_KEY = "rewardCurrencyType"

    const val INVALID_REQUEST_FAILURE_MSG = "Failed to parse ad unit config."

    // Ad Unit Config
    const val PUBLISHER_ID = "publisherId"
    const val PROFILE_ID = "profileId"
    const val OW_AD_UNIT_ID = "owAdUnitId"
    const val GAM_AD_UNIT_ID = "gamAdUnitId"
    const val AD_SIZES = "adSizes"
    const val WIDTH = "width"
    const val HEIGHT = "height"

}
