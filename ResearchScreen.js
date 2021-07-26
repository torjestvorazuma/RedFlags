import 'react-native-gesture-handler';

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, SafeAreaView, Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from './components/Header';

class ResearchScreen extends React.Component{

  constructor(){
    super()
  }

  //7728898960
  //1101107224
  //7736050003
  //7728168971
  //7702044361


  state = {
    scoreColor: 'black',
    addressColor: '#00A458',
    bookkeepingColor: '#00A458',
    arbitrColor: '#00A458',
    nalogColor: '#00A458'
  }

  render(){
    const {inn, finalData, adressData, arbitrData, FSSPData, bookkeepingData} = this.props.route.params;

    let reportData = {
      "generalData" : {
        "name" : '',

        "status" : {
          "reliability" : '#00A458',
          "value" : ''
        },

        "date" : {
          "value" : '',
          "reliability" : '#00A458',
          "message" : ''
        },

        "inn" : '',
        "ogrn" : '',
        "kpp" : '',
       
        "okved" : '',
        "ceo" : '',
        "address" : '',
      },

      "addressData" : {
        "reliability" : '#00A458',
        "count" : 0,
        "adresses" : [],
        "message" : ''
      },

      "bookkeepingData" : {
        "reliability" : '#00A458',

        "profit" : 0,
        "balance" : 0,
        "revenue" : 0,

        "message" : '',
      },

      "arbitrData" : {
        "totalCount" : 0,

        "reliability" : '#00A458',

        "plaintiff" : [],
        "plaintiffCount" : 0,
        "plaintiffAmount" : 0,

        "defendant" : [],
        "defendantCount" : 0,
        "defendantAmount" : 0,

        "thirdParty" : [],
        "thirdPartyCount" : 0,
        "thirdPartyAmount" : 0,

        "messageOne" : '',
        "messageTwo" : '',
      },

      "nalogData" : {
        "reliability" : '#00A458',

        "remainingCasesCount": 0,
        "remainingCases" : [],

        "remainingCredit" : 0,

        "message" : '',
      },
    }

    let OKVED = '';

    let addressColor =  '#00A458';
    let bookkeepingColor = '#00A458';
    let arbitrColor =  '#00A458' ;
    let nalogColor =  '#00A458';
    let statusColor = '#00A458';
    let dateColor = '#00A458';

    let addressColorText =  addressColor;
    let bookkeepingColorText = bookkeepingColor;
    let arbitrColorText = arbitrColor ;
    let nalogColorText =  nalogColor;
    let statusColorText = statusColor;
    let dateColorText = dateColor;
    let defaultColorText = '#5961AB';

    if(Platform.OS === "ios"){
      addressColorText = '#fff';
      bookkeepingColorText = '#fff';
      arbitrColorText = '#fff';
      nalogColorText =  '#fff';
      statusColorText = '#fff';
      dateColorText = '#fff';
      defaultColorText = '#fff';
    }

    let registartionDateNote = "";

    if(adressData){
      

      if(adressData.Count > 5){
        addressColor = '#FE934B';
        
        reportData.addressData.count = adressData.Count;
        reportData.addressData.message = 'Больше 5 компаний зарегистрированно на данный адрес';
        reportData.addressData.reliability = '#FE934B';
      }
      
      adressData.items.forEach(function(obj) {
        let currentAddress = obj.ЮЛ.НаимСокрЮЛ;

        if(currentAddress !== undefined){
          reportData.addressData.adresses.push(obj.ЮЛ.НаимСокрЮЛ)
        }
        
      });
    }
    

    let profit = 0;
    let revenue = 0;
    let balance = 0;
    
    

    let defendantAmount = 0;
    let plaintiffAmount = 0;
    let thirdPartyAmount = 0;
    console.log(20005, arbitrData);
    let plaintiffData = arbitrData.result.Истец;
    let defendantData = arbitrData.result.Ответчик;
    let thirdPartyData = arbitrData.result.ИноеЛицо;

    let plaintiffCount = 0;
    let defendantCount = 0;
    let thirdPartyCount = 0;
    let allCasesCount = 0;

    let previousRevenue = 0;
    let previousBalance = 0;
    let previousProfit = 0;


    if(bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2020']){
      profit = bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2020']['1600'];
      reportData.bookkeepingData.profit = profit;
    }

    if(bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2020']){
      balance = bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2020']['1600'];
      reportData.bookkeepingData.balance = balance;
      
    }

    if(bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2020']){
      revenue = bookkeepingData[`${Object.keys(bookkeepingData)[0]}`]['2020']['2110'];
      reportData.bookkeepingData.revenue = revenue;
      
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
          let status = plaintiffData[Object.keys(plaintiffData)[i]].Статус.valueOf();

          if(status != "Рассмотрение дела завершено"){
            plaintiffCount++;
          }
          
          reportData.arbitrData.plaintiffCount = plaintiffCount;
      }
    }

