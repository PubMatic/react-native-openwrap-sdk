#import "POBRNRewardedAdModule.h"
#import "POBRNConstants.h"
#import "POBRNFullScreenAdProvider.h"
#import "POBRNFullScreenAdManager.h"
#import "POBRNRewardedAd.h"

#import <OpenWrapSDK/OpenWrapSDK.h>

NS_ASSUME_NONNULL_BEGIN

@interface POBRNRewardedAdModule () <POBRNFullScreenAdProvider>
@end

@implementation POBRNRewardedAdModule

- (instancetype)init {
    self = [super initWithFullScreenAdType:POBRNFullScreenAdTypeRewarded];
    return self;
}

#pragma mark - Overriden methods

/** Exports a module named POBRNRewardedAdModule */
RCT_EXPORT_MODULE();

/** Returns a list of events this module can emit. */
- (NSArray<NSString *> *)supportedEvents {
    return [super supportedEvents];
}

#pragma mark - Public / POBRNFullScreenAdProvider methods

/**
 * Creates the rewarded ad with given unique ad instance id.
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
    id<POBRNFullScreenAd> rewardedAd = [[POBRNRewardedAd alloc] initWithInstanceId:instanceId
                                                                      eventEmitter:self
                                                                       publisherId:publisherId
                                                                         profileId:profileId
                                                                          adUnitId:adUnitId];
    [POBRNFullScreenAdManager add:rewardedAd forInstanceId:instanceId];
}

/**
 * Loads a rewarded ad using the @c POBRewardedAd class instance mapped with given instance unique id.
 *
 * @param instanceId A string identifier passed uniquely identify the rewarded ad instance.
 */
RCT_EXPORT_METHOD(loadAd:(nonnull NSString *)instanceId) {
    id<POBRNFullScreenAd> rewardedAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    [rewardedAd loadAd];
}

/**
 * Shows the rewarded ad using the @c POBRewardedAd class instance mapped with given instance unique id.
 * NOTE: Calling this method has no effect until rewarded ad is received and ready to show.
 *
 * @param instanceId A string identifier passed to uniquely identify the rewarded ad instance.
 */
RCT_EXPORT_METHOD(showAd:(nonnull NSString *)instanceId) {
    id<POBRNFullScreenAd> rewardedAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    [rewardedAd showAd];
}

/**
 * Removes the  @c POBRewardedAd class instance mapped with given instance unique id.
 *
 * @param instanceId A string identifier passed uniquely identify the rewarded ad instance.
 */
RCT_EXPORT_METHOD(destroy:(nonnull NSString *)instanceId) {
    id<POBRNFullScreenAd> rewardedAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    [rewardedAd destroyAd];
    [POBRNFullScreenAdManager removeForInstanceId:instanceId];
}

/**
 * Check if the rewarded ad is ready to show or not of a given ad instance id.
 * It returns ad readiness status in the resolve promise block.
 *
 * @param instanceId A string identifier passed to uniquely identify each ad instance.
 * @param resolve A promise resolve block to return the ad readiness status.
 * @param reject A promise reject block which can be used for returning any failures.
 */
RCT_EXPORT_METHOD(isReady:(NSString *)instanceId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    id<POBRNFullScreenAd> rewardedAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    NSNumber *isAdReady = rewardedAd.isReady ? @1 : @0;
    resolve(isAdReady);
}

/**
 * Sets title, message & button texts to be used while showing the skip alert.
 *
 * @discussion :-
 *  - If any of the parameters is empty the SDK discards all the values & shows a default skip alert.
 *
 * @param instanceId A string identifier passed to uniquely identify each ad instance.
 * @param title the title of the alert.
 * @param message The message of the alert.
 * @param resumeButtonText The title of the close button.
 * @param closeButtonText The title of the resume button.
 */
RCT_EXPORT_METHOD(setSkipAlertDialogInfo:(NSString *)instanceId
                                   title:(NSString *)title
                                 message:(NSString *)message
                        resumeButtonText:(NSString *)resumeButtonText
                         closeButtonText:(NSString *)closeButtonText) {
    id<POBRNFullScreenAd> rewardedAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    if ([rewardedAd respondsToSelector:@selector(setSkipAlertDialogInfo:message:resumeButtonText:closeButtonText:)]) {
        [rewardedAd setSkipAlertDialogInfo:title
                                   message:message
                          resumeButtonText:resumeButtonText
                           closeButtonText:closeButtonText];
    }
}

RCT_EXPORT_METHOD(setRequestParameters:(NSString *)parameterString
                         forInstanceId:(NSString *)instanceId) {
    id<POBRNFullScreenAd> rewardedAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    [rewardedAd setRequestParameters:parameterString];
}

RCT_EXPORT_METHOD(setImpressionParameters:(NSString *)parameterString
                            forInstanceId:(NSString *)instanceId) {
    id<POBRNFullScreenAd> rewardedAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    [rewardedAd setImpressionParameters:parameterString];
}

#pragma mark - Get bid price

RCT_EXPORT_METHOD(setBidEvent:(nonnull NSString *)instanceId) {
    id<POBRNFullScreenAd> rewardedAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    [rewardedAd setBidEvent];
}

RCT_EXPORT_METHOD(proceedToLoadAd:(NSString *)instanceId
                          resolve:(RCTPromiseResolveBlock)resolve
                           reject:(RCTPromiseRejectBlock)reject) {
    id<POBRNFullScreenAd> rewardedAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    BOOL success = [rewardedAd proceedToLoadAd];
    resolve(@(success));
}

RCT_EXPORT_METHOD(proceedOnError:(NSString *)parameterString
                   forInstanceId:(NSString *)instanceId) {
    id<POBRNFullScreenAd> rewardedAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    [rewardedAd proceedOnError:parameterString];
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
    id<POBRNFullScreenAd> rewardedAd = [POBRNFullScreenAdManager adForInstanceId:instanceId];
    NSNumber *isBidExpired = [NSNumber numberWithBool:rewardedAd.isBidExpired];
    resolve(isBidExpired);
}

@end

NS_ASSUME_NONNULL_END
