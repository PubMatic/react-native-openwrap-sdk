import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import Constants from '../../Constants';
import {
  POBAdSize,
  POBAdUnitDetails,
  POBBannerView,
  POBBid,
  POBError,
} from 'react-native-openwrap-sdk';

/**
 * Screen to display banner ads in FlatList
 */
const BannerListScreen = () => {
  const [data, setData] = useState<(POBAdUnitDetails | string)[]>();

  useEffect(() => {
    // Creating the list for rendering the FlatList
    const listData: (POBAdUnitDetails | string)[] = [];
    for (let i = 1; i <= Constants.ITEMS_IN_LIST; i++) {
      // Adding Banner Ad Unit Details after AD_SLOT_SIZE.
      if (i % Constants.AD_SLOT_SIZE === 0) {
        // For each AD_SLOT_SIZE item add the video ad and display ad alternatively.
        listData.push({
          publisherId: Constants.PUBLISHER_ID,
          profileId:
            i % (Constants.AD_SLOT_SIZE * 2) === 0
              ? Constants.DISPLAY_PROFILE_ID
              : Constants.VIDEO_PROFILE_ID,
          adUnitId: Constants.BANNER_AD_UNIT_ID,
          adSizes: [POBAdSize.BANNER_SIZE_300x250],
        });
      } else {
        listData.push(`Item no. ${i}`);
      }
    }
    // Initializing the default value to the state.
    setData(listData);
  }, []);

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
    <View style={styles.bannerContainer}>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              {typeof item === 'string' ? (
                <Text style={styles.text}>{item}</Text>
              ) : (
                // Rendering POBBannerView in FlatList with required properties such as
                // publisherId, profileId, adUnitId, adSizes and optional callbacks.
                <POBBannerView
                  adUnitDetails={item as POBAdUnitDetails}
                  onAdReceived={_onAdReceived}
                  onAdFailed={_onAdFailed}
                  onAdClicked={_onAdClicked}
                  onAdClosed={_onAdClosed}
                  onAdOpened={_onAdOpened}
                  onAppLeaving={_onAppLeaving}
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
  text: {
    color: '#000',
  },
});

export default BannerListScreen;
