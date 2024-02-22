#import "POBRNInterstitialModule.h"
#import "POBRNConstants.h"
#import "POBRNFullScreenAdProvider.h"
#import "POBRNAdHelper.h"
#import "POBRNInterstitial.h"
#import "POBRNFullScreenAdManager.h"

#import <OpenWrapSDK/OpenWrapSDK.h>

NS_ASSUME_NONNULL_BEGIN

@interface POBRNInterstitialModule () <POBRNFullScreenAdProvider>
@end

@implementation POBRNInterstitialModule

- (instancetype)init {
    self = [super initWithFullScreenAdType:POBRNFullScreenAdTypeInterstitial];
    return self;
}

#pragma mark - Overriden methods

/** Exports a module named POBRNInterstitialModule */
RCT_EXPORT_MODULE();

/** Returns a list of events this module can emit. */
- (NSArray<NSString *> *)supportedEvents {
    return [super supportedEvents];
}

#pragma mark - Public methods

/**
 * Creates the interstitial ad with given unique ad instance id.
 *
 * @param instanceId A string identifier passed to uniquely identify each ad instance.
 * @param publisherId Unique identifier assigned at the time of publisher onboarding.
 * @param profileId Profile id of the ad tag.
 * @param adUnitId An unit id used to identify unique placement on screen.
 */
RCT_EXPORT_METHOD(createAdInstance:(nonnull NSString *)instanceId
                       publisherId:(nonnull NSString *)publisherId
                         profileId:(nonnull NSNumber *)profileId
                          adUnitId:(nonnull NSString *)adUnitId) {
    id<POBRNFullScreenAd> interstitialAd = [[POBRNInterstitial alloc] initWithInstanceId:instanceId
                                                                            eventEmitter:self
                                                                             publisherId:publisherId
                                                                               profileId:profileId
                                                                                adUnitId:adUnitId];
    [POBRNFullScreenAdManager add:interstitialAd forInstanceId:instanceId];
}

/**
 * Loads the interstitial ad using the @c POBInterstitial class instance mapped with given instance unique id.
 *
 * @param instanceId A string identifier passed uniquely identify the rewarded ad instance.
 */
RCT_EXPORT_METHOD(loadAd:(nonnull NSString *)instanceId) {
    id<POBRNFullScreenAd> interstitialAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    [interstitialAd loadAd];
}

/**
 * Shows the interstitial ad using the @c POBInterstitial class instance mapped with given instance unique id.
 * NOTE: Calling this method has no effect until interstitial ad is received and ready to show.
 *
 * @param instanceId A string identifier passed to uniquely identify an interstitial ad instance.
 */
RCT_EXPORT_METHOD(showAd:(nonnull NSString *)instanceId) {
    id<POBRNFullScreenAd> interstitialAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    [interstitialAd showAd];
}

/**
 *  Removes the  @c POBInterstitial class instance mapped with given instance unique id.
 *
 * @param instanceId A string identifier passed uniquely identify an interstitial ad instance.
 */
RCT_EXPORT_METHOD(destroy:(nonnull NSString *)instanceId) {
    id<POBRNFullScreenAd> interstitialAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    [interstitialAd destroyAd];
    [POBRNFullScreenAdManager removeForInstanceId:instanceId];
}

/**
 * Check if full screen ad is ready to show or not of a given ad instance id.
 * It returns ad readiness status in the resolve promise block.
 *
 * @param instanceId A string identifier passed to uniquely identify each ad instance.
 * @param resolve A promise resolve block to return the ad readiness status.
 * @param reject A promise reject block which can be used for returning any failures.
 */
RCT_EXPORT_METHOD(isReady:(NSString *)instanceId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    id<POBRNFullScreenAd> interstitialAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    NSNumber *isAdReady = interstitialAd.isReady ? @1 : @0;
    resolve(isAdReady);
}

RCT_EXPORT_METHOD(setRequestParameters:(NSString *)parameterString
                         forInstanceId:(NSString *)instanceId) {
    id<POBRNFullScreenAd> interstitialAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    [interstitialAd setRequestParameters:parameterString];
}

RCT_EXPORT_METHOD(setImpressionParameters:(NSString *)parameterString
                            forInstanceId:(NSString *)instanceId) {
    id<POBRNFullScreenAd> interstitialAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    [interstitialAd setImpressionParameters:parameterString];
}

#pragma mark - Get bid price

RCT_EXPORT_METHOD(setBidEvent:(nonnull NSString *)instanceId) {
    id<POBRNFullScreenAd> interstitialAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    [interstitialAd setBidEvent];
}

RCT_EXPORT_METHOD(proceedToLoadAd:(NSString *)instanceId
                          resolve:(RCTPromiseResolveBlock)resolve
                           reject:(RCTPromiseRejectBlock)reject) {
    id<POBRNFullScreenAd> interstitialAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    BOOL success = [interstitialAd proceedToLoadAd];
    resolve(@(success));
}

RCT_EXPORT_METHOD(proceedOnError:(NSString *)parameterString
                   forInstanceId:(NSString *)instanceId) {
    id<POBRNFullScreenAd> interstitialAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    [interstitialAd proceedOnError:parameterString];
}

/**
 * Checks whether the ad bid associated with the given ad instance identifier is expired or not.
 * Use this method to determine the bid expiry status.
 *
 * @param instanceId A unique identifier for the ad instance.
 * @param resolve A promise resolve block to return the bid expiry status.
 *               The block takes a single argument of type NSNumber indicating the bid expiry status.
 *               A value of 1 indicates that the bid is expired, while a value of 0 indicates that the bid is not expired.
 * @param reject A promise reject block which can be used for returning any failures.
 */
RCT_EXPORT_METHOD(isBidExpired:(NSString *)instanceId
                       resolve:(RCTPromiseResolveBlock)resolve
                        reject:(RCTPromiseRejectBlock)reject) {
    id<POBRNFullScreenAd> interstitialAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    NSNumber *isBidExpired = [NSNumber numberWithBool:interstitialAd.isBidExpired];
    resolve(isBidExpired);
}

@end

NS_ASSUME_NONNULL_END
