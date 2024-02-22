#import "POBRNRewardedAd.h"
#import "POBRNAdHelper.h"
#import <OpenWrapSDK/OpenWrapSDK.h>

NS_ASSUME_NONNULL_BEGIN

@interface POBRNRewardedAd () <POBRewardedAdDelegate, POBBidEventDelegate>

@property (nonatomic, strong) NSString *instanceId;
// Keep weak reference to avoid retain cycle.
@property (nonatomic, nullable, weak) POBRNEventEmitter *eventEmitter;
@property (nonatomic, nullable, strong) POBRewardedAd *rewardedAd;

@end

@implementation POBRNRewardedAd

- (instancetype)initWithInstanceId:(NSString *)instanceId
                      eventEmitter:(POBRNEventEmitter *)eventEmitter
                       publisherId:(NSString *)publisherId
                         profileId:(NSNumber *)profileId
                          adUnitId:(NSString *)adUnitId {
    self = [super init];
    if (self) {
        _instanceId = instanceId;
        _eventEmitter = eventEmitter;
        _rewardedAd = [POBRewardedAd rewardedAdWithPublisherId:publisherId
                                                     profileId:profileId
                                                      adUnitId:adUnitId];
        _rewardedAd.delegate = self;
        // Setting the adPosition to fullScreen for Rewarded Ads.
        _rewardedAd.impression.adPosition = POBAdPositionFullscreen;
    }
    return self;
}

#pragma mark - Public / POBRNFullScreenAd methods

- (void)loadAd {
    [self.rewardedAd loadAd];
}

- (void)showAd {
    [self.rewardedAd showFromViewController:[POBRNAdHelper topViewController]];
}

- (BOOL)isReady {
    return self.rewardedAd.isReady;
}

- (void)destroyAd {
    self.rewardedAd.delegate = nil;
    self.rewardedAd = nil;
}

- (void)setSkipAlertDialogInfo:(NSString *)title
                       message:(NSString *)message
              resumeButtonText:(NSString *)resumeButtonText
               closeButtonText:(NSString *)closeButtonText {
    [self.rewardedAd setSkipAlertInfoWithTitle:title
                                       message:message
                              closeButtonTitle:closeButtonText
                             resumeButtonTitle:resumeButtonText];
}

- (void)setRequestParameters:(NSString *)jsonString {
    [POBRNAdHelper setUpRequest:self.rewardedAd.request
               withParameters:jsonString
               andNestedParsing:NO];
}

- (void)setImpressionParameters:(NSString *)jsonString {
    [POBRNAdHelper setUpImpression:self.rewardedAd.impression
                    withParameters:jsonString
                  andNestedParsing:NO];
    // Setting the adPosition to fullScreen for Rewarded Ads.
    self.rewardedAd.impression.adPosition = POBAdPositionFullscreen;
}

#pragma mark - POBRewardedAdDelegate

- (void)rewardedAdDidReceiveAd:(POBRewardedAd *)rewardedAd {
    NSDictionary *bidDetails = [POBRNAdHelper bidDictionaryFromBid:rewardedAd.bid];
    [self.eventEmitter emitEventWithEmbeddedEventName:POBRN_EVENT_AD_RECEIVED
                                           instanceId:self.instanceId
                                           andPayload:bidDetails];
}

- (void)rewardedAd:(POBRewardedAd *)rewardedAd didFailToReceiveAdWithError:(NSError *)error {
    [self sendEvent:POBRN_EVENT_FAILED_TO_LOAD_AD withError:error];
}

- (void)rewardedAd:(POBRewardedAd *)rewardedAd didFailToShowAdWithError:(NSError *)error {
    [self sendEvent:POBRN_EVENT_FAILED_TO_SHOW_AD withError:error];
}

- (void)rewardedAdWillPresentAd:(POBRewardedAd *)rewardedAd {
    // Not application
}

- (void)rewardedAdDidPresentAd:(POBRewardedAd *)rewardedAd {
    [self sendEvent:POBRN_EVENT_AD_OPENED];
}

- (void)rewardedAdDidDismissAd:(POBRewardedAd *)rewardedAd {
    [self sendEvent:POBRN_EVENT_AD_CLOSED];
}

- (void)rewardedAdDidClickAd:(POBRewardedAd *)rewardedAd {
    [self sendEvent:POBRN_EVENT_DID_CLICK_AD];
}

- (void)rewardedAdWillLeaveApplication:(POBRewardedAd *)rewardedAd {
    [self sendEvent:POBRN_EVENT_WILL_LEAVE_APP];
}

- (void)rewardedAdDidExpireAd:(POBRewardedAd *)rewardedAd {
    [self sendEvent:POBRN_EVENT_AD_EXPIRED];
}

- (void)rewardedAd:(POBRewardedAd *)rewardedAd shouldReward:(POBReward *)reward {
    NSDictionary *rewardDetails = [POBRNAdHelper rewardDictionaryFromReward:reward];
    [self.eventEmitter emitEventWithEmbeddedEventName:POBRN_EVENT_RECEIVE_REWARD
                                           instanceId:self.instanceId
                                           andPayload:rewardDetails];
}

#pragma mark - Get Bid Price

- (void)setBidEvent {
    self.rewardedAd.bidEventDelegate = self;
}

- (BOOL)proceedToLoadAd {
    return [self.rewardedAd proceedToLoadAd];
}

- (void)proceedOnError:(NSString *)jsonString {
    NSDictionary *errorDetails = [POBRNAdHelper convertJsonStringToJSON:jsonString error:nil];
    NSNumber *errCode = errorDetails[POBRN_ERROR_CODE];
    NSString *errMsg  = errorDetails[POBRN_ERROR_MESSAGE];
    
    POBBidEventErrorCode bidEventErrorCode = POBBidEventErrorOther;
    if (errCode != nil) {
        // Error code is available in the errorDetails
        bidEventErrorCode = [POBRNAdHelper bidEventErrorCodeForCode:errCode.integerValue];
    }
    [self.rewardedAd proceedOnError:bidEventErrorCode andDescription:errMsg];
}

- (BOOL)isBidExpired {
    return [self.rewardedAd.bid isExpired];
}

#pragma POBBidEventDelegate

- (void)bidEvent:(id<POBBidEvent>)bidEventObject didReceiveBid:(POBBid *)bid {
    NSDictionary *bidDetails = [POBRNAdHelper bidDictionaryFromBid:self.rewardedAd.bid];
    [self.eventEmitter emitEventWithEmbeddedEventName:POBRN_EVENT_BID_RECEIVED
                                           instanceId:self.instanceId
                                           andPayload:bidDetails];
}

- (void)bidEvent:(id<POBBidEvent>)bidEventObject didFailToReceiveBidWithError:(NSError *)error {
    [self sendEvent:POBRN_EVENT_BID_RECEIVE_FAILED withError:error];
}

#pragma mark - Private methods

- (void)sendEvent:(NSString *)eventName {
    [self sendEvent:eventName withError:nil];
}

- (void)sendEvent:(NSString *)eventName withError:(nullable NSError *)error {
    [self.eventEmitter emitEventWithEmbeddedEventName:eventName
                                           instanceId:self.instanceId
                                                error:error];
}

@end

NS_ASSUME_NONNULL_END
