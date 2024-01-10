package com.pubmatic.sampleapp.rewarded

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.pubmatic.sampleapp.interfaces.POBRNFullScreenAdProvider

/**
 * This Class demonstrates how to write a bridge to connect JS side code with OpenWrap SDK rewarded wrapper class.
 * You can write @ReactMethod which can be called from JS side while loading rewarded ads
 * You can use the same class or follow the similar implementation in your React Native application.
 */
class POBRNRewardedAdModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), POBRNFullScreenAdProvider {

    private var rewardedAd: POBRNRewardedAd? = null

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    override fun createAdInstance(
        publisherId: String,
        profileId: Double,
        owAdUnitId: String,
        gamAdUnitId: String
    ) {
        currentActivity?.runOnUiThread {
            rewardedAd = POBRNRewardedAd(
                publisherId,
                profileId.toInt(),
                owAdUnitId,
                gamAdUnitId,
                reactApplicationContext
            )
        }
    }

    @ReactMethod
    override fun loadAd() {
        currentActivity?.runOnUiThread {
            rewardedAd?.loadAd()
        }
    }

    @ReactMethod
    override fun showAd() {
        currentActivity?.runOnUiThread {
            rewardedAd?.showAd()
        }
    }

    @ReactMethod
    override fun isReady(promise: Promise) {
        rewardedAd?.let { ad ->
            promise.resolve(ad.isReady())
        }
        promise.resolve(false)
    }

    @ReactMethod
    override fun destroyAd() {
        currentActivity?.runOnUiThread {
            rewardedAd?.destroyAd()
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
     * Module name which is used to initialize the react native module on jS side
     */
    companion object {
        const val NAME = "POBRNRewardedAdModule"
    }
}
