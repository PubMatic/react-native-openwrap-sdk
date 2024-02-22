package com.pubmatic.sdk.openwrap.reactnative

import androidx.annotation.Keep
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

/**
 * View Manager class responsible for Managing POBRNBannerView to JS implementation.
 * Use constant "POBRNBannerView" to map JS view component.
 */
@Keep
class POBRNBannerViewManager : SimpleViewManager<POBRNBannerView>() {
    companion object {
        const val NAME = "POBRNBannerView"
    }

    override fun getName(): String {
        return NAME
    }

    override fun createViewInstance(context: ThemedReactContext): POBRNBannerView {
        return POBRNBannerView(context)
    }

    override fun getCommandsMap() = mapOf(POBSDKPluginConstant.BANNER_BID_EXPIRY_COMMAND to POBSDKPluginConstant.BANNER_BID_EXPIRY_COMMAND_VALUE)

    /**
     * Sets the ad unit details string and loads banner ad.
     * @param view instance of POBRNBannerView
     * @param adUnitDetails the json ad unit details.
     */
    @ReactProp(name = "adUnitDetails")
    fun setAdUnitDetails(view: POBRNBannerView, adUnitDetails: String) {
        // Once banner view is created it should not load again if adUnitDetails props changed
        if(!view.isBannerViewCreated) {
            view.loadAd(adUnitDetails)
        }
    }

    /**
     * Manages the auto refresh of already loaded banner.
     * @param view instance of POBRNBannerView
     * @param autoRefreshState Banner auto refresh value. Expected values 1: Pause, 2:Resume
     */
    @ReactProp(name = "autoRefreshState")
    fun setAutoRefreshState(view: POBRNBannerView, autoRefreshState: Int) {
        view.setAutoRefreshState(autoRefreshState)
    }

    /**
     * Forcefully refreshes already loaded banner.
     * Delegates BANNER_FORCE_REFRESH_EVENT callback with its status, true for success else false.
     * @param view instance of POBRNBannerView
     * @param value used to determine whether to apply force refresh or not.
     * When 0, force refresh will not be applied. for any other value, force refresh will be applied.
     */
    @ReactProp(name = "forceRefresh")
    fun forceRefresh(view: POBRNBannerView, value: Int) {
        view.forceRefresh(value)
    }

    /**
     * Notifies proceedToLoadAd to banner view.
     * @param view instance of POBRNBannerView
     * @param value used to determine whether to call proceedToLoadAd or not
     * When 0, proceedToLoadAd will not get notified
     */
    @ReactProp(name = "proceedToLoadAd")
    fun proceedToLoadAd(view: POBRNBannerView, value: Int) {
        if(value != 0) {
            view.proceedToLoadAd()
        }
    }

    /**
     * Notifies proceedOnError to banner view.
     * @param view instance of POBRNBannerView
     * @param value used to determine whether to call proceedOnError or not
     * When empty, proceedOnError will not get notified
     */
    @ReactProp(name = "proceedOnError")
    fun proceedOnError(view: POBRNBannerView, value: String) {
        if(value.isNotEmpty()) {
            view.proceedOnError(value)
        }
    }

    override fun receiveCommand(view: POBRNBannerView, commandId: String?, args: ReadableArray?) {
        super.receiveCommand(view, commandId, args)
        // Check for the received command and take appropriate actions
        when (commandId?.toInt()) {
            POBSDKPluginConstant.BANNER_BID_EXPIRY_COMMAND_VALUE -> view.isBidExpired()
        }
    }

    override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any>? {
        val builder = MapBuilder.builder<String, Any>()
        builder.put(
            POBSDKPluginConstant.AD_RECEIVED_EVENT,
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.AD_RECEIVED_EVENT
            )
        )
        builder.put(
            POBSDKPluginConstant.BID_RECEIVED_EVENT,
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.BID_RECEIVED_EVENT
            )
        )
        builder.put(
            POBSDKPluginConstant.BANNER_PROCEED_TO_LOAD_AD_EVENT,
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.BANNER_PROCEED_TO_LOAD_AD_EVENT
            )
        )
        builder.put(
            POBSDKPluginConstant.BID_FAILED_EVENT,
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.BID_FAILED_EVENT
            )
        )
        builder.put(
            POBSDKPluginConstant.AD_FAILED_TO_LOAD_EVENT,
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.AD_FAILED_TO_LOAD_EVENT
            )
        )
        builder.put(
            POBSDKPluginConstant.AD_CLICKED_EVENT,
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.AD_CLICKED_EVENT
            )
        )
        builder.put(
            POBSDKPluginConstant.AD_OPENED_EVENT,
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.AD_OPENED_EVENT
            )
        )
        builder.put(
            POBSDKPluginConstant.AD_CLOSED_EVENT,
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.AD_CLOSED_EVENT
            )
        )
        builder.put(
            POBSDKPluginConstant.APP_LEAVE_EVENT,
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.APP_LEAVE_EVENT
            )
        )
        builder.put(
            POBSDKPluginConstant.BANNER_FORCE_REFRESH_EVENT,
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.BANNER_FORCE_REFRESH_EVENT
            )
        )
        builder.put(
            POBSDKPluginConstant.BANNER_BID_EVENT,
            MapBuilder.of(
                POBSDKPluginConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBSDKPluginConstant.BANNER_BID_EVENT
            )
        )
        return builder.build()
    }

    override fun onDropViewInstance(view: POBRNBannerView) {
        // Clean up the banner view.
        view.destroy()
        super.onDropViewInstance(view)
    }
}
