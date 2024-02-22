import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import {
  POBError,
  POBReward,
  POBRewardedAd,
  POBRewardedAdListener,
} from 'react-native-openwrap-sdk';
import Constants from '../../Constants';

/**
 * Screen to display rewarded ads
 */
const RewardedScreen = () => {
  let rewarded: POBRewardedAd | undefined;

  const onPressLoadAd = () => {
    // Create POBRewardedAd Ad instance by using the getRewradedAd function
    // and passing required ad unit details, like publisher id, profile id and ad unit id.
    rewarded = POBRewardedAd.getRewardedAd(
      Constants.PUBLISHER_ID,
      Constants.VIDEO_PROFILE_ID,
      Constants.REWARDED_AD_UNIT_ID
    );

    // Set optional listener to receive ad events
    rewarded?.setListener(new RewardedListener());

    // Load rewarded ad
    rewarded?.loadAd();
  };

  const onPressShowAd = () => {
    // Check if the rewarded ad is ready by resolving the promise.
    // If ad is ready, show the rewarded ad.
    rewarded
      ?.isReady()
      .then((isReady) => {
        if (isReady) {
          rewarded?.show();
        } else {
          console.log('Rewarded Ad is not ready');
        }
      })
      .catch((error) => {
        console.log(`Rewarded ad isReady failed : ${error}`);
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
 * Implementation class to receive Rewarded ad events
 */
class RewardedListener implements POBRewardedAdListener {
  // Callback method notifies that an ad has been received successfully.
  onAdReceived(_: POBRewardedAd): void {
    // Method gets called when ad gets loaded in container
    // Here, you can show rewarded ad to user
    console.log(`Rewarded Ad : Ad Received`);
  }

  // Callback method notifies an error encountered while loading or rendering an ad.
  onAdFailedToLoad(_: POBRewardedAd, error: POBError): void {
    console.log(
      `Rewarded Ad : Ad failed to load with error - ${error.toString()}`
    );
  }

  // Callback method notifies that error is encountered while rendering an ad
  onAdFailedToShow(_: POBRewardedAd, error: POBError): void {
    console.log(
      `Rewarded Ad: Ad failed to show with error ${error.toString()}`
    );
  }

  // Callback method notifies ad click
  onAdClicked(_: POBRewardedAd): void {
    console.log(`Rewarded Ad : Ad Clicked`);
  }

  // Callback method notifies that the rewarded ad will be presented as a full screen modal on top of the current view.
  onAdOpened(_: POBRewardedAd): void {
    console.log(`Rewarded Ad : Ad Opened`);
  }

  // Callback method notifies that the rewarded ad has been animated off the screen.
  onAdClosed(_: POBRewardedAd): void {
    console.log(`Rewarded Ad : Ad Closed`);
  }

  // Callback method notifies ad is expired
  onAdExpired(_: POBRewardedAd): void {
    console.log(`Rewarded Ad : Ad Expired`);
  }

  // Callback method notifies ad is about to leave app
  onAppLeaving(_: POBRewardedAd): void {
    console.log(`Rewarded Ad : App Leaving`);
  }

  // Callback method notifies user will be rewarded once the ad is completely viewed
  onReceiveReward(_: POBRewardedAd, reward: POBReward): void {
    console.log(
      `Rewarded Ad : Ad should reward - ${reward.amount}(${reward.currencyType})`
    );
  }
}

export default RewardedScreen;
