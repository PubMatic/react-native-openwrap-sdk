#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <OpenWrapSDK/OpenWrapSDK.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.moduleName = @"GAMSampleApp";
    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = @{};

    POBApplicationInfo *appInfo = [[POBApplicationInfo alloc] init];
    appInfo.storeURL = [NSURL URLWithString:@"https://itunes.apple.com/us/app/pubmatic-sdk-app/id1175273098?mt=8"];
    [OpenWrapSDK setApplicationInfo:appInfo];
    [OpenWrapSDK setLogLevel:POBSDKLogLevelAll];

    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
