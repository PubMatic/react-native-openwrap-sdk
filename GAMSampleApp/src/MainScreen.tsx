import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from './HomeScreen';
import { Button, StyleSheet } from 'react-native';
import BannerScreen from './screens/BannerScreen';
import InterstitialScreen from './screens/InterstitialScreen';
import RewardedScreen from './screens/RewardedScreen';
import MRECVideoScreen from './screens/MRECVideoScreen';
import BannerListScreen from './screens/BannerListScreen';

const Stack = createNativeStackNavigator();
/**
 *  Component for Main Screen of the app.It contains navigation screen for all ad formats
 */
class MainScreen extends React.Component {
    SettingsButton = ({ navigation }: { navigation: any }) => {
        return (
            <Button
                onPress={() => navigation.navigate('Settings')}
                title="Settings"
                accessibilityLabel="settings"
                testID="settings"
            />
        );
    };
    render() {
        return (
            <>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Home"
                        screenOptions={{
                            headerTintColor: 'white',
                            headerStyle: { backgroundColor: '#3397D7' },
                            headerTitleStyle: {
                                fontWeight: 'normal',
                                fontSize: 20,
                            },
                        }}>
                        <Stack.Screen name="GAM Header Bidding">
                            {props => <HomeScreen navigation={useNavigation()} />}
                        </Stack.Screen>

                        <Stack.Screen name="Banner">
                            {props => <BannerScreen navigation={useNavigation()} />}
                        </Stack.Screen>

                        <Stack.Screen name="MRECVideo">
                            {props => <MRECVideoScreen navigation={useNavigation()} />}
                        </Stack.Screen>

                        <Stack.Screen name="Interstitial">
                            {props => <InterstitialScreen navigation={useNavigation()} />}
                        </Stack.Screen>

                        <Stack.Screen name="Rewarded">
                            {props => <RewardedScreen navigation={useNavigation()} />}
                        </Stack.Screen>

                        <Stack.Screen name="Banner List">
                            {props => <BannerListScreen navigation={useNavigation()} />}
                        </Stack.Screen>
                    </Stack.Navigator>
                </NavigationContainer>
            </>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#',
        color: 'red',
        padding: 15,
        marginVertical: 1,
        fontSize: 20,
    },
    header: {
        fontSize: 15,
        padding: 15,
    },
    title: {
        fontSize: 30,
    },
});

export default MainScreen;