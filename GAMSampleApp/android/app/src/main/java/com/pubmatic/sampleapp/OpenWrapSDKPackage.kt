package com.pubmatic.sampleapp

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.pubmatic.sampleapp.banner.POBRNBannerViewManager
import com.pubmatic.sampleapp.interstitial.POBRNInterstitialModule
import com.pubmatic.sampleapp.rewarded.POBRNRewardedAdModule

/**
 * This class is used to declare the modules
 * It implements [ReactPackage] protocol which is used to add reference of the modules created
 * using the [createNativeModules] method.
 */
class OpenWrapSDKPackage : ReactPackage {

    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): MutableList<NativeModule> = listOf(
        POBRNRewardedAdModule(reactContext),
        POBRNInterstitialModule(reactContext)
    ).toMutableList()

    override fun createViewManagers(reactApplicationContext: ReactApplicationContext) = listOf(POBRNBannerViewManager())
}
