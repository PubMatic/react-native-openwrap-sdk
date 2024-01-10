import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";
import { AppConstants } from "../AppConstants";
import Toast from "react-native-simple-toast";
import { POBInterstitial } from "../ads/POBInterstitial";
import { POBError } from "../models/POBError";

/**
 * Screen to present interstitial ads
 */
class InterstitialScreen extends Component<{ navigation: any }> {

    // instance of POBInterstitial
    private interstitial: POBInterstitial | undefined;

    /**
    * Initializes and loads the interstitial ad using the POBInterstitial class with given adunit details.
    * Added listeners that can listen to ad events
    */
    onPressLoadAd() {
        // Destroy the previously created instance of POBInterstitial.
        this.interstitial?.destroyAd();
        // For Sample App we have only created a single instance of POBInterstitial.
        // If you want to create multiple instances then you need to keep the map of instances in JS & native side.
        this.interstitial = new POBInterstitial(AppConstants.PUBLISHER_ID, AppConstants.PROFILE_ID, AppConstants.INTERSTITIAL_AD_UNIT_ID, AppConstants.GAM_NTERSTITIAL_AD_UNIT_ID);
        // Set the listeners to listen to ad events
        this.interstitial.setListener(new InterstitialScreen.POBInterstitialListn());
        this.interstitial.setVideoListener(new InterstitialScreen.POBVideoListn())
        // Load ad
        this.interstitial.loadAd();
    };

    /**
    * Show the interstitial ad
    * The function also uses the isReady()
    * method to verify whether the ad is ready to be shown or is still loading.
    * Make sure to call showAd()
    * only after the isReady() has returned true.
    */
    onPressShowAd() {
        this.interstitial?.isReady()
            .then((ready: boolean) => {
                if (ready) {
                    this.interstitial?.showAd();
                } else {
                    Toast.show("Interstitial Ad: Not Ready", Toast.SHORT);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    componentWillUnmount(): void {
        // Make sure to destory the interstitial object before destroying the component to prevent memory leaks
        this.interstitial?.destroyAd();
    }

    render() {
        return (
            <View style={styles.container} >
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
};

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


namespace InterstitialScreen {
    /**
     *  Listener to listen ad events received from POBInterstitial
     */
    export class POBInterstitialListn extends POBInterstitial.POBInterstitialListener {
        onAdReceived(interstitial: POBInterstitial): void {
            console.log("Interstitial : Ad Received");
            Toast.show("Interstitial : Ad Received", Toast.SHORT, {
                tapToDismissEnabled: true,
            });
        }
        onAdFailedToLoad(interstitial: POBInterstitial, error: POBError): void {
            console.log(`Interstitial : Ad Failed To Load with Error - ${error.errorCode} - ${error.errorMessage}`);
            Toast.show("Interstitial : Ad Failed To Load", Toast.SHORT, {
                tapToDismissEnabled: true,
            });
        }
        onAdFailedToShow(interstitial: POBInterstitial, error: POBError): void {
            console.log(`Interstitial : Ad Failed To show with Error - ${error.errorCode} - ${error.errorMessage}`);
            Toast.show("Interstitial : Ad Failed To show", Toast.SHORT, {
                tapToDismissEnabled: true,
            });
        }
        onAdClicked(interstitial: POBInterstitial): void {
            console.log("Interstitial : Ad Clicked");
        }
        onAdOpened(interstitial: POBInterstitial): void {
            console.log("Interstitial : Ad Opened");
        }
        onAdClosed(interstitial: POBInterstitial): void {
            console.log("Interstitial : Ad Closed");
        }
        onAdExpired(interstitial: POBInterstitial): void {
            console.log("Interstitial : Ad Expired");
            Toast.show("Interstitial : Ad Expired", Toast.SHORT, {
                tapToDismissEnabled: true,
            });
        }
        onAppLeaving(interstitial: POBInterstitial): void {
            console.log("Interstitial : App Leaving");
        }
    }

    /**
     *  Listener to listen video events received from POBInterstitial
     */
    export class POBVideoListn extends POBInterstitial.POBVideoListener {
        onVideoPlaybackCompleted(interstitial: POBInterstitial): void {
            console.log("Interstitial : Video Playback completed");
        }
    }
}

export default InterstitialScreen;
