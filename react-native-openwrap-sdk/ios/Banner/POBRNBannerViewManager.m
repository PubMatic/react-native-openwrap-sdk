#import "POBRNBannerViewManager.h"
#import "POBRNBannerView.h"
#import <React/RCTLog.h>
#import <React/RCTUIManager.h>
#import <UIKit/UIKit.h>

@implementation POBRNBannerViewManager

#pragma mark - Overriden methods

RCT_EXPORT_MODULE(POBRNBannerView)

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (UIView *)view {
    return [[POBRNBannerView alloc] initWithFrame:CGRectZero];
}

#pragma mark - Public event callback APIs

RCT_EXPORT_VIEW_PROPERTY(onAdReceived, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdFailedToLoad, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBidReceived, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBidFailed, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onProceedToLoadAd, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdOpened, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdClicked, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdClosed, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAppLeaving, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onForceRefresh, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBidExpiryStatusEvent, RCTDirectEventBlock)

#pragma mark - Public setter APIs

RCT_EXPORT_VIEW_PROPERTY(proceedToLoadAd, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(proceedOnError, NSString)
RCT_EXPORT_VIEW_PROPERTY(autoRefreshState, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(forceRefresh, NSNumber)

/** Load the ad from `adUnitDetails` property's setter call. */
RCT_CUSTOM_VIEW_PROPERTY(adUnitDetails, NSString, POBRNBannerView) {
    [view loadAdWithAdUnitDetailsJSON:json];
}

#pragma mark - Public methods

/**
 * Checks the bid expiry status and emits an event with the result
 * using the event callback method @c onBidExpiryStatusEvent.
 *
 * If the bid object is not available, it will not emit an event with the bid expiry status.
 */
RCT_EXPORT_METHOD(fetchBidExpiryStatus:(nonnull NSNumber*) reactTag) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        POBRNBannerView *bannerView = viewRegistry[reactTag];
        if (!bannerView || ![bannerView isKindOfClass:[POBRNBannerView class]]) {
            RCTLogError(@"Cannot find POBRNBannerView with tag #%@", reactTag);
            return;
        }
        [bannerView fetchBidExpiryStatus];
    }];
}

@end
