  
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import 'react-native-gesture-handler';

import HomePage from '../pages/Home';
import ContactPage from '../pages/Contact';
import CameraPage from '../pages/Camera';
import MapPage from '../pages/Map';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
      
            <Stack.Navigator>
                <Stack.Screen name="Contatos" component={HomePage} />
                <Stack.Screen name="Editar Contato" component={ContactPage} />
                <Stack.Screen name="Câmera" component={CameraPage} />
                <Stack.Screen name="Mapa" component={MapPage} />
            </Stack.Navigator>

        </NavigationContainer>
    );
}