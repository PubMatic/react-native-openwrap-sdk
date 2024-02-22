package com.pubmatic.sdk.openwrap.reactnative

import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.pubmatic.sdk.common.POBError
import com.pubmatic.sdk.openwrap.banner.POBBannerView
import com.pubmatic.sdk.openwrap.core.POBBid
import com.pubmatic.sdk.openwrap.core.POBBidEvent
import com.pubmatic.sdk.openwrap.core.POBBidEventListener
import com.pubmatic.sdk.video.player.POBEndCardView
import org.json.JSONException


/**
 * The wrapper class facilitates POBBannerView implementation provides events through RCTEventEmitter.
 */
class POBRNBannerView(val reactContext: ThemedReactContext) : FrameLayout(reactContext), POBBidEventListener {

    private var banner: POBBannerView? = null
    private var viewId: Int = 0
    private var isLoaded = false
    var isBannerViewCreated = false

    companion object {
        const val TAG = "POBRNBannerView"
    }

    /**
     * Loads the banner ad by setting up ad unit details.
     * If parsing failed,throws an error.
     */
    fun loadAd(adUnitIdDetails: String) {
        isBannerViewCreated = true
        viewId = id
        try {
            // Initialise POBBannerView by setting up ad unit details
            val bannerAdUnitConfig = POBAdUnitDetails.build(adUnitIdDetails)
            val banner = POBBannerView(context)

            banner.init(
                bannerAdUnitConfig.publisherId, bannerAdUnitConfig.profileId,
                bannerAdUnitConfig.adUnitId, *bannerAdUnitConfig.adSizes
            )

            // check if 'get bid price' feature is enabled then only set bid event listener
            bannerAdUnitConfig.enableGetBidPrice?.let { enableGetBidPrice ->
                if(enableGetBidPrice == 1) {
                    banner.setBidEventListener(this)
                }
            }

            // set up listener
            banner.setListener(BannerListener())
            banner.adRequest?.let { request ->
                bannerAdUnitConfig.requestParams?.let { requestParams ->
                    POBSDKPluginUtils.setRequestParams(request, requestParams)
                }
            }
            banner.impression?.let { impression ->
                bannerAdUnitConfig.impressionParams?.let { impressionParams ->
                    POBSDKPluginUtils.setImpressionParams(impression, impressionParams)
                }
            }
            banner.loadAd()
            this.banner = banner
            addView(banner)
        } catch (e: JSONException) {
            val errorMsg = "${POBSDKPluginConstant.INVALID_REQUEST_FAILURE_MSG} with $e"
            reactContext.getJSModule<RCTEventEmitter>(RCTEventEmitter::class.java)
                .receiveEvent(
                    viewId,
                    POBSDKPluginConstant.AD_FAILED_TO_LOAD_EVENT,
                    convertPOBErrorToWritableMap(POBError(POBError.INVALID_REQUEST, errorMsg))
                )
        }
    }

    override fun onBidReceived(bidEvent: POBBidEvent, bid: POBBid) {
        // Create writable map and add width, height and other bid data
        val bidMap: WritableMap = bid.toMap()
        reactContext.getJSModule(RCTEventEmitter::class.java)
            .receiveEvent(
                viewId,
                POBSDKPluginConstant.BID_RECEIVED_EVENT,
                bidMap
            )
    }

    override fun onBidFailed(bidEvent: POBBidEvent, error: POBError) {
        reactContext.getJSModule(RCTEventEmitter::class.java)
            .receiveEvent(
                viewId,
                POBSDKPluginConstant.BID_FAILED_EVENT,
                convertPOBErrorToWritableMap(error)
            )
    }

    /**
     * Proceeds with bid flow. This method should be called only when [POBBidEventListener] is set
     * Note: Should be called from Main/UI thread. Also, unnecessary duplicate call will fail and
     * appropriate errors will be logged
     */
    fun proceedToLoadAd() {
        val proceedToLoadAdStatus = if (banner?.proceedToLoadAd() == true ) 1 else 0
        // dispatch proceedToLoadAd event with its status.
        val proceedToLoadAdStatusMap: WritableMap = Arguments.createMap()
        proceedToLoadAdStatusMap.putInt(
            POBSDKPluginConstant.BANNER_PROCEED_TO_LOAD_AD_STATUS,
            proceedToLoadAdStatus
        )
        reactContext.getJSModule(RCTEventEmitter::class.java)
            .receiveEvent(
                viewId,
                POBSDKPluginConstant.BANNER_PROCEED_TO_LOAD_AD_EVENT,
                proceedToLoadAdStatusMap
            )

    }

    /**
     * Proceeds with error, flow is completed by setting its state to default considering
     * error at client side.
     * Note: Should be called from Main/UI thread
     *
     * @param error the error of type {@link BidEventError}
     *              Example:
     *              Scenario 1 : When bid is failed in client-side in-app auction loss
     *              proceedOnError(BidEventError#CLIENT_SIDE_AUCTION_LOSS);
     *              <p>
     *              Scenario 2 : When bid is expired
     *              proceedOnError(BidEventError#BID_EXPIRED);
     */
    fun proceedOnError(error : String) {
        val errors = error.split("_")
        banner?.proceedOnError(errors[0].toBidEventError())
    }

