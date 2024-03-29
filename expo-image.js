import React, {useState, useEffect} from 'react';
import {Button, Image, View, Platform, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{uri: image}} style={{width: 200, height: 200}} />
      )}
    </View>
  );
}
