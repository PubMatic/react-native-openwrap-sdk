package com.pubmatic.sdk.openwrap.reactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.pubmatic.sdk.common.POBError
import com.pubmatic.sdk.openwrap.core.POBBid
import com.pubmatic.sdk.openwrap.core.POBBidEvent
import com.pubmatic.sdk.openwrap.core.POBBidEventListener
import com.pubmatic.sdk.openwrap.core.POBRequest
import com.pubmatic.sdk.openwrap.interstitial.POBInterstitial

/**
 *  Wrapper class used to create POBInterstitial ad object.This class communicates with interstitial module
 */
class POBRNInterstitialAd(
    private val instanceId: String,
    publisherId: String,
    profileId: Int,
    adUnitId: String,
    private var context: ReactApplicationContext
) : POBRNFullScreenAd {

    private val interstitial: POBInterstitial


    /**
     *  Init block to initialize interstitial ad object
     */
    init {
        interstitial =
            POBInterstitial(context, publisherId, profileId, adUnitId)
        interstitial.setListener(POBInterstitialListener(instanceId))
        interstitial.setVideoListener(object : POBInterstitial.POBVideoListener() {
            override fun onVideoPlaybackCompleted(ad: POBInterstitial) {
                POBSDKPluginUtils.emitCallbackEvent(
                    context,
                    POBSDKPluginConstant.INTERSTITIAL_AD_EVENT,
                    POBSDKPluginConstant.VIDEO_PLAYBACK_COMPLETED_EVENT,
                    instanceId, null
                )
            }
        })
        // Setting the adPosition to fullScreen for Interstitial Ads.
        interstitial.impression?.adPosition = POBRequest.AdPosition.FULL_SCREEN
    }

    override fun loadAd() {
        interstitial.loadAd()
    }

    override fun isReady(): Boolean {
        return interstitial.isReady
    }

    override fun setRequestParameters(paramString: String) {
        interstitial.adRequest?.let {
            POBSDKPluginUtils.setRequestParams(it, paramString)
        }
    }

    override fun setImpressionParameters(paramString: String) {
        interstitial.impression?.let {
            POBSDKPluginUtils.setImpressionParams(it, paramString)
        }
        // Setting the adPosition to fullScreen for Interstitial Ads.
        interstitial.impression?.adPosition = POBRequest.AdPosition.FULL_SCREEN
    }

    override fun proceedToLoadAd(): Boolean {
        return interstitial.proceedToLoadAd()
    }

    override fun proceedOnError(error: String) {
        val bidFailedError = error.toBidEventError()
        interstitial.proceedOnError(bidFailedError)
    }

    override fun setBidEventListener() {
        interstitial.setBidEventListener(POBInterstitialBidEventListener(instanceId))
    }

    override fun isBidExpired(): Boolean {
        return interstitial.bid?.isExpired ?: false
    }

    override fun showAd() {
        interstitial.show()
    }

    override fun destroy() {
        interstitial.destroy()
    }

    /**
     * Internal class which implement POBInterstitial Listener and communicates callbacks to React
     */
    inner class POBInterstitialListener(private val instanceId: String) :
        POBInterstitial.POBInterstitialListener() {
        /**
         * Notifies the listener that an ad has been successfully loaded and rendered.
         */
        override fun onAdReceived(ad: POBInterstitial) {
            // Converting bid to json object
            val bidObject = ad.bid?.toJson()
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.INTERSTITIAL_AD_EVENT,
                POBSDKPluginConstant.AD_RECEIVED_EVENT,
                instanceId,
                bidObject
            )
        }

        /**
         * Notifies the listener of an error encountered while loading an ad.
         */
        override fun onAdFailedToLoad(ad: POBInterstitial, error: POBError) {
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.INTERSTITIAL_AD_EVENT,
                POBSDKPluginConstant.AD_FAILED_TO_LOAD_EVENT,
                instanceId,
                POBSDKPluginUtils.getErrorExtJSON(error)
            )
        }

        /**
         * Notifies the listener of an error encountered while rendering an ad.
         */
        override fun onAdFailedToShow(ad: POBInterstitial, error: POBError) {
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.INTERSTITIAL_AD_EVENT,
                POBSDKPluginConstant.AD_FAILED_TO_SHOW_EVENT,
                instanceId,
                POBSDKPluginUtils.getErrorExtJSON(error)
            )
        }

        /**
         * Notifies that the user has clicked the ad view.
         */
        override fun onAdClicked(ad: POBInterstitial) {
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.INTERSTITIAL_AD_EVENT,
                POBSDKPluginConstant.AD_CLICKED_EVENT,
                instanceId,
                null
            )
        }

        /**
         * Notifies listener that the banner view has open the ad on top of the current
         * view/screen, as a result of user interaction.
         */
        override fun onAdOpened(ad: POBInterstitial) {
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.INTERSTITIAL_AD_EVENT,
                POBSDKPluginConstant.AD_OPENED_EVENT,
                instanceId,
                null
            )
        }

        /**
         * Notifies that the banner view has closed the ad on top of the current view.
         */
        override fun onAdClosed(ad: POBInterstitial) {
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.INTERSTITIAL_AD_EVENT,
                POBSDKPluginConstant.AD_CLOSED_EVENT,
                instanceId,
                null
            )
        }

        /**
         * Notifies the listener that an ad has been expired
         */
        override fun onAdExpired(ad: POBInterstitial) {
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.INTERSTITIAL_AD_EVENT,
                POBSDKPluginConstant.AD_EXPIRED_EVENT,
                instanceId,
                null
            )
        }

        /**
         * Notifies the listener whenever current app goes in the background due to user click
         */
        override fun onAppLeaving(ad: POBInterstitial) {
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.INTERSTITIAL_AD_EVENT,
                POBSDKPluginConstant.APP_LEAVE_EVENT,
                instanceId,
                null
            )
        }
    }

    /**
     * Internal class which implement POBBidEventListener and communicates callbacks to React
     */
    inner class POBInterstitialBidEventListener(val instanceId: String) : POBBidEventListener {
        override fun onBidReceived(bidEvent: POBBidEvent, bid: POBBid) {
            val bidObject = bid.toJson()
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.INTERSTITIAL_AD_EVENT,
                POBSDKPluginConstant.BID_RECEIVED_EVENT,
                instanceId,
                bidObject
            )
        }

        override fun onBidFailed(bidEvent: POBBidEvent, error: POBError) {
            POBSDKPluginUtils.emitCallbackEvent(
                context,
                POBSDKPluginConstant.INTERSTITIAL_AD_EVENT,
                POBSDKPluginConstant.BID_FAILED_EVENT,
                instanceId,
                POBSDKPluginUtils.getErrorExtJSON(error)
            )
        }
    }
}