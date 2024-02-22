#import "POBRNFullScreenAdManager.h"

@implementation POBRNFullScreenAdManager

#pragma mark - Public methods

+ (void)add:(id<POBRNFullScreenAd>)adInstance forInstanceId:(NSString *)instanceId {
    if (instanceId.length > 0) {
        [[self adInstanceDict] setObject:adInstance forKey:instanceId];
    }
}

+ (void)removeForInstanceId:(NSString *)instanceId {
    if (instanceId.length > 0) {
        [[self adInstanceDict] removeObjectForKey:instanceId];
    }
}

+ (nullable id<POBRNFullScreenAd>)adForInstanceId:(NSString *)instanceId {
    if (instanceId.length > 0) {
        return [[self adInstanceDict] objectForKey:instanceId];
    }
    return nil;
}

+ (BOOL)contains:(NSString *)instanceId {
    return [self adForInstanceId:instanceId] != nil;
}

#pragma mark - Private methods

+ (NSMutableDictionary<NSString *, id<POBRNFullScreenAd>> *)adInstanceDict {
    // Create a singleton instance.
    static NSMutableDictionary<NSString *, id<POBRNFullScreenAd>> *_adInstanceDict = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _adInstanceDict = [NSMutableDictionary dictionary];
    });
    return _adInstanceDict;
}

@end
