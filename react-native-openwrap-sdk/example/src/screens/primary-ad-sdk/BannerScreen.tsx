import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  POBAdSize,
  POBBannerView,
  POBBid,
  POBError,
} from 'react-native-openwrap-sdk';
import Constants from '../../Constants';

/**
 * Screen to display banner ad
 */
const BannerScreen = () => {
  // Callback method notifies that the banner ad view is clicked.
  const _onAdClicked = () => {
    console.log('Banner : Ad Clicked');
  };

  // Callback method notifies an error encountered while loading or rendering an ad.
  const _onAdFailed = (error: POBError) => {
    console.log(`Banner : Ad failed with error - ${error.toString()}`);
  };

  // Callback method notifies that the banner ad view will launch a model on top of the current view
  const _onAdOpened = () => {
    console.log('Banner : Ad Opened');
  };

  // Callback method notifies that the banner ad view has dismissed the modal on top of the current view
  const _onAdClosed = () => {
    console.log('Banner : Ad Closed');
  };

  // Callback method notifies when the user clicks the app into the background.
  const _onAppLeaving = () => {
    console.log('Banner : App Leaving');
  };

  // Callback method notifies that an ad has been successfully loaded and rendered.
  const _onAdReceived = (_adSize: POBAdSize, _bid: POBBid) => {
    console.log(`Banner : Ad Received`);
  };

  return (
    <View accessibilityLabel="banner" testID="banner" style={styles.container}>
      {/*
       * Rendering POBBannerView with required properties such as
       * publisherId, profileId, adUnitId, adSizes and optional callbacks.
       */}
      <POBBannerView
        adUnitDetails={{
          publisherId: Constants.PUBLISHER_ID,
          profileId: Constants.DISPLAY_PROFILE_ID,
          adUnitId: Constants.BANNER_AD_UNIT_ID,
          adSizes: [POBAdSize.BANNER_SIZE_320x50],
        }}
        onAdClicked={_onAdClicked}
        onAdClosed={_onAdClosed}
        onAdFailed={_onAdFailed}
        onAdOpened={_onAdOpened}
        onAdReceived={_onAdReceived}
        onAppLeaving={_onAppLeaving}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BannerScreen;
