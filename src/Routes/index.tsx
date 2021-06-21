import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from '../pages/Home';
import ContactPage from '../pages/Contact';

const Stack = createStackNavigator();


export default function Routes() {
  return (
    <NavigationContainer>
        <StatusBar style="auto" />

        <Stack.Navigator initialRouteName="Contatos">
            <Stack.Screen name="Contatos" component={HomePage} />
            <Stack.Screen name="Editar Contato" component={ContactPage} />
        </Stack.Navigator>


    </NavigationContainer>
  );
}