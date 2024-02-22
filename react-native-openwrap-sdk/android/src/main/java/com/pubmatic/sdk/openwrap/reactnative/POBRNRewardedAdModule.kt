package com.pubmatic.sdk.openwrap.reactnative

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 *  RN Module class used to create POBRewardedAd ad object. This class communicates with React side rewarded ad class
 */
class POBRNRewardedAdModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), POBRNFullScreenAdProvider {

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    override fun createAdInstance(instanceId: String, publisherId: String, profileId: Int, adUnitId: String){
        currentActivity?.runOnUiThread {
            if (!POBRNAdManager.contains(instanceId)) {
                val rewardedAd = POBRNRewardedAd(
                    instanceId,
                    publisherId,
                    profileId,
                    adUnitId,
                    reactApplicationContext
                )
                POBRNAdManager.put(instanceId, rewardedAd)
            }
        }
    }

    @ReactMethod
    override fun loadAd(instanceId: String) {
        currentActivity?.runOnUiThread {
            POBRNAdManager.get(instanceId)?.loadAd()
        }
    }

    @ReactMethod
    override fun showAd(instanceId: String) {
        currentActivity?.runOnUiThread {
            POBRNAdManager.get(instanceId)?.showAd()
        }
    }
    @ReactMethod
    override fun setRequestParameters(paramString: String, instanceId: String) {
        currentActivity?.runOnUiThread {
            POBRNAdManager.get(instanceId)?.setRequestParameters(paramString)
        }
    }

    @ReactMethod
    override fun setImpressionParameters(paramString: String, instanceId: String) {
        currentActivity?.runOnUiThread {
            POBRNAdManager.get(instanceId)?.setImpressionParameters(paramString)
        }
    }

    @ReactMethod
    override fun setBidEvent(instanceId: String) {
        currentActivity?.runOnUiThread {
            POBRNAdManager.get(instanceId)?.setBidEventListener()
        }
    }

    @ReactMethod
    override fun proceedToLoadAd(instanceId: String, promise: Promise) {
        currentActivity?.runOnUiThread {
            if (POBRNAdManager.contains(instanceId)) {
                if (POBRNAdManager.get(instanceId)?.proceedToLoadAd() == true) {
                    promise.resolve(1)
                } else {
                    promise.resolve(0)
                }
            } else {
                promise.resolve(0)
            }
        }
    }

    @ReactMethod
    override fun proceedOnError(error: String, instanceId: String) {
        currentActivity?.runOnUiThread {
            POBRNAdManager.get(instanceId)?.proceedOnError(error)
        }
    }

    @ReactMethod
    override fun isBidExpired(instanceId: String, promise: Promise) {
        currentActivity?.runOnUiThread {
            if (POBRNAdManager.contains(instanceId)) {
                val isBidExpired: Int = if (POBRNAdManager.get(instanceId)?.isBidExpired() == true) {
                    1
                } else {
                    0
                }
                promise.resolve(isBidExpired)
            } else {
                promise.resolve(1)
            }
        }
    }

    /**
     * Method to check if interstitial ad is ready
     */
    @ReactMethod
    override fun isReady(instanceId: String, promise: Promise) {
        currentActivity?.runOnUiThread {
            if (POBRNAdManager.contains(instanceId)) {
                val isReady: Int = if (POBRNAdManager.get(instanceId)?.isReady() == true) {
                    1
                } else {
                    0
                }
                promise.resolve(isReady)
            } else {
                promise.resolve(0)
            }
        }
    }

    /**
     * To set info to skip alert dialog, use/set this before calling {@link #loadAd} method.
     * Note: This method validate parameter values, if one of the parameter is null or empty then the skip alert uses
     * default values.
     *
     * @param title      the title for skip alert dialog
     * @param message    the message for skip alert dialog
     * @param resumeButtonText the resume button title for skip alert dialog
     * @param closeButtonText  the close button title for skip alert dialog
     */
    @ReactMethod
    fun setSkipAlertDialogInfo(
        instanceId: String,
        title: String,
        message: String,
        resumeButtonText: String,
        closeButtonText: String
    ) {
        currentActivity?.runOnUiThread {
            val rewardedInstance = POBRNAdManager.get(instanceId)
            if (rewardedInstance is POBRNRewardedAd) {
                rewardedInstance.setSkipAlertDialogInfo(
                    title,
                    message,
                    resumeButtonText,
                    closeButtonText
                )
            }
        }
    }

    @ReactMethod
    override fun destroy(instanceId: String) {
        currentActivity?.runOnUiThread {
            POBRNAdManager.get(instanceId)?.destroy()
            POBRNAdManager.remove(instanceId)
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
     * Empty implementation to resolve removeListener warning in react native.
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

    companion object {
        const val NAME = "POBRNRewardedAdModule"
    }
}