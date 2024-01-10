#import "POBRNRewardedAdModule.h"
#import "POBRNRewardedAd.h"
#import "POBRNConstants.h"
#import "POBRNFullScreenAdProvider.h"

#import <OpenWrapSDK/OpenWrapSDK.h>

@interface POBRNRewardedAdModule() <POBRNFullScreenAdProvider>
@property (nonatomic, strong) POBRNRewardedAd *rewardedAd;
@end

@implementation POBRNRewardedAdModule

- (instancetype)init {
    self = [super initWithFullScreenAdType:POBRNFullScreenAdTypeRewarded];
    return self;
}

#pragma mark - Overriden methods

/** Exports a module named POBRNRewardedAdModule */
RCT_EXPORT_MODULE();

#pragma mark - Public/POBRNFullScreenAdProvider delegate methods

RCT_EXPORT_METHOD(createAdInstance:(nonnull NSString *)publisherId
                  profileId:(nonnull NSNumber *)profileId
                 owAdUnitId:(nonnull NSString *)owAdUnitId
                gamAdUnitId:(nonnull NSString *)gamAdUnitId) {
  
    _rewardedAd = [[POBRNRewardedAd alloc] initWithEventEmitter:self
                                                    publisherId:publisherId
                                                      profileId:profileId
                                                     owAdUnitId:owAdUnitId
                                                    gamAdUnitId:gamAdUnitId];
}

RCT_EXPORT_METHOD(loadAd) {
  [self.rewardedAd loadAd];
}

RCT_EXPORT_METHOD(showAd) {
  [self.rewardedAd showAd];
}

RCT_EXPORT_METHOD(destroyAd) {
  [self.rewardedAd destroyAd];
}

RCT_EXPORT_METHOD(isReady:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  BOOL isReady = self.rewardedAd.isReady;
  resolve(@(isReady));
}

@end
