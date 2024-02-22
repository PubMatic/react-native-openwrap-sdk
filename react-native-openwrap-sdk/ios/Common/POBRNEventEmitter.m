#import "POBRNEventEmitter.h"
#import "POBRNConstants.h"
#import "POBRNAdHelper.h"
#import <React/RCTLog.h>

@implementation POBRNEventEmitter {
    /**
     * A Boolean value that indicates whether there are any active listeners for events.
     * Set value - @c YES when the first listener of this module is added.
     * Set value - @c NO when the last listener of this module is removed or module is deallocalated.
     */
    BOOL _hasListeners;

    /**
     * Global event name used to send the events. The subclass will pass the full screen ad type in this class's initializer.
     * Based on the ad type, respective string name will be stored in this variable.
     */
    NSString *_adEventName;
}

- (instancetype)initWithFullScreenAdType:(POBRNFullScreenAdType)adType {
    self = [super init];
    if (self) {
        _adEventName = [POBRNEventEmitter adEventNameForAdType:adType];
    }
    return self;
}

#pragma mark - Overriden methods

/**
 * The queue that will be used to call all exported methods.
 * NOTE: Subclasses can provide different queue if all exported methods not need to be called on main queue.
 */
- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

/**
 * Returns @c YES if the RCTBridge module has custom initializers or exported constants, otherwise @c NO.
 * NOTE: The subclass should override this property incase of setting a different value.
 */
+ (BOOL)requiresMainQueueSetup {
    return YES;
}

/** Returns a list of events this module can emit. */
- (NSArray<NSString *> *)supportedEvents {
    return [self eventNames];
}

/** Called when this module's first listener is added. */
-(void)startObserving {
    _hasListeners = YES;
}

/** Called when this module's last listener is removed, or on dealloc. */
-(void)stopObserving {
    _hasListeners = NO;
}

#pragma mark - Public methods

- (void)emitEventWithEmbeddedEventName:(NSString *)eventName
                            instanceId:(NSString *)instanceId
                                 error:(nullable NSError *)error {
    NSDictionary *errorDetails = [POBRNAdHelper errorDictionaryFromError:error];
    [self emitEventWithEmbeddedEventName:eventName
                              instanceId:instanceId
                              andPayload:errorDetails];
}

- (void)emitEventWithEmbeddedEventName:(NSString *)eventName
                            instanceId:(NSString *)instanceId
                            andPayload:(NSDictionary *)payload {
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];

    // 1. Add event name
    dict[POBRN_EVENT_NAME_KEY] = eventName;
    // 2. Add instance id
    dict[POBRN_AD_INSTANCE_ID] = instanceId;
    // 3. Add extra data if available
    [POBRNAdHelper setObjectSafely:payload forKey:POBRN_EVENT_PAYLOAD_EXTRA_KEY intoDictionary:dict];

    // Convert payload to JSON string.
    NSError *error = nil;
    NSString *extraParams = [POBRNAdHelper convertDictionaryToJSON:dict error:&error];

    if (error) {
        RCTLogAdvice(@"JSON serialization failed with error: code = %ld, description = %@", (long)error.code, error.localizedDescription);
    }

    // Emit event with the payload as a string
    [self emitEventWithEventBody:extraParams];
}

#pragma mark - Private methods

+ (NSString *)adEventNameForAdType:(POBRNFullScreenAdType)adType {
    // Keep the supported full screen ad event names mapped with ad type.
    // When adding a new ad type, make sure to add its equivalent string entry here.
    switch (adType) {
        case POBRNFullScreenAdTypeInterstitial:
            return POBRN_INTERSTITIAL_AD_EVENT;
        case POBRNFullScreenAdTypeRewarded:
            return POBRN_REWARDED_AD_EVENT;
    }
}

- (NSArray<NSString *> *)eventNames {
    // Keep the supported full screen ad event names mapped with ad type.
    // When adding a new ad type, make sure to add its equivalent string entry here.
    return @[ POBRN_INTERSTITIAL_AD_EVENT, POBRN_REWARDED_AD_EVENT ];
}

- (void)emitEventWithEventBody:(id)eventBody {
    if (_hasListeners && eventBody != nil) {
        [super sendEventWithName:_adEventName body:eventBody];
    }
}

@end
