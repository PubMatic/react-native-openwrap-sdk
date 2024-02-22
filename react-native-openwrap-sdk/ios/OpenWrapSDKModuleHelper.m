#import "OpenWrapSDKModuleHelper.h"
#import "POBRNConstants.h"
#import <React/RCTLog.h>

@implementation OpenWrapSDKModuleHelper

/*!
 @abstract Converts logLevel integer value into respective POBSDKLogLevel
 */
+ (POBSDKLogLevel)pobSDKLogLevel:(NSInteger)logLevel {
    switch (logLevel) {
        case POBRN_LogLevel_ALL:
            return POBSDKLogLevelAll;
            break;
        case POBRN_LogLevel_VERBOSE:
            return POBSDKLogLevelVerbose;
            break;
        case POBRN_LogLevel_DEBUG:
            return POBSDKLogLevelDebug;
            break;
        case POBRN_LogLevel_INFO:
            return POBSDKLogLevelInfo;
            break;
        case POBRN_LogLevel_WARN:
            return POBSDKLogLevelWarning;
            break;
        case POBRN_LogLevel_ERROR:
            return POBSDKLogLevelError;
            break;
        case POBRN_LogLevel_OFF:
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
        appInfo.domain = dictionary[POBRN_APP_DOMAIN];
        NSString *parsedStoreUrl = [self removeTrailingSlashsIfNeeded:dictionary[POBRN_STORE_URL]];
        appInfo.storeURL = [NSURL URLWithString:parsedStoreUrl];
        NSNumber *isPaidValue = [dictionary objectForKey:POBRN_IS_PAID];
        if (isPaidValue != nil && [isPaidValue isKindOfClass:[NSNumber class]]) {
            BOOL isPaid = [isPaidValue boolValue];
            appInfo.paid = isPaid ? POBBOOLYes : POBBOOLNo;
        }
        appInfo.categories = dictionary[POBRN_CATEGORIES];
        appInfo.keywords = dictionary[POBRN_KEYWORDS];
    }
    return appInfo;
}

/*!
 @abstract Removes the trailing "/" from the string passed
 */
+ (NSString *)removeTrailingSlashsIfNeeded:(NSString *)inputString {
    // Iterate till the inputString has "/" as a suffix.
    while ([inputString hasSuffix:@"/"]) {
        inputString = [inputString substringToIndex:[inputString length] - 1];
    }
    return inputString;
}

/*!
 @abstract Parse json string containing user information into POBUserInfo object
 */
+ (POBUserInfo *)parseJsonToUserInfo:(NSString *)userInfo {
    NSDictionary *dictionary = [self convertJsonStringToJSON:userInfo];
    POBUserInfo * usrInfo = nil;
    if (dictionary != nil) {
        usrInfo = [POBUserInfo new];
        usrInfo.metro = dictionary[POBRN_METRO];
        usrInfo.city = dictionary[POBRN_CITY];
        usrInfo.region = dictionary[POBRN_REGION];
        usrInfo.zip = dictionary[POBRN_ZIP];
        usrInfo.keywords = dictionary[POBRN_KEYWORDS];
        NSNumber *birthYear = dictionary[POBRN_BIRTH_YEAR];
        if (birthYear) {
            usrInfo.birthYear = birthYear;
        }
        NSNumber *gender = dictionary[POBRN_GENDER];
        if (gender) {
            usrInfo.gender =  [gender integerValue];
        }
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
        double lat = [dictionary[POBRN_LATITUDE] doubleValue];
        double lon = [dictionary[POBRN_LONGITUDE] doubleValue];
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
    if (dictionary[POBRN_SOURCE] != nil) {
        src = [dictionary[POBRN_SOURCE] integerValue];
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
        RCTLogAdvice(@"JSON Serialization Failed: %@", exception.reason);
    }
    return jsonDict;
}
@end
