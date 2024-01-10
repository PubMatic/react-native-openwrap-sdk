package com.pubmatic.sampleapp.util

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.pubmatic.sdk.common.POBError
import org.json.JSONObject


/**
 * Utils class
 */
object POBRNSDKUtils {
    /**
     * Emits callback events to react native with extra parameters if required
     * Example 1:
     * {
     *      "eventName" : "onAdReceived"
     * }
     *
     * Example 2:
     * {
     *      "eventName" : "onAdFailedToLoad"
     *      "ext" : {
     *          "errorCode" : "test_error_code"
     *          "errorMessage" : "test_error_message"
     *      }
     * }
     */
    fun emitCallbackEvent(
        reactApplicationContext: ReactApplicationContext,
        adFormatEventName : String,
        eventName: String,
        ext: JSONObject?
    ) {
        val payload = JSONObject()
        payload.put(POBRNSDKConstant.EVENT_NAME_KEY, eventName)
        ext?.let {
            payload.put(POBRNSDKConstant.EXT_KEY, ext)
        }
        reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(adFormatEventName, payload.toString())
    }


    /**
     *  Gets ext JSON from POBError object
     */
    fun getErrorExtJSON(error : POBError) : JSONObject{
        val ext = JSONObject()
        ext.put(POBRNSDKConstant.ERROR_CODE_KEY, error.errorCode)
        ext.put(POBRNSDKConstant.ERROR_MESSAGE_KEY, error.errorMessage)
        return ext
    }
}
