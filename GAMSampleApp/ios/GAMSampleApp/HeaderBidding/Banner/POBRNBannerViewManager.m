#import "POBRNBannerViewManager.h"
#import "POBRNBannerView.h"
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

#pragma mark - Public APIs

/** An event block invoked when banner ad is received after loading it. */
RCT_EXPORT_VIEW_PROPERTY(onAdReceived, RCTDirectEventBlock)

/** An event block invoked when banner ad is failed to load/receive. */
RCT_EXPORT_VIEW_PROPERTY(onAdFailedToLoad, RCTDirectEventBlock)

/** An event block invoked when banner ad will launch a model on top of current controller as result of the user interaction. */
RCT_EXPORT_VIEW_PROPERTY(onAdOpened, RCTDirectEventBlock)

/** An event block invoked when banner ad is clicked. */
RCT_EXPORT_VIEW_PROPERTY(onAdClicked, RCTDirectEventBlock)

/** An event block invoked when banner ad has dismissed a model on top of current controller. */
RCT_EXPORT_VIEW_PROPERTY(onAdClosed, RCTDirectEventBlock)

/** An event block invoked when the current app moves into background as result of user interaction. */
RCT_EXPORT_VIEW_PROPERTY(onAppLeaving, RCTDirectEventBlock)

/** Sets the ad unit details using JSON string and loads banner ad. */
RCT_CUSTOM_VIEW_PROPERTY(adUnitDetails, NSString, POBRNBannerView) {
    // Here the `view` property auto-refers to `POBRNBannerView` class instance.
    // The `json` property auto-refers to JSON string value set for adUnitDetails prop from JS side.
    [view loadAdWithAdUnitDetailsJSON:json];
}

@end
