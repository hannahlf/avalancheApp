import * as React from 'react';
import { View, Button, SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { gyroscope, accelerometer } from "react-native-sensors";
import { Camera }  from './components/Camera';
import { Home } from './components/Home';

 
function HomeScreen({ navigation }) {
enableScreens();
  return (
    <SafeAreaView style={{ flex: 1, height: '25%', alignItems: 'center', justifyContent: 'center' }}>
	<Home/>
        <Button 
          title="Inclinometer"
          onPress={() => navigation.navigate('Inclinometer')}
        />
    </SafeAreaView>
  );
}

function InclinometerScreen({ navigation }) {
enableScreens();
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
	<Camera/>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

function App() {
 return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
     	<Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Weather' }} />
	<Stack.Screen name="Inclinometer" component={InclinometerScreen} options={{ title: 'Inclinometer', 
	    message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel', }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
