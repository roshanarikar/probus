import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CameraSet = () => {
  const [imageUri, setImageUri] = useState(null);

  const takePhotoFromCamera = () =>{
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      saveImageToStorage(image.path);
      setImageUri(image.path);
    });
  }

  const saveImageToStorage = async (imagePath) => {
    try {
      await AsyncStorage.setItem('capturedImage', imagePath);
    } catch (error) {
      console.error('Error saving image to AsyncStorage:', error);
    }
  };

  const retrieveImageFromStorage = async () => {
    try {
      const storedImageUri = await AsyncStorage.getItem('capturedImage');
      if (storedImageUri !== null) {
        setImageUri(storedImageUri);
      }
    } catch (error) {
      console.error('Error retrieving image from AsyncStorage:', error);
    }
  };

  

  useEffect(() => {
    retrieveImageFromStorage();
  }, []);

  return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.captureBtn} onPress={takePhotoFromCamera}>
              <Text style={styles.text}>Capture Photo</Text>
          </TouchableOpacity>
          {imageUri && <Image source={{ uri: imageUri }} style={{ width: 300, height: 400 }} />}
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
      color:"white",
      fontSize: 20,
      fontWeight: "bold"
    },
    captureBtn:{
       width:"60%",
       paddingHorizontal:"10%",
       borderRadius:10,
       backgroundColor: "grey",
       marginTop: -40,
       marginBottom: 20,
       padding: 10
    }
});