#import "POBRNRewardedAd.h"
#import "POBRNAdHelper.h"
#import <OpenWrapHandlerDFP/OpenWrapHandlerDFP.h>

@interface POBRNRewardedAd() <POBRewardedAdDelegate>
@property (nonatomic, strong) POBRewardedAd *rewardedAd;
/** Emitter used for emitting the global event for the interstitial ad. */
@property (nonatomic, nullable, weak) POBRNEventEmitter *eventEmitter;
@end

@implementation POBRNRewardedAd

- (instancetype)initWithEventEmitter:(POBRNEventEmitter *)eventEmitter
                         publisherId:(NSString *)publisherId
                           profileId:(NSNumber *)profileId
                          owAdUnitId:(NSString *)owAdUnitId
                         gamAdUnitId:(NSString *)gamAdUnitId {
    self = [super init];
    if (self) {
        _eventEmitter = eventEmitter;

        // The event handler is used to make the ad request to GAM after OW SDK
        // has received the bid.
        // The event handler requires gamAdUnitId for making the ad ad request to GAM.
        DFPRewardedEventHandler *handler = [[DFPRewardedEventHandler alloc] initWithAdUnitId:gamAdUnitId];

        // Config block for setting custom targeting or extra parameters on GAM request.
        handler.configBlock = ^(GAMRequest *request, POBBid *bid) {
            // Here, you have a provision to set the custom targeting to ad server using the
            // bid parameter as illustrated below:
            // NSDictionary *gamCustomTargeting = [[NSDictionary alloc] initWithObjectsAndKeys:@"value1", @"key1", nil];
            // [request setCustomTargeting:gamCustomTargeting];
        };

        // Pass the instance of event handler along with other parameters while creating
        // instance of POBRewardedAd.
        self.rewardedAd = [POBRewardedAd rewardedAdWithPublisherId:publisherId
                                                         profileId:profileId
                                                          adUnitId:owAdUnitId
                                                      eventHandler:handler];
        self.rewardedAd.delegate = self;
    }

    return self;
}

#pragma mark - POBRNFullScreenAd

- (void)destroyAd {
    // Destroy rewarded ad.
    self.rewardedAd.delegate = nil;
    self.rewardedAd = nil;
}

- (BOOL)isReady {
    // Whether rewarded ad is ready.
    return self.rewardedAd.isReady;
}

- (void)loadAd {
    // Load rewarded ad.
    [self.rewardedAd loadAd];
}

- (void)showAd {
    // Show rewarded ad.
    [self.rewardedAd showFromViewController:[POBRNAdHelper topViewController]];
}

#pragma mark - POBRewardedAdDelegate

// Notifies the delegate that an rewarded ad has been received successfully.
-(void) rewardedAdDidReceiveAd:(POBRewardedAd *)rewardedAd {
    [self sendEvent:POBRN_EVENT_AD_RECEIVED];
}

// Notifies the delegate of an error encountered while loading an ad.
-(void) rewardedAd:(POBRewardedAd *)rewardedAd didFailToReceiveAdWithError:(NSError *)error {
    [self sendEvent:POBRN_EVENT_FAILED_TO_LOAD_AD error:error];
}

// Notifies the delegate of an error encountered while showing an ad.
-(void) rewardedAd:(POBRewardedAd *)rewardedAd didFailToShowAdWithError:(NSError *)error {
    [self sendEvent:POBRN_EVENT_FAILED_TO_SHOW_AD error:error];
}

// Notifies the delegate that the rewarded ad will be presented as a modal on top of the current view controller.
-(void) rewardedAdWillPresentAd:(POBRewardedAd *)rewardedAd {
    // Not applicable
}

// Notifies the delegate that the rewarded ad is presented as a modal on top of the current view controller.
-(void) rewardedAdDidPresentAd:(POBRewardedAd *)rewardedAd {
    [self sendEvent:POBRN_EVENT_AD_OPENED];
}

// Notifies the delegate that the rewarded ad has been animated off the screen.
-(void) rewardedAdDidDismissAd:(POBRewardedAd *)rewardedAd {
    [self sendEvent:POBRN_EVENT_AD_CLOSED];
}

// Notifies the delegate of ad click
-(void) rewardedAdDidClickAd:(POBRewardedAd *)rewardedAd {
    [self sendEvent:POBRN_EVENT_DID_CLICK_AD];
}

// Notifies the delegate that a user interaction will open another app (e.g. App Store),
// leaving the current app. To handle user clicks that open the
// landing page URL in the internal browser, use 'RewardedAdDidClickAd:' instead.
-(void) rewardedAdWillLeaveApplication:(POBRewardedAd *)rewardedAd {
    [self sendEvent:POBRN_EVENT_WILL_LEAVE_APP];
}

// Notifies the delegate of an ad expiration. After this callback,
// this 'POBRewardedAd' instance is marked as invalid & will not be shown.
-(void) rewardedAdDidExpireAd:(POBRewardedAd *)rewardedAd {
    [self sendEvent:POBRN_EVENT_AD_EXPIRED];
}

// Notifies the delegate that a user will be rewarded once the ad is completely viewed.
-(void) rewardedAd:(POBRewardedAd *)rewardedAd shouldReward:(POBReward *)reward {
    [self.eventEmitter emitEventWithEmbeddedEventName:POBRN_EVENT_RECEIVE_REWARD reward:reward];
}

#pragma mark - Private methods

// Send event
- (void)sendEvent:(NSString *)eventName {
    [self sendEvent:eventName error:nil];
}

// Send event with error
- (void)sendEvent:(NSString *)eventName error:(nullable NSError *)error {
    [self.eventEmitter emitEventWithEmbeddedEventName:eventName error:error];
}

@end
