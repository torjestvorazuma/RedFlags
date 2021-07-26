import 'react-native-gesture-handler';

import React, { useState } from 'react';

import { StyleSheet, View, Text, TextInput, Button, ScrollView, SafeAreaView, ImageBackground} from 'react-native';
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
      warningText = "Один или несколько показателей понизились на более чем на 25% по сравнению с предыдущим годом";
    }

    // "₽"

    let balanceString = balance * 1000 + "₽";
    let revenueString = revenue * 1000 + "₽";
    let profitString = profit * 1000 + "₽";

    if(bookkeepingData[`${inn}`].length == 0){
      revenueString = 'данные отсутсвуют';
      profitString = 'данные отсутсвуют';
      balanceString = 'данные отсутсвуют';
    }

    try{
      console.log(bookkeepingData[`${inn}`]['2020']['1600']);
    }
    catch(e){
      balanceString = 'данные отсутсвуют';
    }

    try{
      console.log(bookkeepingData[`${inn}`]['2020']['2110']);
    }
    catch(e){
      revenueString = 'данные отсутсвуют';
    }

    try{
      console.log(bookkeepingData[`${inn}`]['2020']['2400']);
    }
    catch(e){
      profitString = 'данные отсутсвуют';
    }

    return (
      <SafeAreaView style={styles.background}> 
      <ImageBackground  style={styles.imgBackground } source={require('./components/background.png')}>
        <Text style={styles.headName}>БУХГАЛТЕРИЯ</Text> 
        <Text style = {styles.head}>ДАННЫЕ ЗА 2020 ФИНАНСОВЫЙ ГОД</Text>
        <Text style = {styles.headleft}>Баланс: {balanceString}</Text>
        <Text style = {styles.headleft}>Выручка: {revenueString}</Text>
        <Text style = {styles.headleft}>Чистая прибыль: {profitString}</Text>
        <Text style = {styles.warning}>{warningText}</Text>
        </ImageBackground>
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
    backgroundColor: '#F3F4F6',
    height: '100%'
  },
  warning: {
    fontSize: 20,
    marginTop: '10%',
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    //marginTop: '10%',
    //flex: 1,
    //paddingHorizontal: 20,
    backgroundColor: '#F3F4F6',
  },

  head: {
    fontSize: 30,
    marginTop: '10%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  headleft: {
    fontSize: 26,
    marginTop: '10%',
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'black',
  },
  headName: {
    backgroundColor: '#5961AB',
    fontSize: 27,
    paddingTop: 26,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  imgBackground: {
    flex: 1,
    width: null,
    height: null,

  }

});
export default BookkeepingScreen;