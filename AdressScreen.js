import 'react-native-gesture-handler';

import React, { useState } from 'react';

import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import Header from './components/Header';
import HomeScreen from './HomeScreen';

const API_KEY = "252dffd2565f4318d5b19b08337d2a315c028fa5";
let count;
class AdressScreen extends React.Component {
  
  

  render() {
    const { inn, finalData, adressData } = this.props.route.params;
    const adresses = [];
    adressData.items.forEach(function(obj) {adresses.push(obj.ЮЛ.НаимСокрЮЛ)})
    count = adressData.Count;
    return (
   
      
       <View style = {styles.container}> 
       <Text style={styles.headName}>МАССОВОСТЬ АДРЕСА</Text>  
       <Text style={styles.result}>{this.displaData(count)} </Text>
        <Text style = {styles.head}>Компании, зарегистрированные на данный адрес: {count} </Text>
        <ScrollView>
          {
            adresses.map((item,i) => {
              return(
                <View key = {i}>
                  <Text style = {styles.item}>{item}</Text>
                </View>
              )
            })
          }
        </ScrollView>
      
      </View>
    );
  }
  
  gettingInformationAboutAdress = async () => {
    const api_url = await fetch(`https://api-fns.ru/api/egr?req=${finalData.items[0].ЮЛ.Адрес.АдресПолн}&key=${API_KEY}`);
    const DataJSON = await api_url.json();
    console.log(DataJSON);
    return DataJSON;
    
  };

  loadAdresses(){

  }

  displaData = (count) => {
    if(count > 5){
      return(
        <Text>На этот адрес зарегистрировано более 5 компаний. Риск "фирмы однодневки".</Text>
      )
    } else {
      return(
        <Text>На этот адрес зарегистрировано менее 5 компаний. Риски не обнаружены.</Text>
      )
    }

  }
}

const styles = StyleSheet.create({

  container: {
    //flex: 1,
    //paddingTop: 40,
    //paddingHorizontal: 20, 
    backgroundColor: '#F3F4F6',
  },

  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "#B0BDC1", 
    alignSelf: 'center',
    width : '80%',
    fontSize: 24
  },
  result: {
    fontSize: 20, 
    paddingTop: 10, 
    textAlign: 'center',
    fontWeight: 'bold',
  },
  head: {
    fontSize: 20,
    
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'grey',
  },
  stylehead: {
    fontSize: 15,
    paddingTop: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  headName: {
    backgroundColor: '#5961AB',
    fontSize: 27,
    paddingTop: 10,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },


});
export default AdressScreen;