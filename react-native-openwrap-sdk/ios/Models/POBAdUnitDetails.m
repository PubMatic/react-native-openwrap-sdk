#import "POBAdUnitDetails.h"
#import "POBRNConstants.h"
#import "POBRNAdHelper.h"

NS_ASSUME_NONNULL_BEGIN

@interface POBAdUnitDetails ()
@property(nonatomic, readwrite) BOOL enableGetBidPrice;
@end

@implementation POBAdUnitDetails

- (instancetype)initWithPublisherId:(NSString *)publisherId
                          profileId:(NSNumber *)profileId
                           adUnitId:(NSString *)adUnitId
                        bannerSizes:(NSArray<POBAdSize *> *)bannerSizes {
    self = [super init];
    if (self) {
        _publisherId = publisherId;
        _profileId = profileId;
        _adUnitId = adUnitId;
        _bannerSizes = bannerSizes;
        _enableGetBidPrice = NO;
    }
    return self;
}

+ (nullable POBAdUnitDetails *)buildFromJSONString:(NSString *)jsonString
                                             error:(NSError **)error {
    // Convert the JSON string to an NSDictionary.
    NSDictionary *dictionary = [POBRNAdHelper convertJsonStringToJSON:jsonString error:error];
    if (*error != nil || dictionary.count == 0) {
        // Parsing error occurred, return nil.
        return nil;
    }

    NSString *publisherId = dictionary[POBRN_PUBLISHER_ID];
    NSNumber *profileId = dictionary[POBRN_PROFILE_ID];
    NSString *adUnitId = dictionary[POBRN_AD_UNIT_ID];
    NSNumber *enableGetBidPrice = dictionary[POBRN_ENABLE_GET_BID_PRICE];

    // Retrieve the ad unit sizes.
    NSArray<NSDictionary *> *adUnitSizes = dictionary[POBRN_AD_UNIT_SIZES];
    NSMutableArray *bannerSizes = [NSMutableArray array];
    for (NSDictionary *size in adUnitSizes) {
        if (size.count == 2) {
            NSNumber *width = size[POBRN_AD_UNIT_WIDTH];
            NSNumber *height = size[POBRN_AD_UNIT_HEIGHT];
            POBAdSize *adSize = POBAdSizeMake([width floatValue], [height floatValue]);
            [bannerSizes addObject:adSize];
        }
    }

    POBAdUnitDetails *adUnitDetails = [[POBAdUnitDetails alloc] initWithPublisherId:publisherId
                                                                          profileId:profileId
                                                                           adUnitId:adUnitId
                                                                        bannerSizes:[bannerSizes copy]];
    [adUnitDetails setEnableGetBidPrice:enableGetBidPrice];
    return adUnitDetails;
}

@end

NS_ASSUME_NONNULL_END
