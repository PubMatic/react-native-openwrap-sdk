#import <Foundation/Foundation.h>
#import <OpenWrapSDK/OpenWrapSDK.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * Model class, maintains OpenWrap SDK ad unit details.
 */
@interface POBAdUnitDetails : NSObject

#pragma mark - Properties

/** Unique identifier assigned at the time of publisher onboarding on the OpenWrap platform. */
@property (nonatomic, readonly) NSString *publisherId;

/** Profile id of the ad tag assigned on the OpenWrap platform. */
@property (nonatomic, readonly) NSNumber *profileId;

/** An unit id used to identify unique placement on screen which is set from the OpenWrap platform. */
@property (nonatomic, readonly) NSString *owAdUnitId;

/** An unit id used to identify unique placement on screen which is set from the GAM platform. */
@property (nonatomic, readonly) NSString *gamAdUnitId;

/** Array of sizes of the ad to be requested. */
@property (nonatomic, readonly) NSArray<POBAdSize *> *adSizes;

#pragma mark - Methods

- (instancetype)init NS_UNAVAILABLE;

/**
 * Parses and builds @c POBAdUnitDetails from ad unit json string in below format:
 * {"publisherId": "pub_id", "profileId": 1234, "owAdUnitId": "test_ad_unit", "gamAdUnitId": "test_gam_ad_unit", "adSizes": [{"width": 320, "height": 50}]}
 *
 * @param jsonString A JSON string with ad unit details.
 * @param error An error can passed to get details about JSON parsing failure if any.
 * @return An instance of @c POBAdUnitDetails which contains all the details required for the ad loading.
 */
+ (nullable instancetype)buildFromAdUnitDetailsJson:(NSString *)jsonString
                                              error:(NSError **)error;

@end

NS_ASSUME_NONNULL_END
