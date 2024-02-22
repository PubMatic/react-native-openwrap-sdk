import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from './Constants';

/**
 * Home screen to display the list of supported screens.
 * @returns The list view of all the screens
 */
const HomeScreen = () => {
  const navigation = useNavigation();

  // Creating the list of rows which demonstrates primary ad server flow.
  const PRIMARY_ROWS = Constants.PRIMARY_AD_FORMATS.map(
    (i) => Constants.INTERGRATION_TYPE[0] + ':' + i
  );
  // Creating the list of rows which demonstrates in house mediation i.e. Get Bid Price feature flow.
  const IN_HOUSE_MEDIATION_ROWS = Constants.IN_HOUSE_MEDIATION_AD_FORMATS.map(
    (i) => Constants.INTERGRATION_TYPE[1] + ':' + i
  );

  // Combined data to render the list of screens.
  const DATA = [
    {
      data: [
        Constants.INTERGRATION_TYPE[0],
        ...PRIMARY_ROWS,
        Constants.INTERGRATION_TYPE[1],
        ...IN_HOUSE_MEDIATION_ROWS,
      ],
    },
  ];

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <SectionList
          sections={DATA}
          renderItem={({ item }) => {
            const title = item?.split(':');
            // Check if the row should be displayed as header or screen.
            if (title && title[1]) {
              return (
                <Text
                  testID="ad_title"
                  accessibilityLabel="ad_title"
                  style={styles.item}
                  onPress={() => {
                    // Navigating to the respective ad screen
                    // using the screen name as mentioned in App.tsx
                    const navigationLabel = item?.replace(':', ' ');
                    navigation.navigate(navigationLabel);
                  }}
                >
                  {title[1]}
                </Text>
              );
            } else {
              return <Text style={styles.label}>{title && title[0]}</Text>;
            }
          }}
          keyExtractor={(item, index) => item ?? '' + index}
        />
      </SafeAreaView>
    </>
  );
};

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
  label: {
    color: '#404040',
    padding: 5,
    paddingLeft: 15,
    marginVertical: 1,
    fontSize: 15,
  },
});

export default HomeScreen;
