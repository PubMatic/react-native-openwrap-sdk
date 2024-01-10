import React, { Component } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { POBBannerView } from "../ads/POBBannerView";
import { AdSize } from "../models/AdSize";
import { POBError } from "../models/POBError";
import { AppConstants } from "../AppConstants";
import { POBAdUnitDetails } from "../models/POBAdUnitDetails";

/**
 * State of the BannerScreen.
 */
type BannerListScreenState = {
  data: (POBAdUnitDetails | string)[];
};

/**
 * Screen to present banner ads in FlatList
 */
class BannerListScreen extends Component<
  { navigation: any },
  BannerListScreenState
> {
  constructor(props: any) {
    super(props);

    // Creating the list for rendering the FlatList
    const listData = [];
    for (let i = 1; i <= AppConstants.ITEMS_IN_LIST; i++) {
      // Rendering Banner Ad after AD_SLOT_SIZE.
      if (i % AppConstants.AD_SLOT_SIZE === 0) {
        // For each AD_SLOT_SIZE item we are adding the video ad and display ad alternatively.
        // Thus, adding an additional check for identifing the display and video item number.
        listData.push(
          i % (AppConstants.AD_SLOT_SIZE * 2) === 0
            ? {
                publisherId: AppConstants.PUBLISHER_ID,
                profileId: AppConstants.VIDEO_PROFILE_ID,
                owAdUnitId: AppConstants.BANNER_AD_UNIT_ID,
                gamAdUnitId: AppConstants.GAM_BANNER_AD_UNIT_ID,
                adSizes: [AdSize.MEDIUM_RECTANGLE],
              }
            : {
                publisherId: AppConstants.PUBLISHER_ID,
                profileId: AppConstants.PROFILE_ID,
                owAdUnitId: AppConstants.BANNER_AD_UNIT_ID,
                gamAdUnitId: AppConstants.GAM_BANNER_AD_UNIT_ID,
                adSizes: [AdSize.MEDIUM_RECTANGLE],
              },
        );
      } else {
        listData.push(`Item no. ${i}`);
      }
    }
    // Initializing the default value to the state.
    this.state = {
      data: listData,
    };
  }

  // Rendering POBBannerView with required properties such as
  // publisherId, profileId, owAdUnitId, gamAdUnitId and adSizes.
  // This screen demonstates how to use OpenWrap along with GAM header bidding.
  render() {
    return (
      <View style={styles.bannerContainer}>
        <FlatList
          style={styles.list}
          data={this.state.data}
          renderItem={({ item }) => {
            return (
              <View style={styles.row}>
                {typeof (item) === "string" ? (
                  <Text
                    style={{
                      color: "#000",
                    }}
                  >
                    {item}
                  </Text>
                ) : (
                  <POBBannerView
                    adUnitDetails={item as POBAdUnitDetails}
                    onAdReceived={(adSize: AdSize) => {
                      console.log(
                        `Banner Ad: Ad Received of size ${adSize.toString()}`
                      );
                    }}
                    onAdFailed={(error: POBError) => {
                      console.log(
                        `Banner Ad: Ad Failed To Load with error ${error.errorCode}-${error.errorMessage}`
                      );
                    }}
                    onAdClicked={() => {
                      console.log("Banner Ad: Ad Clicked");
                    }}
                    onAdClosed={() => {
                      console.log("Banner Ad: Ad Closed");
                    }}
                    onAdOpened={() => {
                      console.log("Banner Ad: Ad Opened");
                    }}
                    onAppLeaving={() => {
                      console.log("Banner Ad: App Leaving");
                    }}
                  />
                )}
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 20,
  },
  bannerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flex: 1,
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: "100%",
  },
});

export default BannerListScreen;
