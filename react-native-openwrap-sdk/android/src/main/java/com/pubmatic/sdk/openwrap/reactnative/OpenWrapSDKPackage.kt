package com.pubmatic.sdk.openwrap.reactnative

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class OpenWrapSDKPackage : ReactPackage {
  override fun createNativeModules(reactApplicationContext: ReactApplicationContext): List<NativeModule> {
    return listOf(OpenWrapSDKModule(reactApplicationContext))
  }

  override fun createViewManagers(p0: ReactApplicationContext): List<ViewManager<View, ReactShadowNode<*>>> {
    return emptyList()
  }
}
