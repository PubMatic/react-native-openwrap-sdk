#import "POBAdUnitDetails.h"
#import "POBRNConstants.h"
#import <React/RCTLog.h>
#import <OpenWrapHandlerDFP/OpenWrapHandlerDFP.h>
#import <GoogleMobileAds/GoogleMobileAds.h>

NS_ASSUME_NONNULL_BEGIN

@implementation POBAdUnitDetails

+ (nullable instancetype)buildFromAdUnitDetailsJson:(NSString *)jsonString
                                              error:(NSError **)error {
    // Convert the JSON string to an NSDictionary.
    NSDictionary *dictionary = [POBAdUnitDetails convertJsonStringToDictionary:jsonString
                                                                         error:error];

    if (*error != nil || dictionary.count == 0) {
        // Parsing error occurred, return nil.
        RCTLogWarn(@"Invalid ad unit details.");
        return nil;
    }

    // Parse the ad unit details parameters.
    NSString *publisherId = dictionary[POBRN_PUBLISHER_ID];
    NSNumber *profileId = dictionary[POBRN_PROFILE_ID];
    NSString *owAdUnitId = dictionary[POBRN_AD_OW_UNIT_ID];
    NSString *gamAdUnitId = dictionary[POBRN_AD_GAM_UNIT_ID];

    // Retrieve the ad unit sizes.
    NSArray<NSDictionary *> *adUnitSizes = dictionary[POBRN_AD_UNIT_SIZES];
    NSMutableArray *bannerSizes = [NSMutableArray array];
    for (NSDictionary *size in adUnitSizes) {
        if (size.count == 2) {
            NSNumber *width = size[POBRN_AD_UNIT_WIDTH];
            NSNumber *height = size[POBRN_AD_UNIT_HEIGHT];
            GADAdSize adSize = GADAdSizeFromCGSize(CGSizeMake([width doubleValue], [height doubleValue]));
            [bannerSizes addObject:NSValueFromGADAdSize(adSize)];
        }
    }

    return [[POBAdUnitDetails alloc] initWithPublisherId:publisherId
                                               profileId:profileId
                                              owAdUnitId:owAdUnitId
                                             gamAdUnitId:gamAdUnitId
                                                 adSizes:[bannerSizes copy]];
}

#pragma mark - Private methods

/**
 * Initializes the @c POBAdUnitDetails class instance with given ad unit details.
 *
 * @param publisherId Unique identifier assigned at the time of publisher onboarding on the OpenWrap platform.
 * @param profileId Profile id of the ad tag assigned on the OpenWrap platform.
 * @param owAdUnitId An unit id used to identify unique placement on screen which is set from the OpenWrap platform.
 * @param gamAdUnitId An unit id used to identify unique placement on screen which is set from the GAM platform.
 * @param adSizes Array of sizes of the ad to be requested
 * @return An instance of @c POBAdUnitDetails class.
 */
- (instancetype)initWithPublisherId:(NSString *)publisherId
                          profileId:(NSNumber *)profileId
                         owAdUnitId:(NSString *)owAdUnitId
                        gamAdUnitId:(NSString *)gamAdUnitId
                            adSizes:(NSArray<POBAdSize *> *)adSizes {
    self = [super init];
    if (self) {
        _publisherId = publisherId;
        _profileId = profileId;
        _owAdUnitId = owAdUnitId;
        _gamAdUnitId = gamAdUnitId;
        _adSizes = adSizes;
    }
    return self;
}

/**
 * Converts the JSON string into a dictionary.
 *
 * @param jsonString A JSON string to be serialized into a dictionary.
 * @param error An optional error object which will be set if JSON serialization fails.
 * @return A dictionary parsed from the JSON string.
 */
+ (nullable NSDictionary *)convertJsonStringToDictionary:(NSString *)jsonString
                                                   error:(NSError **)error {
    NSDictionary *jsonDict = nil;
    @try {
      NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
        jsonDict = [NSJSONSerialization JSONObjectWithData:jsonData
                                                   options:NSJSONReadingMutableContainers
                                                     error:error];
    } @catch (NSException *exception) {
        NSDictionary *userInfo = @{ NSLocalizedDescriptionKey: exception.reason };
        *error = [NSError errorWithDomain:POBRN_ERROR_DOMAIN
                                     code:POBErrorInvalidRequest
                                 userInfo:userInfo];
    }
    return jsonDict;
}

@end

NS_ASSUME_NONNULL_END
