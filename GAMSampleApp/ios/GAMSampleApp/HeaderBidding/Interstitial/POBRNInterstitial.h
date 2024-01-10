#import <Foundation/Foundation.h>
#import "POBRNEventEmitter.h"
#import "POBRNFullScreenAd.h"

NS_ASSUME_NONNULL_BEGIN

/**
 * This class demonstrates how to integrate OpenWrap SDK Interstitial ads through GAM Header Bidding in the React Native environments.
 * It follows the FullScreenAd protocol which is a wrapper on POBInterstitial which helps you to load and show interstitial ads.
 *
 * You can also add custom targeting to GAM by using config block and also use methods to facilitate your use case by going through OpenWrap SDK integration guide.
 *
 * This class can be reused or customized as per the requirement in your React Native application.
 */
@interface POBRNInterstitial : NSObject <POBRNFullScreenAd>

/**
 * Creates an instance of @c POBRNInterstitial which is responsible for Interstitial ad rendering and
 * delegating the callback using the passed event emitter instance.
 *
 * @param eventEmitter A @c POBRNEventEmitter instance used to emit events to JS side.
 * @param publisherId Unique identifier assigned at the time of publisher onboarding on the OpenWrap platform.
 * @param profileId Profile id of the ad tag assigned on the OpenWrap platform.
 * @param owAdUnitId An unit id used to identify unique placement on screen which is set from the OpenWrap platform.
 * @param gamAdUnitId An unit id used to identify unique placement on screen which is set from the GAM platform.
 * @return An instance of @c POBRNInterstitial.
 */
- (instancetype)initWithEventEmitter:(POBRNEventEmitter *)eventEmitter
                         publisherId:(NSString *)publisherId
                           profileId:(NSNumber *)profileId
                          owAdUnitId:(NSString *)owAdUnitId
                         gamAdUnitId:(NSString *)gamAdUnitId NS_DESIGNATED_INITIALIZER;

- (instancetype)init NS_UNAVAILABLE;

@end

NS_ASSUME_NONNULL_END
