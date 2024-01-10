#import "POBRNEventEmitter.h"
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * This Class demonstrates how to write a bridge to connect JS side code with OpenWrap SDK interstitial wrapper class.
 * You can use @c RCT_EXPORT_METHOD marco to expose methods which can be called from JS side while loading interstitial ads.
 * You can use the same class or follow the similar implementation in your React Native application.
 *
 * This bridge module is subclassed from the @c POBRNEventEmitter to facilitate a event emission through a common place.
 */
@interface POBRNInterstitialModule : POBRNEventEmitter <RCTBridgeModule>

@end

NS_ASSUME_NONNULL_END
