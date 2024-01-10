#import "POBRNInterstitialModule.h"
#import "POBRNConstants.h"
#import "POBRNFullScreenAdProvider.h"
#import "POBRNAdHelper.h"
#import "POBRNInterstitial.h"

#import <OpenWrapSDK/OpenWrapSDK.h>

NS_ASSUME_NONNULL_BEGIN

@interface POBRNInterstitialModule () <POBRNFullScreenAdProvider>
@property(nonatomic) POBRNInterstitial *interstitial;
@end

@implementation POBRNInterstitialModule

- (instancetype)init {
    self = [super initWithFullScreenAdType:POBRNFullScreenAdTypeInterstitial];
    return self;
}

#pragma mark - Overriden methods

/**
 * Module name which is used to initialize this module from the  react native JS environment.
 * Its default name is @c POBRNInterstitialModule.
 */
RCT_EXPORT_MODULE();

#pragma mark - Public/POBRNFullScreenAdProvider delegate methods

/** Creates instance of the interstitial ad. */
RCT_EXPORT_METHOD(createAdInstance:(nonnull NSString *)publisherId
                         profileId:(nonnull NSNumber *)profileId
                        owAdUnitId:(nonnull NSString *)owAdUnitId
                       gamAdUnitId:(nonnull NSString *)gamAdUnitId) {
  _interstitial = [[POBRNInterstitial alloc] initWithEventEmitter:self
                                                      publisherId:publisherId
                                                      profileId:profileId
                                                       owAdUnitId:owAdUnitId
                                                      gamAdUnitId:gamAdUnitId];
}

/** Loads the interstitial ad. */
RCT_EXPORT_METHOD(loadAd) {
  [self.interstitial loadAd];
}

/** Shows the interstitial ad if it is ready. */
RCT_EXPORT_METHOD(showAd) {
  [self.interstitial showAd];
}

/** Destroys the interstitial ad. */
RCT_EXPORT_METHOD(destroyAd) {
  [self.interstitial destroyAd];
}

/** Returns the interstitial ad readiness status through a promise block. */
RCT_EXPORT_METHOD(isReady:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  BOOL isReady = self.interstitial.isReady;
  resolve(@(isReady));
}

@end

NS_ASSUME_NONNULL_END
