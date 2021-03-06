import 'react-native-gesture-handler';

import React, { useState } from 'react';

import { StyleSheet, View, Text, TextInput, Button, ScrollView, Linking, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import Header from './components/Header';
import HomeScreen from './HomeScreen';

class CourtsScreen extends React.Component {

  
  state = {
    score: 80,
    scoreColor: '#77dd77'
  }

  

  render() {
    const score = this.state.score;
    const {inn, arbitrData, arbitrMessages} = this.props.route.params;

    console.log(56, arbitrData);
    // data of the company's roles in court
    let plaintiffData = arbitrData.result.Истец;
    let defendantData = arbitrData.result.Ответчик;
    let thirdPartyData = arbitrData.result.ИноеЛицо;
    // numbers of cases in court
    let plaintiffCount = this.getPlaintiffCount(plaintiffData);
    let defendantCount = this.getDefendantCount(defendantData);
    let thirdPartyCount = this.getThirdPartyCount(thirdPartyData);
    // amounts of cases
    let plaintiffAmount = this.getPlaintiffAmount(plaintiffData);
    let defendantAmount = this.getDefendantAmount(defendantData);
    let thirdPartyAmount = this.getThirdPartyAmount(thirdPartyData);

   
    // interface
    return (
      <SafeAreaView style = {styles.container}>
        <Text style={styles.headName}>СУДЕБНАЯ НАГРУЗКА</Text> 
        <View style = {styles.messageContainer}>
          <Text style = {styles.message}>{arbitrMessages[0]}</Text>
          <Text style = {styles.message}>{arbitrMessages[1]}</Text>
        </View>
        <View style = {styles.delaContainer}>
          <Text style = {styles.dela}>Дел в качестве истца:                                {plaintiffCount} </Text>
          <Text style = {styles.delaDetails}>Общая сумма:                                                       {plaintiffAmount}₽ </Text>
          <ScrollView style = {{height: 100}}>
          {
            this.displayPlaintiffData(plaintiffData)
          }
        </ScrollView>
        </View>
        <View style = {styles.delaContainer}>
          <Text style = {styles.dela}>Дел в качестве ответчика:                       {defendantCount}</Text>
          <Text style = {styles.delaDetails}>Общая сумма:                                                       {defendantAmount}₽ </Text>
          <ScrollView style = {{height: 100}}>
          {
            this.displayDefendantData(defendantData)
          }
        </ScrollView>
        </View>
          
        <View style = {styles.delaContainer}>
          <Text style = {styles.dela}>Дел качестве третьего лица:                  {thirdPartyCount}</Text>
          <Text style = {styles.delaDetails}>Общая сумма:                                                       {thirdPartyAmount}₽ </Text>
          <ScrollView style = {{height: 100}}>
          {
            this.displayThirdPartyData(thirdPartyData)
          }
        </ScrollView>
        </View>
      </SafeAreaView>
        
      
    );
  }
 
  // function is used to count the number of all cases 
  getPlaintiffCount(plaintiffData = {}){
    let count = 0;

    if(plaintiffData){
      
      for(let i = 0; i < Object.keys(plaintiffData).length; i++){
        console.log(13, plaintiffData[Object.keys(plaintiffData)[i]].Статус);
        count++;
      }
    }
    return count;
  }
  
  // function is used to count the number of cases that are not completed
  getDefendantCount(defendantData = {}){
    let count = 0;
  
    if(defendantData){
      for(let i = 0; i < Object.keys(defendantData).length; i++){
        let status = defendantData[Object.keys(defendantData)[i]].Статус.valueOf();
        console.log(15,status);
        console.log(29,typeof(status));
        
        if(status != "Рассмотрение дела завершено"){
          console.log(13, defendantData[Object.keys(defendantData)[i]].Статус);
          count++;
        }
        
      }
    }
    return count;
  }

  // function is used to count the number of cases that are not completed
  getThirdPartyCount(thirdPartyData = {}){
    let count = 0;
    
    if(thirdPartyData){
      for(let i = 0; i < Object.keys(thirdPartyData).length; i++){
        let status = thirdPartyData[Object.keys(thirdPartyData)[i]].Статус.valueOf();
        console.log(15,status);
        console.log(29,typeof(status));
        
        if(status != "Рассмотрение дела завершено"){
          console.log(13, thirdPartyData[Object.keys(thirdPartyData)[i]].Статус);
          count++;
        }
      }
    }
    return count;
  }
  
  // function is used to count the amount of all cases 
  getPlaintiffAmount(plaintiffData = {}){
    let amount = 0;
    
    if(plaintiffData){
      for(let i = 0; i < Object.keys(plaintiffData).length; i++){
        amount = amount + plaintiffData[Object.keys(plaintiffData)[i]].Сумма;
      }
    }
    amount = Number((amount).toFixed(2));
    return amount;

  }
  // function is used to amount the number of cases that are not completed
  getDefendantAmount(defendantData = {}){
    let amount = 0;
    if(defendantData){
      for(let i = 0; i < Object.keys(defendantData).length; i++){
        let status = defendantData[Object.keys(defendantData)[i]].Статус.valueOf();
        console.log(15,status);
        console.log(29,typeof(status));
        
        if(status != "Рассмотрение дела завершено"){
          amount = amount + defendantData[Object.keys(defendantData)[i]].Сумма;
        }
        
      }
    }
   
    console.log(328, typeof(amount));
    console.log(457, amount);
    amount = Number((amount).toFixed(2));
    
    return amount;
  }

  
 // function is used to count the amount of cases that are not completed
  getThirdPartyAmount(thirdPartyData = {}){
    let amount = 0;
    
    if(thirdPartyData){
      for(let i = 0; i < Object.keys(thirdPartyData).length; i++){
        let status = thirdPartyData[Object.keys(thirdPartyData)[i]].Статус.valueOf();
        console.log(15,status);
        console.log(29,typeof(status));
        
        if(status != "Рассмотрение дела завершено"){
          amount = amount + thirdPartyData[Object.keys(thirdPartyData)[i]].Сумма;
        }
       
      }
    }
    amount = Number((amount).toFixed(2));

    return amount;
  }
// function is used to show a list of all cases 
// if you click on the case, you will go to the kad.arbitr
  displayPlaintiffData(plaintiffData = {}){
    if(plaintiffData){
      return(
        Object.keys(plaintiffData).map((item,i) => {
          return(
            <View key = {i}>
              <Text style = {styles.item} onPress={() => Linking.openURL(plaintiffData[Object.keys(plaintiffData)[i]].Url)}>{item}</Text>
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
  }
 
  // function is used to show a list of cases that are not completed
  // if you click on the case, you will go to the kad.arbitr
  displayDefendantData(defendantData = {}){
    if(defendantData){
      return(
        Object.keys(defendantData).map((item,i) => {
          let status = defendantData[Object.keys(defendantData)[i]].Статус.valueOf();

          if(status != "Рассмотрение дела завершено"){
            return(
              <View key = {i}>
                <Text style = {styles.item} onPress={() => Linking.openURL(defendantData[Object.keys(defendantData)[i]].Url)}>{item}</Text>
              </View>
            )
          }
        })
      )
    }
    else{
      return(
        <Text style>Дела отсутсвуют</Text>
      )
    }
  }
 // function is used to show a list of cases that are not completed
 // if you click on the case, you will go to the kad.arbitr
  displayThirdPartyData(thirdPartyData = {}){
    if(thirdPartyData){
      return(
        Object.keys(thirdPartyData).map((item,i) => {
          let status = thirdPartyData[Object.keys(thirdPartyData)[i]].Статус.valueOf();
          if(status != "Рассмотрение дела завершено"){
            return(
              <View key = {i}>
                <Text style = {styles.item} onPress={() => Linking.openURL(thirdPartyData[Object.keys(thirdPartyData)[i]].Url)}>{item}</Text>
              </View>
            )
          }
        })
      )
    }
    else{
      return(
        <Text style>Дела отсутсвуют</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF', 
  },

  head: {
    fontSize: 30,
    marginTop: '20%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'grey',
    paddingTop: '50%'
  },

  dela: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'grey',
  },

  message: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'black',
  },

  delaDetails: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'grey',
  },

  delaContainer: {
    fontSize: 20,
    marginTop: '10%',
    textAlign: 'left',
    paddingHorizontal: 20,
    fontWeight: 'bold',
    color: 'grey',
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
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ddd",
    fontSize: 15,
    textAlign: 'center'
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
export default CourtsScreen;
