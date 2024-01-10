#import "POBRNBannerView.h"
#import "POBRNAdHelper.h"
#import "POBRNConstants.h"

#import <OpenWrapSDK/OpenWrapSDK.h>
#import <OpenWrapHandlerDFP/OpenWrapHandlerDFP.h>
#import <UIKit/UIKit.h>

@interface POBRNBannerView () <POBBannerViewDelegate>
@property (nonatomic, strong) POBBannerView *bannerView;
@end

@implementation POBRNBannerView

- (void)loadAdWithAdUnitDetailsJSON:(NSString *)json {
    // Convert JSON string into `POBAdUnitDetails` instance.
    NSError *jsonParsingError = nil;
    POBAdUnitDetails *bannerAdUnitDetails =
    [POBAdUnitDetails buildFromAdUnitDetailsJson:json error:&jsonParsingError];

    // In case of JSON parsing failure, emit the invalid request error back to React JS side.
    if (jsonParsingError && bannerAdUnitDetails == nil) {
        [self sendAdUnitDetailsParsingFailedEvent:jsonParsingError];
        return;
    }

    // If the JS app undergoes a hot reload, the POBRNBannerView instance remains the same,
    // however a new POBBannerView instance get created when `loadAdWithAdUnitDetailsJSON` method is called.
    // This can lead to multiple ad views overlapping. To prevent this overlap, it is required to clear the
    // previous POBBannerView instance and remove it from the view hierarchy.
    [self cleanUpPreviousBannerView];

    // Create instance of event handler for GAM header bidding with GAM ad unit id and ad sizes.
    DFPBannerEventHandler *eventHandler =
        [[DFPBannerEventHandler alloc] initWithAdUnitId:bannerAdUnitDetails.gamAdUnitId
                                               andSizes:bannerAdUnitDetails.adSizes];

    // Config block for setting custom targeting or extra parameters on GAM request.
    eventHandler.configBlock = ^(GAMBannerView *view, GAMRequest *request, POBBid *bid) {
        // Here, you have a provision to set the custom targeting to ad server using the
        // bid parameter as illustrated below:
        // NSDictionary *gamCustomTargeting = [[NSDictionary alloc] initWithObjectsAndKeys:@"value1", @"key1", nil];
        // [request setCustomTargeting:gamCustomTargeting];
    };

    // Create instance of POBBannerView object with OW ad unit details and event handler.
    self.bannerView = [[POBBannerView alloc] initWithPublisherId:bannerAdUnitDetails.publisherId
                                                       profileId:bannerAdUnitDetails.profileId
                                                        adUnitId:bannerAdUnitDetails.owAdUnitId
                                                    eventHandler:eventHandler];

    // Set the banner delegate.
    self.bannerView.delegate = self;

    // Load banner ad.
    [self.bannerView loadAd];

    // Add banner view into the view hierarchy and setup constraints.
    [self addSubview: self.bannerView];
    self.bannerView.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints: @[
        [self.bannerView.widthAnchor constraintEqualToAnchor: self.widthAnchor],
        [self.bannerView.heightAnchor constraintEqualToAnchor: self.heightAnchor],
        [self.bannerView.centerXAnchor constraintEqualToAnchor: self.centerXAnchor],
        [self.bannerView.centerYAnchor constraintEqualToAnchor: self.centerYAnchor]
    ]];
}

#pragma mark - POBBannerViewDelegate

- (UIViewController *)bannerViewPresentationController {
    return [POBRNAdHelper topViewController];
}

- (void)bannerViewDidReceiveAd:(POBBannerView *)bannerView {
    // Set the banner view frames based on received ad sizes.
    CGRect rect = bannerView.frame;
    CGSize size = bannerView.creativeSize.cgSize;
    rect.size = size;
    bannerView.frame = rect;

    // Emit the ad received event with the ad size.
    if (self.onAdReceived) {
        self.onAdReceived(@{
            POBRN_AD_UNIT_WIDTH: [NSNumber numberWithDouble:size.width],
            POBRN_AD_UNIT_HEIGHT: [NSNumber numberWithDouble:size.height],
        });
    }
}

- (void)bannerView:(POBBannerView *)bannerView didFailToReceiveAdWithError:(NSError *)error {
    [self sendFailedToReceivedAdEventWithError:error];
}

- (void)bannerViewDidClickAd:(POBBannerView *)bannerView {
    if (self.onAdClicked) {
        self.onAdClicked(@{});
    }
}

- (void)bannerViewWillPresentModal:(POBBannerView *)bannerView {
    if (self.onAdOpened) {
        self.onAdOpened(@{});
    }
}

- (void)bannerViewDidDismissModal:(POBBannerView *)bannerView {
    if (self.onAdClosed) {
        self.onAdClosed(@{});
    }
}

- (void)bannerViewWillLeaveApplication:(POBBannerView *)bannerView {
    if (self.onAppLeaving) {
        self.onAppLeaving(@{});
    }
}

#pragma mark - Private methods

- (void)cleanUpPreviousBannerView {
    if (self.bannerView) {
        self.bannerView.delegate = nil;
        [self.bannerView removeFromSuperview];
        self.bannerView = nil;
    }
}

- (void)sendAdUnitDetailsParsingFailedEvent:(NSError *)jsonParsingError {
    NSString *errorMessage = [NSString stringWithFormat:@"%@ with %@",
                              POBRN_INVALID_REQUEST_FAILURE_MSG,
                              jsonParsingError.localizedDescription];
    NSDictionary *userInfo = @{ NSLocalizedDescriptionKey: errorMessage };

    NSError *invalidRequestError = [NSError errorWithDomain:POBRN_ERROR_DOMAIN
                                                       code:POBErrorInvalidRequest
                                                   userInfo:userInfo];
    [self sendFailedToReceivedAdEventWithError:invalidRequestError];
}

- (void)sendFailedToReceivedAdEventWithError:(NSError *)error {
    if (self.onAdFailedToLoad) {
        self.onAdFailedToLoad(@{
            POBRN_ERROR_CODE : [NSNumber numberWithInteger: error.code],
            POBRN_ERROR_MESSAGE: error.localizedDescription
        });
    }
}

@end
