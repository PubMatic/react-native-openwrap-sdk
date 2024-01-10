import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import { POBBannerView } from "../ads/POBBannerView";
import { AdSize } from "../models/AdSize";
import { POBError } from "../models/POBError";
import { AppConstants } from "../AppConstants";

/**
 * Screen to present banner ads
 */
class BannerScreen extends Component<{ navigation: any }> {
  // Rendering POBBannerView with required properties such as 
  // publisherId, profileId, owAdUnitId, gamAdUnitId and adSizes.
  // This screen demonstates how to use OpenWrap along with GAM header bidding.
  render() {
    return (
      <View style={styles.bannerContainer}>
        <POBBannerView
          adUnitDetails={{
            publisherId: AppConstants.PUBLISHER_ID,
            profileId: AppConstants.PROFILE_ID,
            owAdUnitId: AppConstants.BANNER_AD_UNIT_ID,
            gamAdUnitId: AppConstants.GAM_BANNER_AD_UNIT_ID,
            adSizes: [AdSize.BANNER],
          }}
          onAdReceived={(adSize: AdSize) => {
            console.log(`Banner Ad: Ad received of size ${adSize.toString()}`);
          }}
          onAdFailed={(error: POBError) => {
            console.log(
              `Banner Ad: Ad failed to load with error ${error.errorCode}-${error.errorMessage}`
            );
          }}
          onAdClicked={() => {
            console.log("Banner Ad: Ad clicked");
          }}
          onAdClosed={() => {
            console.log("Banner Ad: Ad closed");
          }}
          onAdOpened={() => {
            console.log("Banner Ad: Ad opened");
          }}
          onAppLeaving={() => {
            console.log("Banner Ad: App leaving");
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
});

export default BannerScreen;
