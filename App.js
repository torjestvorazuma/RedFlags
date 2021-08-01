
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import Header from './components/Header';
import HomeScreen from './HomeScreen';
import ResearchScreen from './ResearchScreen';
import CourtsScreen from './CourtsScreen';
import TaxesScreen from './TaxesScreen';
import AdressScreen from './AdressScreen';
import NalogScreen from './NalogScreen';
import BookkeepingScreen from './BookkeepingScreen';
import ReferenceScreen from './ReferenceScreen';
import PDFScreen from './PDFScreen';

class App extends React.Component {
  render() {
    // Stack.Navigator provides a way for your app to transition between screens where each new screen is placed on top of a stack
    return (
      <NavigationContainer style = {styles.navigation}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name = "Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Research"
            component={ResearchScreen}
          />
          <Stack.Screen
            name="Courts"
            component={CourtsScreen}
          />
          <Stack.Screen
            name="Taxes"
            component={TaxesScreen}
          />
          <Stack.Screen
            name="Adress"
            component={AdressScreen}
          />
          <Stack.Screen
            name="Debt"
            component={NalogScreen}
          />
          <Stack.Screen
            name="Bookkeeping"
            component={BookkeepingScreen}
          />
        <Stack.Screen
            name="Reference"
            component={ReferenceScreen}
          />
          <Stack.Screen
            name="PDF"
            component={PDFScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
    navigaton: {
      backgroundColor: '#77dd77',
      color: 'red'
    }
});
export default App;
