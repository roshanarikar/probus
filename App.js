import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Home } from './src/Home';
import { Register } from './src/Register';
import { ListData } from './src/ListData';
import {  DeviceInfos } from './src/DeviceInfos';
import { CameraSet } from './src/CameraSet';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ListData" component={ListData} />
        <Stack.Screen name="DeviceInfos" component={DeviceInfos} />
        <Stack.Screen name="CameraSet" component={CameraSet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;