import 'react-native-gesture-handler';

import React, { useState } from 'react';

import { StyleSheet, View, Text, TextInput, Button, ScrollView, SafeAreaView} from 'react-native';
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
    
    let revenue = this.getRevenue(bookkeepingData, '2020');
    let profit = this.getProfit(bookkeepingData, '2020');
    let balance = this.getBalance(bookkeepingData, '2020');

    let warningText = "";

    if(revenue/this.getRevenue(bookkeepingData,'2019') < 0.75 || profit/this.getProfit(bookkeepingData,'2019') < 0.75 || balance/this.getBalance(bookkeepingData,'2019') < 0.75){
      warningText = "Один или несколько показателей понизились на 25% по сравнению с предыдущим годом";
    }

    if(bookkeepingData[`${inn}`].length == 0){
      revenue = 'данные отсутсвуют';
      profit = 'данные отсутсвуют';
      balance = 'данные отсутсвуют';
    }
    //console.log(bookkeepingData['2019'])
    //console.log(49,DataBookkeeping[`${Object.keys(DataBookkeeping)[0]}`]['2020']['4229']);
    return (
      <SafeAreaView style = {styles.container}>
        <Text style = {styles.head}>За 2020 г.</Text>
        <Text style = {styles.head}>Баланс: {balance}</Text>
        <Text style = {styles.head}>Выручка: {revenue}</Text>
        <Text style = {styles.head}>Чистая прибыль: {profit}</Text>
        <Text>{warningText}</Text>
      </SafeAreaView>
    );
  }

  getBalance(bookkeepingData = {}, year = ''){
    if(bookkeepingData[`${Object.keys(bookkeepingData)[0]}`][year]){
      return bookkeepingData[`${Object.keys(bookkeepingData)[0]}`][year]['1600'];
    }
    return 0;
  }


  getRevenue(bookkeepingData = {}, year = ''){
    if(bookkeepingData[`${Object.keys(bookkeepingData)[0]}`][year]){
      return bookkeepingData[`${Object.keys(bookkeepingData)[0]}`][year]['2110'];
    }
    return 0;
  }

  getProfit(bookkeepingData = {}, year = ''){
    if(bookkeepingData[`${Object.keys(bookkeepingData)[0]}`][year]){
      return bookkeepingData[`${Object.keys(bookkeepingData)[0]}`][year]['2400'];
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
    marginTop: '15%',
    backgroundColor: '#F8F8FF', 
    height: '100%'
  },

  container: {
    marginTop: '10%',
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

