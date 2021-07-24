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
    addressColor: '#00A458',
    bookkeepingColor: '#00A458',
    arbitrColor: '#00A458',
    nalogColor: '#00A458'
  }

  render(){
    const {inn, finalData, adressData, arbitrData, FSSPData, bookkeepingData} = this.props.route.params;
    
    let OKVED = '';

    let addressColor =  '#00A458';
    let bookkeepingColor = '#00A458';
    let arbitrColor =  '#00A458' ;        //'#008000';
    let nalogColor =  '#00A458';

    if(adressData.Count > 5){
      addressColor = '#FE934B';  // #FF8C00 - старый оранжевый
    }

    let profit = 0;
    if(!bookkeepingData){
      bookkeepingColor = '#FE934B';
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
      arbitrColor = '#FE934B';
    }

  
    if(defendantData){
      for(let i = 0; i < Object.keys(defendantData).length; i++){
        defendantAmount = defendantAmount + defendantData[Object.keys(defendantData)[i]].Сумма;
      }
    }

    if(defendantAmount/profit >= 0.7){
      arbitrColor = '#FF5656'; // B22222 старый красный цвет
    }

    let remainingCredit = 0;

    if(FSSPData){
      for (key in  FSSPData[`${inn}`]) {
        remainingCredit = remainingCredit +  FSSPData[`${inn}`][key]['Остаток'];
      }
    }
   

    if(remainingCredit > 25000){
      nalogColor = '#FE934B';
    }

    if(remainingCredit > 65000){
      nalogColor = '#FF5656';
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
        <Text style={styles.head}>Статус: {finalData.items[0].ЮЛ.Статус}</Text>  
        <Text style={styles.head}>Дата регистрации: {finalData.items[0].ЮЛ.ДатаРег}</Text>
        <Text style={styles.head}>ИНН: {inn}</Text>  
        <Text style={styles.head}>ОГРН: {finalData.items[0].ЮЛ.ОГРН}</Text>
        <Text style={styles.head}>КПП: {finalData.items[0].ЮЛ.КПП}</Text>  
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
        <View style={[styles.category, {  backgroundColor: '#5961AB' }]}>
          <Button title="ПОЛУЧИТЬ ОТЧЕТ" color="#fff" fontWeight='bold' onPress={() => this.props.navigation.navigate('PDF',{inn: inn})} />
        </View>
        <View style={[styles.category, {  backgroundColor: '#5961AB' }]}>
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
    backgroundColor: '#F3F4F6',
    height: '100%'
  },

  head: {
    fontSize: 15,
    paddingTop: 7,
    paddingLeft: 5,
    textAlign: 'left',
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
    backgroundColor: '#5961AB',
    fontSize: 27,
    paddingTop: 10,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {
    fontSize: 10,
    paddingTop: 20,
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
    marginTop: '5%',
    width: '80%',
    height: '7%'

  }
});
export default ResearchScreen;