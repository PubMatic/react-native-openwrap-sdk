package com.pubmatic.sdk.openwrap.reactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.pubmatic.sdk.common.OpenWrapSDK
import com.pubmatic.sdk.common.log.POBLog
import com.pubmatic.sdk.openwrap.reactnative.SDKPluginConstant.KEY_SDK_VERSION
import org.json.JSONException

/**
 * Class responsible for setting properties {@link OpenWrapSDK} through ReactContextBaseJavaModule
 * bridge.
 */
class OpenWrapSDKModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  /**
   * Use constants to return OpenWrap SDK version.
   * By default all the @ReactMethods are async by nature and requires Promises or Callback implementation
   * to make any property value available.
   * The constants through getConstants() will be loaded at the time of loading OpenWrapSDKModule by JS so the SDK version
   * will be always available to use with synchronous way.
   */
  override fun getConstants(): MutableMap<String, Any>? {
    val map = HashMap<String, Any>()
    map[KEY_SDK_VERSION] = OpenWrapSDK.getVersion()
    return map
  }

  /**
   * To set LogLevel property on {@link OpenWrapSDK}
   * @param logLevel expects string in below format.
   * All,
    Verbose,
    Debug,
    Info,
    Warn,
    Error,
    Off
   *
   */
  @ReactMethod
  fun setLogLevel(logLevel: Int){
    val level = SDKPluginParserHelper.parseLogLevel(logLevel)
    level?.let {
      OpenWrapSDK.setLogLevel(it)
    }
  }

  /**
   * To set allowLocation property on {@link OpenWrapSDK}
   * @param allowLocationAccess expects Boolean value.
   */
  @ReactMethod
  fun allowLocationAccess(allowLocationAccess: Boolean){
    OpenWrapSDK.allowLocationAccess(allowLocationAccess)
  }

  /**
   * To set ccpa property on {@link OpenWrapSDK}
   * @param ccpaString expects ccpa string.
   *
   */
  @ReactMethod
  fun setCCPA(ccpaString: String){
    OpenWrapSDK.setCCPA(ccpaString)
  }

  /**
   * To set coppa property on {@link OpenWrapSDK}
   * @param coppa expects Boolean value.
   */
  @ReactMethod
  fun setCoppa(coppa: Boolean){
    OpenWrapSDK.setCoppa(coppa)
  }

  /**
   * To set GDPREnabled property on {@link OpenWrapSDK}
   * @param coppa expects Boolean value.
   *
   */
  @ReactMethod
  fun setGDPREnabled(gdprEnabled: Boolean){
    OpenWrapSDK.setGDPREnabled(gdprEnabled)
  }

  /**
   * To set gdprConsent property on {@link OpenWrapSDK}
   * @param gdprConsent expects GDPR string.
   */
  @ReactMethod
  fun setGDPRConsent(gdprConsent: String){
    OpenWrapSDK.setGDPRConsent(gdprConsent)
  }

  /**
   * To set sslEnabled property on {@link OpenWrapSDK}
   * @param sslEnabled expects string in below format.
   */
  @ReactMethod
  fun setSSLEnabled(sslEnabled: Boolean){
    OpenWrapSDK.setSSLEnabled(sslEnabled)
  }

  /**
   * To set useInternalBrowser property on {@link OpenWrapSDK}
   * @param location expects Boolean value.
   *
   */
  @ReactMethod
  fun setUseInternalBrowser(useInternalBrowser: Boolean){
    OpenWrapSDK.setUseInternalBrowser(useInternalBrowser)
  }

  /**
   * To set allowAdvertisingId property on {@link OpenWrapSDK}
   * @param allowAdvertisingId expects Boolean value.
   */
  @ReactMethod
  fun allowAdvertisingId(allowAdvertisingId: Boolean){
    OpenWrapSDK.allowAdvertisingId(allowAdvertisingId)
  }


  /**
   * To set application info on {@link OpenWrapSDK}
   * @param location expects string in below format.
   *{
    "domain": "example.com",
    "storeUrl": "https://example.com/app",
    "isPaid": true,
    "keywords": "android, app"
    }
   */
  @ReactMethod
  fun setApplicationInfo(applicationInfo: String){
    try {
      OpenWrapSDK.setApplicationInfo(SDKPluginParserHelper.parseJsonToApplicationInfo(applicationInfo))
    }catch (exception: JSONException){
      POBLog.warn(NAME, SDKPluginConstant.APP_INFO_WARN_MSG + "${exception.message}")
    }
  }

  /**
   * To set location property on {@link OpenWrapSDK}
   * @param location expects string in below format.
   * {
  "latitude": 1.2,
  "longitude": 1.5,
  "source": "USER",
  }
   */
  @ReactMethod
  fun setLocation(location: String){
    try {
      OpenWrapSDK.setLocation(SDKPluginParserHelper.parseJsonToLocation(location))
    }catch (exception: JSONException){
      POBLog.warn(NAME, SDKPluginConstant.LOCATION_WARN_MSG + "${exception.message}")
    }

  }

  /**
   * To set user info property on {@link OpenWrapSDK}
   * @param userInfo expects string in below format.
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
   */
  @ReactMethod
  fun setUserInfo(userInfo: String){
    try {
      OpenWrapSDK.setUserInfo(SDKPluginParserHelper.parseJsonToUserInfo(userInfo))
    }catch (exception: JSONException){
      POBLog.warn(NAME, SDKPluginConstant.USERINFO_WARN_MSG + "${exception.message}")
    }
  }

  /**
   * Companion to declare constants
   */
  companion object{
    const val NAME = "OpenWrapSDKModule"
  }
}
