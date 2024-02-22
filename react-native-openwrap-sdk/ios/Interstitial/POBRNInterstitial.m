#import "POBRNInterstitial.h"
#import "POBRNAdHelper.h"
#import <OpenWrapSDK/OpenWrapSDK.h>

@interface POBRNInterstitial () <
    POBInterstitialDelegate,
    POBInterstitialVideoDelegate,
    POBBidEventDelegate>

@property (nonatomic, strong) NSString *instanceId;
// Keep weak reference to avoid retain cycle.
@property (nonatomic, nullable, weak) POBRNEventEmitter *eventEmitter;
@property (nonatomic, nullable, strong) POBInterstitial *interstitial;

@end

@implementation POBRNInterstitial

- (instancetype)initWithInstanceId:(NSString *)instanceId
                      eventEmitter:(POBRNEventEmitter *)eventEmitter
                       publisherId:(NSString *)publisherId
                         profileId:(NSNumber *)profileId
                          adUnitId:(NSString *)adUnitId {
    self = [super init];
    if (self) {
        _instanceId = instanceId;
        _eventEmitter = eventEmitter;
        _interstitial = [[POBInterstitial alloc] initWithPublisherId:publisherId
                                                           profileId:profileId
                                                            adUnitId:adUnitId];
        _interstitial.delegate = self;
        _interstitial.videoDelegate = self;
        // Setting the adPosition to fullScreen for Interstitial Ads.
        _interstitial.impression.adPosition = POBAdPositionFullscreen;
    }
    return self;
}

#pragma mark - Public / POBRNFullScreenAd methods

- (void)loadAd {
    [self.interstitial loadAd];
}

- (void)showAd {
    [self.interstitial showFromViewController:[POBRNAdHelper topViewController]];
}

- (BOOL)isReady {
    return self.interstitial.isReady;
}

- (void)destroyAd {
    self.interstitial.delegate = nil;
    self.interstitial.videoDelegate = nil;
    self.interstitial = nil;
}

- (void)setRequestParameters:(NSString *)jsonString {
    [POBRNAdHelper setUpRequest:self.interstitial.request
                 withParameters:jsonString
               andNestedParsing:NO];
}

- (void)setImpressionParameters:(NSString *)jsonString {
    [POBRNAdHelper setUpImpression:self.interstitial.impression
                    withParameters:jsonString
                  andNestedParsing:NO];
    // Setting the adPosition to fullScreen for Interstitial Ads.
    self.interstitial.impression.adPosition = POBAdPositionFullscreen;
}

#pragma mark - Get Bid Price

- (void)setBidEvent {
    self.interstitial.bidEventDelegate = self;
}

- (BOOL)proceedToLoadAd {
    return [self.interstitial proceedToLoadAd];
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
    [self.interstitial proceedOnError:bidEventErrorCode andDescription:errMsg];
}

- (BOOL)isBidExpired {
    return [self.interstitial.bid isExpired];
}

#pragma POBBidEventDelegate

- (void)bidEvent:(id<POBBidEvent>)bidEventObject didReceiveBid:(POBBid *)bid {
    NSDictionary *bidDetails = [POBRNAdHelper bidDictionaryFromBid:self.interstitial.bid];
    [self.eventEmitter emitEventWithEmbeddedEventName:POBRN_EVENT_BID_RECEIVED
                                           instanceId:self.instanceId
                                           andPayload:bidDetails];
}

- (void)bidEvent:(id<POBBidEvent>)bidEventObject didFailToReceiveBidWithError:(NSError *)error {
    [self sendEvent:POBRN_EVENT_BID_RECEIVE_FAILED withError:error];
}

#pragma mark - POBInterstitialDelegate

- (void)interstitialDidReceiveAd:(POBInterstitial *)interstitial {
    NSDictionary *bidDetails = [POBRNAdHelper bidDictionaryFromBid:interstitial.bid];
    [self.eventEmitter emitEventWithEmbeddedEventName:POBRN_EVENT_AD_RECEIVED
                                           instanceId:self.instanceId
                                           andPayload:bidDetails];
}

- (void)interstitial:(POBInterstitial *)interstitial didFailToReceiveAdWithError:(NSError *)error {
    [self sendEvent:POBRN_EVENT_FAILED_TO_LOAD_AD withError:error];
}

- (void)interstitial:(POBInterstitial *)interstitial didFailToShowAdWithError:(NSError *)error {
    [self sendEvent:POBRN_EVENT_FAILED_TO_SHOW_AD withError:error];
}

- (void)interstitialWillPresentAd:(POBInterstitial *)interstitial {
    // Not application
}

- (void)interstitialDidPresentAd:(POBInterstitial *)interstitial {
    [self sendEvent:POBRN_EVENT_AD_OPENED];
}

- (void)interstitialDidDismissAd:(POBInterstitial *)interstitial {
    [self sendEvent:POBRN_EVENT_AD_CLOSED];
}

- (void)interstitialDidClickAd:(POBInterstitial *)interstitial {
    [self sendEvent:POBRN_EVENT_DID_CLICK_AD];
}

- (void)interstitialDidExpireAd:(POBInterstitial *)interstitial {
    [self sendEvent:POBRN_EVENT_AD_EXPIRED];
}

- (void)interstitialWillLeaveApplication:(POBInterstitial *)interstitial {
    [self sendEvent:POBRN_EVENT_WILL_LEAVE_APP];
}

#pragma mark - POBInterstitialVideoDelegate

- (void)interstitialDidFinishVideoPlayback:(POBInterstitial *)interstitial {
    [self sendEvent:POBRN_EVENT_VIDEO_PLAYBACK_COMPLETED];
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
