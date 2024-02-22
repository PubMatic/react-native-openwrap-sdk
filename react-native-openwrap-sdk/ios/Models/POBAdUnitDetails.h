#import <Foundation/Foundation.h>
#import <OpenWrapSDK/OpenWrapSDK.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * Model class, maintains OpenWrap SDK ad unit details.
 */
@interface POBAdUnitDetails : NSObject

@property(nonatomic, readonly) NSString *publisherId;
@property(nonatomic, readonly) NSNumber *profileId;
@property(nonatomic, readonly) NSString *adUnitId;
@property(nonatomic, readonly) NSArray<POBAdSize *> *bannerSizes;
@property(nonatomic, readonly) BOOL enableGetBidPrice;

- (instancetype)init NS_UNAVAILABLE;

/**
 * Creates a @c POBAdUnitDetails instance by parsing JSON string into an ad unit details..
 *
 * @param jsonString A JSON string with ad unit details.
 * @param error An error can passed to get details about JSON parse failure if any.
 * @return An instance of @c POBAdUnitDetails which contains all the details required for the ad loading.
 */
+ (nullable POBAdUnitDetails *)buildFromJSONString:(NSString *)jsonString
                                             error:(NSError **)error;

@end

NS_ASSUME_NONNULL_END
