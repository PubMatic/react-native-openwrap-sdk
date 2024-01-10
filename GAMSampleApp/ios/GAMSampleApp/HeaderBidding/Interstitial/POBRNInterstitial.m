#import "POBRNInterstitial.h"
#import "POBRNAdHelper.h"
#import <OpenWrapSDK/OpenWrapSDK.h>
#import <OpenWrapHandlerDFP/OpenWrapHandlerDFP.h>

@interface POBRNInterstitial () <
    POBInterstitialDelegate,
    POBInterstitialVideoDelegate>

/** The @c POBInterstitial to display interstitial ad. */
@property (nonatomic, nullable, strong) POBInterstitial *interstitial;
/** Emitter used for emitting the global event for the interstitial ad. */
@property (nonatomic, nullable, weak) POBRNEventEmitter *eventEmitter;

@end

@implementation POBRNInterstitial

- (instancetype)initWithEventEmitter:(POBRNEventEmitter *)eventEmitter
                         publisherId:(NSString *)publisherId
                           profileId:(NSNumber *)profileId
                          owAdUnitId:(NSString *)owAdUnitId
                         gamAdUnitId:(NSString *)gamAdUnitId {
    self = [super init];
    if (self) {
      _eventEmitter = eventEmitter;

      // Create instance of event handler for GAM header bidding with GAM ad unit id.
      DFPInterstitialEventHandler *eventHandler =
          [[DFPInterstitialEventHandler alloc] initWithAdUnitId:gamAdUnitId];

      // Config block for setting custom targeting or extra parameters on GAM request.
      eventHandler.configBlock = ^(GAMRequest *request, POBBid *bid) {
        // Here, you have a provision to set the custom targeting to ad server using the
        // bid parameter as illustrated below:
        // NSDictionary *gamCustomTargeting = [[NSDictionary alloc] initWithObjectsAndKeys:@"value1", @"key1", nil];
        // [request setCustomTargeting:gamCustomTargeting];
      };

      // Create instance of POBInterstitial object with OW ad unit details
      _interstitial = [[POBInterstitial alloc] initWithPublisherId:publisherId
                                                         profileId:profileId
                                                          adUnitId:owAdUnitId
                                                      eventHandler:eventHandler];

      // Set the Interstitial ad event delegates.
      _interstitial.delegate = self;
      _interstitial.videoDelegate = self;
    }
    return self;
}

#pragma mark - Public / POBRNFullScreenAd methods

/** Loads the Interstitial ad. */
- (void)loadAd {
    [self.interstitial loadAd];
}

/** Shows the Interstitial ad if it is ready. */
- (void)showAd {
    [self.interstitial showFromViewController:[POBRNAdHelper topViewController]];
}

/** A boolean to check if ad is ready to show or not. */
- (BOOL)isReady {
    return self.interstitial.isReady;
}

/** Reset the Interstitial ad instance. */
- (void)destroyAd {
    self.interstitial.delegate = nil;
    self.interstitial.videoDelegate = nil;
    self.interstitial = nil;
}

#pragma mark - POBInterstitialDelegate

/** Notifies the delegate that an ad has been successfully loaded and rendered. */
- (void)interstitialDidReceiveAd:(POBInterstitial *)interstitial {
    [self sendEvent:POBRN_EVENT_AD_RECEIVED];
}

/** Notifies the delegate of an error encountered while loading an ad. */
- (void)interstitial:(POBInterstitial *)interstitial
    didFailToReceiveAdWithError:(NSError *)error {
    [self sendEvent:POBRN_EVENT_FAILED_TO_LOAD_AD error:error];
}

/** Notifies the delegate of an error encountered while rendering an ad. */
- (void)interstitial:(POBInterstitial *)interstitial
    didFailToShowAdWithError:(NSError *)error {
    [self sendEvent:POBRN_EVENT_FAILED_TO_SHOW_AD error:error];
}

- (void)interstitialWillPresentAd:(POBInterstitial *)interstitial {
    // Not application
}

/** Notifies the delegate that the interstitial ad view has presented on top of the current view/screen. */
- (void)interstitialDidPresentAd:(POBInterstitial *)interstitial {
    [self sendEvent:POBRN_EVENT_AD_OPENED];
}

/** Notifies the delegate that the interstitial ad view has closed the ad on top of the current view. */
- (void)interstitialDidDismissAd:(POBInterstitial *)interstitial {
    [self sendEvent:POBRN_EVENT_AD_CLOSED];
}

/** Notifies the delegate that the user has clicked the ad view. */
- (void)interstitialDidClickAd:(POBInterstitial *)interstitial {
    [self sendEvent:POBRN_EVENT_DID_CLICK_AD];
}

/**Notifies the delegate that an ad has been expired. */
- (void)interstitialDidExpireAd:(POBInterstitial *)interstitial {
    [self sendEvent:POBRN_EVENT_AD_EXPIRED];
}

/** Notifies the delegate whenever the current app goes in the background due to the user click interaction. */
- (void)interstitialWillLeaveApplication:(POBInterstitial *)interstitial {
    [self sendEvent:POBRN_EVENT_WILL_LEAVE_APP];
}

#pragma mark - POBInterstitialVideoDelegate

/**Notifies the delegate that an ad has been expired. */
- (void)interstitialDidFinishVideoPlayback:(POBInterstitial *)interstitial {
    [self sendEvent:POBRN_EVENT_VIDEO_PLAYBACK_COMPLETED];
}

#pragma mark - Private methods

- (void)sendEvent:(NSString *)eventName {
    [self sendEvent:eventName error:nil];
}

/**
 * A helper method to send the interstitial ad event using the emitter instance.
 *
 * @param eventName The name of the interstitial ad event name to be sent.
 * @param error The error object to be passed as part of interstitial ad event.
 */
- (void)sendEvent:(NSString *)eventName error:(nullable NSError *)error {
    [self.eventEmitter emitEventWithEmbeddedEventName:eventName error:error];
}

@end
