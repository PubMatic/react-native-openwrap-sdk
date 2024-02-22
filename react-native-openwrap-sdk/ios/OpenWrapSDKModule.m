#import "OpenWrapSDKModule.h"
#import <OpenWrapSDK/OpenWrapSDK.h>
#import "OpenWrapSDKModuleHelper.h"
#import "POBRNConstants.h"

@implementation OpenWrapSDKModule

// To export a module named OpenWrapSDKModule
RCT_EXPORT_MODULE()

/*!
 @abstract Sets log level across all ad formats.
 @param logLevel log level to set.
 */
RCT_EXPORT_METHOD(setLogLevel:(NSInteger)logLevel) {
    POBSDKLogLevel log_level = [OpenWrapSDKModuleHelper pobSDKLogLevel:logLevel];
    [OpenWrapSDK setLogLevel:log_level];
}

/*!
 @abstract Used to enable/disable location access.
 @param allow YES/NO value
 */
RCT_EXPORT_METHOD(allowLocationAccess:(BOOL)allow) {
    [OpenWrapSDK allowLocationAccess:allow];
}

/*!
 @abstract Tells OpenWrap SDK to use the internal SDK browser, instead of the default device browser, for opening landing pages when the user clicks on an ad.
 By default, the use of an internal browser is disabled.
 @param use BOOL value that enables/disables the use of internal browser.
 */
RCT_EXPORT_METHOD(setUseInternalBrowser:(BOOL)use) {
    [OpenWrapSDK useInternalBrowser:use];
}

/*!
 @abstract Sets user's location and its source. It is useful in delivering geographically relevant ads.
 */
RCT_EXPORT_METHOD(setLocation:(NSString *)location) {
    CLLocation *loc = [OpenWrapSDKModuleHelper parseJsonToLocation:location];
    POBLocSource src = [OpenWrapSDKModuleHelper parseSourceFromJsonString:location];
    [OpenWrapSDK setLocation:loc source:src];
}

/*!
 @abstract Indicates whether the visitor is COPPA-specific or not. For COPPA (Children's Online Privacy Protection Act) compliance, if the visitor's age is below 13, then such visitors should not be served targeted ads.

 @param enable boolean value

 - No : Indicates that the visitor is not COPPA-specific and can be served targeted ads.
 - Yes : Indicates that the visitor is COPPA-specific and should be served only COPPA-compliant ads.
 */
RCT_EXPORT_METHOD(setCoppa:(BOOL)enable) {
    [OpenWrapSDK setCoppaEnabled:enable];
}

/*!
 @abstract Enable/disable secure ad calls.
 @param enable boolean value
 */
RCT_EXPORT_METHOD(setSSLEnabled:(BOOL)enable) {
    [OpenWrapSDK setSSLEnabled:enable];
}

/*!
 @abstract Indicates whether Advertisment ID(IDFA) should be sent in the request.
 
 @param allow boolean value

 - YES : Advertising Identifier will be sent in the request.
 - NO : Advertising Identifier will be masked in the request.
 
 */
RCT_EXPORT_METHOD(allowAdvertisingId:(BOOL)allow) {
    [OpenWrapSDK allowAdvertisingId:allow];
}

/*!
 @abstract Indicates whether the OW SDK is allowed to access the shared AVAudioSession
 @param allow boolean value
 - YES(Default) : SDK may access the shared AVAudioSession
 - NO : SDK should not access the shared AVAudioSession
 */
RCT_EXPORT_METHOD(allowAVAudioSessionAccess:(BOOL)allow) {
    [OpenWrapSDK allowAVAudioSessionAccess:allow];
}

/*!
 @abstract Sets Application information, which contains various attributes about app, such as application category, store URL, domain, etc, for more relevant ads.
 @param appInfo string having application information
 */
RCT_EXPORT_METHOD(setApplicationInfo:(NSString *)appInfo) {
    POBApplicationInfo *applicationInfo = [OpenWrapSDKModuleHelper parseJsonToApplicationInfo:appInfo];
    if (applicationInfo != nil) {
        [OpenWrapSDK setApplicationInfo:applicationInfo];
    }
}

/*!
 @abstract Sets user information, such as birth year, gender, region, etc, for more relevant ads.
 @param userInfo string having user related information
 */
RCT_EXPORT_METHOD(setUserInfo:(NSString *)userInfo) {
    POBUserInfo *usrInfo = [OpenWrapSDKModuleHelper parseJsonToUserInfo:userInfo];
    if (usrInfo != nil) {
        [OpenWrapSDK setUserInfo:usrInfo];
    }
}

- (NSDictionary *)constantsToExport {
    NSString *sdkVersion = [OpenWrapSDK version];
    return @{ POBRN_OW_SDK_VERSION: sdkVersion };
}

+ (BOOL)requiresMainQueueSetup {
    return NO;
}

@end
