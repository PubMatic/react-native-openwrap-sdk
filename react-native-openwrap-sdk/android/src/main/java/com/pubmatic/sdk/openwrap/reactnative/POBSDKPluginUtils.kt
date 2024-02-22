package com.pubmatic.sdk.openwrap.reactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.pubmatic.sdk.common.POBError
import com.pubmatic.sdk.common.log.POBLog
import com.pubmatic.sdk.openwrap.core.POBBidEvent
import com.pubmatic.sdk.openwrap.core.POBImpression
import com.pubmatic.sdk.openwrap.core.POBRequest
import com.pubmatic.sdk.openwrap.core.POBRequest.AdPosition
import org.json.JSONException
import org.json.JSONObject


/**
 * Utils class for OpenWrapSDK React Native Plugin
 */
class POBSDKPluginUtils {
    companion object {
        /**
         * Method to emit callback events to react native
         */
        fun emitCallbackEvent(
            reactApplicationContext: ReactApplicationContext,
            adFormatEventName : String,
            eventName: String,
            instanceId : String,
            ext: JSONObject?
        ) {
            val payload = JSONObject()
            payload.put(POBSDKPluginConstant.INSTANCE_ID_KEY, instanceId)
            payload.put(POBSDKPluginConstant.EVENT_NAME_KEY,eventName)
            ext?.let {
                payload.put(POBSDKPluginConstant.EXT_KEY,ext)
            }
            reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(adFormatEventName, payload.toString())
        }


        /**
         *  Method to get ext JSON from POBError object
         */
        fun getErrorExtJSON(error : POBError) : JSONObject{
            val ext = JSONObject()
            ext.put(POBSDKPluginConstant.ERROR_CODE_KEY,error.errorCode)
            ext.put(POBSDKPluginConstant.ERROR_MESSAGE_KEY,error.errorMessage)
            return ext
        }

        /**
         * Method to parse and set request parameters
         */
        fun setRequestParams(request : POBRequest,jsonString : String){
            try {
                val paramJson = JSONObject(jsonString)

                // Set OpenWrap Test mode
                if (paramJson.has(POBSDKPluginConstant.POBRN_ENABLE_TEST_MODE_KEY)) {
                    request.enableTestMode(paramJson.getBoolean(POBSDKPluginConstant.POBRN_ENABLE_TEST_MODE_KEY))
                }

                // Set OpenWrap bid summary
                if (paramJson.has(POBSDKPluginConstant.POBRN_ENABLE_BID_SUMMARY_KEY)) {
                    request.enableBidSummary(paramJson.getBoolean(POBSDKPluginConstant.POBRN_ENABLE_BID_SUMMARY_KEY))
                }

                // Set OpenWrap ad server url
                if (paramJson.has(POBSDKPluginConstant.POBRN_SERVER_URL_KEY)) {
                    request.adServerUrl = paramJson.getString(POBSDKPluginConstant.POBRN_SERVER_URL_KEY)
                }

                // Set OpenWrap profile version if available
                if (paramJson.has(POBSDKPluginConstant.POBRN_ENABLE_RESPONSE_DEBUGGING_KEY)) {
                    request.enableDebugState(paramJson.getBoolean(POBSDKPluginConstant.POBRN_ENABLE_RESPONSE_DEBUGGING_KEY))
                }

                // Set OpenWrap profile version if available
                if (paramJson.has(POBSDKPluginConstant.POBRN_VERSION_ID_KEY)) {
                    request.versionId = paramJson.getInt(POBSDKPluginConstant.POBRN_VERSION_ID_KEY)
                }

                // Set OpenWrap request network timeout if available
                if (paramJson.has(POBSDKPluginConstant.POBRN_NETWORK_TIMEOUT_KEY)) {
                    request.networkTimeout =
                        paramJson.getInt(POBSDKPluginConstant.POBRN_NETWORK_TIMEOUT_KEY)
                }
            }
            catch (ex : JSONException){
                POBLog.warn("POBSDKPluginUtils", "Exception in parsing request params $ex")
            }
        }

        /**
         * Method to parse and set impression parameters
         */
        fun setImpressionParams(impression : POBImpression,jsonString : String){
            try {
                val paramJson = JSONObject(jsonString)

                if (paramJson.has(POBSDKPluginConstant.POBRN_TEST_CREATIVE_ID_KEY)) {
                    impression.testCreativeId = paramJson.getString(POBSDKPluginConstant.POBRN_TEST_CREATIVE_ID_KEY)
                }

                if (paramJson.has(POBSDKPluginConstant.POBRN_CUSTOM_PARAMS_KEY)) {
                    val resultMap = convertJsonStringToMap(paramJson.getString(POBSDKPluginConstant.POBRN_CUSTOM_PARAMS_KEY))
                    if(resultMap.isNotEmpty()) {
                        impression.setCustomParam(resultMap)
                    }
                }

                if (paramJson.has(POBSDKPluginConstant.POBRN_AD_POSITION_KEY)) {
                    var adPosition : AdPosition? = null
                    when(paramJson.getInt(POBSDKPluginConstant.POBRN_AD_POSITION_KEY)){
                        0 -> adPosition = AdPosition.UNKNOWN
                        1 -> adPosition = AdPosition.ABOVE_THE_FOLD
                        3 -> adPosition = AdPosition.BELOW_THE_FOLD
                        4 -> adPosition = AdPosition.HEADER
                        5 -> adPosition = AdPosition.FOOTER
                        6 -> adPosition = AdPosition.SIDEBAR
                        7 -> adPosition = AdPosition.FULL_SCREEN
                    }
                    adPosition?.let {
                        impression.adPosition = adPosition
                    }
                }

            }
            catch (ex : JSONException){
                POBLog.warn("POBSDKPluginUtils", "Exception in parsing request params $ex")
            }
        }

        /*
         * Method to covert json object into map
         *  "{
         *      "key1" : ["value1", "value2", "value3"],
         *      "key2" : ["value1", "value2", "value3"],
         *  }"
         */
        private fun convertJsonStringToMap(jsonString : String) :Map<String, List<String>>{
            val resultMap = mutableMapOf<String, List<String>>()
            try {
                val customParamsJson = JSONObject(jsonString)

                for (key in customParamsJson.keys()) {
                    val jsonArray = customParamsJson.getJSONArray(key)
                    val resultList: MutableList<String> = ArrayList()
                    for (i in 0 until jsonArray.length()) {
                        val value = jsonArray.getString(i)
                        resultList.add(value)
                    }
                    resultMap[key] = resultList
                }
            }
            catch(ex : JSONException) {
                POBLog.warn("POBSDKPluginUtils", "Exception in parsing custom params $ex")
            }
            return resultMap
        }
    }
}