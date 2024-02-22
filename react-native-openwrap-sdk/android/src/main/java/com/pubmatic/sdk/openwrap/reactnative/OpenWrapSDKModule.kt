package com.pubmatic.sdk.openwrap.reactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.pubmatic.sdk.common.OpenWrapSDK
import com.pubmatic.sdk.common.log.POBLog
import com.pubmatic.sdk.openwrap.reactnative.POBSDKPluginConstant.KEY_SDK_VERSION
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
    val level = POBSDKPluginParserHelper.parseLogLevel(logLevel)
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
   * To set coppa property on {@link OpenWrapSDK}
   * @param coppa expects Boolean value.
   */
  @ReactMethod
  fun setCoppa(coppa: Boolean){
    OpenWrapSDK.setCoppa(coppa)
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
      OpenWrapSDK.setApplicationInfo(POBSDKPluginParserHelper.parseJsonToApplicationInfo(applicationInfo))
    }catch (exception: JSONException){
      POBLog.warn(NAME, POBSDKPluginConstant.APP_INFO_WARN_MSG + "${exception.message}")
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
      OpenWrapSDK.setLocation(POBSDKPluginParserHelper.parseJsonToLocation(location))
    }catch (exception: JSONException){
      POBLog.warn(NAME, POBSDKPluginConstant.LOCATION_WARN_MSG + "${exception.message}")
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
      OpenWrapSDK.setUserInfo(POBSDKPluginParserHelper.parseJsonToUserInfo(userInfo))
    }catch (exception: JSONException){
      POBLog.warn(NAME, POBSDKPluginConstant.USERINFO_WARN_MSG + "${exception.message}")
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

  /**
   * Companion to declare constants
   */
  companion object{
    const val NAME = "OpenWrapSDKModule"
  }
}
