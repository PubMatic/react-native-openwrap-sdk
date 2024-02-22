#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

/** A protocol to defines a set of methods which should be implemented by full screen ad module. */
@protocol POBRNFullScreenAdProvider <NSObject>

/**
 * Creates the full screen ad with given unique ad instance id.
 *
 * @param instanceId A string identifier passed to uniquely identify each ad instance.
 * @param publisherId Unique identifier assigned at the time of publisher onboarding.
 * @param profileId Profile id of the ad tag.
 * @param adUnitId An unit id used to identify unique placement on screen.
 */
- (void)createAdInstance:(NSString *)instanceId
             publisherId:(NSString *)publisherId
               profileId:(NSNumber *)profileId
                adUnitId:(NSString *)adUnitId;

/**
 * Load the full screen ad with given unique ad instance id.
 *
 * @param instanceId A string identifier passed to uniquely identify each ad instance.
 */
- (void)loadAd:(NSString *)instanceId;

/**
 * Shows the full screen ad with given unique ad instance id.
 *
 * @param instanceId A string identifier passed to uniquely identify each ad instance.
 */
- (void)showAd:(NSString *)instanceId;

/**
 * Removes the full screen ad class instance mapped with given instance unique id.
 *
 * @param instanceId A string identifier passed to uniquely identify each ad instance.
 */
- (void)destroy:(NSString *)instanceId;

/**
 * Check if full screen ad is ready to show or not of a given ad instance id.
 * It returns ad readiness status in the resolve promise block.
 *
 * @param instanceId A string identifier passed to uniquely identify each ad instance.
 * @param resolve A promise resolve block to return the ad readiness status.
 * @param reject A promise reject block which can be used for returning any failures.
 */
- (void)isReady:(NSString *)instanceId
        resolve:(RCTPromiseResolveBlock)resolve
         reject:(RCTPromiseRejectBlock)reject;

/**
 * Sets the request parameters on the full screen ad request object.
 *
 * @param instanceId A string identifier passed to uniquely identify each ad instance.
 * @param params Ad request customizable parameters JSON string.
 */
- (void)setRequestParameters:(NSString *)parameterString
               forInstanceId:(NSString *)instanceId;

/**
 * Sets the impression parameters on the full screen ad impression tracking object.
 *
 * @param instanceId A string identifier passed to uniquely identify each ad instance.
 * @param params Ad impression tracking customizable parameters JSON string.
 */
- (void)setImpressionParameters:(NSString *)parameterString
                  forInstanceId:(NSString *)instanceId;

@optional
/**
 * Sets title, message & button texts to be used while showing the skip alert.
 *
 * @discussion :-
 *  - If any of the parameters is empty the SDK discards all the values & shows a default skip alert.
 *  - This method should be implemented for rewarded ad type.
 *
 * @param instanceId A string identifier passed to uniquely identify each ad instance.
 * @param title the title of the alert.
 * @param message The message of the alert.
 * @param resumeButtonText The title of the resume button.
 * @param closeButtonText The title of the close button.
 */
- (void)setSkipAlertDialogInfo:(NSString *)instanceId
                         title:(NSString *)title
                       message:(NSString *)message
              resumeButtonText:(NSString *)resumeButtonText
               closeButtonText:(NSString *)closeButtonText;

@end

NS_ASSUME_NONNULL_END
