#import "POBRNAdHelper.h"
#import "POBRNConstants.h"
#import <React/RCTLog.h>

NS_ASSUME_NONNULL_BEGIN

@implementation POBRNAdHelper

+ (UIViewController *)topViewController {
  return [UIApplication sharedApplication].keyWindow.rootViewController;
}

#pragma mark - Configure request, impression

+ (void)setUpRequest:(POBRequest *)request
      withParameters:(NSString *)jsonString
    andNestedParsing:(BOOL)nestedParsing {
    // Early return if no request parameter data is passed.
    if (jsonString.length == 0) {
        RCTLogInfo(@"Ad request parameter data is not set.");
        return;
    }

    // Convert the JSON string to an NSDictionary.
    NSError *parsingError = nil;
    NSDictionary *dictionary = [self convertJsonStringToJSON:jsonString error:&parsingError];

    if (parsingError != nil || dictionary == nil) {
        RCTLogAdvice(@"Ad request parameters parsing failed, error: %@", parsingError.localizedDescription);
        return;
    }

    if (nestedParsing) {
        dictionary = dictionary[POBRN_REQUEST];
    }

    NSNumber *bidSummaryEnabled = dictionary[POBRN_IS_BID_SUMMARY_ENABLED];
    NSNumber *debugEnabled = dictionary[POBRN_IS_DEBUG_ENABLED];
    NSNumber *testModeEnabled = dictionary[POBRN_IS_TEST_MODE_ENABLED];
    NSNumber *networkTimeout = dictionary[POBRN_NETWORK_TIMEOUT];
    NSNumber *profileVersionId = dictionary[POBRN_PROFILE_VERSION_ID];
    NSString *adServerURL = dictionary[POBRN_AD_SERVER_URL];

    request.versionId = profileVersionId;
    request.adServerURL = adServerURL;

    if (bidSummaryEnabled != nil) {
        request.bidSummaryEnabled = [bidSummaryEnabled boolValue];
    }

    if (debugEnabled != nil) {
        request.debug = [debugEnabled boolValue];
    }

    if (testModeEnabled != nil) {
        request.testModeEnabled = [testModeEnabled boolValue];
    }

    if (networkTimeout != nil) {
        request.networkTimeout = [networkTimeout doubleValue];
    }
}

+ (void)setUpImpression:(POBImpression *)impression
         withParameters:(NSString *)jsonString
       andNestedParsing:(BOOL)nestedParsing {
    // Early return if no impression parameter data is passed.
    if (jsonString.length == 0) {
        RCTLogInfo(@"Ad impression parameter data is not set.");
        return;
    }

    // Convert the JSON string to an NSDictionary.
    NSError *parsingError = nil;
    NSDictionary *dictionary = [self convertJsonStringToJSON:jsonString
                                                       error:&parsingError];

    if (parsingError != nil || dictionary == nil) {
        RCTLogInfo(@"Ad impression parameters parsing failed, error: %@",
                   parsingError.localizedDescription);
        return;
    }

    if (nestedParsing) {
        dictionary = dictionary[POBRN_IMPRESSION];
    }

    NSNumber *adPosition = dictionary[POBRN_AD_POSITION];
    if (adPosition != nil) {
        impression.adPosition = [adPosition integerValue];
    }

    NSString *testCreativeId = dictionary[POBRN_TEST_CREATIVE_ID];
    impression.testCreativeId = testCreativeId;

    // Convert custom parameter string into dictionary.
    NSString *customParamsJSON = dictionary[POBRN_CUSTOM_PARAMS];
    if (customParamsJSON.length > 0) {
        NSDictionary *customParamsDict = [self convertJsonStringToJSON:customParamsJSON
                                                                 error:&parsingError];
        if (parsingError != nil || customParamsDict.count == 0) {
            RCTLogInfo(@"Ad impression custom parameters parsing failed, error: %@",
                       parsingError.localizedDescription);
            return;
        }
        impression.customParams = customParamsDict;
    }
}

#pragma mark - Objects to NSDictionary conversion methods

