package com.pubmatic.sdk.openwrap.reactnative

import com.pubmatic.sdk.common.POBAdSize
import org.json.JSONException
import org.json.JSONObject

/**
 * Model class, maintains OpenWrap SDK ad unit details
 */
class POBAdUnitDetails private constructor(
    val publisherId: String,
    val profileId: Int,
    val adUnitId: String,
    val requestParams: String?,
    val impressionParams: String?,
    val enableGetBidPrice: Int?,
    val adSizes: Array<POBAdSize>

) {

    /**
     * Companion object facilitates the static implementation for the class.
     */
    companion object {

        /**
         * Parses and builds {@link POBAdUnitDetails} from ad unit json string in below format
         * {"publisherId": "pub_id", "profileId": 1234, "adUnitId": "test_ad_unit", "adSizes": [{"width": 320, "height": 50}]}
         * @param adUnitDetailsJson the json string that contains ad unit details
         * @return POBAdUnitDetails newly created instance of {@link POBAdUnitDetails}
         * @throws JSONException if invalid keys provided in the json
         */
        @Throws(JSONException::class)
        fun build(adUnitDetailsJson: String): POBAdUnitDetails {
            val json = JSONObject(adUnitDetailsJson)
            val adSizeArray = json.getJSONArray(POBSDKPluginConstant.AD_SIZES)
            val adSizes: MutableList<POBAdSize> = ArrayList()
            for (i in 0 until adSizeArray.length()) {
                val adSizeJSON: JSONObject = adSizeArray.getJSONObject(i)
                adSizes.add(
                    POBAdSize(
                        adSizeJSON.getInt(POBSDKPluginConstant.WIDTH),
                        adSizeJSON.getInt(POBSDKPluginConstant.HEIGHT)
                    )
                )
            }
            var request : String? = null
            if(json.has(POBSDKPluginConstant.REQUEST_PARAMS)){
                request = json.getString(POBSDKPluginConstant.REQUEST_PARAMS)
            }

            var impression : String? = null
            if(json.has(POBSDKPluginConstant.IMPRESSION_PARAMS)){
                impression = json.getString(POBSDKPluginConstant.IMPRESSION_PARAMS)
            }

            var enableGetBidPrice: Int? = null
            if(json.has(POBSDKPluginConstant.ENABLE_GET_BID_PRICE)){
                enableGetBidPrice = json.getInt(POBSDKPluginConstant.ENABLE_GET_BID_PRICE)
            }

            return POBAdUnitDetails(
                json.getString(POBSDKPluginConstant.PUBLISHER_ID),
                json.getInt(POBSDKPluginConstant.PROFILE_ID),
                json.getString(POBSDKPluginConstant.AD_UNIT_ID),
                request,
                impression,
                enableGetBidPrice,
                adSizes.toTypedArray(),
            )
        }
    }
}
