import 'react-native-gesture-handler';

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from './components/Header';

class ResearchScreen extends React.Component{

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
    let arbitrColor =  '#00A458' ;
    let nalogColor =  '#00A458';
    let statusColor = '#00A458';
    let dateColor = '#00A458';

    let registartionDateNote = "";

    if(adressData.Count > 5){
      addressColor = '#FE934B';
    }

    let profit = 0;
    let revenue = 0;
    let balance = 0;
    
    

    let defendantAmount = 0;
    
    let plaintiffData = arbitrData.result.Истец;
    let defendantData = arbitrData.result.Ответчик;
    let thirdPartyData = arbitrData.result.ИноеЛицо;

    let plantiffCount = 0;
    let allCasesCount = 0;

    let previousRevenue = 0;
    let previousBalance = 0;
    let previousProfit = 0;

    if(bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2020']){
      profit = bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2020']['1600'];
    }

    if(bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2020']){
      previousBalance = bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2020']['1600'];
    }

    if(bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2020']){
      previousRevenue = bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2020']['2110'];
    }

    if(bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2019']){
      previousBalance = bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2019']['1600'];
    }

    if(bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2019']){
      previousRevenue = bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2019']['2110'];
    }

    if(bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2019']){
      previousProfit = bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2019']['2400'];
    }

    if(plaintiffData){
      for(let i = 0; i < Object.keys(plaintiffData).length; i++){
          plantiffCount++;
      }
    }

    if(arbitrData){
      if(plaintiffData){
        for(let i = 0; i < Object.keys(plaintiffData).length; i++){
          let status = plaintiffData[Object.keys(plaintiffData)[i]].Статус.valueOf();

          if(status != "Рассмотрение дела завершено"){
            allCasesCount++;
          }
        }
      }

      if(defendantData){
        for(let i = 0; i < Object.keys(defendantData).length; i++){
          let status = defendantData[Object.keys(defendantData)[i]].Статус.valueOf();

          if(status != "Рассмотрение дела завершено"){
            allCasesCount++;
          }
        }
      }

      if(thirdPartyData){
        for(let i = 0; i < Object.keys(thirdPartyData).length; i++){
          let status = thirdPartyData[Object.keys(thirdPartyData)[i]].Статус.valueOf();

          if(status != "Рассмотрение дела завершено"){
            allCasesCount++;
          }
        }
      }
    }

    if(plantiffCount/allCasesCount >= 0.7){
      arbitrColor = '#FE934B';
    }

    if(defendantData){
      for(let i = 0; i < Object.keys(defendantData).length; i++){
        let status = defendantData[Object.keys(defendantData)[i]].Статус.valueOf();

        if(status != "Рассмотрение дела завершено"){
          defendantAmount = defendantAmount + defendantData[Object.keys(defendantData)[i]].Сумма;
        }
      }
      
    }

    if(0.5 >= defendantAmount/profit > 0.7){
      arbitrColor = '#FE934B'; 
    }

    if(defendantAmount/profit >= 0.7){
      console.log(233, defendantAmount);
      arbitrColor = '#FF5656'; 
    }

    let remainingCredit = 0;

    if(FSSPData){
      for (key in  FSSPData[`${inn}`]) {
        if (FSSPData[`${inn}`][key]['Статус'] == 'Не завершено' ) {
          remainingCredit = remainingCredit +  FSSPData[`${inn}`][key]['Остаток'];
        }
      }
    }
   
    if(remainingCredit/profit >= 0.65){
      console.log(255,remainingCredit/profit);
      nalogColor = '#FE934B';
    }
    //7810915591
    let registrationDate = new Date(finalData.items[0].ЮЛ.ДатаРег);

    let today = new Date();

    console.log(522, today.getFullYear());
    console.log(511, registrationDate.getFullYear());

    if(today.getFullYear() - registrationDate.getFullYear() < 3){
      dateColor = '#FF5656';
      registartionDateNote = "Компания зарегистрирована недавно, поэтому менее устойчива к условиям рынка"
    }

    //0255019488
    if(finalData.items[0].ЮЛ.Статус.toLowerCase().includes("реорганизац")){
      statusColor = '#FE934B';
    }
    //1101107224
    if(finalData.items[0].ЮЛ.Статус.toLowerCase().includes("ликвидировано")){
      statusColor = '#FF5656';
    }

    
    if(revenue/previousRevenue < 0.75 || profit/previousProfit < 0.75 || balance/previousBalance < 0.75){
      bookkeepingColor = '#FE934B';
    }

    if(bookkeepingData[`${inn}`].length == 0){
      bookkeepingColor = '#FF5656';
    }
    
    try{
      if(finalData.items[0].ЮЛ.ОснВидДеят.Текст){
        OKVED = finalData.items[0].ЮЛ.ОснВидДеят.Текст;
      }
    }
    catch(e){
      OKVED = 'отсутсвует'
    }

    let fio = "";

    if(finalData.items[0].ЮЛ.Руководитель){
      fio = finalData.items[0].ЮЛ.Руководитель.ФИОПолн;
    }
    //1101107224
    return (
      <View style={styles.background}>
        <Text style={styles.headName}> {finalData.items[0].ЮЛ.НаимСокрЮЛ}</Text>  
        <Text style={styles.head}>Статус: {finalData.items[0].ЮЛ.Статус}  <Text style={{color: statusColor}}>●</Text></Text>  
        <Text style={styles.head}>Дата регистрации: {finalData.items[0].ЮЛ.ДатаРег}  <Text style={{color: dateColor}}>●</Text></Text>
        <Text>{registartionDateNote}</Text>
        <Text style={styles.head}>ИНН: {inn}</Text>  
        <Text style={styles.head}>ОГРН: {finalData.items[0].ЮЛ.ОГРН}</Text>
        <Text style={styles.head}>КПП: {finalData.items[0].ЮЛ.КПП}</Text>  
        <Text></Text>
        <Text style={styles.head}>Основной вид деятельности: {OKVED}</Text>
        <Text style={styles.head}>Руководитель: {fio}</Text>
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
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#F3F4F6',
    height: '100%'
  },

  head: {
    fontSize: 15,
    paddingTop: 1,
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