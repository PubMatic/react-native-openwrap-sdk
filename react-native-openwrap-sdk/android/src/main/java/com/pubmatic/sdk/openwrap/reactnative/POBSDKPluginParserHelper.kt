package com.pubmatic.sdk.openwrap.reactnative

import com.pubmatic.sdk.common.OpenWrapSDK
import com.pubmatic.sdk.common.models.POBApplicationInfo
import com.pubmatic.sdk.common.models.POBLocation
import com.pubmatic.sdk.common.models.POBUserInfo
import org.json.JSONException
import org.json.JSONObject
import java.net.MalformedURLException
import java.net.URL

/**
 * Helper Object to parse to String into OpenWrap SDK specific objects.
 */
internal object POBSDKPluginParserHelper {

    /**
     * Parse Json string and returns {@link POBApplicationInfo}
     * @param json json string of application, expect below format
     * {
    "domain": "example.com",
    "storeUrl": "https://example.com/app",
    "isPaid": true,
    "keywords": "android, app"
    }
     * @return POBApplicationInfo the instance of POBApplicationInfo
     * @throws JSONException if invalid json provided
     */
    @Throws(JSONException::class)
    fun parseJsonToApplicationInfo(json: String): POBApplicationInfo {
        val appJson = JSONObject(json)
        val appInfo = POBApplicationInfo()
        appInfo.domain = appJson.optStringFromJSON(POBSDKPluginConstant.APP_INFO_DOMAIN_KEY, null)
        try {
            val storeUrl = appJson.optStringFromJSON(POBSDKPluginConstant.APP_INFO_STORE_URL_KEY, null)
            storeUrl?.let { url ->
                var parsedStoreUrl = url
                // Remove trailing "/" from the url.
                while (parsedStoreUrl.endsWith("/")) {
                    parsedStoreUrl = parsedStoreUrl.removeSuffix("/")
                }
                appInfo.storeURL = URL(parsedStoreUrl)
            }
        }catch (exception: MalformedURLException){
            // No action required.
        }

        appJson.optBooleanFromJSON(POBSDKPluginConstant.APP_INFO_IS_PAID_KEY, null)?.let { appInfo.setPaid(it) }
        appInfo.keywords = appJson.optStringFromJSON(POBSDKPluginConstant.KEYWORDS_KEY, null)
        appInfo.categories = appJson.optStringFromJSON(POBSDKPluginConstant.APP_INFO_CATEGORIES_KEY, null)

        return appInfo
    }

    /**
     * Parse string into OpenWrapSDK.LogLevel
     * @param logLevel the loglevel string
     * @return OpenWrapSDK.LogLevel if valid value provided, else null
     */
    fun parseLogLevel(logLevel: Int): OpenWrapSDK.LogLevel?{
        return when(logLevel){
            OpenWrapSDK.LogLevel.All.level -> { OpenWrapSDK.LogLevel.All }
            OpenWrapSDK.LogLevel.Verbose.level -> { OpenWrapSDK.LogLevel.Verbose }
            OpenWrapSDK.LogLevel.Debug.level -> { OpenWrapSDK.LogLevel.Debug }
            OpenWrapSDK.LogLevel.Info.level -> { OpenWrapSDK.LogLevel.Info}
            OpenWrapSDK.LogLevel.Warn.level -> { OpenWrapSDK.LogLevel.Warn}
            OpenWrapSDK.LogLevel.Error.level -> { OpenWrapSDK.LogLevel.Error}
            OpenWrapSDK.LogLevel.Off.level -> { OpenWrapSDK.LogLevel.Off}
            else -> { null }
        }
    }

