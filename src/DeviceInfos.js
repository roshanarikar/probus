import Geolocation from '@react-native-community/geolocation';
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-crop-picker';


const getCurrentLocation = (setLatitude, setLongitude) => {
  Geolocation.getCurrentPosition(
      position => {
          const { latitude, longitude } = position.coords;
          console.log('Current location:', latitude, longitude);
          setLatitude(latitude);
          setLongitude(longitude);
      },
      error => {
          console.error('Error getting location:', error);
          Alert.alert('Error', 'Failed to get current location.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
};

export const DeviceInfos = () => {
 const [ deviceDetails, setDetails]  = useState("")
 const [ deviceOSDetails, setOSDetails]  = useState("")
 const [ deviceBattery, setDeviceBattery] = useState([])
 const [ mobileNumber, setMobileNumber] = useState("")
 const [latitude, setLatitude] = useState(null);
 const [longitude, setLongitude] = useState(null);
 const [photoCount, setPhotoCount] = useState(null);
 const [ newIMEI, setnewIMEI] = useState("")

 const getDeviceInfo = async () =>{
  let deviceVersion = await DeviceInfo.getSystemName()
  let device = await DeviceInfo.getSystemVersion()
  let battery = await DeviceInfo.getBatteryLevel()
  let mobileNo = await DeviceInfo.getPhoneNumber()  
  let imei = await DeviceInfo.getUniqueId()  

  
  setnewIMEI(imei)
  setOSDetails(device)
  setDetails(deviceVersion)
  setDeviceBattery(battery);
  setMobileNumber(mobileNo)
  console.log(deviceVersion)
 }


  const fetchPhotosCount = async () => {
    try {
      const photos = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        includeBase64: false, 
        includeExif: false,
        includeMediaData: false, 
      });
      setPhotoCount(photos.length);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };
 useEffect(()=>{
  getDeviceInfo()
 },[])


 const handleGetLocation = () => {
     getCurrentLocation(setLatitude, setLongitude);
 };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <View style={styles.deviceInfoContainer}>
            <Text style={styles.title}>Get Current Coordinator</Text>
            <Text style={styles.subTitle}>Latitude: {latitude} & Longitude: {longitude}</Text>
            <TouchableOpacity style={{marginTop: 10,backgroundColor: "grey",width:"60%",borderRadius:10,padding: 10}} onPress={handleGetLocation} ><Text style={{color:"white",fontSize: 15}}>Get Current Location</Text></TouchableOpacity>
       </View>
       <View style={styles.deviceInfoContainer}>
            <Text style={styles.title}>Get OS Verison</Text>
            <Text style={styles.subTitle}>{deviceDetails} {deviceOSDetails}</Text>
       </View>
       <View style={styles.deviceInfoContainer}>
            <Text style={styles.title}>Get Battery Percentage:</Text>
            <Text style={styles.subTitle}>{Math.round((deviceBattery/1)*100)}%</Text>
       </View>
       <View style={styles.deviceInfoContainer}>
            <Text style={styles.title}>Get Mobile Number:</Text>
            <Text style={styles.subTitle}>{mobileNumber}</Text>
       </View>
       <View style={styles.deviceInfoContainer}>
            <Text style={styles.title}>Get IMEI No.</Text>
            <Text style={styles.subTitle}>{newIMEI}</Text>
       </View>
       <View style={styles.deviceInfoContainer}>
       <TouchableOpacity style={{marginTop: 10,backgroundColor: "grey",width:"50%",borderRadius:10,padding: 10}} onPress={fetchPhotosCount} >
        <Text style={{color:"white",fontSize: 15}}>Get Photo count</Text>
        </TouchableOpacity>
            {photoCount !== null ? (
              <Text style={styles.subTitle}>Total number of photos in gallery: {photoCount}</Text>
            ) : (
              <Text style={styles.subTitle}>Press the button to get the count</Text>
            )}
       </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  deviceInfoContainer:{
      flexDirection: "column" ,
      borderWidth: 1,
      width: "90%",
      padding: 10,
  },
  title:{
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  subTitle:{
    fontSize: 18,
    color: "black",
  },
  text: {
      fontSize: 18,
      marginTop: 20,
      color: "black",
      borderWidth: 1
  }
});
