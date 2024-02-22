#import "POBRNBannerView.h"
#import "POBRNAdHelper.h"
#import "POBRNConstants.h"

#import <OpenWrapSDK/OpenWrapSDK.h>
#import <UIKit/UIKit.h>

/** An enum to represent the banner auto refresh states. */
typedef NS_ENUM(NSInteger, POBRNAutoRefreshState) {
    POBRNAutoRefreshStateDefault = 0,
    POBRNAutoRefreshStatePause = 1,
    POBRNAutoRefreshStateResume = 2,
};

@interface POBRNBannerView () <POBBannerViewDelegate, POBBidEventDelegate>
@property (nonatomic, strong) POBBannerView *bannerView;
@end

@implementation POBRNBannerView

- (void)loadAdWithAdUnitDetailsJSON:(NSString *)json {
    // Convert JSON string into `POBAdUnitDetails` instance.
    NSError *jsonParsingError = nil;
    POBAdUnitDetails *bannerAdUnitDetails =
        [POBAdUnitDetails buildFromJSONString:json error:&jsonParsingError];
    if (jsonParsingError && bannerAdUnitDetails == nil) {
        [self sendAdUnitDetailsParsingFailedEvent:jsonParsingError];
        return;
    }

    // If the JS app undergoes a hot reload, the POBRNBannerView instance remains the same,
    // however a new POBBannerView instance get created when `loadAdWithAdUnitDetailsJSON` method is called.
    // This can lead to multiple ad views overlapping. To prevent this overlap, it is required to clear the
    // previous POBBannerView instance and remove it from the view hierarchy.
    [self cleanUpPreviousBannerView];

    // Create banner instance.
    self.bannerView = [[POBBannerView alloc] initWithPublisherId:bannerAdUnitDetails.publisherId
                                                       profileId:bannerAdUnitDetails.profileId
                                                        adUnitId:bannerAdUnitDetails.adUnitId
                                                         adSizes:bannerAdUnitDetails.bannerSizes];

    // check if 'get bid price' feature is enabled then only set bid event listener.
    if (bannerAdUnitDetails.enableGetBidPrice) {
        self.bannerView.bidEventDelegate = self;
    }

    // Set the delegate
    self.bannerView.delegate = self;

    // Parse and set request and impression parameters
    [POBRNAdHelper setUpRequest:self.bannerView.request
                 withParameters:json
               andNestedParsing:YES];
    [POBRNAdHelper setUpImpression:self.bannerView.impression
                    withParameters:json
                  andNestedParsing:YES];

    // Load Ad
    [self.bannerView loadAd];
    self.bannerView.translatesAutoresizingMaskIntoConstraints = NO;
    [self addSubview: self.bannerView];
    [NSLayoutConstraint activateConstraints: @[
        [self.bannerView.widthAnchor constraintEqualToAnchor: self.widthAnchor],
        [self.bannerView.heightAnchor constraintEqualToAnchor: self.heightAnchor],
        [self.bannerView.centerXAnchor constraintEqualToAnchor: self.centerXAnchor],
        [self.bannerView.centerYAnchor constraintEqualToAnchor: self.centerYAnchor]
    ]];
}

- (void)setAutoRefreshState:(NSNumber *)state {
    switch(state.intValue) {
        case POBRNAutoRefreshStatePause:
            [self.bannerView pauseAutoRefresh];
            break;
        case POBRNAutoRefreshStateResume:
            [self.bannerView resumeAutoRefresh];
            break;
        case POBRNAutoRefreshStateDefault:
            // No action, banner stays in the last / initial default state.
            break;
    }
}

- (void)setForceRefresh:(NSNumber *)value {
    // Trigger the banner force refresh only if value is non-zero.
    // This check is added to avoid automatic first force refresh call during banner ad rendering.
    if (value.intValue != 0 && self.onForceRefresh) {
        BOOL status = [self.bannerView forceRefresh];
        self.onForceRefresh(@{
            POBRN_BANNER_FORCE_REFRESH_STATUS: [NSNumber numberWithBool:status]
        });
    }
}