    /**
     * Parse json string into POBLocation
     * @param json string of below format, expect below json format
     * {
    "latitude": 1.2,
    "longitude": 1.5,
    "source": "USER",
    }
     * @return the POBLocation
     * @throws JSONException if invalid key and values provided
     */
    @Throws(JSONException::class)
    fun parseJsonToLocation(json: String): POBLocation{
        val locationJson = JSONObject(json)
        val latitude = locationJson.getDouble(POBSDKPluginConstant.LOCATION_LATITUDE_KEY)
        val longitude = locationJson.getDouble(POBSDKPluginConstant.LOCATION_LONGITUTE_KEY)
        val sourceStr = locationJson.getInt(POBSDKPluginConstant.LOCATOIN_SOURCE_KEY)
        val source: POBLocation.Source = when(sourceStr){
            POBLocation.Source.GPS.value -> { POBLocation.Source.GPS }
            POBLocation.Source.IP_ADDRESS.value -> { POBLocation.Source.IP_ADDRESS }
            POBLocation.Source.USER.value -> { POBLocation.Source.USER }
            else -> { POBLocation.Source.USER }
        }
        return POBLocation(source, latitude, longitude)
    }

    /**
     * Parse the json string into POBUserInfo
     * @param json the json string of below format, expect below json format
     * {
    "city": "Pune",
    "birthyear": 1990,
    "country": "India",
    "metro": "Pune",
    "region": "MH",
    "zip": "411045",
    "gender": "MALE",
    "keywords": "android, app"
    }
     * @return POBUserInfo
     * @throws JSONException if invalid json string provided
     */
    @Throws(JSONException::class)
    fun parseJsonToUserInfo(json: String): POBUserInfo{
        val locationJson = JSONObject(json)
        val userInfo = POBUserInfo()
        locationJson.optStringFromJSON(POBSDKPluginConstant.USER_INFO_CITY_KEY, null)?.let { userInfo.setCity(it) }
        userInfo.birthYear = locationJson.optInt(POBSDKPluginConstant.USER_INFO_BIRTH_YEAR_KEY)
        userInfo.keywords = locationJson.optStringFromJSON(POBSDKPluginConstant.KEYWORDS_KEY, null)
        locationJson.optStringFromJSON(POBSDKPluginConstant.USER_INFO_METRO_KEY, null)?.let { userInfo.setMetro(it) }
        locationJson.optStringFromJSON(POBSDKPluginConstant.USER_INFO_REGION_KEY, null)?.let { userInfo.setRegion(it) }
        locationJson.optStringFromJSON(POBSDKPluginConstant.LOCATOIN_ZIP_KEY, null)?.let { userInfo.setZip(it) }
        val genderInt =  locationJson.optInt(POBSDKPluginConstant.USER_INFO_GENDER_KEY, -1)
        val gender:POBUserInfo.Gender? = when(genderInt){
            POBSDKPluginConstant.GENDER_MALE -> { POBUserInfo.Gender.MALE }
            POBSDKPluginConstant.GENDER_FEMALE -> { POBUserInfo.Gender.FEMALE }
            POBSDKPluginConstant.GENDER_OTHER -> { POBUserInfo.Gender.OTHER }
            else -> { null }
        }
        gender?.let {
            userInfo.setGender(it)
        }
        return userInfo
    }


    /**
     * Extension function on {@link JSONObject}, gets string value for given name.
     * @param name the key of json
     * @param the fallback value if value is invalid or not found
     * @return the string for the given name else fallback value
     */
    private fun JSONObject.optStringFromJSON(name: String, fallback: String?): String?{
        var value: String?
        try {
            value = getString(name)
        }catch (exception: JSONException){
            value = fallback
        }
        return value
    }

    /**
     * Extension function on {@link JSONObject}, gets Boolean value for given name.
     * @param name the key of json
     * @param the fallback value if value is invalid or not found
     * @return the Boolean for the given name else fallback value
     */
    private fun JSONObject.optBooleanFromJSON(name: String, fallback: Boolean?): Boolean?{
        var value: Boolean?
        try {
            value = getBoolean(name)
        }catch (exception: JSONException){
            value = fallback
        }
        return value
    }

}