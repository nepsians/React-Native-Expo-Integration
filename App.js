/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import * as Permissions from 'expo-permissions';

import ExpoImage from './expo-image';

import ImageBrowser from './image-browser/ImageBrowser';

const App: () => React$Node = () => {
  useEffect(() => {
    // (async () => {
    //   // const {status} = await ImagePicker.requestCameraRollPermissionsAsync();
    //   // if (status !== 'granted') {
    //   //   alert('Sorry, we need camera roll permissions to make this work!');
    //   // }
    // })();

    askPermissions();
  }, []);

  const askPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    console.warn(response);
    if (response.status !== 'granted') {
      Alert.alert('Permission not granted.', 'Please grant access to media.');
      return;
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <Text style={{fontWeight: 'bold', fontSize: 18, padding: 18}}>
            This is new updates.
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 18, padding: 18}}>
            This is new updates.
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 18, padding: 18}}>
            This is new updates.
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 18, padding: 18}}>
            This is new updates.
          </Text>

          <Image
            source={require('./employees.png')}
            style={{height: 120, width: 120}}
          />
          {global.HermesInternal === null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <ExpoImage />
            {/* <ImageBrowser /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
