#import <Foundation/Foundation.h>
#import <React/RCTEventEmitter.h>
#import <OpenWrapSDK/OpenWrapSDK.h>
#import "POBRNConstants.h"

NS_ASSUME_NONNULL_BEGIN

/**
 * An event emitter class which emits event to JS side only when at least one of active listener is available.
 * NOTE: All full screen ad module classes should be subclassed from this class.
 */
@interface POBRNEventEmitter : RCTEventEmitter

/**
 * Creates an instance of a emitter class which can emits events with the full screen ad type event name.
 * The subclasses should provid respective full screen ad type as init param.
 *
 * @param adType The full screen ad type.
 * @return An instance of @c POBRNEventEmitter.
 */
- (instancetype)initWithFullScreenAdType:(POBRNFullScreenAdType)adType NS_DESIGNATED_INITIALIZER;

- (instancetype)initWithDisabledObservation NS_UNAVAILABLE;
- (instancetype)init NS_UNAVAILABLE;

/**
 * Emits a global event with given event payload details.
 *
 * @param embeddedEventName The event name should be included in the global event's payload data.
 * @param instanceId The unique identifier of the instance for which event will be emitted.
 * @param error The optional error details to be added in the eveny payload.
 */
- (void)emitEventWithEmbeddedEventName:(NSString *)embeddedEventName
                            instanceId:(NSString *)instanceId
                                 error:(nullable NSError *)error;

/**
 * Emits a global event with given event payload details.
 *
 * @param eventName The event name should be included in the global event's payload data.
 * @param instanceId The unique identifier of the instance for which event will be emitted.
 * @param payload Generic payload as NSDictionary
 */
- (void)emitEventWithEmbeddedEventName:(NSString *)eventName
                            instanceId:(NSString *)instanceId
                            andPayload:(nullable NSDictionary *)payload;

@end

NS_ASSUME_NONNULL_END