- (void)setProceedToLoadAd:(NSNumber *)value {
    // Trigger the proceed to load ad only if value is non-zero.
    // This check is added to avoid automatic proceed to load ad call during banner ad rendering.
    if (value.intValue != 0 && self.onProceedToLoadAd) {
        BOOL proceedToLoadAdStatus = [self.bannerView proceedToLoadAd];
        self.onProceedToLoadAd(@{
            POBRN_BANNER_PROCEED_TO_LOAD_AD_STATUS: [NSNumber numberWithBool:proceedToLoadAdStatus]
        });
    }
}

- (void)setProceedOnError:(NSString *)jsonString {
    NSString *bidErrorJSON = [POBRNAdHelper removeLastUnderscoreAndSubstring:jsonString];
    if (bidErrorJSON.length > 0) {
        NSDictionary *errorDetails = [POBRNAdHelper convertJsonStringToJSON:bidErrorJSON error:nil];
        NSNumber *errCode = errorDetails[POBRN_ERROR_CODE];
        NSString *errMsg  = errorDetails[POBRN_ERROR_MESSAGE];

        POBBidEventErrorCode bidEventErrorCode = POBBidEventErrorOther;
        if (errCode != nil) {
            // Error code is available in the errorDetails
            bidEventErrorCode = [POBRNAdHelper bidEventErrorCodeForCode:errCode.integerValue];
        }
        [self.bannerView proceedOnError:bidEventErrorCode andDescription:errMsg];
    }
}

- (void)fetchBidExpiryStatus {
    BOOL isBidExpired = [self.bannerView.bid isExpired];
    if (self.onBidExpiryStatusEvent) {
        self.onBidExpiryStatusEvent(@{
            POBRN_BID_EXPIRY_STATUS: [NSNumber numberWithBool:isBidExpired]
        });
    }
}

#pragma mark - POBBidEventDelegate

- (void)bidEvent:(id<POBBidEvent>)bidEventObject didReceiveBid:(POBBid *)bid {
    // Create writable map and add width, height and other bid data.
    if (self.onBidReceived) {
        NSDictionary *bidDetails = [POBRNAdHelper bidDictionaryFromBid:self.bannerView.bid];
        self.onBidReceived(bidDetails);
    }
}

- (void)bidEvent:(id<POBBidEvent>)bidEventObject didFailToReceiveBidWithError:(NSError *)error {
    if (self.onBidFailed) {
        self.onBidFailed([POBRNAdHelper errorDictionaryFromError:error]);
    }
}

#pragma mark - POBBannerViewDelegate

- (UIViewController *)bannerViewPresentationController {
    return [POBRNAdHelper topViewController];
}

- (void)bannerViewDidReceiveAd:(POBBannerView *)bannerView {
    CGRect rect = bannerView.frame;
    CGSize size = bannerView.creativeSize.cgSize;
    rect.size = size;
    bannerView.frame = rect;

    if (self.onAdReceived) {
        // Create extra data dictionary
        NSDictionary *extraData = [POBRNAdHelper bidDictionaryFromBid:bannerView.bid];
        self.onAdReceived(extraData);
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
    NSString *errorMessage = [NSString stringWithFormat:@"%@ %@", POBRN_INVALID_REQUEST_FAILURE_MSG, jsonParsingError.localizedDescription];
    NSDictionary *userInfo = @{ NSLocalizedDescriptionKey: errorMessage };

    NSError *invalidRequestError = [NSError errorWithDomain:POBRN_ERROR_DOMAIN
                                                       code:POBErrorInvalidRequest
                                                   userInfo:userInfo];
    [self sendFailedToReceivedAdEventWithError:invalidRequestError];
}

- (void)sendFailedToReceivedAdEventWithError:(NSError *)error {
    if (self.onAdFailedToLoad) {
        self.onAdFailedToLoad([POBRNAdHelper errorDictionaryFromError:error]);
    }
}

@end
