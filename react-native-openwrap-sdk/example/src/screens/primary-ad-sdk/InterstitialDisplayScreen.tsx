import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import {
  POBError,
  POBInterstitial,
  POBInterstitialListener,
} from 'react-native-openwrap-sdk';
import Constants from '../../Constants';

/**
 * Screen to display interstitial display ads
 */
const InterstitialDisplayScreen = () => {
  let interstitial: POBInterstitial | undefined;

  const onPressLoadAd = () => {
    // Create POBInterstitial Ad instance by passing required ad unit details
    // like publisher id, profile id and ad unit it.
    interstitial = new POBInterstitial(
      Constants.PUBLISHER_ID,
      Constants.DISPLAY_PROFILE_ID,
      Constants.INTERSTITIAL_AD_UNIT_ID
    );

    // Set optional listener to receive ad events
    interstitial?.setListener(new InterstitialListener());

    // Load interstitial ad
    interstitial?.loadAd();
  };

  const onPressShowAd = () => {
    // Check if the interstitial ad is ready by resolving the promise.
    // If ad is ready, show the interstitial ad.
    interstitial
      ?.isReady()
      .then((isReady) => {
        if (isReady) {
          interstitial?.show();
        } else {
          console.log('Interstitial ad is not ready');
        }
      })
      .catch((error) => {
        console.log(`Interstitial ad isReady failed : ${error}`);
      });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Load Ad"
        accessibilityLabel="loadAdBtn"
        testID="loadAdBtn"
        onPress={onPressLoadAd}
      />
      <Button
        title="Show Ad"
        accessibilityLabel="showAdBtn"
        testID="showAdBtn"
        onPress={onPressShowAd}
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
    gap: 10,
  },
});

/**
 * Implementation class to receive Interstitial ad events
 */
class InterstitialListener implements POBInterstitialListener {
  // Callback method notifies that an ad has been received successfully.
  onAdReceived(_: POBInterstitial): void {
    //Method gets called when ad gets loaded in container
    //Here, you can show interstitial ad to user
    console.log('Interstitial : Ad Received');
  }

  // Callback method notifies that the interstitial ad is expired.
  onAdExpired(_: POBInterstitial): void {
    console.log('Interstitial : Ad Expired');
  }

  // Callback method notifies ad click
  onAdClicked(_: POBInterstitial): void {
    console.log('Interstitial : Ad Clicked');
  }

  // Callback method notifies that the interstitial ad has been animated off the screen.
  onAdClosed(_: POBInterstitial): void {
    console.log('Interstitial : Ad Closed');
  }

  // Callback method notifies that the interstitial ad will be presented as a modal on top of the current view controller
  onAdOpened(_: POBInterstitial): void {
    console.log('Interstitial : Ad Opened');
  }

  // Callback method notifies whenever current app goes in the background due to user click
  onAppLeaving(_: POBInterstitial): void {
    console.log('Interstitial : App Leaving');
  }

  // Callback method notifies an error encountered while showing an ad.
  onAdFailedToShow(_: POBInterstitial, error: POBError): void {
    //Method gets called when loadAd fails to show ad
    //Here, you can put logger and see why ad failed to show
    console.log(
      `Interstitial : Ad failed to show with error - ${error.toString()}`
    );
  }

  // Callback method notifies an error encountered while loading an ad.
  onAdFailedToLoad(_: POBInterstitial, error: POBError): void {
    //Method gets called when loadAd fails to load ad
    //Here, you can put logger and see why ad failed to load
    console.log(
      `Interstitial : Ad failed to load with error - ${error.toString()}`
    );
  }
}

export default InterstitialDisplayScreen;
