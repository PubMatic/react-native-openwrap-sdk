package com.pubmatic.sdk.openwrap.reactnative

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext

class OpenWrapSDKPackage : ReactPackage {
  override fun createNativeModules(reactApplicationContext: ReactApplicationContext): List<NativeModule> {
    return listOf(OpenWrapSDKModule(reactApplicationContext),POBRNInterstitialModule(reactApplicationContext), POBRNRewardedAdModule(reactApplicationContext))
  }

  override fun createViewManagers(reactApplicationContext: ReactApplicationContext) = listOf(POBRNBannerViewManager())
}
