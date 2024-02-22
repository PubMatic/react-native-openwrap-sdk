#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/** A protocol to defines a set of methods which should be implemented by full screen view. */
@protocol POBRNFullScreenAd <NSObject>

/** Loads the full screen ad. */
- (void)loadAd;

/** Shows the full screen ad on top of current view controller. */
- (void)showAd;

/** Resets the delegate handler of the full screen ad instance. */
- (void)destroyAd;

/**
 * Returns ad readiness status with boolean value.
 */
- (BOOL)isReady;

/**
 * Sets the request parameters on the full screen ad request object.
 *
 * @param jsonString A JSON string of ad request parameters.
 */
- (void)setRequestParameters:(NSString *)jsonString;

/**
 * Sets the impression parameters on the full screen ad impression tracking object.
 *
 * @param jsonString A JSON string of ad impression parameters.
 */
- (void)setImpressionParameters:(NSString *)jsonString;

/**
 * Set listener to bid event.
 */
- (void)setBidEvent;

/**
 * Bid event API to notify to proceeds with bid flow. This method should be called only when bidEvent:didReceiveBid: is triggered.
 *
 * @return Returns the BOOL value indicating success or fail.
 */
- (BOOL)proceedToLoadAd;

/**
 * Bid event method to proceed with bid flow with error. The error details are expected in jsonString.
 *
 * @param jsonString Error details in JSON string format.
 * @discussion e.g.  "{\"errorCode\": 0, \"errorMessage\":\ "Lost client-side auction..\"}
 */
- (void)proceedOnError:(NSString *)jsonString;

/**
 * Returns bid expiry status of the bid object received for the full screen ad.
 */
- (BOOL)isBidExpired;

@optional
/**
 * Sets title, message & button texts to be used while showing the skip alert.
 *
 * @discussion :-
 *  - If any of the parameters is empty the SDK discards all the values & shows a default skip alert.
 *  - This method should be implemented for rewarded ad type.
 *
 * @param title the title of the alert.
 * @param message The message of the alert.
 * @param resumeButtonText The title of the resume button.
 * @param closeButtonText The title of the close button.
 */
- (void)setSkipAlertDialogInfo:(NSString *)title
                       message:(NSString *)message
              resumeButtonText:(NSString *)resumeButtonText
               closeButtonText:(NSString *)closeButtonText;

@end

NS_ASSUME_NONNULL_END
