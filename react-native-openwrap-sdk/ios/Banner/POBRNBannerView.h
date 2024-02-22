#import "POBAdUnitDetails.h"
#import <React/RCTView.h>
#import <React/RCTViewManager.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * The wrapper class facilitates POBBannerView implementation provides events through RCTDirectEventBlock.
 */
@interface POBRNBannerView : RCTView

/** An event block invoked when banner ad is received after loading it. */
@property (nonatomic, copy) RCTDirectEventBlock onAdReceived;

/** An event block invoked when banner ad is failed to load/receive. */
@property (nonatomic, copy) RCTDirectEventBlock onAdFailedToLoad;

/** An event block invoked when the bid has been successfully received. */
@property (nonatomic, copy) RCTDirectEventBlock onBidReceived;

/** An event block invoked when an error encountered while fetching the bid. */
@property (nonatomic, copy) RCTDirectEventBlock onBidFailed;

/** An event block invoked when proceeds with bid flow is trigged. */
@property (nonatomic, copy) RCTDirectEventBlock onProceedToLoadAd;

/** An event block invoked when banner ad will launch a model on top of current controller as result of the user interaction. */
@property (nonatomic, copy) RCTDirectEventBlock onAdOpened;

/** An event block invoked when banner ad is clicked. */
@property (nonatomic, copy) RCTDirectEventBlock onAdClicked;

/** An event block invoked when banner ad has dismissed a model on top of current controller. */
@property (nonatomic, copy) RCTDirectEventBlock onAdClosed;

/** An event block invoked when the current app moves into background as result of user interaction. */
@property (nonatomic, copy) RCTDirectEventBlock onAppLeaving;

/** An event block invoked when the force refresh status changes. */
@property (nonatomic, copy) RCTDirectEventBlock onForceRefresh;

/**
 * An event block invoked to return the bid expiry status.
 * This event block is called when the fetchBidExpiryStatus method is called
 * and a bid object is available.
 */
@property (nonatomic, copy) RCTDirectEventBlock onBidExpiryStatusEvent;

/**
 * Triggers the banner pause/resume auto refresh call based on the new state value.
 * Pass @c state value as:
 *  - 1: to pause auto refresh
 *  - 2: to resume auto refresh
 *  - other values: to keep the default / last auto refresh state.
 */
@property(nonatomic) NSNumber *autoRefreshState;

/**
 * A property to trigger the banner force refresh.
 * Pass integer values except @c 0 to trigger force refresh.
 */
@property (nonatomic) NSNumber *forceRefresh;

/**
 * Bid event API to notify to proceeds with bid flow. This method should be called only when
 * `bidEvent:didReceiveBid:` is triggered.
 */
@property(nonatomic) NSNumber *proceedToLoadAd;

/**
 * Proceeds with error, flow is completed by setting its state to default considering
 * error at client side.
 * This method should be called only when `bidEvent:didFailToReceiveBidWithError:` is triggered.
 */
@property(nonatomic) NSString *proceedOnError;

/**
 * Loads the banner ad by setting up ad unit details.
 *
 * @param json A JSON string which contains the ad unit details.
 */
- (void)loadAdWithAdUnitDetailsJSON:(NSString *)json;

/**
 * Checks the bid expiry status and emits an event with the result.
 *
 * This method triggers the bid expiry status check and emits the result
 * using the event callback method @c onBidExpiryStatusEvent.
 * If the bid object is not available, it will not emit an event with the bid expiry status.
 */
- (void)fetchBidExpiryStatus;

@end

NS_ASSUME_NONNULL_END
