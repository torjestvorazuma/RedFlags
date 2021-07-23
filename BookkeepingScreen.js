import 'react-native-gesture-handler';

import React, { useState } from 'react';

import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import Header from './components/Header';
import HomeScreen from './HomeScreen';

class BookkeepingScreen extends React.Component {
  
  state = {
    score: 80,
    scoreColor: '#77dd77'
  }

  

  render() {
    const { inn, bookkeepingData } = this.props.route.params;
    const score = this.state.score;
    
    let revenue = this.getRevenue(bookkeepingData);
    let profit = this.getProfit(bookkeepingData);
    let balance = this.getBalance(bookkeepingData);
    //console.log(bookkeepingData['2019'])
    //console.log(49,DataBookkeeping[`${Object.keys(DataBookkeeping)[0]}`]['2020']['4229']);
    return (
      <View style = {styles.container}>
        <Text style = {styles.head}>За 2020 г.</Text>
        <Text style = {styles.head}>Баланс: {balance}₽</Text>
        <Text style = {styles.head}>Выручка: {revenue}₽</Text>
        <Text style = {styles.head}>Чистая прибыль: {profit}₽</Text>
        
      </View>
    );
  }

  getBalance(bookkeepingData = {}){
    if(bookkeepingData){
      return bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2020']['1600'];
    }
    return 0;
  }


  getRevenue(bookkeepingData = {}){
    if(bookkeepingData){
      return bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2020']['2110'];
    }
    return 0;
  }

  getProfit(bookkeepingData = {}){
    if(bookkeepingData){
      return bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2020']['2400'];
    }
    return 0;
  }

  /*displayBookkepingData(bookkeepingData = {}){
    if(bookkeepingData){
      return(
        Object.keys(bookkeepingData).map((item,i) => {
          return(
            <View key = {i}>
              <Text style = {styles.item}>{item}</Text>
            </View>
          )
        })
      )
    }
    else{
      return(
        <Text style>Дела отсутсвуют</Text>
      )
    }
  }*/


}

const styles = StyleSheet.create({

  background: {
    backgroundColor: '#F8F8FF', 
    height: '100%'
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F8F8FF',
  },

  head: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'grey',
  },

});
export default BookkeepingScreen;

