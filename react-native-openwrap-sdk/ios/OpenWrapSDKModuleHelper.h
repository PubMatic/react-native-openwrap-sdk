#import <Foundation/Foundation.h>
#import <OpenWrapSDK/OpenWrapSDK.h>

/*!
 Helper class which can be used to store helper methods
 */
@interface OpenWrapSDKModuleHelper : NSObject
/*!
 @abstract Returns POBSDKLogLevel  from given int value.
 @param logLevel Int
 @return POBSDKLogLevel
 */
+ (POBSDKLogLevel)pobSDKLogLevel:(NSInteger)logLevel;

/*!
 @abstract Creates and Returns POBApplicationInfo instance from given json string.
 @param appInfo json string
 Example = {
    "domain": "example.com",
    "storeUrl": "https://example.com/app",
    "isPaid": true,
    "keywords": "ios, app"
    }
 @return Instance of POBApplicationInfo
 */
+ (POBApplicationInfo *)parseJsonToApplicationInfo:(NSString *)appInfo;

/*!
 @abstract Creates and Returns POBUserInfo instance from given json string.
 @param userInfo json string
 Example  =  {
      "city": "Pune",
      "birthyear": 1990,
      "country": "India",
      "metro": "Pune",
      "region": "MH",
      "zip": "411045",
      "gender": "1",
      "keywords": "ios, app"
      }
 @return Instance of POBUserInfo.
 */
+ (POBUserInfo *)parseJsonToUserInfo:(NSString *)userInfo;

/*!
 @abstract Creates and Returns CLLocation instance  from given json string.
 @param location json string
 @return Instance of CLLocation.
 */
+ (CLLocation *)parseJsonToLocation:(NSString *)location;

/*!
 @abstract Creates and Returns POBLocSource instance  from given json string.
 @param source json string
 @return Instance of POBLocSource.
 */
+ (POBLocSource)parseSourceFromJsonString:(NSString *)source;
@end
