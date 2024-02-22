#import <Foundation/Foundation.h>
#import "POBRNFullScreenAd.h"

NS_ASSUME_NONNULL_BEGIN

/** Ad Manager class to store ad instances of full screen ads. */
@interface POBRNFullScreenAdManager : NSObject

- (instancetype)init NS_UNAVAILABLE;

/** Adds the ad instance in into the map with given instance id as key. */
+ (void)add:(id<POBRNFullScreenAd>)adInstance forInstanceId:(NSString *)instanceId;

/** Removes the ad instance in from the map for given instance id as key. */
+ (void)removeForInstanceId:(NSString *)instanceId;

/** Returns the ad instance in from the map with given instance id as key. */
+ (nullable id<POBRNFullScreenAd>)adForInstanceId:(NSString *)instanceId;

/** Returns a boolean value which indicates if ad instance if present in map for the given instance id. */
+ (BOOL)contains:(NSString *)instanceId;

@end

NS_ASSUME_NONNULL_END