/// Helper method to get the bid details dictionary from POBBid object.
+ (NSDictionary *)bidDictionaryFromBid:(POBBid *)bid {
    NSMutableDictionary *bidDetails = [[NSMutableDictionary alloc] init];
    // Set bid price if available
    [self setObjectSafely:bid.price
                   forKey:POBRN_BID_PRICE
           intoDictionary:bidDetails];
    
    // Set bid targeting as a dictionary if available
    [self setObjectSafely:bid.targetingInfo
                   forKey:POBRN_BID_TARGETING
           intoDictionary:bidDetails];
    
    // Set bid creative type if available
    [self setObjectSafely:bid.creativeType
                   forKey:POBRN_BID_CRTYPE
           intoDictionary:bidDetails];
    
    // Set bid partner type if available
    [self setObjectSafely:bid.partner
                   forKey:POBRN_BID_PARTNER_NAME
           intoDictionary:bidDetails];
    
    // Set ad size
    bidDetails[POBRN_AD_UNIT_WIDTH] = @(bid.size.width);
    bidDetails[POBRN_AD_UNIT_HEIGHT] = @(bid.size.height);
    
    // Set Bid Id
    [self setObjectSafely:bid.bidId forKey:POBRN_BID_ID intoDictionary:bidDetails];
    
    // Set impression Id
    [self setObjectSafely:bid.impressionId forKey:POBRN_BID_IMPRESSION_ID intoDictionary:bidDetails];
    
    // Set bundle if available
    [self setObjectSafely:bid.bundle forKey:POBRN_BID_BUNDLE intoDictionary:bidDetails];
    
    // Set gross price
    [self setObjectSafely:bid.grossPrice forKey:POBRN_BID_GROSS_PRICE intoDictionary:bidDetails];
    
    // Set bid status
    [self setObjectSafely:bid.status forKey:POBRN_BID_STATUS intoDictionary:bidDetails];
    
    // Set creative Id
    [self setObjectSafely:bid.creativeId forKey:POBRN_BID_CR_ID intoDictionary:bidDetails];
    
    // Set Nurl if available
    [self setObjectSafely:bid.nurl forKey:POBRN_BID_NURL intoDictionary:bidDetails];
    
    // Set Lurl if available
    [self setObjectSafely:bid.lurl forKey:POBRN_BID_LURL intoDictionary:bidDetails];
    
    // Set creative tag
    [self setObjectSafely:bid.creativeTag forKey:POBRN_BID_CREATIVE intoDictionary:bidDetails];
    
    // Set deal Id if available
    [self setObjectSafely:bid.dealId forKey:POBRN_BID_DEAL_ID intoDictionary:bidDetails];
    
    // Set refresh interval
    [self setObjectSafely:@(bid.refreshInterval) forKey:POBRN_BID_REFRESH_INTERVAL intoDictionary:bidDetails];
    
    // Set reward details
    [self setObjectSafely:bid.reward.amount forKey:POBRN_REWARD_AMOUNT intoDictionary:bidDetails];
    [self setObjectSafely:bid.reward.currencyType forKey:POBRN_REWARD_CURRENCY_TYPE intoDictionary:bidDetails];
    
    return [NSDictionary dictionaryWithDictionary: bidDetails];
}

/// Creates a NSDictionary from rewarded ad's reward object.
+ (NSDictionary *)rewardDictionaryFromReward:(nullable POBReward *)reward {
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    
    // Setup reward if available
    if (reward != nil) {
        // 1. Set amount
        [self setObjectSafely:reward.amount
                       forKey:POBRN_REWARD_AMOUNT
               intoDictionary:dict];
        // 2. Set currency
        [self setObjectSafely:reward.currencyType
                       forKey:POBRN_REWARD_CURRENCY_TYPE
               intoDictionary:dict];
    }
    return [NSDictionary dictionaryWithDictionary:dict];
}

/// Creates NSDictionary from NSError object.
+ (NSDictionary *)errorDictionaryFromError:(nullable NSError *)error {
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    
    // Setup error if available
    if (error != nil) {
        // 1. Set error code
        dict[POBRN_ERROR_CODE] = [NSNumber numberWithInteger: error.code];
        // 2. Set error message
        [self setObjectSafely:error.localizedDescription
                       forKey:POBRN_ERROR_MESSAGE
               intoDictionary:dict];
    }
    return [NSDictionary dictionaryWithDictionary:dict];
}

#pragma mark - Other helper methods

/// Converts the dictionary into JSON string.
+ (NSString *)convertDictionaryToJSON:(NSDictionary *)dict error:(NSError **)error {
    NSData *data = nil;
    @try {
        data = [NSJSONSerialization dataWithJSONObject:dict
                                               options:NSJSONWritingPrettyPrinted
                                                 error:error];
    } @catch (NSException *exception) {
        NSDictionary *userInfo = @{ NSLocalizedDescriptionKey: exception.reason };
        *error = [NSError errorWithDomain:POBRN_ERROR_DOMAIN
                                     code:POBErrorInternalError
                                 userInfo:userInfo];
    }
    return [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];;
}

/// Checks if the value is non-null, and safe to save in the dictionary.
+ (void)setObjectSafely:(id)anObject
                 forKey:(id<NSCopying>)aKey
         intoDictionary:(NSMutableDictionary *)dict {
    if (dict && anObject != nil &&
        !(([anObject isKindOfClass:[NSArray class]] && [anObject count] == 0) ||
          ([anObject isKindOfClass:[NSString class]] &&
           ((NSString *)anObject).length == 0) ||
          ([anObject isKindOfClass:[NSDictionary class]] &&
           ((NSDictionary *)anObject).count == 0))) {
              dict[aKey] = anObject;
    }
}

#pragma mark - Private methods

/**
 * Converts the JSON string into a dictionary.
 *
 * @param jsonString A JSON string to be serialized into a dictionary.
 * @param error An optional error object which will be set if JSON serialization fails.
 * @return A dictionary parsed from the JSON string.
 */
+ (NSDictionary *)convertJsonStringToJSON:(NSString *)jsonString error:(NSError **)error {
    NSDictionary *jsonDict = nil;
    @try {
        NSData *data = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
        jsonDict = [NSJSONSerialization JSONObjectWithData:data
                                                   options:NSJSONReadingMutableContainers
                                                     error:error];
    } @catch (NSException *exception) {
        RCTLogAdvice(@"JSON serialization failed: %@", exception.reason);
    }
    return jsonDict;
}

+ (POBBidEventErrorCode)bidEventErrorCodeForCode:(NSInteger)code {
    if (code < POBBidEventErrorOther) {
        return code;
    }
    // For all non-matching codes, pass POBBidEventErrorOther
    return POBBidEventErrorOther;
}

+ (NSString *)removeLastUnderscoreAndSubstring:(NSString *)originalString {
    NSRange lastUnderscoreRange = [originalString rangeOfString:@"_" options:NSBackwardsSearch];
    if (lastUnderscoreRange.location != NSNotFound) {
        return [originalString substringToIndex:lastUnderscoreRange.location];
    }
    return originalString;
}

@end

NS_ASSUME_NONNULL_END
