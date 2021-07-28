import 'react-native-gesture-handler';

import React, { useState } from 'react';

import {View, Text, TextInput, Button, StyleSheet, Linking, Image, ImageBackground, SafeAreaView} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";


const Stack = createStackNavigator();
import Header from './components/Header';
import HomeScreen from './HomeScreen';


const API_FNS_KEY = '5d1714f634e2768695e63f1423f9895569656403';
let InNumber;






class PDFScreen extends React.Component {
  state = {
    score: 80,
    scoreColor: '#77dd77'
  }
  
  

  render() {

    const score = this.state.score;
    const {inn, reportData} = this.props.route.params;
    InNumber = inn;

    

    let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 16px;
                color: #black;
            }
            h1 {
                text-align: center;
            }
            section {
              break-inside: avoid;
            }
        </style>
    </head>
    <body>
        <section>
        <h1>${reportData.generalData.name}</h1>
        <h2>Общая информация</h2>
      
        <Text>Cтатус: ${reportData.generalData.status.value}<Text style="color: ${reportData.generalData.status.reliability}">●\n</Text></Text>
        <br>
        <Text>Дата регистрации: ${reportData.generalData.date.value}\n</Text>
        
        
        <br>
        <Text>ИНН: ${reportData.generalData.inn}\n</Text><br>
        <Text>ОГРН: ${reportData.generalData.ogrn}\n</Text><br>
        <Text>КПП: ${reportData.generalData.kpp}\n</Text><br>
        
        <Text>Основной вид деятельности: ${reportData.generalData.okved}\n</Text><br>
        <Text>Руководитель: ${reportData.generalData.ceo}\n</Text><br>
        <Text>Адрес: ${reportData.generalData.address}\n</Text><br>
        </section>
        <section>
        <h2>Критерии</h2>
        <h3 style="background-color: ${reportData.addressData.reliability}">Массовость адреса</h3>
        <Text>${reportData.addressData.message}\n</Text><br>
        <Text>Компаний, зарегистрированных на данный адрес: ${reportData.addressData.count}\n</Text><br>
        </section>
        <section>
        <h3 style="background-color: ${reportData.bookkeepingData.reliability}">Бухгалтерия</h3>
        <Text>${reportData.bookkeepingData.message}\n</Text><br>
        <Text>Данные за 2020 год:\n</Text><br>
        <Text>Баланс: ${reportData.bookkeepingData.balance}₽\n</Text><br>
        <Text>Выручка: ${reportData.bookkeepingData.revenue}₽\n</Text><br>
        <Text>Прибыль: ${reportData.bookkeepingData.profit}₽\n</Text><br>
        </section>
        <section>
        <h3 style="background-color: ${reportData.nalogData.reliability}">Задолженности</h3>
        <Text>${reportData.nalogData.message}\n</Text><br>
        <Text>Количетсво исполнительных производств: ${reportData.nalogData.remainingCasesCount}\n</Text><br>
        <Text>Сумма неуплаченной задолженности: ${reportData.nalogData.remainingCredit}₽\n</Text><br>
        </section>
        <section>
        <h3 style="background-color: ${reportData.arbitrData.reliability}">Судебная нагрузка</h3>
        <Text>${reportData.arbitrData.messageOne}\n</Text><br>
        <Text>${reportData.arbitrData.messageTwo}\n</Text><br>
        <Text>Всего активных дел: ${reportData.arbitrData.totalCount}\n</Text><br>
        <Text>В роли истца: ${reportData.arbitrData.plaintiffCount} на сумму ${reportData.arbitrData.plaintiffAmount}₽</Text><br>
        <Text>В роли ответчика: ${reportData.arbitrData.defendantCount} на сумму ${reportData.arbitrData.defendantAmount}₽</Text><br>
        <Text>В роли третьего лица: ${reportData.arbitrData.thirdPartyCount} на сумму ${reportData.arbitrData.thirdPartyAmount}₽</Text><br>
        </section>
    </body>
    </html>
`;
    
    let defaultColorText = '#5961AB';

    if(Platform.OS === "ios"){
      defaultColorText = '#fff';
    }

    console.log(3000004, reportData);
    
    return (
      <SafeAreaView style={styles.background}> 
      <ImageBackground  style={styles.imgBackground } source={require('./components/background.png')}>
      <Image style={styles.imagine} source={require('./components/mainpic.png')}/>
      <Text style = {styles.headName}>Формирование отчетов</Text>
      <View style={[styles.category, {  backgroundColor: '#00A458' }]}>
          <Button title="ВЫПИСКА ИЗ ЕГРЮЛ" color={defaultColorText} fontWeight='bold' onPress={() => Linking.openURL(`https://api-fns.ru/api/vyp?req=${InNumber}&key=${API_FNS_KEY}`)} />
      </View> 
      <View style={[styles.category, {  backgroundColor: '#00A458' }]}>
          <Button title="БУХГАЛТЕРСКАЯ ОТЧЕТНОСТЬ" color={defaultColorText} fontWeight='bold' onPress={() => Linking.openURL(`https://api-fns.ru/api/bo_file?req=${InNumber}&xls=0&year=2020&key=${API_FNS_KEY}`)} />
      </View> 
      <View style={[styles.category, {  backgroundColor: '#00A458' }]}>
          <Button title="ОТЧЁТ ПО КРИТЕРЯМ БЛАГОНАДЕЖНОСТИ" color={defaultColorText} fontWeight='bold' onPress={() => this.createAndSavePDF(htmlContent)} />
      </View> 
      </ImageBackground>  
      </SafeAreaView>  
    );
  }
  
  createAndSavePDF = async (html) => {
    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri);
      } else {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          await MediaLibrary.createAssetAsync(uri);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  
}

const styles = StyleSheet.create({

  background: {
    marginTop: '15%',
    backgroundColor: '#F3F4F6',
    height: '100%'
  },

  //head: {
  //  fontSize: 30,
    //marginTop: '2%',
  //  textAlign: 'center',
    //fontWeight: 'bold',
    //color: 'grey',
   // paddingTop: '2%'
  // width: '70%',
  //    height: '4%'
 
  //},
  headName: {
    fontSize: 27,
    paddingTop: 10,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'
  },
  category: {
    marginHorizontal: '10%',
    textAlign: 'left',
    borderRadius: 15,
    fontWeight: 'bold',
    marginTop: '5%',

  },
  page: {
    flexDirection: "column"
  },
  imagine: {
      //position: 'absolute',
      //width: '50%',
      //height: '50%',
      //justifyContent: 'center',
      //alignItems: 'center',
      width: 425,
      height: 150,
      alignSelf:'center'
    
  },
  centerImage: {
    alignItems: "center",
    flexGrow: 1
  },
  text: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 50,
    paddingVertical: 30,
    color: "#212121"
  },
  imgBackground: {
    flex: 1,
    width: null,
    height: null,
    //resizeMode: 'cover',
    //justifyContent: "center",
    //alignItems: "center",
    //resizeMode: 'cover',
    //top: 0,
    //opacity: 0.7
  },

});
export default PDFScreen;