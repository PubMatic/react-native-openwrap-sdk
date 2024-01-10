package com.pubmatic.sampleapp.banner

import androidx.annotation.Keep
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.pubmatic.sampleapp.util.POBRNSDKConstant

/**
 * This Class demonstrates how to write a view manager to connect JS side code with POBRNBannerView class.
 * You can write @ReactProp which can be added in JS side while creating the component to pass data from JS to native
 * You can use the same class or follow the similar implementation in your React Native application.
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

    /**
     * Sets the ad unit details string and loads banner ad.
     * @param view instance of POBRNBannerView
     * @param adUnitDetails the json ad unit details.
     */
    @ReactProp(name = "adUnitDetails")
    fun setAdUnitDetails(view: POBRNBannerView, adUnitDetails: String) {
        view.loadAd(adUnitDetails)
    }

    override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any>? {
        val builder = MapBuilder.builder<String, Any>()
        builder.put(
            POBRNSDKConstant.AD_RECEIVED_EVENT,
            MapBuilder.of(
                POBRNSDKConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBRNSDKConstant.AD_RECEIVED_EVENT
            )
        )
        builder.put(
            POBRNSDKConstant.AD_FAILED_TO_LOAD_EVENT,
            MapBuilder.of(
                POBRNSDKConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBRNSDKConstant.AD_FAILED_TO_LOAD_EVENT
            )
        )
        builder.put(
            POBRNSDKConstant.AD_CLICKED_EVENT,
            MapBuilder.of(
                POBRNSDKConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBRNSDKConstant.AD_CLICKED_EVENT
            )
        )
        builder.put(
            POBRNSDKConstant.AD_OPENED_EVENT,
            MapBuilder.of(
                POBRNSDKConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBRNSDKConstant.AD_OPENED_EVENT
            )
        )
        builder.put(
            POBRNSDKConstant.AD_CLOSED_EVENT,
            MapBuilder.of(
                POBRNSDKConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBRNSDKConstant.AD_CLOSED_EVENT
            )
        )
        builder.put(
            POBRNSDKConstant.APP_LEAVE_EVENT,
            MapBuilder.of(
                POBRNSDKConstant.BANNER_EVENT_REGISTRATION_KEY,
                POBRNSDKConstant.APP_LEAVE_EVENT
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
