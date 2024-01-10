package com.pubmatic.sampleapp.banner

import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.google.android.gms.ads.admanager.AdManagerAdView
import com.pubmatic.sampleapp.util.POBRNSDKConstant
import com.pubmatic.sdk.common.POBError
import com.pubmatic.sdk.openwrap.banner.POBBannerView
import com.pubmatic.sdk.openwrap.eventhandler.dfp.DFPBannerEventHandler
import com.pubmatic.sdk.video.player.POBEndCardView
import org.json.JSONException

/**
 * This class demonstrates how to integrate OpenWrap SDK banner ads through GAM Header Bidding in React Native environments.
 * You can add custom targeting to GAM by using config block and also use methods to facilitate your use case by going through OpenWrap SDK integration guide.
 * This class can be reused or customized as per the requirement in your React Native application.
 */
class POBRNBannerView(val reactContext: ThemedReactContext) : FrameLayout(reactContext) {

    private var banner: POBBannerView? = null

    private var viewId: Int = 0

    private var isLoaded = false

    /**
     * Loads the banner ad by setting up ad unit details.
     * If parsing failed,throws an error.
     */
    fun loadAd(adUnitIdDetails: String) {
        viewId = id
        try {
            // Initialise POBBannerView by setting up ad unit details
            val bannerAdUnitConfig = POBAdUnitDetails.build(adUnitIdDetails)

            // Create instance of event handler for GAM header bidding with GAM ad unit id
            val eventHandler = DFPBannerEventHandler(
                context,
                bannerAdUnitConfig.gamAdUnitId,
                *bannerAdUnitConfig.adSizes
            )

            // Config block for setting custom targeting or extra parameters on GAM request
            eventHandler.setConfigListener { adManagerAdView, builder, pobBid ->
                // Set custom targeting as follows
                /*for ((key, value) in dfpCustomTargeting.entries) {
                    requestBuilder.addCustomTargeting(key, value)
                }*/
            }

            // Create instance of POBBannerView object with OW ad unit details
            val banner = POBBannerView(context)

            banner.init(
                bannerAdUnitConfig.publisherId, bannerAdUnitConfig.profileId,
                bannerAdUnitConfig.owAdUnitId,eventHandler
            )

            // Set OW SDK event listeners
            banner.setListener(BannerListener())
            this.banner = banner

            // load banner ads
            banner.loadAd()
            addView(banner)

        } catch (e: JSONException) {
            val errorMsg = "${POBRNSDKConstant.INVALID_REQUEST_FAILURE_MSG} with $e"
            reactContext.getJSModule<RCTEventEmitter>(RCTEventEmitter::class.java)
                .receiveEvent(
                    viewId,
                    POBRNSDKConstant.AD_FAILED_TO_LOAD_EVENT,
                    convertPOBErrorToWritableMap(POBError(POBError.INVALID_REQUEST, errorMsg))
                )
        }
    }

    override fun requestLayout() {
        super.requestLayout()
        // Relayout is requirement whenever there are any updates happens on the Native View.
        if (isLoaded) {
            updateLayout(this)
        }
    }

    private fun updateLayout(view: View) {
        view.measure(
            MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY)
        )
        view.layout(left, top, left + width, top + height)
    }

    private fun convertPOBErrorToWritableMap(error: POBError): WritableMap {
        val errorMap = Arguments.createMap()
        errorMap.putInt(POBRNSDKConstant.ERROR_CODE_KEY, error.errorCode)
        errorMap.putString(POBRNSDKConstant.ERROR_MESSAGE_KEY, error.errorMessage)
        return errorMap
    }

    private inner class BannerListener : POBBannerView.POBBannerViewListener() {
        override fun onAdReceived(bannerView: POBBannerView) {
            isLoaded = true

            // Create writable map and add width, height
            val adSizeMap: WritableMap = Arguments.createMap()
            bannerView.creativeSize?.let {
                adSizeMap.putInt(POBRNSDKConstant.WIDTH, it.adWidth)
                adSizeMap.putInt(POBRNSDKConstant.HEIGHT, it.adHeight)
            }
            // dispatch on ad receive event with ad size map.
            reactContext.getJSModule(RCTEventEmitter::class.java)
                .receiveEvent(viewId, POBRNSDKConstant.AD_RECEIVED_EVENT, adSizeMap)

            // OW IB Video starts rendering when frame is completely attached and layout pass.
            // Below delay workaround is required, in order to work InBanner Video ads
            postDelayed(Runnable {
                viewTreeObserver.dispatchOnGlobalLayout()
            }, 100)

            // Adding the hierarchy change listener to update the parent when the child view is updated.
            // This is required for the refresh case of banner ads
            updateViewOnHierarchyChange(bannerView)

            // Adding the hierarchy change listener to update the parent when the child view is updated.
            var internalView = bannerView.getChildAt(0) as ViewGroup
            // Checking whether the internal view is of type AdManagerAdView
            // If yes, add the listener to the next child.
            if (internalView is AdManagerAdView && bannerView.childCount > 1) {
                internalView = bannerView.getChildAt(1) as ViewGroup
            }
            updateViewOnHierarchyChange(internalView)
        }

        override fun onAdFailed(bannerView: POBBannerView, error: POBError) {

            reactContext.getJSModule(RCTEventEmitter::class.java)
                .receiveEvent(
                    viewId,
                    POBRNSDKConstant.AD_FAILED_TO_LOAD_EVENT,
                    convertPOBErrorToWritableMap(error)
                )
        }


        override fun onAdClicked(bannerView: POBBannerView) {
            reactContext.getJSModule(RCTEventEmitter::class.java)
                .receiveEvent(viewId, POBRNSDKConstant.AD_CLICKED_EVENT, null)
        }

        override fun onAdOpened(bannerView: POBBannerView) {
            reactContext.getJSModule(RCTEventEmitter::class.java)
                .receiveEvent(viewId, POBRNSDKConstant.AD_OPENED_EVENT, null)
        }

        override fun onAdClosed(bannerView: POBBannerView) {
            reactContext.getJSModule(RCTEventEmitter::class.java)
                .receiveEvent(viewId, POBRNSDKConstant.AD_CLOSED_EVENT, null)
        }


        override fun onAppLeaving(bannerView: POBBannerView) {
            reactContext.getJSModule(RCTEventEmitter::class.java)
                .receiveEvent(viewId, POBRNSDKConstant.APP_LEAVE_EVENT, null)
        }

        // Used to add hierarchy change listener and calls the requestLayout on the parent view
        // on the callback onChildViewAdded.
        // Also check whether the child is [POBEndCardView] if yes adds the hierarchy change listener to it.
        private fun updateViewOnHierarchyChange(view: ViewGroup) {
            view.setOnHierarchyChangeListener(object : OnHierarchyChangeListener {
                override fun onChildViewAdded(parent: View?, child: View?) {
                    parent?.requestLayout()
                    parent?.parent?.requestLayout()

                    if (child is AdManagerAdView) {
                        val internalChild = (child as ViewGroup).getChildAt(0)
                        updateLayout(internalChild)
                    }
                    // Relayout for POBEndCardView
                    if (child is POBEndCardView) {
                        child.setOnHierarchyChangeListener(this)
                    }
                }

                override fun onChildViewRemoved(parent: View?, child: View?) {
                    // No action required.
                }
            })
        }
    }

    /**
     * Cleans up the banner view.
     */
    fun destroy() {
        banner?.setListener(null)
        banner?.destroy()
        removeAllViews()
    }

}
