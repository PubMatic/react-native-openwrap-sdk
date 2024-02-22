import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import {
  POBBid,
  POBBidError,
  POBBidEvent,
  POBBidEventListener,
  POBError,
  POBInterstitial,
  POBInterstitialListener,
} from 'react-native-openwrap-sdk';
import Constants from '../../Constants';

/**
 * Screen to show Interstitial ad implementation for Get bid price flow
 */
const InHouseMediationInterstitialScreen = () => {
  let interstitial: POBInterstitial | undefined;
  let isOWAuctionWin: boolean = true;

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

    // Set listener to receive bid events
    interstitial?.setBidEventListener(new BidEventListener());

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
          )
        );
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
        // Notify interstitial ad to proceed with auction loss error.
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
      console.log(`Interstitial : Bid is received successfully`);
      _auctionAndProceedWithBid(bidEvent, bid);
    }

    // Notifies the listener of an error encountered while fetching the bid.
    onBidFailed(bidEvent: POBBidEvent, error: POBError): void {
      console.log(
        `Interstitial : Bid receive failed with error : ${error.toString()}`
      );
      // Call bidEvent?.proceedOnError() with appropriate error code and
      // error message to complete the flow.
      bidEvent?.proceedOnError(
        new POBError(
          POBBidError.POBBidErrorCode.CLIENT_SIDE_AUCTION_LOSS,
          'Client Side Auction Loss'
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

export default InHouseMediationInterstitialScreen;
