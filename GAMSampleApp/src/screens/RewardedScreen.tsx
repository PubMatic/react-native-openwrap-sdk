import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";
import Toast from "react-native-simple-toast";
import { AppConstants } from "../AppConstants";
import { POBError } from "../models/POBError";
import { POBReward } from "../models/POBReward";
import { POBRewardedAd } from "../ads/POBRewardedAd";

class RewardedScreen extends Component<{ navigation: any }> {
    // Instance of rewarded ad
    rewardedAd: POBRewardedAd | undefined = undefined;

    /**
     * Called on press of Load Ad button.
     * It will attempt to destroy the previous rewarded ad if any and
     * create a new instance of the rewarded ad using the passed parameters.
     * Sets the listener on the instance created.
     * Finally loads the Ad.
     */
    onPressLoadAd() {
        this.rewardedAd?.destroyAd();
        this.rewardedAd = new POBRewardedAd(
            AppConstants.PUBLISHER_ID,
            AppConstants.VIDEO_PROFILE_ID,
            AppConstants.REWARDED_AD_UNIT_ID,
            AppConstants.GAM_REWARDED_AD_UNIT_ID
        );
        this.rewardedAd.setListener(new RewardedAdListener());
        this.rewardedAd?.loadAd();
    }

    /**
     * Called on press of Show Ad.
     * Checks whether is rewarded ad is ready.
     * If the ad is ready to be shown, calls the showAd
     * else shows a toast to the user.
     */
    onPressShowAd() {
        this.rewardedAd
            ?.isReady()
            .then((ready: boolean) => {
                if (ready) {
                    this.rewardedAd?.showAd();
                } else {
                    Toast.show("Rewarded Ad: Not Ready", Toast.SHORT);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentWillUnmount() {
        // Make sure to destory the rewarded ad object before
        // destroying the component to prevent memory leaks
        this.rewardedAd?.destroyAd();
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={this.onPressLoadAd}
                            title="Load Ad"
                            accessibilityLabel="load_ad"
                            testID="load_ad"
                        />
                    </View>
                </View>
                <View>
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={this.onPressShowAd}
                            title="Show Ad"
                            accessibilityLabel="show_ad"
                            testID="show_ad"
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        flexDirection: "row",
    },
    buttonContainer: {
        marginHorizontal: 5,
        marginVertical: 10,
    },
});

/**
 * Implementation of the {@link POBRewardedAd.POBRewardedAdListener} listener
 * to listen to the events associated with the rewarded ad.
 */
class RewardedAdListener implements POBRewardedAd.POBRewardedAdListener {
    onAdReceived(_: POBRewardedAd): void {
        console.log("Rewarded Ad: Ad Received");
        Toast.show("Rewarded Ad: Ad Received", Toast.SHORT, {
            tapToDismissEnabled: true,
        });
    }
    onAdFailedToLoad(ad: POBRewardedAd, error: POBError): void {
        console.log(
            `Rewarded Ad: Ad Failed To Load with Error - ${error.errorCode} - ${error.errorMessage}`
        );
        Toast.show("Rewarded Ad: Ad Failed To Load", Toast.SHORT, {
            tapToDismissEnabled: true,
        });
    }
    onAdFailedToShow(ad: POBRewardedAd, error: POBError): void {
        console.log(
            `Rewarded Ad: Ad Failed To Show with Error - ${error.errorCode} - ${error.errorMessage}`
        );
        Toast.show("Rewarded Ad: Ad Failed To Show", Toast.SHORT, {
            tapToDismissEnabled: true,
        });
    }
    onAdClicked(ad: POBRewardedAd): void {
        console.log("Rewarded Ad: Ad Clicked");
    }
    onAdOpened(ad: POBRewardedAd): void {
        console.log("Rewarded Ad: Ad Opened");
    }
    onAdClosed(ad: POBRewardedAd): void {
        console.log("Rewarded Ad: Ad Closed");
    }
    onAdExpired(ad: POBRewardedAd): void {
        console.log("Rewarded Ad: Ad Expired");
        Toast.show("Rewarded Ad: Ad Expired", Toast.SHORT, {
            tapToDismissEnabled: true,
        });
    }
    onAppLeaving(ad: POBRewardedAd): void {
        console.log("Rewarded Ad: App Leaving");
    }
    onReceiveReward(ad: POBRewardedAd, reward: POBReward): void {
        console.log(
            `Rewarded Ad: Reward - ${reward.amount}-${reward.currencyType}`
        );
        Toast.show("Rewarded Ad: Reward Received", Toast.SHORT, {
            tapToDismissEnabled: true,
        });
    }
}

export default RewardedScreen;
