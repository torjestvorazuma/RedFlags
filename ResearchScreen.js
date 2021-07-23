import 'react-native-gesture-handler';

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from './components/Header';

class ResearchScreen extends React.Component {

  constructor(){
    super()
  }

  state = {
    scoreColor: 'black',
    addressColor: '#006400',
    bookkeepingColor: '#006400',
    arbitrColor: '#006400',
    nalogColor: '#006400'
  }

  render(){
    const {inn, finalData, adressData, arbitrData, FSSPData, bookkeepingData} = this.props.route.params;
    
    let OKVED = '';

    let addressColor =  '#006400';
    let bookkeepingColor = '#006400';
    let arbitrColor =  '#006400' ;        //'#008000';
    let nalogColor =  '#006400';

    if(adressData.Count > 5){
      addressColor = '#FF8C00';  // #FFB347 - старый оранжевый
    }

    let profit = 0;
    if(!bookkeepingData){
      bookkeepingColor =  '#FF8C00';
    }
    else if(bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2020']['2400']){
      profit = bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2020']['2400'];
    }

    let defendantAmount = 0;
    
    let plaintiffData = arbitrData.result.Истец;
    let defendantData = arbitrData.result.Ответчик;
    let thirdPartyData = arbitrData.result.ИноеЛицо;

    if(defendantData){
      
    }
    let plantiffCount = 0;
    let allCasesCount = 0;

    if(plaintiffData){
        for(let i = 0; i < Object.keys(plaintiffData).length; i++){
          plantiffCount++;
        }
    }

    if(arbitrData){
      if(plaintiffData){
        for(let i = 0; i < Object.keys(plaintiffData).length; i++){
          allCasesCount++;
        }
      }

      if(defendantData){
        for(let i = 0; i < Object.keys(defendantData).length; i++){
          allCasesCount++;
        }
      }

      if(thirdPartyData){
        for(let i = 0; i < Object.keys(thirdPartyData).length; i++){
          allCasesCount++;
        }
      }
    }

    if(plantiffCount/allCasesCount >= 0.7){
      arbitrColor = '#FF8C00';
    }

  
    if(defendantData){
      for(let i = 0; i < Object.keys(defendantData).length; i++){
        defendantAmount = defendantAmount + defendantData[Object.keys(defendantData)[i]].Сумма;
      }
    }

    if(defendantAmount/profit >= 0.7){
      arbitrColor = '#B22222';
    }

    let remainingCredit = 0;

    if(FSSPData){
      for (key in  FSSPData[`${inn}`]) {
        remainingCredit = remainingCredit +  FSSPData[`${inn}`][key]['Остаток'];
      }
    }
   

    if(remainingCredit > 25000){
      nalogColor = '#FF8C00';
    }

    if(remainingCredit > 65000){
      nalogColor = '#B22222';
    }
    


    try{
      if(finalData.items[0].ЮЛ.ОснВидДеят.Текст){
        OKVED = finalData.items[0].ЮЛ.ОснВидДеят.Текст;
      }
    }
    catch(e){
      OKVED = 'отсутсвует'
    }
    
    this.checkCriteriaAndSetColors(adressData);

    return (
      
      <View style={styles.background}>
        <Text style={styles.headName}> {finalData.items[0].ЮЛ.НаимСокрЮЛ}</Text>  
        <Text style={styles.head}>Статус: {finalData.items[0].ЮЛ.Статус}                         ИНН: {inn}</Text>  
        <Text style={styles.head}>Дата регистрации: {finalData.items[0].ЮЛ.ДатаРег}            КПП: {finalData.items[0].ЮЛ.КПП}</Text>
        <Text style={styles.head}>                                                               ОГРН: {finalData.items[0].ЮЛ.ОГРН}</Text>
        <Text style={styles.head}>Основной вид деятельности: {OKVED}</Text>
        <Text style={styles.head}>Руководитель: {finalData.items[0].ЮЛ.Руководитель.ФИОПолн}</Text>
        <Text style={styles.head}>Адрес: {finalData.items[0].ЮЛ.Адрес.АдресПолн}</Text>
       
        <View style={[styles.category, { backgroundColor: addressColor }]}>
          <Button title="МАССОВОСТЬ АДРЕСА" color="#fff" fontWeight='bold' onPress={() => this.props.navigation.navigate('Adress',{inn: this.state.INN,finalData: finalData, adressData: adressData})} />
        </View>
        <View style={[styles.category, { backgroundColor: bookkeepingColor}]}>
          <Button title="БУХГАЛТЕРИЯ" color="#fff" fontWeight='bold' onPress={() => this.props.navigation.navigate('Bookkeeping', {inn: inn, bookkeepingData: bookkeepingData})} />
        </View>
        <View style={[styles.category, { backgroundColor: nalogColor }]}>
          <Button title="ЗАДОЛЖЕННОСТИ" color="#fff" fontWeight='bold' onPress={() => this.props.navigation.navigate('Debt',{inn: inn, FSSPData: FSSPData})} />
        </View>
        <View style={[styles.category, { backgroundColor: arbitrColor }]}>
          <Button title="СУДЕБНАЯ НАГРУЗКА" color='#fff' fontWeight='bold' onPress={() => this.props.navigation.navigate('Courts',{inn: this.state.INN,arbitrData: arbitrData})} />
        </View>
        <View style={[styles.category, {  backgroundColor: '#778899' }]}>
          <Button title="ПОЛУЧИТЬ ОТЧЕТ" color="#fff" fontWeight='bold' onPress={() => this.props.navigation.navigate('PDF',{inn: inn})} />
        </View>
        <View style={[styles.category, {  backgroundColor: '#778899' }]}>
          <Button title="CПРАВКА" color="#fff" fontWeight='bold' onPress={() => this.props.navigation.navigate('Reference')} />
        </View>
      </View>
    );
  }

  checkCriteriaAndSetColors = (adressData = {}) => { 
    
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#F8F8FF',
    height: '100%'
  },

  head: {
    fontSize: 15,
    paddingTop: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  title: {
    fontSize: 18,
    paddingTop: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  input: {
    fontSize: 15,
    paddingTop: 250,
    borderBottomWidth: 1,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  headName: {
    fontSize: 27,
    paddingTop: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {
    fontSize: 15,
    paddingTop: 30,
    textAlign: 'center',
    width: '80%',
    marginLeft: '10%',
    backgroundColor: '#ceffbc'
  },

  progress: {
    margin: 10,
  },

  score: {
    fontSize: 20,
    paddingTop: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  category: {
    marginHorizontal: '10%',
    justifyContent: 'center',
    textAlign: 'left',
    borderRadius: 15,
    fontWeight: 'bold',
    marginTop: '6%',
    width: '80%',
    height: '7%'

  }
});
export default ResearchScreen;