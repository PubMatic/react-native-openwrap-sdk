import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  checkMultiple,
  Permission,
  requestMultiple,
} from 'react-native-permissions';
import {
  OpenWrapSDK,
  POBApplicationInfo,
  POBLocation,
  POBUserInfo,
} from 'react-native-openwrap-sdk';

import HomeScreen from './HomeScreen';
import BannerScreen from './screens/primary-ad-sdk/BannerScreen';
import MRECDisplayScreen from './screens/primary-ad-sdk/MRECDisplayScreen';
import MRECVideoScreen from './screens/primary-ad-sdk/MRECVideoScreen';
import InterstitialDisplayScreen from './screens/primary-ad-sdk/InterstitialDisplayScreen';
import InterstitialVideoScreen from './screens/primary-ad-sdk/InterstitialVideoScreen';
import RewardedScreen from './screens/primary-ad-sdk/RewardedScreen';
import BannerListScreen from './screens/primary-ad-sdk/BannerListScreen';
import Constants from './Constants';
import InHouseMediationBannerScreen from './screens/in-house-mediation/InHouseMediationBannerScreen';
import InHouseMediationInterstitialScreen from './screens/in-house-mediation/InHouseMediationInterstitialScreen';
import InHouseMediationRewardedScreen from './screens/in-house-mediation/InHouseMediationRewardedScreen';
import { Platform } from 'react-native';

// Creating navigation stack.
const Stack = createNativeStackNavigator();

/**
 * Registers all the screens and navigate be default to Home Screen.
 */
const MainScreen = () => {
  useEffect(() => {
    // Checking for the permissions and askig if not granted.
    checkMultiple(Constants.PERMISSIONS).then((value) => {
      let deniedPermissions: Permission[] = [];
      Constants.PERMISSIONS.forEach((permission) => {
        if (value[permission] === 'denied') {
          deniedPermissions.push(permission);
        }
      });
      if (deniedPermissions.length !== 0) {
        requestMultiple(deniedPermissions);
      }
    });

    // Set the required and optional global parameters.
    setGlobalParams();
  }, []);

  /**
   * Used to set the required and optional parameters on OpenWrapSDK.
   */
  const setGlobalParams = () => {
    // Optional - Fetch OpenWrap SDK version and print it over console
    console.log(`SDK version ${OpenWrapSDK.getVersion()}`);

    // Optional - Set the OpenWrap SDK log level to all
    if (__DEV__) {
      OpenWrapSDK.setLogLevel(OpenWrapSDK.LogLevel.All);
    }

    // Optional - Set the User Info to OpenWrap SDK
    var userInfo: POBUserInfo = new POBUserInfo();

    // Optional - Region code using ISO-3166-2; 2-letter state code if USA.
    userInfo.setRegion('NY');

    // Optional - User city
    userInfo.setCity('Rochester');

    // Optional - Designated market area (DMA) code of the user. This field is applicable for US users only.
    userInfo.setMetro('734');

    // Optional - Home zip code for the U.S.; otherwise it indicates the postal code
    userInfo.setZip('14602');

    // Optional - Birth year in YYYY format.
    userInfo.setBirthYear(1990);

    // Optional - User gender
    userInfo.setGender(POBUserInfo.Gender.FEMALE);

    // Optional - Comma-delimited list of keywords indicating the consumer's interests or intent
    userInfo.setKeywords('sports, football, soccer');

    // Optional - Set the User Info to OpenWrap SDK
    OpenWrapSDK.setUserInfo(userInfo);

    // Optional - Set the Application Info to OpenWrap SDK
    var appInfo: POBApplicationInfo = new POBApplicationInfo();

    // Optional - Set Application Keywords.
    appInfo.setKeywords('keywords');

    // Required - A valid Google Play Store Url of an Android app or App Store Url for an iOS app.
    // This app information is a global configuration & you need not set this for
    // every ad request(of any ad type).
    if (Platform.OS === 'ios') {
      // Apple's app store URL
      appInfo.setStoreURL(
        new URL('https://itunes.apple.com/us/app/myapp/id1234567891?mt=0')
      );
    } else if (Platform.OS === 'android') {
      // Google Play store URL
      appInfo.setStoreURL(
        new URL('https://play.google.com/store/apps/details?id=com.example.app')
      );
    }
    // Optional - If the site/app falls under multiple IAB categories, you can send categories separated by comma.
    appInfo.setCategories('IAB-1,IAB-5,IAB1-6');

    // Optional - App Domain
    appInfo.setDomain('https://www.yourappdomain.com');

    // Optional - App is paid or free.
    appInfo.setPaid(true);

    // Optional - Comma delimited list of keywords about the app.
    appInfo.setKeywords('medicine, drugs, pharmaceutical');

    // Optional - Set the Application Info to OpenWrap SDK
    OpenWrapSDK.setApplicationInfo(appInfo);

    // Optional - Disable the location access
    // OpenWrapSDK.allowLocationAccess(false);

    // Optional - Set the Location Coordinates explicitly and set the Location Source as GPS
    // OpenWrapSDK.setLocation(
    //   new POBLocation(POBLocation.Source.GPS, 41.906365, -75.327759)
    // );

    // Optional - Indicates that the user should be served only COPPA-compliant ads.
    // OpenWrapSDK.setCoppa(true);

    // Optional - Disable SSL
    // OpenWrapSDK.setSSLEnabled(false);

    // Optional - Use Internal Browser
    // OpenWrapSDK.setUseInternalBrowser(true);

    // Optional - Disable use of advertising Id
    // OpenWrapSDK.allowAdvertisingId(false);
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#3397D7' },
            headerTitleStyle: {
              fontWeight: 'normal',
              fontSize: 20,
            },
          }}
        >
          <Stack.Screen name="Home">{() => <HomeScreen />}</Stack.Screen>
          <Stack.Screen name="Primary Ad SDK Banner" component={BannerScreen} />
          <Stack.Screen
            name="Primary Ad SDK MREC Display"
            component={MRECDisplayScreen}
          />
          <Stack.Screen
            name="Primary Ad SDK MREC Video"
            component={MRECVideoScreen}
          />
          <Stack.Screen
            name="Primary Ad SDK Interstitial Display"
            component={InterstitialDisplayScreen}
          />
          <Stack.Screen
            name="Primary Ad SDK Interstitial Video"
            component={InterstitialVideoScreen}
          />
          <Stack.Screen
            name="Primary Ad SDK Rewarded"
            component={RewardedScreen}
          />
          <Stack.Screen
            name="Primary Ad SDK Banner List"
            component={BannerListScreen}
          />
          <Stack.Screen
            name="In House Mediation Banner"
            component={InHouseMediationBannerScreen}
          />
          <Stack.Screen
            name="In House Mediation Interstitial"
            component={InHouseMediationInterstitialScreen}
          />
          <Stack.Screen
            name="In House Mediation Rewarded"
            component={InHouseMediationRewardedScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MainScreen;
