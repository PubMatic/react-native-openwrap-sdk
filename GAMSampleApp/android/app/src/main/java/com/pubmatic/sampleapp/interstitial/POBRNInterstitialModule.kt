package com.pubmatic.sampleapp.interstitial

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.pubmatic.sampleapp.interfaces.POBRNFullScreenAdProvider

/**
 * This Class demonstrates how to write a bridge to connect JS side code with OpenWrap SDK interstitial wrapper class.
 * You can write @ReactMethod which can be called from JS side while loading interstitial ads
 * You can use the same class or follow the similar implementation in your React Native application.
 */
class POBRNInterstitialModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), POBRNFullScreenAdProvider {

    private var interstitialAd : POBRNInterstitialAd? = null

    override fun getName(): String {
        return NAME
    }

    /**
     * Method to create instance of full screen ad
     */
    @ReactMethod
    override fun createAdInstance(publisherId: String, profileId: Double, owAdUnitId: String, gamAdUnitId : String){
        currentActivity?.runOnUiThread {
            interstitialAd = POBRNInterstitialAd(
                    publisherId,
                    profileId.toInt(),
                    owAdUnitId,
                    gamAdUnitId,
                    reactApplicationContext
                )
            }
    }

    /**
     * Method to load ad
     */
    @ReactMethod
    override fun loadAd() {
        currentActivity?.runOnUiThread {
            interstitialAd?.loadAd()
        }
    }

    /**
     * Method to show full screen ad
     */
    @ReactMethod
    override fun showAd() {
        currentActivity?.runOnUiThread {
            interstitialAd?.showAd()
        }
    }

    /**
     * Method to check if interstitial ad is ready
     */
    @ReactMethod
    override fun isReady(promise: Promise) {
        interstitialAd?.let {
            promise.resolve(it.isReady())
        }
        promise.resolve(false)
    }

    /**
     * Method to destroy ad
     */
    @ReactMethod
    override fun destroyAd() {
        currentActivity?.runOnUiThread {
            interstitialAd?.destroyAd()
        }
    }

    /**
     * Required methods introduced React Native 0.65
     * Empty implementation to resolve addListener warning in react native.
     * <p>
     * 
     * Warning which is resolved -
     * WARN new NativeEventEmitter() was called with a non-null argument without the required addListener method.
     *
     * @param type Name of the event
     */
    @ReactMethod
    fun addListener(type: String?) {
        // No action required.
    }

    /**
     * Required methods introduced React Native 0.65
     * Empty implementation to resolve removeListeners warning in react native.
     * <p>
     * 
     * Warning which is resolved -
     * WARN new NativeEventEmitter() was called with a non-null argument without the required removeListeners method.
     *
     * @param count Number of events to remove
     */
    @ReactMethod
    fun removeListeners(count: Int?) {
        // No action required.
    }

    /**
     * Module name which is used to initialize the react native module on JS side
     */
    companion object {
        const val NAME = "POBRNInterstitialModule"
    }
}
