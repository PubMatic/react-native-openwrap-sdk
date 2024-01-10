#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * Protocol for FullScreen ad API's. This interface will be implemented by Full Screen ad modules.
 */
@protocol POBRNFullScreenAdProvider <NSObject>

/**
 * Creates the full screen ad with given ad unit details.
 *
 * @param publisherId Unique identifier assigned at the time of publisher onboarding on the OpenWrap platform.
 * @param profileId Profile id of the ad tag assigned on the OpenWrap platform.
 * @param owAdUnitId An unit id used to identify unique placement on screen which is set from the OpenWrap platform.
 * @param gamAdUnitId An unit id used to identify unique placement on screen which is set from the GAM platform.
 */
- (void)createAdInstance:(NSString *)publisherId
               profileId:(NSNumber *)profileId
              owAdUnitId:(NSString *)owAdUnitId
             gamAdUnitId:(NSString *)gamAdUnitId;

/** Loads the full screen ad. */
- (void)loadAd;

/** Shows the full screen ad on top of the current view/screen. */
- (void)showAd;

/** Destroys the full screen ad instance. */
- (void)destroyAd;

/**
 * Check if full screen ad is ready to show or not.
 * It returns ad readiness status in the resolve promise block.
 *
 * @param resolve A promise resolve block to return the ad readiness status.
 * @param reject A promise reject block which can be used for returning any failures.
 */
- (void)isReady:(RCTPromiseResolveBlock)resolve
         reject:(RCTPromiseRejectBlock)reject;

@end

NS_ASSUME_NONNULL_END
