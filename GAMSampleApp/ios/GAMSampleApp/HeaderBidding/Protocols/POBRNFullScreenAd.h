#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * Protocol for FullScreen ad API's.
 * Implement this protocol for creating full screen ads.
 * It contains basic functions required to implement a full screen ad,
 * it can be customized as per the requirements.
 */
@protocol POBRNFullScreenAd <NSObject>

/** Method to be called to load the full screen ad. */
- (void)loadAd;

/**
 * Method to be called to show the full screen ad.
 *
 * @note Check the readiness status of the ad before calling show using @c isReady method.
 */
- (void)showAd;

/** Method to be called to destroy the full screen ad. */
- (void)destroyAd;

/**
 * Method to check if the full screen ad is ready to show.
 */
- (BOOL)isReady;

@end

NS_ASSUME_NONNULL_END
