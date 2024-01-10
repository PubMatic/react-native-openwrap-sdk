import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    SectionList,
    StatusBar,
} from 'react-native';

const DATA = [
    {
        title: 'GAM',
        data: ['Banner', 'MRECVideo', 'Interstitial', 'Rewarded', 'Banner List'],
    },
];

/**
 * Component for Home Screen. It contains selctable list of items for and navigats to corresponding screen.
 */
class HomeScreen extends Component<{ navigation: any }> {
    constructor(props: any) {
        super(props);
    }

    getListViewItem = (item: any) => {
        if (item === 'Banner') {
            this.props.navigation.navigate('Banner');
        } else if (item === 'Interstitial') {
            this.props.navigation.navigate('Interstitial');
        } else if (item === 'Rewarded') {
            this.props.navigation.navigate('Rewarded');
        } else if (item === 'MRECVideo') {
            this.props.navigation.navigate('MRECVideo');
        } else if (item === 'Banner List') {
            this.props.navigation.navigate('Banner List');
        }
    };

    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <SectionList
                        sections={DATA}
                        renderItem={({ item }) => (
                            <Text
                                testID={item}
                                accessibilityLabel={item}
                                style={styles.item}
                                onPress={this.getListViewItem.bind(this, item)}>
                                {item}
                            </Text>
                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text
                                style={styles.header}
                                testID="HeaderText"
                                accessibilityLabel="HeaderText">
                                {title}
                            </Text>
                        )}
                        keyExtractor={(item, index) => item + index}
                    />
                </SafeAreaView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: '#ffffff',
        color: '#404040',
        padding: 15,
        marginVertical: 1,
        fontSize: 20,
    },
    header: {
        fontSize: 15,
        padding: 15,
        color: '#404040',
    },
    title: {
        fontSize: 30,
    },
});

export default HomeScreen;