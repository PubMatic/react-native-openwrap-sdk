package com.pubmatic.sampleapp.banner

import com.google.android.gms.ads.AdSize
import com.pubmatic.sampleapp.util.POBRNSDKConstant
import org.json.JSONException
import org.json.JSONObject

/**
 * Model class, maintains OpenWrap SDK ad unit details
 * @param publisherId publisher id for OpenWrap SDK
 * @param profileId profile id for OpenWrap SDK
 * @param owAdUnitId ad unit id for OpenWrap SDK
 * @param gamAdUnitId ad unit id for GAM
 * @param adSizes ad Sizes for GAM
 */
class POBAdUnitDetails private constructor(
    val publisherId: String,
    val profileId: Int,
    val owAdUnitId: String,
    val gamAdUnitId: String,
    val adSizes: Array<AdSize>
) {

    /**
     * Companion object facilitates the static implementation for the class.
     */
    companion object {

        /**
         * Parses and builds {@link POBAdUnitDetails} from ad unit json string in below format
         * {"publisherId": "pub_id", "profileId": 1234, "owAdUnitId": "test_ad_unit", "gamAdUnitId":"test_gam_ad_unit", "adSizes": [{"width": 320, "height": 50}]}
         * @param adUnitDetailsJson the json string that contains ad unit details
         * @return POBAdUnitDetails newly created instance of {@link POBAdUnitDetails}
         * @throws JSONException if invalid keys provided in the json
         */
        @Throws(JSONException::class)
        fun build(adUnitDetailsJson: String): POBAdUnitDetails {
            val json = JSONObject(adUnitDetailsJson)
            val adSizeArray = json.getJSONArray(POBRNSDKConstant.AD_SIZES)
            val adSizes: MutableList<AdSize> = ArrayList()
            for (i in 0 until adSizeArray.length()) {
                val adSizeJSON: JSONObject = adSizeArray.getJSONObject(i)
                adSizes.add(
                    AdSize(
                        adSizeJSON.getInt(POBRNSDKConstant.WIDTH),
                        adSizeJSON.getInt(POBRNSDKConstant.HEIGHT)
                    )
                )
            }

            return POBAdUnitDetails(
                json.getString(POBRNSDKConstant.PUBLISHER_ID),
                json.getInt(POBRNSDKConstant.PROFILE_ID),
                json.getString(POBRNSDKConstant.OW_AD_UNIT_ID),
                json.getString(POBRNSDKConstant.GAM_AD_UNIT_ID),
                adSizes.toTypedArray(),
            )
        }
    }
}
