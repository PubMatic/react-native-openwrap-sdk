package com.pubmatic.sampleapp

import android.app.Application
import android.util.Log
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.google.android.gms.ads.MobileAds
import com.pubmatic.sampleaap.ReactNativeFlipper
import com.pubmatic.sdk.common.OpenWrapSDK
import com.pubmatic.sdk.common.models.POBApplicationInfo
import java.net.MalformedURLException
import java.net.URL

/**
 *  Application class used to instantiate GAM Sample App
 */
class MainApplication : Application(), ReactApplication {

    private val mReactNativeHost: ReactNativeHost = object : DefaultReactNativeHost(this) {
        override fun getUseDeveloperSupport(): Boolean {
            return BuildConfig.DEBUG
        }

        override fun getPackages(): List<ReactPackage> {
            // Packages that cannot be autolinked yet can be added manually here, for example:
            // packages.add(new MyReactNativePackage());
            return PackageList(this).packages.apply {
                add(OpenWrapSDKPackage())
            }
        }

        override fun getJSMainModuleName(): String {
            return "index"
        }

        override val isNewArchEnabled: Boolean
            protected get() = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean
            protected get() = BuildConfig.IS_HERMES_ENABLED
    }

    override fun getReactNativeHost(): ReactNativeHost {
        return mReactNativeHost
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this,  /* native exopackage */false)
        MobileAds.initialize(this)
        // You must set the Google Play storeURL of your app before you request an ad using OpenWrap SDK
        val appInfo = POBApplicationInfo()
        try {
            appInfo.storeURL = URL("https://play.google.com/store/apps/details?id=com.example.android&hl=en")
        } catch (e: MalformedURLException) {
            Log.d("GAMSampleApp",e.toString())
        }
        OpenWrapSDK.setApplicationInfo(appInfo)
        // Set OpenWrap SDK log level
        OpenWrapSDK.setLogLevel(OpenWrapSDK.LogLevel.All)

        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // If you opted-in for the New Architecture, we load the native entry point for this app.
            load()
        }
        ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
    }
}
