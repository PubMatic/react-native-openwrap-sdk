#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * This Class demonstrates how to write a view manager to connect JS side code with POBRNBannerView class.
 * You can use @c RCT_EXPORT_VIEW_PROPERTY marco to expose properties which can be used from JS side to
 * receive banner callback with data from the native.
 * You can use @c RCT_CUSTOM_VIEW_PROPERTY marco to expose the custom properties which can be used to
 * set data from JS side to native side.
 * You can use the same class or follow the similar implementation in your React Native application.
 */
@interface POBRNBannerViewManager : RCTViewManager

@end

NS_ASSUME_NONNULL_END
