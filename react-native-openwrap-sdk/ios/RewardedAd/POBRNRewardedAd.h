#import <Foundation/Foundation.h>
#import "POBRNFullScreenAd.h"
#import "POBRNEventEmitter.h"

NS_ASSUME_NONNULL_BEGIN

/** A wrapper class for Rewarded ad which is also responsible for delegating callbacks using the event emitter. */
@interface POBRNRewardedAd : NSObject <POBRNFullScreenAd>

/**
 * Creates an instance of @c POBRNRewardedAd which is responsible for Rewarded ad rendering and
 * delegating the callback using the passed event emitter instance.
 *
 * @param instanceId A string identifier passed uniquely identify an rewarded ad instance.
 * @param eventEmitter A @c POBRNEventEmitter instance used to emit events to JS side.
 * @param publisherId Unique identifier assigned at the time of publisher onboarding.
 * @param profileId Profile id of the ad tag.
 * @param adUnitId An unit id used to identify unique placement on screen.
 * @return An instance of @c POBRNRewardedAd.
 */
- (instancetype)initWithInstanceId:(NSString *)instanceId
                      eventEmitter:(POBRNEventEmitter *)eventEmitter
                       publisherId:(NSString *)publisherId
                         profileId:(NSNumber *)profileId
                          adUnitId:(NSString *)adUnitId NS_DESIGNATED_INITIALIZER;
- (instancetype)init NS_UNAVAILABLE;

@end

NS_ASSUME_NONNULL_END
