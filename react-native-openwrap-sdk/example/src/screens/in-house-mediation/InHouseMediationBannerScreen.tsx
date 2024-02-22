import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  POBAdSize,
  POBBannerView,
  POBBid,
  POBError,
  POBBidError,
  POBBidEvent,
  POBBidEventListener,
} from 'react-native-openwrap-sdk';
import Constants from '../../Constants';

/**
 * Screen to show banner implementation for Get bid price flow
 */
const InHouseMediationBannerScreen = () => {
  let isOWAuctionWin: boolean = true;

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
        // Notify banner to proceed with auction loss error.
        bidEvent.proceedOnError(
          new POBBidError(
            POBBidError.POBBidErrorCode.CLIENT_SIDE_AUCTION_LOSS,
            Constants.BID_LOST_ERROR_MESSAGE
          )
        );
      }
    } catch (error) {
      // Handle errors.
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
      console.log(`Bannner : Bid is received successfully`);
      _auctionAndProceedWithBid(bidEvent, bid);
    }

    // Notifies the listener of an error encountered while fetching the bid.
    onBidFailed(bidEvent: POBBidEvent, error: POBError): void {
      console.log(
        `Banner : Bid receive failed with error : ${error.toString()}`
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
    <View accessibilityLabel="banner" testID="banner" style={styles.container}>
      {/*
       * Rendering POBBannerView with required properties such as
       * publisherId, profileId, adUnitId, adSizes and optional callbacks.
       * Also pass the bidEventListener to get bid event callbacks.
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
        bidEventListener={new BidEventListener()}
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

export default InHouseMediationBannerScreen;
