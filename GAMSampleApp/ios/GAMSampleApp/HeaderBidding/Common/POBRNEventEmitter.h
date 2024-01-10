#import <Foundation/Foundation.h>
#import <React/RCTEventEmitter.h>
#import <OpenWrapSDK/OpenWrapSDK.h>
#import "POBRNConstants.h"

NS_ASSUME_NONNULL_BEGIN

/**
 * An event emitter class which emits event to JS side only when at least one of active listener is available.
 * NOTE: All full screen ad module classes should be subclassed from this class to leverage the benefits of keeping
 * event emission code at common place.
 */
@interface POBRNEventEmitter : RCTEventEmitter

/**
 * Creates an instance of a emitter class which can emits events with the full screen ad type event name.
 * The subclasses should provide respective full screen ad type as init param.
 *
 * @param adType The full screen ad type.
 * @return An instance of @c POBRNEventEmitter.
 */
- (instancetype)initWithFullScreenAdType:(POBRNFullScreenAdType)adType NS_DESIGNATED_INITIALIZER;
- (instancetype)initWithDisabledObservation NS_UNAVAILABLE;

/**
 * Emits a global event with given event payload details.
 *
 * @param embeddedEventName The event name should be included in the global event's payload data.
 * @param error The optional error details to be added in the event payload.
 */
- (void)emitEventWithEmbeddedEventName:(NSString *)embeddedEventName
                                 error:(nullable NSError *)error;

/**
 * Emits a global event with given event payload details.
 *
 * @param embeddedEventName The event name should be included in the global event's payload data.
 * @param reward The reward details to be added in the event payload.
 */
- (void)emitEventWithEmbeddedEventName:(NSString *)embeddedEventName
                                reward:(POBReward *)reward;

@end

NS_ASSUME_NONNULL_END
