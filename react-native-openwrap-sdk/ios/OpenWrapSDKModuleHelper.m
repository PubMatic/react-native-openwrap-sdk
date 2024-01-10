#import "OpenWrapSDKModuleHelper.h"
#import "POBConstants.h"

@implementation OpenWrapSDKModuleHelper

/*!
 @abstract Converts logLevel integer value into respective POBSDKLogLevel
 */
+ (POBSDKLogLevel)pobSDKLogLevel:(NSInteger)logLevel {
    switch (logLevel) {
        case POB_LogLevel_ALL:
            return POBSDKLogLevelAll;
            break;
        case POB_LogLevel_VERBOSE:
            return POBSDKLogLevelVerbose;
            break;
        case POB_LogLevel_DEBUG:
            return POBSDKLogLevelDebug;
            break;
        case POB_LogLevel_INFO:
            return POBSDKLogLevelInfo;
            break;
        case POB_LogLevel_WARN:
            return POBSDKLogLevelWarning;
            break;
        case POB_LogLevel_ERROR:
            return POBSDKLogLevelError;
            break;
        case POB_LogLevel_OFF:
            return POBSDKLogLevelOff;
            break;
        default:
            return POBSDKLogLevelAll;
    }
    return POBSDKLogLevelAll;
}

/*!
 @abstract Parse json string containing application information into POBApplicationInfo object
 */
+ (POBApplicationInfo *)parseJsonToApplicationInfo:(NSString *)applicationInfo {
    NSDictionary *dictionary = [self convertJsonStringToJSON:applicationInfo];
    POBApplicationInfo * appInfo = nil;
    if (dictionary != nil) {
        appInfo = [POBApplicationInfo new];
        appInfo.domain = dictionary[POB_APP_DOMAIN];
        appInfo.storeURL = [NSURL URLWithString:dictionary[POB_STORE_URL]];
        NSInteger isPaid = (NSInteger)dictionary[POB_IS_PAID];
        appInfo.paid = [self pobBool:isPaid];
        appInfo.categories = dictionary[POB_CATEGORIES];
        appInfo.keywords = dictionary[POB_KEYWORDS];
    }
    return appInfo;
}

+ (POBBOOL)pobBool:(NSInteger)isPaid {
    if (isPaid == 0) {
        return POBBOOLNo;
    }
    return POBBOOLYes;
}

/*!
 @abstract Parse json string containing user information into POBUserInfo object
 */
+ (POBUserInfo *)parseJsonToUserInfo:(NSString *)userInfo {
    NSDictionary *dictionary = [self convertJsonStringToJSON:userInfo];
    POBUserInfo * usrInfo = nil;
    if (dictionary != nil) {
        usrInfo = [POBUserInfo new];
        usrInfo.metro = dictionary[POB_METRO];
        usrInfo.city = dictionary[POB_CITY];
        usrInfo.region = dictionary[POB_REGION];
        usrInfo.country = dictionary[POB_COUNTRY];
        usrInfo.zip = dictionary[POB_ZIP];
        usrInfo.keywords = dictionary[POB_KEYWORDS];
        NSInteger birth = [dictionary[POB_BIRTH_YEAR] integerValue];
        usrInfo.birthYear = [NSNumber numberWithInteger:birth];
        usrInfo.gender = [dictionary[POB_GENDER] integerValue];
    }
    return usrInfo;
}

/*!
 @abstract Parse json string containing location information into CLLocation object
 */
+ (CLLocation *)parseJsonToLocation:(NSString *)location {
    NSDictionary *dictionary = [self convertJsonStringToJSON:location];
    CLLocation *loc;
    if (dictionary != nil) {
        double lat = [dictionary[POB_LATITUDE] doubleValue];
        double lon = [dictionary[POB_LONGITUDE] doubleValue];
        loc = [[CLLocation alloc] initWithLatitude:lat longitude:lon];
    }
    return loc;
}

/*!
 @abstract Parse json string containing source information into POBLocSource
 */
+ (POBLocSource)parseSourceFromJsonString:(NSString *)source {
    NSDictionary *dictionary = [self convertJsonStringToJSON:source];
    POBLocSource src = POBLocSourceGPS;
    if (dictionary[POB_SOURCE] != nil) {
        src = [dictionary[POB_SOURCE] integerValue];
    }
    return src;
}

/*!
 @abstract Method to convert json string to Dictionary
 */
+ (NSDictionary *)convertJsonStringToJSON:(NSString *)jsonString {
    NSDictionary *jsonDict = nil;
    NSError *error = nil;
    @try {
        jsonDict = [NSJSONSerialization JSONObjectWithData:[jsonString dataUsingEncoding:NSUTF8StringEncoding] options:0 error:&error];
    } @catch (NSException *exception) {
      NSLog(@"JSON Serialization Failed: %@", exception.reason);
    }
    return jsonDict;
}
@end
