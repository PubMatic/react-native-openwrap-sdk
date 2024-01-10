import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import { POBBannerView } from "../ads/POBBannerView";
import { AdSize } from "../models/AdSize";
import { POBError } from "../models/POBError";
import { AppConstants } from "../AppConstants";

/**
 * Screen to present MREC video ads
 */
class MRECVideoScreen extends Component<{ navigation: any }> {
  // Rendering POBBannerView with required properties such as
  // publisherId, profileId, owAdUnitId, gamAdUnitId and adSized.
  // This screen demonstates how to use OpenWrap along with GAM header bidding.
  render() {
    return (
      <View style={styles.bannerContainer}>
        <POBBannerView
          adUnitDetails={{
            publisherId: AppConstants.PUBLISHER_ID,
            profileId: AppConstants.VIDEO_PROFILE_ID,
            owAdUnitId: AppConstants.BANNER_AD_UNIT_ID,
            gamAdUnitId: AppConstants.GAM_BANNER_AD_UNIT_ID,
            adSizes: [AdSize.MEDIUM_RECTANGLE],
          }}
          onAdReceived={(adSize: AdSize) => {
            console.log(`MREC Video : Ad received of size ${adSize.toString()}`);
          }}
          onAdFailed={(error: POBError) => {
            console.log(
              `MREC Video : Ad failed to load with error ${error.errorCode}-${error.errorMessage}`
            );
          }}
          onAdClicked={() => {
            console.log("MREC Video : Ad clicked");
          }}
          onAdClosed={() => {
            console.log("MREC Video : Ad closed");
          }}
          onAdOpened={() => {
            console.log("MREC Video : Ad opened");
          }}
          onAppLeaving={() => {
            console.log("MREC Video : App leaving");
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

export default MRECVideoScreen;
