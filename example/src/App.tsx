import * as React from 'react';

import { StyleSheet, View, Text, Platform } from 'react-native';
import {
  OpenWrapSDK,
  POBLocation,
  POBUserInfo,
  POBApplicationInfo,
} from 'react-native-openwrap-sdk';

export default function App() {
  React.useEffect(() => {
    // Fetch OpenWrap SDK version and print it over console
    console.log(`SDK version ${OpenWrapSDK.getVersion()}`);

    // Set the OpenWrap SDK log level to all
    OpenWrapSDK.setLogLevel(OpenWrapSDK.LogLevel.All);

    // Set the User Info to OpenWrap SDK
    var userInfo: POBUserInfo = new POBUserInfo();
    // Country code using ISO-3166-1-alpha-3.
    userInfo.setCountry('USA');

    // Region code using ISO-3166-2; 2-letter state code if USA.
    userInfo.setRegion('NY');

    // User city
    userInfo.setCity('Rochester');

    // Designated market area (DMA) code of the user. This field is applicable for US users only.
    userInfo.setMetro('734');

    // Home zip code for the U.S.; otherwise it indicates the postal code
    userInfo.setZip('14602');

    // Birth year in YYYY format.
    userInfo.setBirthYear(1990);

    // User gender
    userInfo.setGender(POBUserInfo.Gender.FEMALE);

    // Comma-delimited list of keywords indicating the consumer's interests or intent
    userInfo.setKeywords('sports, football, soccer');
    OpenWrapSDK.setUserInfo(userInfo);

    // Set the Application Info to OpenWrap SDK
    var appInfo: POBApplicationInfo = new POBApplicationInfo();
    appInfo.setKeywords('keywords');
    // A valid Play Store Url of an Android app. Required.

    // Required.
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
    // If the site/app falls under multiple IAB categories, you can send categories separated by comma.
    appInfo.setCategories('IAB-1,IAB-5,IAB1-6');

    // App Domain
    appInfo.setDomain('https://www.yourappdomain.com');
    appInfo.setPaid(true);

    //Comma delimited list of keywords about the app.
    appInfo.setKeywords('medicine, drugs, pharmaceutical');
    OpenWrapSDK.setApplicationInfo(appInfo);

    // Disable the location access
    OpenWrapSDK.allowLocationAccess(false);

    // Set the Location Coordinates explicitly and set the Location Source as GPS
    OpenWrapSDK.setLocation(
      new POBLocation(POBLocation.Source.GPS, 41.906365, -75.327759)
    );

    // Set the CCPA string, compliant with the IAB Specification.
    // Ref - https://github.com/InteractiveAdvertisingBureau/USPrivacy/blob/master/CCPA/US%20Privacy%20String.md
    OpenWrapSDK.setCCPA('<#CCPAString#>');

    // Indicates that the user should be served only COPPA-compliant ads.
    OpenWrapSDK.setCoppa(true);

    // Disable SSL
    OpenWrapSDK.setSSLEnabled(false);

    // Use Internal Browser
    OpenWrapSDK.setUseInternalBrowser(true);

    // Indicates whether or not the ad request is GDPR (General Data Protection Regulation) compliant.
    OpenWrapSDK.setGDPREnabled(true);

    // A valid Base64 encoded consent string as defined at, https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework.
    OpenWrapSDK.setGDPRConsent('<#Base64ConsentString#>');

    // Disable use of advertising Id
    OpenWrapSDK.allowAdvertisingId(false);
  }, []);

  return (
    <View style={styles.container}>
      <Text>OpenWrap SDK Version: {OpenWrapSDK.getVersion()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
