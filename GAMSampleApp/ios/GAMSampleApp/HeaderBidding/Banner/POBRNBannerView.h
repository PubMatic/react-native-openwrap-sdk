#import "POBAdUnitDetails.h"
#import <React/RCTView.h>
#import <React/RCTViewManager.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * This class demonstrates how to integrate OpenWrap SDK banner ads through GAM Header Bidding in React Native environments.
 * You can add custom targeting to GAM by using config block and also use methods to facilitate your use case by going through OpenWrap SDK integration guide.
 * This class can be reused or customized as per the requirement in your React Native application.
 */
@interface POBRNBannerView : RCTView

/** An event block invoked when banner ad is received after loading it. */
@property (nonatomic, copy) RCTDirectEventBlock onAdReceived;

/** An event block invoked when banner ad is failed to load/receive. */
@property (nonatomic, copy) RCTDirectEventBlock onAdFailedToLoad;

/** An event block invoked when banner ad will launch a model on top of current controller as result of the user interaction. */
@property (nonatomic, copy) RCTDirectEventBlock onAdOpened;

/** An event block invoked when banner ad is clicked. */
@property (nonatomic, copy) RCTDirectEventBlock onAdClicked;

/** An event block invoked when banner ad has dismissed a model on top of current controller. */
@property (nonatomic, copy) RCTDirectEventBlock onAdClosed;

/** An event block invoked when the current app moves into background as result of user interaction. */
@property (nonatomic, copy) RCTDirectEventBlock onAppLeaving;

/**
 * Loads the banner ad by setting up ad unit details.
 *
 * @param json A JSON string which contains the ad unit details.
 */
- (void)loadAdWithAdUnitDetailsJSON:(NSString *)json;

@end

NS_ASSUME_NONNULL_END
