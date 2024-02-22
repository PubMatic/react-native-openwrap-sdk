package com.pubmatic.sdk.openwrap.reactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.pubmatic.sdk.common.POBError
import com.pubmatic.sdk.openwrap.core.POBBid
import com.pubmatic.sdk.openwrap.core.POBBidEvent
import com.pubmatic.sdk.openwrap.core.POBBidEventListener
import com.pubmatic.sdk.openwrap.core.POBRequest
import com.pubmatic.sdk.openwrap.core.POBReward
import com.pubmatic.sdk.rewardedad.POBRewardedAd
import org.json.JSONObject

/**
 *  Wrapper class used to create POBRewardedAd ad object.This class communicates with rewarded module
 */
class POBRNRewardedAd(
    private val instanceId: String,
    publisherId: String,
    profileId: Int,
    adUnitId: String,
    private val context: ReactApplicationContext
) : POBRNFullScreenAd {

    private val rewarded: POBRewardedAd?

    /**
     *  Init block to initialize rewarded ad object
     */
    init {
        rewarded =
            POBRewardedAd.getRewardedAd(context, publisherId, profileId, adUnitId)
        rewarded?.setListener(POBRewardedAdListener(instanceId))
        // Setting the adPosition to fullScreen for Rewarded Ads.
        rewarded?.impression?.adPosition = POBRequest.AdPosition.FULL_SCREEN
    }

    override fun loadAd() {
        rewarded?.loadAd()
    }

    override fun isReady(): Boolean {
        rewarded?.let {
            return it.isReady
        }
        return false
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
    fun setSkipAlertDialogInfo(
        title: String,
        message: String,
        resumeButtonText: String,
        closeButtonText: String
    ) {
        rewarded?.setSkipAlertDialogInfo(title, message, resumeButtonText, closeButtonText)
    }

    override fun showAd() {
        rewarded?.show()
    }

    override fun setRequestParameters(paramString: String) {
        rewarded?.adRequest?.let {
            POBSDKPluginUtils.setRequestParams(it, paramString)
        }
    }

    override fun setImpressionParameters(paramString: String) {
        rewarded?.impression?.let {
            POBSDKPluginUtils.setImpressionParams(it, paramString)
        }
        // Setting the adPosition to fullScreen for Rewarded Ads.
        rewarded?.impression?.adPosition = POBRequest.AdPosition.FULL_SCREEN
    }

    override fun proceedToLoadAd(): Boolean {
        return rewarded?.proceedToLoadAd() ?: false
    }

    override fun proceedOnError(error: String) {
        val bidFailedError = error.toBidEventError()
        rewarded?.proceedOnError(bidFailedError)
    }

    override fun setBidEventListener() {
        rewarded?.setBidEventListener(POBRewardedBidEventListener(instanceId))
    }

    override fun isBidExpired(): Boolean {
        return rewarded?.bid?.isExpired ?: false
    }

    override fun destroy() {
        rewarded?.destroy()
    }

    /**
     * Internal class which implement POBRewardedAd Listener and communicates callbacks to React
     */
    inner class POBRewardedAdListener(private val instanceId: String) :
        POBRewardedAd.POBRewardedAdListener() {
        /**
         * Notifies the listener that an ad has been successfully loaded and rendered.
         */
        override fun onAdReceived(ad: POBRewardedAd) {
            // Converting bid to json object
            val bidObject = ad.bid?.toJson()
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.REWARDED_AD_EVENT,
                POBSDKPluginConstant.AD_RECEIVED_EVENT,
                instanceId,
                bidObject
            )
        }

        /**
         * Notifies the listener of an error encountered while loading an ad.
         */
        override fun onAdFailedToLoad(ad: POBRewardedAd, error: POBError) {
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.REWARDED_AD_EVENT,
                POBSDKPluginConstant.AD_FAILED_TO_LOAD_EVENT,
                instanceId,
                POBSDKPluginUtils.getErrorExtJSON(error)
            )
        }

        /**
         * Notifies the listener of an error encountered while rendering an ad.
         */
        override fun onAdFailedToShow(ad: POBRewardedAd, error: POBError) {
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.REWARDED_AD_EVENT,
                POBSDKPluginConstant.AD_FAILED_TO_SHOW_EVENT,
                instanceId,
                POBSDKPluginUtils.getErrorExtJSON(error)
            )
        }

        /**
         * Notifies that the user has clicked the ad view.
         */
        override fun onAdClicked(ad: POBRewardedAd) {
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.REWARDED_AD_EVENT,
                POBSDKPluginConstant.AD_CLICKED_EVENT,
                instanceId,
                null
            )
        }

        /**
         * Notifies listener that the rewarded ad has open the ad on top of the current
         * view/screen, as a result of user interaction.
         */
        override fun onAdOpened(ad: POBRewardedAd) {
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.REWARDED_AD_EVENT,
                POBSDKPluginConstant.AD_OPENED_EVENT,
                instanceId,
                null
            )
        }

        /**
         * Notifies that the rewarded ad has closed the ad on top of the current view.
         */
        override fun onAdClosed(ad: POBRewardedAd) {
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.REWARDED_AD_EVENT,
                POBSDKPluginConstant.AD_CLOSED_EVENT,
                instanceId,
                null
            )
        }

        /**
         * Notifies the listener that an ad has been expired
         */
        override fun onAdExpired(ad: POBRewardedAd) {
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.REWARDED_AD_EVENT,
                POBSDKPluginConstant.AD_EXPIRED_EVENT,
                instanceId,
                null
            )
        }

        /**
         * Notifies the listener whenever current app goes in the background due to user click
         */
        override fun onAppLeaving(ad: POBRewardedAd) {
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.REWARDED_AD_EVENT,
                POBSDKPluginConstant.APP_LEAVE_EVENT,
                instanceId,
                null
            )
        }

        /**
         * Notifies that the rewarded ad has completed and user should be rewarded. It is called
         * when the Rewarded Ad playback is completed.
         */
        override fun onReceiveReward(ad: POBRewardedAd, reward: POBReward) {
            val ext = JSONObject()
            ext.put(POBSDKPluginConstant.REWARD_CURRENCY_TYPE_KEY, reward.currencyType)
            ext.put(POBSDKPluginConstant.REWARD_AMOUNT_KEY, reward.amount)
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.REWARDED_AD_EVENT,
                POBSDKPluginConstant.RECEIVE_REWARD_EVENT,
                instanceId,
                ext
            )
        }
    }

    /**
     * Internal class which implement POBBidEventListener and communicates callbacks to React
     */
    inner class POBRewardedBidEventListener(val instanceId: String) : POBBidEventListener {
        override fun onBidReceived(bidEvent: POBBidEvent, bid: POBBid) {
            val bidObject = bid.toJson()
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.REWARDED_AD_EVENT,
                POBSDKPluginConstant.BID_RECEIVED_EVENT,
                instanceId,
                bidObject
            )
        }

        override fun onBidFailed(bidEvent: POBBidEvent, error: POBError) {
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.REWARDED_AD_EVENT,
                POBSDKPluginConstant.BID_FAILED_EVENT,
                instanceId,
                POBSDKPluginUtils.getErrorExtJSON(error)
            )
        }
    }
}