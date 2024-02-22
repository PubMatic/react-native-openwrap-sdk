#import <Foundation/Foundation.h>
#import <OpenWrapSDK/OpenWrapSDK.h>

NS_ASSUME_NONNULL_BEGIN

/** A common ad class with helper methods. */
@interface POBRNAdHelper : NSObject

/** Returns the top view controller.  */
+ (UIViewController *)topViewController;

/**
 * Parses and set up ad request parameters on the ad request @c POBRequest instance.
 *
 * @param jsonString A JSON string with the ad request parameters.
 * @param nestedParsing A boolean indicate if request parameter should be parsed from the
 * nested `request` dictionary in the passed JSON. Pass value @c YES for the banner ads.
 */
+ (void)setUpRequest:(POBRequest *)request
      withParameters:(NSString *)jsonString
    andNestedParsing:(BOOL)nestedParsing;

/**
 * Parses and set up ad impression parameters on the ad impression @c POBImpression instance.
 *
 * @param jsonString A JSON string with the ad impression parameters.
 * @param nestedParsing A boolean indicate if impression parameters should be parsed from the
 * nested `impression` dictionary in the passed JSON. Pass value @c YES for the banner ads.
 */
+ (void)setUpImpression:(POBImpression *)impression
         withParameters:(NSString *)jsonString
       andNestedParsing:(BOOL)nestedParsing;

/**
 * Helper method to get the bid details dictionary from @c POBBid object.
 *
 * @param bid Instance of @c POBBid, received from OpenWrap.
 * @return Bid details dictionary with few required parameters.
 */
+ (NSDictionary *)bidDictionaryFromBid:(POBBid *)bid;

/**
 * Creates a NSDictionary from rewarded ad's @c POBReward object.
 *
 *  Example:
 *      {
 *          "rewardAmount": 5,
 *          "rewardCurrencyType": "lives"
 *      }
 *
 * @param reward Ad reward object instance.
 * @return NSDictionary with rewards details.
 */
+ (NSDictionary *)rewardDictionaryFromReward:(nullable POBReward *)reward;

/**
 * Creates NSDictionary from @c NSError object.
 *
 *  Example 1:
 *      {
 *          "errorCode": 2001
 *          "errorMessage": "ALREADY_SHOWN(2001) : Ad is already shown."
 *      }
 *
 * @param error An optional error object which can be set if available.
 * @return NSDictionary with error details.
 */
+ (NSDictionary *)errorDictionaryFromError:(nullable NSError *)error;

/**
 * Converts the dictionary into JSON string.
 *
 * @param dict A JSON dictionary to be serialized into a string.
 * @param error An optional error object which will be set if JSON serialization fails.
 * @return A dictionary parsed from the JSON string.
 */
+ (NSString *)convertDictionaryToJSON:(NSDictionary *)dict error:(NSError **)error;

/**
 * Converts the JSON string into a dictionary.
 *
 * @param jsonString A JSON string to be serialized into a dicitonary.
 * @param error An optional error object which will be set if JSON serialization fails.
 * @return A dictionary parsed from the JSON string.
 */
+ (NSDictionary *)convertJsonStringToJSON:(NSString *)jsonString error:(NSError **)error;

/**
 * Checks if the value is non-null, and safe to save in the dictionary.
 *
 * @param anObject Object to be saved into the dictionary
 * @param aKey Key against which it needs to be saved.
 * @param dict NSMutable dictionary instance in which it is expected to be saved
 */
+ (void)setObjectSafely:(id)anObject forKey:(id<NSCopying>)aKey intoDictionary:(NSMutableDictionary *)dict;

/**
 * Converts integer error code into matching bid event error code.
 *
 * @param code Error code
 * @return Matching POBBidEventErrorCode
 */
+ (POBBidEventErrorCode)bidEventErrorCodeForCode:(NSInteger)code;

/**
 * Removes the last underscore and everything after it from the given string.
 *
 * Example:
 *  - Input: "something_goes_wrong_1000"
 *  - Output: "something_goes_wrong"
 *
 * @param originalString The original string from which to remove the last underscore and substring.
 * @return A new string with the last underscore and everything after it removed.
 */
+ (NSString *)removeLastUnderscoreAndSubstring:(NSString *)originalString;

@end

NS_ASSUME_NONNULL_END
