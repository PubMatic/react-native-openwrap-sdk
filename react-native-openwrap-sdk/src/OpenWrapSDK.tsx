import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-openwrap-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const OpenWrapSDKModule = NativeModules.OpenWrapSDKModule
  ? NativeModules.OpenWrapSDKModule
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );

import { POBUserInfo } from './models/POBUserInfo';
import { POBApplicationInfo } from './models/POBApplicationInfo';
import { POBLocation } from './models/POBLocation';
const { ow_sdk_version } = OpenWrapSDKModule.getConstants();
/**
 * Provides global configurations for the OpenWrap SDK, e.g. enabling logging, location access,
 * etc. These configurations are globally applicable for OpenWrap SDK; you don't have to set
 * these for every ad request.
 */
export class OpenWrapSDK {
  /**
   * Returns the OpenWrap SDK's version.
   *
   * @return sdk version
   */
  public static getVersion(): string {
    return ow_sdk_version;
  }

  /**
   * Sets log level across all ad formats. Default log level is LogLevel.Warn.
   * For more details refer {@link OpenWrapSDK.LogLevel}
   *
   * @param logLevel log level to set.
   */
  public static setLogLevel(logLevel: OpenWrapSDK.LogLevel) {
    OpenWrapSDKModule.setLogLevel(logLevel);
  }

  /**
   * Used to enable/disable location access.
   * This value decides whether the OpenWrap SDK should access device location using
   * Core Location APIs to serve location-based ads. When set to false, the SDK will not attempt
   * to access device location. When set to true, the SDK will periodically try to fetch location
   * efficiently.
   * Note that, this only occurs if location services are enabled and the user has already
   * authorized the use of location services for the application. The OpenWrap SDK never asks
   * permission to use location services by itself.
   * <p>
   * The default value is true.
   *
   * @param allowLocationAccess enable or disable location access behavior
   */
  public static allowLocationAccess(allowLocationAccess: boolean) {
    OpenWrapSDKModule.allowLocationAccess(allowLocationAccess);
  }

  /**
   * Indicates whether the visitor is COPPA-specific or not.
   * For COPPA (Children's Online Privacy Protection Act) compliance, if the visitor's age is
   * below 13, then such visitors should not be served targeted ads.
   * Possible options are:
   * false - Indicates that the visitor is not COPPA-specific and can be served targeted ads.
   * true - Indicates that the visitor is COPPA-specific and should be served only COPPA-compliant ads.
   *
   * @param coppa Visitor state for COPPA compliance.
   */
  public static setCoppa(coppa: boolean) {
    OpenWrapSDKModule.setCoppa(coppa);
  }

  /**
   * Enable/disable secure ad calls.
   * <p>
   * By default, OpenWrap SDK initiates secure ad calls from an application to the ad server and
   * delivers only secure ads. You can allow non secure ads by passing false to this method.
   *
   * @param sslEnabled false for disable secure creative mode. Default is set to true.
   */
  public static setSSLEnabled(sslEnabled: boolean) {
    OpenWrapSDKModule.setSSLEnabled(sslEnabled);
  }

  /**
   * Tells OpenWrap SDK to use the internal SDK browser, instead of the default device browser, for opening landing pages when the user clicks on an ad.
   * By default, the use of an internal browser is disabled.
   *  <p>
   *  From version 2.7.0, the default behaviour changed to using device's default browser
   *
   * @param useInternalBrowser boolean value that enables/disables the use of internal browser.
   */
  public static setUseInternalBrowser(useInternalBrowser: boolean) {
    OpenWrapSDKModule.setUseInternalBrowser(useInternalBrowser);
  }

  /**
   * Indicates whether Android advertisement ID should be sent in the request or not.
   * By default advertisement ID will be used.
   * <p>
   * Possible values are:
   * true : Advertisement id will be sent in the request.
   * false : Advertisement id will not be sent in the request.
   *
   * @param allowAdvertisingId state of advertisement id usage
   */
  public static allowAdvertisingId(allowAdvertisingId: boolean) {
    OpenWrapSDKModule.allowAdvertisingId(allowAdvertisingId);
  }

  /**
   * Sets Application information, which contains various attributes about app, such as
   * application category, store URL, domain, etc for more relevant ads.
   *
   * @param applicationInfo Instance of POBApplicationInfo class with required application details
   */
  public static setApplicationInfo(applicationInfo: POBApplicationInfo) {
    var applicationInfoJson: string = JSON.stringify(applicationInfo);
    OpenWrapSDKModule.setApplicationInfo(applicationInfoJson);
  }

  /**
   * Sets user's location and its source. It is useful in delivering geographically relevant ads.
   * <p>
   * If your application is already accessing the device location, it is highly recommended to
   * set the location coordinates inferred from the device GPS. If you are inferring location
   * from any other source, make sure you set the appropriate location source.
   *
   * @param location User's current location
   */
  public static setLocation(location: POBLocation) {
    var locationJson: string = JSON.stringify(location);
    OpenWrapSDKModule.setLocation(locationJson);
  }

  /**
   * Set's AV audio session access
   * @param allow allow audio session access
   */
  public static allowAVAudioSessionAccess(allow: boolean) {
    if (Platform.OS === 'ios') {
      OpenWrapSDKModule.allowAVAudioSessionAccess(allow);
    }
  }

  /**
   * Sets user information, such as birth year, gender, region, etc for more relevant ads.
   *
   * @param userInfo Instance of POBUserInfo class with required user details
   */
  public static setUserInfo(userInfo: POBUserInfo) {
    var userInfoJson: string = JSON.stringify(userInfo);
    OpenWrapSDKModule.setUserInfo(userInfoJson);
  }
}

export namespace OpenWrapSDK {
  /**
   * Log levels to filter logs
   */
  export enum LogLevel {
    /**
     * All level of logs
     */
    All = 0,
    /**
     * Error, warning, info, debug and verbose logs
     */
    Verbose = 1,
    /**
     * Error, warning, info and debug logs
     */
    Debug = 2,
    /**
     * Error, warning and info logs
     */
    Info = 3,
    /**
     * Error and warning logs
     */
    Warn = 4,
    /**
     * Error logs only
     */
    Error = 5,
    /**
     * No logs
     */
    Off = 6,
  }
}
