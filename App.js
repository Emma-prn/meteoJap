import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StyleSheet, View, Text } from 'react-native';
import Home from './components/Home';
import Previsions from './components/Previsions';

const Stack = createStackNavigator();
// Navigation entre les différents écrans de l'application
export default function App() {
  return (
      <NavigationContainer>
            <Stack.Navigator style={styles.container}>
              <Stack.Screen name="Accueil" component={Home} options={{headerStyle: header,}}/>
              <Stack.Screen name="Prévisions" component={Previsions} options={{headerStyle: header,}}/>
            </Stack.Navigator>
      </NavigationContainer>
  );
}

// Style pour le header des Screen
const header = {
  backgroundColor: '#ebd5b3',
}
// Style pour le Navigator
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
