package com.pubmatic.sampleapp.rewarded

import androidx.annotation.MainThread
import com.facebook.react.bridge.ReactApplicationContext
import com.pubmatic.sampleapp.interfaces.POBRNFullScreenAd
import com.pubmatic.sampleapp.util.POBRNSDKConstant
import com.pubmatic.sampleapp.util.POBRNSDKUtils
import com.pubmatic.sdk.common.POBError
import com.pubmatic.sdk.openwrap.core.POBReward
import com.pubmatic.sdk.openwrap.eventhandler.dfp.DFPRewardedEventHandler
import com.pubmatic.sdk.rewardedad.POBRewardedAd
import org.json.JSONObject

/**
 * This class demonstrates how to integrate OpenWrap SDK rewarded ads through GAM Header Bidding in React Native environments.
 * It follows the FullScreenAd protocol which is a wrapper on POBRewardedAd which helps you to load and show rewarded ads.
 * You can also add custom targeting to GAM by using config block and also use methods to facilitate your use case by going through OpenWrap SDK integration guide.
 * This class can be reused or customized as per the requirement in your React Native application.
 */
@MainThread
class POBRNRewardedAd(
    publisherId: String,
    profileId: Int,
    owAdUnitId: String,
    gamAdUnitId: String,
    var context: ReactApplicationContext
) : POBRNFullScreenAd {

    // Used to store the instance of [POBRewardedAd] for performing actions
    // such as, loadAd, showAd, etc.
    private var rewarded: POBRewardedAd? = null

    /**
     *  Init block to initialize rewarded ad object
     */
    init {
        context.currentActivity?.let { activity ->
            // The event handler is used to make the ad request to GAM after OW SDK
            // has received the bid.
            // The event handler requires two paramters -
            // - The reference of the current activity for showing the ad.
            // - gamAdUnitId for making the ad ad request to GAM.
            val eventHandler = DFPRewardedEventHandler(activity, gamAdUnitId)

            eventHandler.setConfigListener { requestBuilder, bid ->
                // Here, you have a provision to set the custom targeting to ad server
                // Example:
                //    requestBuilder.addCustomTargeting("<key>", "<value>")
            }

            // Pass the instance of event handler along with other parameters while creating
            // instance of POBRewardedAd.
            rewarded = POBRewardedAd.getRewardedAd(
                context, publisherId, profileId, owAdUnitId,
                eventHandler
            )

            // Set OW SDK event listener.
            rewarded?.setListener(POBRewardedAdListener())
        }
    }

    override fun loadAd() {
        // Load rewarded ad.
        rewarded?.loadAd()
    }

    override fun isReady(): Boolean {
        // Whether rewarded ad is ready.
        rewarded?.let {
            return it.isReady
        }
        return false
    }

    override fun showAd() {
        // Show rewarded ad.
        rewarded?.show()
    }

    override fun destroyAd() {
        // Destroy rewarded ad.
        rewarded?.destroy()
        rewarded = null
    }

    /**
     * Internal class which implement POBRewardedAd Listener and communicates callbacks to React
     */
    inner class POBRewardedAdListener :
        POBRewardedAd.POBRewardedAdListener() {
        /**
         * Notifies the listener that an ad has been successfully loaded and rendered.
         */
        override fun onAdReceived(ad: POBRewardedAd) {

            POBRNSDKUtils.emitCallbackEvent(
                context,
                POBRNSDKConstant.REWARDED_AD_EVENT,
                POBRNSDKConstant.AD_RECEIVED_EVENT,
                null
            )
        }

        /**
         * Notifies the listener of an error encountered while loading an ad.
         */
        override fun onAdFailedToLoad(ad: POBRewardedAd, error: POBError) {

            POBRNSDKUtils.emitCallbackEvent(
                context,
                POBRNSDKConstant.REWARDED_AD_EVENT,
                POBRNSDKConstant.AD_FAILED_TO_LOAD_EVENT,
                POBRNSDKUtils.getErrorExtJSON(error)
            )
        }

        /**
         * Notifies the listener of an error encountered while rendering an ad.
         */
        override fun onAdFailedToShow(ad: POBRewardedAd, error: POBError) {
            POBRNSDKUtils.emitCallbackEvent(
                context,
                POBRNSDKConstant.REWARDED_AD_EVENT,
                POBRNSDKConstant.AD_FAILED_TO_SHOW_EVENT,
                POBRNSDKUtils.getErrorExtJSON(error)
            )
        }

        /**
         * Notifies that the user has clicked the ad view.
         */
        override fun onAdClicked(ad: POBRewardedAd) {
            POBRNSDKUtils.emitCallbackEvent(
                context,
                POBRNSDKConstant.REWARDED_AD_EVENT,
                POBRNSDKConstant.AD_CLICKED_EVENT,
                null
            )
        }

        /**
         * Notifies listener that the rewarded ad has open the ad on top of the current
         * view/screen, as a result of user interaction.
         */
        override fun onAdOpened(ad: POBRewardedAd) {

            POBRNSDKUtils.emitCallbackEvent(
                context,
                POBRNSDKConstant.REWARDED_AD_EVENT,
                POBRNSDKConstant.AD_OPENED_EVENT,
                null
            )
        }

        /**
         * Notifies that the rewarded ad has closed the ad on top of the current view.
         */
        override fun onAdClosed(ad: POBRewardedAd) {
            POBRNSDKUtils.emitCallbackEvent(
                context,
                POBRNSDKConstant.REWARDED_AD_EVENT,
                POBRNSDKConstant.AD_CLOSED_EVENT,
                null
            )
        }

        /**
         * Notifies the listener that an ad has been expired
         */
        override fun onAdExpired(ad: POBRewardedAd) {

            POBRNSDKUtils.emitCallbackEvent(
                context,
                POBRNSDKConstant.REWARDED_AD_EVENT,
                POBRNSDKConstant.AD_EXPIRED_EVENT,
                null
            )
        }

        /**
         * Notifies the listener whenever current app goes in the background due to user click
         */
        override fun onAppLeaving(ad: POBRewardedAd) {
            POBRNSDKUtils.emitCallbackEvent(
                context,
                POBRNSDKConstant.REWARDED_AD_EVENT,
                POBRNSDKConstant.APP_LEAVE_EVENT,
                null
            )
        }

        /**
         * Notifies that the rewarded ad has completed and user should be rewarded. It is called
         * when the Rewarded Ad playback is completed.
         */
        override fun onReceiveReward(ad: POBRewardedAd, reward: POBReward) {
            val ext = JSONObject()
            ext.put(POBRNSDKConstant.REWARD_CURRENCY_TYPE_KEY, reward.currencyType)
            ext.put(POBRNSDKConstant.REWARD_AMOUNT_KEY, reward.amount)
            POBRNSDKUtils.emitCallbackEvent(
                context,
                POBRNSDKConstant.REWARDED_AD_EVENT,
                POBRNSDKConstant.RECEIVE_REWARD_EVENT,
                ext
            )
        }
    }
}
