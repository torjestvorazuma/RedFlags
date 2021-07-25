import 'react-native-gesture-handler';

import React, { useState } from 'react';

import { StyleSheet, View, Text, TextInput, Button, ScrollView, Linking } from 'react-native';
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
    const {inn, arbitrData} = this.props.route.params;

    console.log(56, arbitrData);
    let plaintiffData = arbitrData.result.Истец;
    let defendantData = arbitrData.result.Ответчик;
    let thirdPartyData = arbitrData.result.ИноеЛицо;
    
    let plaintiffCount = this.getPlaintiffCount(plaintiffData);
    let defendantCount = this.getDefendantCount(defendantData);
    let thirdPartyCount = this.getThirdPartyCount(thirdPartyData);

    let plaintiffAmount = this.getPlaintiffAmount(plaintiffData);
    let defendantAmount = this.getDefendantAmount(defendantData);
    let thirdPartyAmount = this.getThirdPartyAmount(thirdPartyData);

   

    return (
      <View style = {styles.container}>
        <View style = {styles.delaContainer}>
          <Text style = {styles.dela}>Дел в качестве истца:                                {plaintiffCount} </Text>
          <Text style = {styles.delaDetails}>Общая сумма:                                                       {plaintiffAmount}₽ </Text>
          <ScrollView style = {{height: 120}}>
          {
            this.displayPlaintiffData(plaintiffData)
          }
        </ScrollView>
        </View>
        <View style = {styles.delaContainer}>
          <Text style = {styles.dela}>Дел в качестве ответчика:                       {defendantCount}</Text>
          <Text style = {styles.delaDetails}>Общая сумма:                                                       {defendantAmount}₽ </Text>
          <ScrollView style = {{height: 120}}>
          {
            this.displayDefendantData(defendantData)
          }
        </ScrollView>
        </View>
          
        <View style = {styles.delaContainer}>
          <Text style = {styles.dela}>Дел качестве третьего лица:                  {thirdPartyCount}</Text>
          <Text style = {styles.delaDetails}>Общая сумма:                                                       {thirdPartyAmount}₽ </Text>
          <ScrollView style = {{height: 120}}>
          {
            this.displayThirdPartyData(thirdPartyData)
          }
        </ScrollView>
        </View>
      </View>
        
      
    );
  }

  getPlaintiffCount(plaintiffData = {}){
    let count = 0;

    if(plaintiffData){
      
      for(let i = 0; i < Object.keys(plaintiffData).length; i++){
        let status = plaintiffData[Object.keys(plaintiffData)[i]].Статус.valueOf();
        console.log(15,status);
        console.log(29,typeof(status));
        
        if(status != "Рассмотрение дела завершено"){
          console.log(13, plaintiffData[Object.keys(plaintiffData)[i]].Статус);
          count++;
        }
        
      }
    }
    return count;
  }

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

  getPlaintiffAmount(plaintiffData = {}){
    let amount = 0;
    
    if(plaintiffData){
      for(let i = 0; i < Object.keys(plaintiffData).length; i++){
        let status = plaintiffData[Object.keys(plaintiffData)[i]].Статус.valueOf();
        console.log(15,status);
        console.log(29,typeof(status));
        
        if(status != "Рассмотрение дела завершено"){
          amount = amount + plaintiffData[Object.keys(plaintiffData)[i]].Сумма;
        }
        
      }
    }
    amount = Number((amount).toFixed(2));
    return amount;

  }
 //7721503606
  getDefendantAmount(defendantData = {}){
    let amount = 0;
    //let defendantData = arbitrData.result.Ответчик;
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

  displayPlaintiffData(plaintiffData = {}){
    if(plaintiffData){
      return(
        Object.keys(plaintiffData).map((item,i) => {
          let status = plaintiffData[Object.keys(plaintiffData)[i]].Статус.valueOf();
          
          if(status != "Рассмотрение дела завершено"){
            return(
              <View key = {i}>
                <Text style = {styles.item} onPress={() => Linking.openURL(plaintiffData[Object.keys(plaintiffData)[i]].Url)}>{item}</Text>
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

});
export default CourtsScreen;
