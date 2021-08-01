import 'react-native-gesture-handler';

import React, { useState } from 'react';

import { StyleSheet, View, Text, TextInput, ScrollView, Button, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import Header from './components/Header';
import HomeScreen from './HomeScreen';

let InNumber;

class NalogScreen extends React.Component {
  
  state = {
    score: 80,
    scoreColor: '#77dd77'
  }

  render() {

    const score = this.state.score;
    const {inn, FSSPData, nalogMessage} = this.props.route.params;
    
    // inn number of company
    InNumber = inn;
    const num = InNumber;
    
    let ListData = FSSPData[`${InNumber}`];
    
    // number of enforcement proceedings
    let NalogCount = this.getNalogCount(FSSPData);
    // amount of enforcement proceedings
    let NalogBalance = this.getNalogBalance(FSSPData);

    return (
      <SafeAreaView style = {styles.container}>
        <Text style={styles.headName}>ЗАДОЛЖЕННОСТИ</Text> 
        <View style = {styles.messageContainer}>
          <Text style={styles.message}>{nalogMessage}</Text> 
        </View>
        
         
        <View style = {styles.delaContainer}>

          <Text style = {styles.head}>Общая сумма непогашенной задолженности:  {NalogBalance}₽</Text>
          <Text style = {styles.head}>Количество незавершенных исполнительных производств: {NalogCount}</Text>
          <ScrollView style = {{height: 500, marginHorizontal: 30, paddingTop: 10}}>
            {
            this.displayFSSPData(ListData)
            }
          </ScrollView>
          
          
        </View>
        
      </SafeAreaView>
    );
  }

  // function to calculate number of enforcement proceedings
  getNalogCount =  (FSSPData) => {
    let count = 0;
    for (let key in  FSSPData[`${InNumber}`]){
      if (FSSPData[`${InNumber}`][key]['Статус'] == 'Не завершено' ) {
        count++;
      }
    } 
    return count;
  }
  // function to calculate amount of enforcement proceedings
  getNalogBalance = (FSSPData) => {
    let remains = 0;
    for (let key in  FSSPData[`${InNumber}`]) {
      console.log( FSSPData[`${InNumber}`][key]['Остаток']);
      if (FSSPData[`${InNumber}`][key]['Статус'] == 'Не завершено' ) {
        remains = remains +  FSSPData[`${InNumber}`][key]['Остаток'];
      }
    }
   
  remains = Number((remains).toFixed(2));

  return remains;
  }
 
 // function to output a list of enforcement proceedings
 displayFSSPData = (ListData) => {
    if(ListData){
      return(
        Object.keys(ListData).map((item,i) => {
          if(ListData[item]['Статус'] == 'Не завершено')
          return(
            <View key = {i}>
              <Text style = {styles.item}>{item} {'\n'}Дата: {ListData[item]['Дата']}{'\n'}Статус: {ListData[item]['Статус']} {'\n'}Предмет: {ListData[item]['Предмет']} {'\n'}Сумма: {ListData[item]['Сумма']}₽</Text>
            </View>
          )
        })
      )
    }
    else{
      return(
        <Text>отсутсвуют</Text>
      )
    }
  }
}

const styles = StyleSheet.create({

  background: {
    marginTop: '15%',
    backgroundColor: '#F8F8FF',
    height: '100%'
  },

  head: {
    fontSize: 20,
    marginTop: '8%',
    marginHorizontal: '5%',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  delaContainer: {
    fontSize: 15,
    marginTop: '1%',
    textAlign: 'left',
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: 'grey',
  },

  message: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'black',
  },
  messageContainer: {
    fontSize: 16,
    marginTop: '5%',
    textAlign: 'left',
    paddingHorizontal: 20,
    fontWeight: 'bold',
    color: 'grey',
  },

  item: {
    marginTop: 24,
    padding: 25,
    backgroundColor: "#ddd",
    paddingHorizontal: 10,
    fontSize: 18,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF'
  },
  headName: {
    backgroundColor: '#5961AB',
    fontSize: 27,
    paddingTop: 26,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },

});
export default NalogScreen;
