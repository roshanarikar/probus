import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonBox} onPress={()=> navigation.navigate("Register")}>
        <Text style={styles.routeText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonBox} onPress={()=> navigation.navigate("ListData")}>
        <Text style={styles.routeText}>ListData</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonBox} onPress={()=> navigation.navigate("DeviceInfos")}>
        <Text style={styles.routeText}>Device Info</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonBox} onPress={()=> navigation.navigate("CameraSet")}>
        <Text style={styles.routeText}>Camera Set</Text>
      </TouchableOpacity>
     </View>
  );
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: "grey",
        height: 900
    },
    buttonBox:{
        height: 50,
        margin: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "orange",
        borderRadius: 10,
    },
    routeText:{
        color: "white",
        fontSize:20,
        fontWeight: "bold"
    }
})