    if(defendantData){
      for(let i = 0; i < Object.keys(defendantData).length; i++){
          let status = defendantData[Object.keys(defendantData)[i]].Статус.valueOf();

          if(status != "Рассмотрение дела завершено"){
            defendantCount++;
          }
          
          reportData.arbitrData.defendantCount = defendantCount;
      }
    }

    if(thirdPartyData){
      for(let i = 0; i < Object.keys(thirdPartyData).length; i++){
          let status = thirdPartyData[Object.keys(thirdPartyData)[i]].Статус.valueOf();

          if(status != "Рассмотрение дела завершено"){
            thirdPartyCount++;
          }
          
          reportData.arbitrData.thirdPartyCount = thirdPartyCount;
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

      reportData.arbitrData.totalCount = allCasesCount;
    }

    if(plaintiffCount/allCasesCount >= 0.7){
      arbitrColor = '#FE934B';

      reportData.arbitrData.reliability = '#FE934B';
      reportData.arbitrData.message1 = 'Данная компания выступает в роли Истца в более 70% дел';
    }

    if(defendantData){
      for(let i = 0; i < Object.keys(defendantData).length; i++){
        let status = defendantData[Object.keys(defendantData)[i]].Статус.valueOf();

        if(status != "Рассмотрение дела завершено"){
          defendantAmount = defendantAmount + defendantData[Object.keys(defendantData)[i]].Сумма;
          console.log(30000045454,defendantData[Object.keys(defendantData)[i]].Сумма);
        }
      }
      reportData.arbitrData.defendantAmount = defendantAmount;
    }

    if(plaintiffData){
      for(let i = 0; i < Object.keys(plaintiffData).length; i++){
        let status = plaintiffData[Object.keys(plaintiffData)[i]].Статус.valueOf();
        if(status != "Рассмотрение дела завершено"){
          plaintiffAmount = plaintiffAmount + plaintiffData[Object.keys(plaintiffData)[i]].Сумма;
        }
      }
      reportData.arbitrData.plaintiffAmount = plaintiffAmount;
    }

    if(thirdPartyData){
      for(let i = 0; i < Object.keys(thirdPartyData).length; i++){
        let status = thirdPartyData[Object.keys(thirdPartyData)[i]].Статус.valueOf();

        if(status != "Рассмотрение дела завершено"){
          thirdPartyAmount = thirdPartyAmount + thirdPartyData[Object.keys(thirdPartyData)[i]].Сумма;
        }
      }
      reportData.arbitrData.thirdPartyAmount = thirdPartyAmount;
    }

    if(0.5 >= defendantAmount/profit > 0.7){
      arbitrColor = '#FE934B'; 
      reportData.arbitrData.reliability = '#FE934B';
      reportData.arbitrData.message2 = 'Сумма потенциальных взысканий по активным искам составляет более 50% от прибыли компании';
    }

    if(defendantAmount/profit >= 0.7){
      console.log(233, defendantAmount);
      arbitrColor = '#FF5656'; 

      reportData.arbitrData.reliability = '#FF5656';
      reportData.arbitrData.message2 = 'Сумма потенциальных взысканий по активным искам составляет более 70% от прибыли компании';
    }

    let remainingCredit = 0;

    let remainingCreditCount = 0;
    
    let ListData = [];

    if(FSSPData){
      ListData = FSSPData[`${inn}`];

      for (let key in FSSPData[`${inn}`]) {
        if (FSSPData[`${inn}`][key]['Статус'] == 'Не завершено' ) {
          remainingCredit = remainingCredit +  FSSPData[`${inn}`][key]['Остаток'];
        }
      }

      reportData.nalogData.remainingCredit = remainingCredit;

      for (let key in  FSSPData[`${inn}`]){
        if (FSSPData[`${inn}`][key]['Статус'] == 'Не завершено' ) {
          remainingCreditCount++;
        }
      } 
      reportData.nalogData.remainingCasesCount = remainingCreditCount;

      if(ListData){
        Object.keys(ListData).map((item,i) => {
          if(ListData[item]['Статус'] == 'Не завершено'){
            reportData.nalogData.remainingCases.push(item);
          }
        })
      }
    }
   
    if(remainingCredit/profit >= 0.65){
      console.log(255,remainingCredit/profit);
      nalogColor = '#FE934B';

      reportData.nalogData.reliability = '#FE934B';
      reportData.nalogData.message = 'Сумма неуплаченной задолженности составляет более 65% от прибыли компании'
    }
    //7810915591
    let registrationDate = new Date(finalData.items[0].ЮЛ.ДатаРег);

    let today = new Date();

    console.log(522, today.getFullYear());
    console.log(511, registrationDate.getFullYear());

    if(today.getFullYear() - registrationDate.getFullYear() < 3){
      dateColor = '#FF5656';
      registartionDateNote = "Компания зарегистрирована недавно, поэтому менее устойчива к условиям рынка"

      reportData.generalData.date.reliability = '#FF5656';
      reportData.generalData.date.value = registrationDate;
      reportData.generalData.date.message = registartionDateNote;
    }

    //0255019488
    if(finalData.items[0].ЮЛ.Статус.toLowerCase().includes("реорганизац")){
      statusColor = '#FE934B';

      reportData.generalData.status.reliability = '#FE934B';
      reportData.generalData.status.value = finalData.items[0].ЮЛ.Статус;
    }
    //1101107224
    if(finalData.items[0].ЮЛ.Статус.toLowerCase().includes("ликвидировано")){
      statusColor = '#FF5656';

      reportData.generalData.status.reliability = '#FF5656';
      reportData.generalData.status.value = finalData.items[0].ЮЛ.Статус;
    }

    
    if(revenue/previousRevenue < 0.75 || profit/previousProfit < 0.75 || balance/previousBalance < 0.75){
      bookkeepingColor = '#FE934B';

      reportData.bookkeepingData.reliability = '#FE934B';
      reportData.bookkeepingData.message = 'Один или несколько показателей понизились на 25% по сравнению с предыдущим годом';
    }

    if(bookkeepingData[`${inn}`].length == 0){
      bookkeepingColor = '#FF5656';

      reportData.bookkeepingData.reliability = '#FF5656';
      reportData.bookkeepingData.message = 'Данные по бухгалтерской отчётности отсутствуют';
    }
    
    try{
      if(finalData.items[0].ЮЛ.ОснВидДеят.Текст){
        OKVED = finalData.items[0].ЮЛ.ОснВидДеят.Текст;
      }
    }
    catch(e){
      OKVED = 'отсутсвует'
    }

    let fio = "отсутсвует";

    if(finalData.items[0].ЮЛ.Руководитель){
      fio = finalData.items[0].ЮЛ.Руководитель.ФИОПолн;
    }

    reportData.generalData.name = finalData.items[0].ЮЛ.НаимСокрЮЛ;

    reportData.generalData.ceo = fio;
    reportData.generalData.okved = OKVED;

    reportData.generalData.inn = inn;
    reportData.generalData.ogrn = finalData.items[0].ЮЛ.ОГРН;
    reportData.generalData.kpp = finalData.items[0].ЮЛ.КПП;

    reportData.generalData.address = finalData.items[0].ЮЛ.Адрес.АдресПолн;

    reportData.generalData.date.value = finalData.items[0].ЮЛ.ДатаРег;
    reportData.generalData.status.value = finalData.items[0].ЮЛ.Статус;

    console.log(305, reportData);
    //1101107224
    return (
      <SafeAreaView style={styles.background}>
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
          <Button title="МАССОВОСТЬ АДРЕСА" color={addressColorText} fontWeight='bold' onPress={() => this.props.navigation.navigate('Adress',{inn: this.state.INN,finalData: finalData, adressData: adressData})} />
        </View>
        <View style={[styles.category, { backgroundColor: bookkeepingColor}]}>
          <Button title="БУХГАЛТЕРИЯ" color={bookkeepingColorText} fontWeight='bold' onPress={() => this.props.navigation.navigate('Bookkeeping', {inn: inn, bookkeepingData: bookkeepingData})} />
        </View>
        <View style={[styles.category, { backgroundColor: nalogColor }]}>
          <Button title="ЗАДОЛЖЕННОСТИ" color={nalogColorText} fontWeight='bold' onPress={() => this.props.navigation.navigate('Debt',{inn: inn, FSSPData: FSSPData})} />
        </View>
        <View style={[styles.category, { backgroundColor: arbitrColor }]}>
          <Button title="СУДЕБНАЯ НАГРУЗКА" color={arbitrColorText} fontWeight='bold' onPress={() => this.props.navigation.navigate('Courts',{inn: this.state.INN,arbitrData: arbitrData})} />
        </View>
        <View style={[styles.category, {  backgroundColor: '#5961AB' }]}>
          <Button title="ПОЛУЧИТЬ ОТЧЕТ" color={defaultColorText} fontWeight='bold' onPress={() => this.props.navigation.navigate('PDF',{inn: inn, reportData: reportData})} />
        </View>
        <View style={[styles.category, {  backgroundColor: '#5961AB' }]}>
          <Button title="CПРАВКА" color={defaultColorText} fontWeight='bold' onPress={() => this.props.navigation.navigate('Reference')} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    marginTop: '15%',
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
    fontWeight: 'bold',
    height: 55
  },

  button: {
    fontSize: 10,
    paddingTop: 20,
    textAlign: 'center',
    width: '20%',
    marginLeft: '10%',
    backgroundColor: '#ceffbc',
    color: '#ceffbc'
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