package com.pubmatic.sampleapp.interstitial

import androidx.annotation.MainThread
import com.facebook.react.bridge.ReactApplicationContext
import com.pubmatic.sampleapp.interfaces.POBRNFullScreenAd
import com.pubmatic.sampleapp.util.POBRNSDKConstant
import com.pubmatic.sampleapp.util.POBRNSDKUtils
import com.pubmatic.sdk.common.POBError
import com.pubmatic.sdk.openwrap.eventhandler.dfp.DFPInterstitialEventHandler
import com.pubmatic.sdk.openwrap.interstitial.POBInterstitial

/**
 * This class demonstrates how to integrate OpenWrap SDK Interstitial ads through GAM Header Bidding in React Native environments.
 * It follows the FullScreenAd protocol which is a wrapper on POBInterstitial which helps you to load and show interstitial ads.
 * You can also add custom targeting to GAM by using config block and also use methods to facilitate your use case by going through OpenWrap SDK integration guide.
 * This class can be reused or customized as per the requirement in your React Native application.
 */
@MainThread
class POBRNInterstitialAd(
    publisherId: String,
    profileId: Int,
    owAdUnitId: String,
    gamAdUnitId : String,
    var context: ReactApplicationContext
) : POBRNFullScreenAd {

    // Instance of OW SDK interstitial object
    private var interstitial: POBInterstitial? = null

    /**
     * Init block to initialize interstitial ad object
     */
    init {

        context.currentActivity?.let { activity ->
            // Create instance of event handler for GAM header bidding with GAM ad unit id
            val eventHandler = DFPInterstitialEventHandler(activity,gamAdUnitId)

            // Config block for setting custom targeting or extra parameters on GAM request
            eventHandler.setConfigListener { requestBuilder, bid ->
                // Set custom targeting as follows
                /*for ((key, value) in dfpCustomTargeting.entries) {
                    requestBuilder.addCustomTargeting(key, value)
                }*/
            }

            // Create instance of POBInterstitial object with OW ad unit details
            interstitial =
                POBInterstitial(context, publisherId, profileId, owAdUnitId, eventHandler)

            // Set OW SDK event listeners
            interstitial?.setListener(POBInterstitialListener())
            interstitial?.setVideoListener(object : POBInterstitial.POBVideoListener() {
                override fun onVideoPlaybackCompleted(ad: POBInterstitial) {
                    POBRNSDKUtils.emitCallbackEvent(
                        context,
                        POBRNSDKConstant.INTERSTITIAL_AD_EVENT,
                        POBRNSDKConstant.VIDEO_PLAYBACK_COMPLETED_EVENT, null
                    )
                }
            })
        }
    }

    override fun loadAd() {
        // Load interstitial ad
        interstitial?.loadAd()
    }

    override fun isReady(): Boolean {
        interstitial?.let {
            return it.isReady
        }
        return false
    }

    override fun showAd() {
        // Show interstitial ad
        interstitial?.show()
    }

    override fun destroyAd() {
        // Destroy interstitial ad
        interstitial?.destroy()
    }

    /**
     * Internal class which implement POBInterstitial Listener and communicates callbacks to React
     * Emit the received callbacks using RCTDeviceEventEmitter to capture it on JS side
     */
    inner class POBInterstitialListener :
        POBInterstitial.POBInterstitialListener() {
        /**
         * Notifies the listener that an ad has been successfully loaded and rendered.
         */
        override fun onAdReceived(ad: POBInterstitial) {
            POBRNSDKUtils.emitCallbackEvent(
                context,
                POBRNSDKConstant.INTERSTITIAL_AD_EVENT,
                POBRNSDKConstant.AD_RECEIVED_EVENT,
                null
            )
        }

        /**
         * Notifies the listener of an error encountered while loading an ad.
         */
        override fun onAdFailedToLoad(ad: POBInterstitial, error: POBError) {
            POBRNSDKUtils.emitCallbackEvent(
                context,
                POBRNSDKConstant.INTERSTITIAL_AD_EVENT,
                POBRNSDKConstant.AD_FAILED_TO_LOAD_EVENT,
                POBRNSDKUtils.getErrorExtJSON(error)
            )
        }

        /**
         * Notifies the listener of an error encountered while rendering an ad.
         */
        override fun onAdFailedToShow(ad: POBInterstitial, error: POBError) {
            POBRNSDKUtils.emitCallbackEvent(
                context,
                POBRNSDKConstant.INTERSTITIAL_AD_EVENT,
                POBRNSDKConstant.AD_FAILED_TO_SHOW_EVENT,
                POBRNSDKUtils.getErrorExtJSON(error)
            )
        }

        /**
         * Notifies that the user has clicked the ad view.
         */
        override fun onAdClicked(ad: POBInterstitial) {
            POBRNSDKUtils.emitCallbackEvent(
                context,
                POBRNSDKConstant.INTERSTITIAL_AD_EVENT,
                POBRNSDKConstant.AD_CLICKED_EVENT,
                null
            )
        }

        /**
         * Notifies listener that the interstitial ad has open the ad on top of the current
         * view/screen, as a result of user interaction.
         */
        override fun onAdOpened(ad: POBInterstitial) {
            POBRNSDKUtils.emitCallbackEvent(
                context,
                POBRNSDKConstant.INTERSTITIAL_AD_EVENT,
                POBRNSDKConstant.AD_OPENED_EVENT,
                null
            )
        }

        /**
         * Notifies that the interstitial ad has closed the ad on top of the current view.
         */
        override fun onAdClosed(ad: POBInterstitial) {
            POBRNSDKUtils.emitCallbackEvent(
                context,
                POBRNSDKConstant.INTERSTITIAL_AD_EVENT,
                POBRNSDKConstant.AD_CLOSED_EVENT,
                null
            )
        }

        /**
         * Notifies the listener that an ad has been expired
         */
        override fun onAdExpired(ad: POBInterstitial) {
            POBRNSDKUtils.emitCallbackEvent(
                context,
                POBRNSDKConstant.INTERSTITIAL_AD_EVENT,
                POBRNSDKConstant.AD_EXPIRED_EVENT,
                null
            )
        }

        /**
         * Notifies the listener whenever current app goes in the background due to user click
         */
        override fun onAppLeaving(ad: POBInterstitial) {
            POBRNSDKUtils.emitCallbackEvent(
                context,
                POBRNSDKConstant.INTERSTITIAL_AD_EVENT,
                POBRNSDKConstant.APP_LEAVE_EVENT,
                null
            )
        }
    }
}
