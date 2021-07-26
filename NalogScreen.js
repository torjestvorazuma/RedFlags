import 'react-native-gesture-handler';

import React, { useState } from 'react';

import { StyleSheet, View, Text, TextInput, ScrollView, Button, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import Header from './components/Header';
import HomeScreen from './HomeScreen';

let InNumber;

//<Text style = {styles.head}>Сумма "Задолженность":  {NalogDebt}₽</Text>
//<Text style = {styles.head}>Сумма "Взыскание налогов и сборов, включая пени":  {NalogNalog}₽</Text>
class NalogScreen extends React.Component {
  
  state = {
    score: 80,
    scoreColor: '#77dd77'
  }

  render() {

    const score = this.state.score;
    const {inn,FSSPData} = this.props.route.params;

    InNumber = inn;
    const num = InNumber;

    let ListData = FSSPData[`${InNumber}`];
    
    
    let NalogCount = this.getNalogCount(FSSPData);
    let NalogAmount = this.getNalogAmount(FSSPData);
    let NalogBalance = this.getNalogBalance(FSSPData);
    let NalogDebt = this.getNalogDebt(FSSPData);
    let NalogNalog = this.getNalog(FSSPData);

       //<Text>Количество исполнительных производств:        {NalogCount} </Text>
        //<Text>Общая сумма задолженности (в рублях):         {NalogAmount} </Text>
    return (
      <View style = {styles.container}>
        <ScrollView>
        <Text style={styles.headName}>ЗАДОЛЖЕННОСТИ</Text>  
        <View style = {styles.delaContainer}>

          <Text style = {styles.head}>Количество незавершенных исполнительных производств: {NalogCount}</Text>
          <ScrollView style = {{height: 200}}>
            {
            this.displayFSSPData(ListData)
            }
          </ScrollView>
          <Text style = {styles.head}>Общая сумма непогашенной задолженности:  {NalogBalance}₽</Text>
          
        </View>
        </ScrollView>
      </View>
    );
  }

  getNalogCount =  (FSSPData) => {
    let count = 0;
    for (key in  FSSPData[`${InNumber}`]){
      if (FSSPData[`${InNumber}`][key]['Статус'] == 'Не завершено' ) {
        count++;
      }
    } 
    return count;
  }

  getNalogAmount  = (FSSPData) => {
    let amount = 0;
    for (key in  FSSPData[`${InNumber}`]) {
      //console.log( FSSPData[`${InNumber}`][key]['Сумма']);
      if (FSSPData[`${InNumber}`][key]['Статус'] == 'Не завершено' ){
      amount = amount +  FSSPData[`${InNumber}`][key]['Сумма'];
      }
    }
  
  //console.log('итог');
  //console.log(amount);
  
  amount = Number((amount).toFixed(2));
  
  return amount;
  }
  
  getNalogBalance = (FSSPData) => {
    let remains = 0;
    for (key in  FSSPData[`${InNumber}`]) {
      console.log( FSSPData[`${InNumber}`][key]['Остаток']);
      if (FSSPData[`${InNumber}`][key]['Статус'] == 'Не завершено' ) {
        remains = remains +  FSSPData[`${InNumber}`][key]['Остаток'];
      }
    }
  
  //console.log('Остаток');
  //console.log(remains); 
  
  remains = Number((remains).toFixed(2));

  return remains;
  }
 
  getNalog = (FSSPData) => {
    let nalog = 0;
    for (key in  FSSPData[`${InNumber}`]) {
      if (FSSPData[`${InNumber}`][key]['Предмет'] == 'Взыскание налогов и сборов, включая пени' ){
      nalog = nalog +  FSSPData[`${InNumber}`][key]['Сумма'];
      }
    }
  //console.log(nalog); 
  
  nalog = Number((nalog).toFixed(2));

  return nalog;
  }

  getNalogDebt = (FSSPData) => {
    let debt = 0;
    for (key in  FSSPData[`${InNumber}`]) {
      if (FSSPData[`${InNumber}`][key]['Предмет'] == 'Задолженность' ){
        debt = debt +  FSSPData[`${InNumber}`][key]['Сумма'];
      }
    }
  //console.log(debt); 
  
  debt = Number((debt).toFixed(2));

  return debt;
  }
 
  displayFSSPData = (ListData) => {
    if(ListData){
      return(
        Object.keys(ListData).map((item,i) => {
          if(ListData[item]['Статус'] == 'Не завершено')
          return(
            <View key = {i}>
              <Text style = {styles.item}>{item} {'\n'}Дата: {ListData[item]['Дата']}{'\n'}Статус: {ListData[item]['Статус']} {'\n'}Предмет: {ListData[item]['Предмет']} {'\n'}Сумма: {ListData[item]['Сумма']}</Text>
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
    color: 'grey',
    //height: '10%',
    //width: '70%',
  },
  delaContainer: {
    fontSize: 15,
    marginTop: '10%',
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'grey',
  },

  item: {
    marginTop: 24,
    padding: 25,
    backgroundColor: "#ddd",
    paddingHorizontal: 5,
    fontSize: 18,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    //paddingTop: 5,
    //paddingHorizontal: 5,
    backgroundColor: '#F8F8FF'
  },
  headName: {
    backgroundColor: '#5961AB',
    fontSize: 27,
    paddingTop: 26,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },

});
export default NalogScreen;