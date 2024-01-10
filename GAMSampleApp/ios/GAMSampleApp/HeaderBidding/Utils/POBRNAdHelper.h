#import <Foundation/Foundation.h>
#import <OpenWrapSDK/OpenWrapSDK.h>

NS_ASSUME_NONNULL_BEGIN

/** A common ad class with helper methods. */
@interface POBRNAdHelper : NSObject

/** Returns the top view controller.  */
+ (UIViewController *)topViewController;

/**
 * Creates a event payload JSON string with given event name and optional error object.
 *
 *  Example 1:
 *      {
 *          "eventName": "onAdReceived"
 *       }
 *
 *  Example 2:
 *      {
 *          "eventName": "onAdFailedToShow"
 *          "ext": {
 *              "errorCode": 2001,
 *              "errorMessage": "ALREADY_SHOWN(2001) : Ad is already shown."
 *          }
 *      }
 *
 * @param eventName Ad event name to be passed in event payload.
 * @param error An optional error object which can be set if available.
 * @return A JSON string with event payload data.
 */
+ (nullable NSString *)eventPayloadJSONStringWithEventName:(NSString *)eventName
                                                     error:(nullable NSError *)error;

/**
 * Creates a event payload JSON string with given event name and reward object.
 *
 *  Example :
 *      {
 *          "eventName": "onReceiveReward"
 *          "ext": {
 *              "rewardAmount": 5,
 *              "rewardCurrencyType": "Lives"
 *          }
 *      }
 *
 * @param eventName Ad event name to be passed in event payload.
 * @param reward POBReward instance to reward .
 * @return A JSON string with event payload data.
 */
+ (nullable NSString *)eventPayloadJSONStringWithEventName:(NSString *)eventName
                                                    reward:(POBReward *)reward;

@end

NS_ASSUME_NONNULL_END
