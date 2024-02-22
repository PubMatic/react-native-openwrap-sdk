import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import {
  POBBid,
  POBBidError,
  POBBidEvent,
  POBBidEventListener,
  POBError,
  POBReward,
  POBRewardedAd,
  POBRewardedAdListener,
} from 'react-native-openwrap-sdk';
import Constants from '../../Constants';

/**
 * Screen to show rewarded ad implementation for Get bid price flow
 */
const InHouseMediationRewardedScreen = () => {
  let rewarded: POBRewardedAd | undefined;
  let isOWAuctionWin: boolean = true;

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

    // Set listener to receive bid events
    rewarded?.setBidEventListener(new BidEventListener());

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

  // Used to process the bid and notify the result back to OW-SDK.
  const _auctionAndProceedWithBid = async (bidEvent: POBBidEvent, _bid: POBBid) => {
    try {
      // Notify if the bid is expired.
      const isExpired = await _bid.isExpired();
      if (isExpired) {
        console.log(Constants.BID_EXPIRED_ERROR_MESSAGE);
        bidEvent.proceedOnError(
          new POBBidError(
            POBBidError.POBBidErrorCode.BID_EXPIRED,
            Constants.BID_EXPIRED_ERROR_MESSAGE
          ));
        return;
      }

      // Use bid, e.g. perform auction with your in-house mediation setup
      // ..
      // Auction complete
      if (isOWAuctionWin && _bid.status === POBBid.BID_STATUS_OK) {
        // OW bid won in the auction
        // Call bidEvent.proceedToLoadAd() to complete the bid flow
        bidEvent.proceedToLoadAd();
      } else {
        console.log(Constants.BID_LOST_ERROR_MESSAGE);
        // Notify rewarded ad to proceed with auction loss error.
        bidEvent.proceedOnError(
          new POBBidError(
            POBBidError.POBBidErrorCode.CLIENT_SIDE_AUCTION_LOSS,
            Constants.BID_LOST_ERROR_MESSAGE
          )
        );
      }
    } catch (error) {
      // Handle error case.
      let errorMessage = Constants.BID_EXPIRY_CHECK_UNKNOWN_ERROR;
      if (error instanceof Error) {
        errorMessage = `Error occurred during bid expiry check: ${error.message}`;
      }

      console.log(errorMessage);
      bidEvent.proceedOnError(
        new POBBidError(
          POBBidError.POBBidErrorCode.OTHER,
          errorMessage
        )
      );
    }
  };

  /**
   * Implementation class to receive Bid ad events
   */
  class BidEventListener implements POBBidEventListener {
    // Notifies the listener that a bid has been successfully received
    onBidReceived(bidEvent: POBBidEvent, bid: POBBid): void {
      console.log(`Rewarded : Bid is received successfully`);
      _auctionAndProceedWithBid(bidEvent, bid);
    }
    // Notifies the listener of an error encountered while fetching the bid.
    onBidFailed(bidEvent: POBBidEvent, error: POBError): void {
      console.log(
        `Rewarded : Bid receive failed with error :  ${error.toString()}`
      );
      // Call bidEvent?.proceedOnError() with appropriate error code and
      // error message to complete the flow.
      bidEvent.proceedOnError(
        new POBBidError(
          POBBidError.POBBidErrorCode.CLIENT_SIDE_AUCTION_LOSS,
          'client side auction loss'
        )
      );
    }
  }

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

export default InHouseMediationRewardedScreen;