    /**
     * Applies refresh state on already loaded banner. The API can be used to pause or resume banner
     * ad refresh.
     * @param autoRefreshState if the value is 1 the, pause state will be applied, if the value is
     * 2 resume state will applied to already paused banner ad.
     */
    fun setAutoRefreshState(autoRefreshState: Int) {
        if (autoRefreshState == 1) {
            banner?.pauseAutoRefresh()
        } else if (autoRefreshState == 2) {
            banner?.resumeAutoRefresh()
        }
    }

    /**
     * Applies force refresh to already loaded banner ads.
     * Delegates BANNER_FORCE_REFRESH_EVENT callback with its status, true for success else false
     * @param value used to determine whether to apply force refresh or not.
     * When 0, force refresh will not be applied. for any other value, force refresh will be applied.
     */
    fun forceRefresh(value: Int) {
        if(value != 0){
            val forceRefreshStatus = banner?.forceRefresh() == true
            // dispatch on ad force refresh event with its status.
            val forceRefreshStatusMap: WritableMap = Arguments.createMap()
            forceRefreshStatusMap.putBoolean(
                POBSDKPluginConstant.BANNER_FORCE_REFRESH_STATUS,
                forceRefreshStatus
            )
            reactContext.getJSModule(RCTEventEmitter::class.java)
                .receiveEvent(
                    viewId,
                    POBSDKPluginConstant.BANNER_FORCE_REFRESH_EVENT,
                    forceRefreshStatusMap
                )
        }
    }

    /**
     * Emits the expiry status of the received bid object.
     * Delegates BANNER_BID_EXPIRED callback with its expiry status
     * 1 for bid expired else 0
     */
    fun isBidExpired() {
        banner?.bid?.let {
            val isBidExpired = it.isExpired
            val bidExpiredStatusMap: WritableMap = Arguments.createMap()
            bidExpiredStatusMap.putInt(
                POBSDKPluginConstant.BANNER_BID_EXPIRED_STATUS,
                if (isBidExpired) 1 else 0
            )
            reactContext.getJSModule(RCTEventEmitter::class.java)
                .receiveEvent(
                    viewId,
                    POBSDKPluginConstant.BANNER_BID_EVENT,
                    bidExpiredStatusMap
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
        errorMap.putInt(POBSDKPluginConstant.ERROR_CODE_KEY, error.errorCode)
        errorMap.putString(POBSDKPluginConstant.ERROR_MESSAGE_KEY, error.errorMessage)
        return errorMap
    }

    private inner class BannerListener : POBBannerView.POBBannerViewListener() {
        override fun onAdReceived(bannerView: POBBannerView) {
            isLoaded = true
            // Create writable map and add width, height and other bid data
            val bidMap = bannerView.bid?.toMap()

            // dispatch on ad receive event with bid details map.
            reactContext.getJSModule(RCTEventEmitter::class.java)
                .receiveEvent(viewId, POBSDKPluginConstant.AD_RECEIVED_EVENT, bidMap)

            // OW IB Video starts rendering when frame is completely attached and layout pass.
            // Below delay workaround is required, in order to work InBanner Video ads
            bannerView.bid?.let {
                // Adding the hierarchy change listener to update the parent when the child view is updated.
                // This is required for the refresh case of banner ads
                updateViewOnHierarchyChange(bannerView)

                // Adding the hierarchy change listener to update the parent when the child view is updated.
                // This is required for the showing end card for in banner video ads
                if (it.isVideo) {
                    val internalView = bannerView.getChildAt(0) as ViewGroup
                    updateViewOnHierarchyChange(internalView)
                }
            }
        }

        override fun onAdFailed(bannerView: POBBannerView, error: POBError) {
            reactContext.getJSModule(RCTEventEmitter::class.java)
                .receiveEvent(
                    viewId,
                    POBSDKPluginConstant.AD_FAILED_TO_LOAD_EVENT,
                    convertPOBErrorToWritableMap(error)
                )
        }


        override fun onAdClicked(bannerView: POBBannerView) {
            reactContext.getJSModule(RCTEventEmitter::class.java)
                .receiveEvent(viewId, POBSDKPluginConstant.AD_CLICKED_EVENT, null)
        }

        override fun onAdOpened(bannerView: POBBannerView) {
            reactContext.getJSModule(RCTEventEmitter::class.java)
                .receiveEvent(viewId, POBSDKPluginConstant.AD_OPENED_EVENT, null)
        }

        override fun onAdClosed(bannerView: POBBannerView) {
            reactContext.getJSModule(RCTEventEmitter::class.java)
                .receiveEvent(viewId, POBSDKPluginConstant.AD_CLOSED_EVENT, null)
        }


        override fun onAppLeaving(bannerView: POBBannerView) {
            reactContext.getJSModule(RCTEventEmitter::class.java)
                .receiveEvent(viewId, POBSDKPluginConstant.APP_LEAVE_EVENT, null)
        }

        /**
         * Used to add hierarchy change listener and calls the requestLayout on the parent view
         * on the callback onChildViewAdded.
         * Also updates the layout of the view passed.
         * Also check whether the child is [POBEndCardView] if yes adds the hierarchy change listener to it.
         */
        private fun updateViewOnHierarchyChange(view: ViewGroup) {
            updateLayout(view)
            view.setOnHierarchyChangeListener(object : OnHierarchyChangeListener {
                override fun onChildViewAdded(parent: View?, child: View?) {
                    parent?.requestLayout()
                    updateLayout(this@POBRNBannerView)
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
