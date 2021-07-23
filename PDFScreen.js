import 'react-native-gesture-handler';

import React, { useState } from 'react';

import {View, Text, TextInput, Button, StyleSheet, Linking, Image} from 'react-native';
//import PDFView from 'react-native-view-pdf';
//import { Page ,Document, PDFViewer } from 'react-native-web';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import RNHTMLtoPDF from "react-native-html-to-pdf";
//import { generateFileHTML } from "./generateFileHTML";
//import { createPDF } from "./createPDF";
//import Pdf from "react-native-pdf";
//import * as Print from "expo-print";
//import * as MediaLibrary from "expo-media-library";
//import * as Sharing from "expo-sharing";

const Stack = createStackNavigator();
import Header from './components/Header';
import HomeScreen from './HomeScreen';


const API_FNS_KEY = '252dffd2565f4318d5b19b08337d2a315c028fa5';
let InNumber;


class PDFScreen extends React.Component {
  state = {
    score: 80,
    scoreColor: '#77dd77'
  }
  
  render() {

    const score = this.state.score;
    const {inn} = this.props.route.params;
    InNumber = inn;
    
    
    return (
      <View>
      <Image style={styles.imagine} source={require('./components/pic.png')}/>
      <Text style = {styles.headName}>Формирование различных отчетов</Text>
      <View style={[styles.category, {  backgroundColor: '#778899' }]}>
          <Button title="ВЫПИСКА ИЗ ЕГРЮЛ" color='#fff' fontWeight='bold' onPress={() => Linking.openURL(`https://api-fns.ru/api/vyp?req=${InNumber}&key=${API_FNS_KEY}`)} />
      </View>   
      </View>  
    );
  }
  
  
}

const styles = StyleSheet.create({

  background: {
    backgroundColor: '#F8F8FF',
    height: '100%'
  },

  //head: {
  //  fontSize: 30,
    //marginTop: '2%',
  //  textAlign: 'center',
    //fontWeight: 'bold',
    //color: 'grey',
   // paddingTop: '2%'
  // width: '70%',
  //    height: '4%'
 
  //},
  headName: {
    fontSize: 27,
    paddingTop: 10,
    textAlign: 'center',
    color: 'grey',
    fontWeight: 'bold'
  },
  category: {
    marginHorizontal: '10%',
    textAlign: 'left',
    borderRadius: 15,
    fontWeight: 'bold',
    marginTop: '5%',

  },
  page: {
    flexDirection: "column"
  },
  imagine: {
      //position: 'absolute',
      //width: '50%',
      //height: '50%',
      //justifyContent: 'center',
      //alignItems: 'center',
      width: '70%',
      height: '20%',
      alignSelf:'center'
    
  },
  centerImage: {
    alignItems: "center",
    flexGrow: 1
  },
  text: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 50,
    paddingVertical: 30,
    color: "#212121"
  }

});
export default PDFScreen;