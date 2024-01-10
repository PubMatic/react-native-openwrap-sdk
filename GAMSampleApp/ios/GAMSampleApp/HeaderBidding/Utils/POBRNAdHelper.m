#import "POBRNAdHelper.h"
#import "POBRNConstants.h"
#import <React/RCTLog.h>

NS_ASSUME_NONNULL_BEGIN

@implementation POBRNAdHelper

+ (UIViewController *)topViewController {
  return [UIApplication sharedApplication].keyWindow.rootViewController;
}

+ (nullable NSString *)eventPayloadJSONStringWithEventName:(NSString *)eventName
                                                     error:(nullable NSError *)error {
    return [self eventPayloadJSONStringWithEventName:eventName reward:nil error:error];
}

+ (nullable NSString *)eventPayloadJSONStringWithEventName:(NSString *)eventName
                                                    reward:(POBReward *)reward {
    return [self eventPayloadJSONStringWithEventName:eventName reward:reward error:nil];
}

#pragma mark - Private methods

+ (nullable NSString *)eventPayloadJSONStringWithEventName:(NSString *)eventName
                                                    reward:(nullable POBReward *)reward
                                                     error:(nullable NSError *)error {
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    dict[POBRN_EVENT_NAME_KEY] = eventName;

    NSMutableDictionary *extraParamDict = [NSMutableDictionary dictionary];

    // Set ad reward details.
    if (reward != nil) {
        extraParamDict[POBRN_REWARD_AMOUNT] = reward.amount;
        extraParamDict[POBRN_REWARD_CURRENCY_TYPE] = reward.currencyType;
    }

    // Set error details.
    if (error != nil) {
        extraParamDict[POBRN_ERROR_CODE] = [NSNumber numberWithInteger: error.code];
        extraParamDict[POBRN_ERROR_MESSAGE] = error.localizedDescription;
    }

    dict[POBRN_EVENT_PAYLOAD_EXTRA_KEY] = extraParamDict;

    // Convert dictionary data into JSON data.
    NSError *serializationError;
    NSData *data = [NSJSONSerialization dataWithJSONObject:dict
                                                   options:NSJSONWritingPrettyPrinted
                                                     error:&serializationError];
    // Return nil if json serializaion is failed.
    if (serializationError) {
        return nil;
    }
    return [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
}

@end

NS_ASSUME_NONNULL_END
