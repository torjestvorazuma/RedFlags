import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, ImageBackground, SafeAreaView} from 'react-native';
import Header from './components/Header';

const API_FNS_KEY = 'b1091dcc0760d0c3efc541748954b0a3b5718a83';
const API_ARBITR_KEY = 'ae30dcc2554a83f8b4059b6057149dbf462ce48e';
const API_FSSP_KEY = '4388cb56e97b4f5e5fc62bb3bf793ee03cf54b67';

let finalDataJSON;
let finalAdressDataJSON;
let finalFSSPDataJSON;

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      INN: '',
    };  
  }

//1600 баланс

//2110 выручка

//2400 чистая прибыль

//2120 расходы по обыч деятельности

//2350 прочие расходы

//2340 прочие доходы


  onPress = async () => {
    try {
    // get information from api fns
    const finalDataJSON = await this.gettingInformationCompany();
    // get information from api fns
    const finalAdressDataJSON = await this.gettingInformationAboutAdress();
    // get information from api kad.arbitr
    const finalArbitrDataJSON = await this.gettingInformationAboutArbitr();
    // get information from api fssp
    const finalFSSPDataJSON = await this.gettingInformationAboutFSSP();
    // get information from api fns
    const bookkeepingData = await this.gettingBookkeepingData();
    if (finalDataJSON) {
      this.props.navigation.navigate("Research",{
        inn: this.state.INN,
        finalData: finalDataJSON,
        adressData: finalAdressDataJSON,
        arbitrData: finalArbitrDataJSON,
        FSSPData: finalFSSPDataJSON,
        bookkeepingData: bookkeepingData
      });
    } else {
      this.setState({error: 'NullPointException'});
    }
  } catch(e) {
    this.setState({error: 'Запрос не удался'})
  }
  
 
};

  render() {
    const {error, INN} = this.state;
    // interface
    // On button press load data from website and pass values to next screen
    // User can use only INN to search for company information
    return (
      <SafeAreaView style={styles.background}>
        <ImageBackground style={ styles.imgBackground } source={require('./components/background1.png')}>
        <Image style={styles.imagine} source={require('./components/mainpic.png')}/>
        <Text style={styles.head}>Проверь благонадежность компании</Text>
        <TextInput style={styles.input} placeholder='Введите ИНН' onChangeText={INN => this.setState({INN})}/>
        <Button title="Найти" color="#5961AB"  onPress={this.onPress}  /> 
        {error ? <Text>{error}</Text> : null}
        </ImageBackground>
      </SafeAreaView>
    );
  }

  // fetch() method is used to request to the server and load the information
  // the return data is of the format JSON
  gettingInformationCompany = async () => {
    const api_url = await fetch(`https://api-fns.ru/api/egr?req=${this.state.INN}&key=${API_FNS_KEY}`);
    const finalDataJSON = await api_url.json();
    return finalDataJSON;
  };

  gettingInformationAboutAdress = async () => {
    const data = await this.gettingInformationCompany();
    const api_url = await fetch(`https://api-fns.ru/api/search?q=${data.items[0].ЮЛ.Адрес.АдресПолн}&key=${API_FNS_KEY}`);
    const DataJSON = await api_url.json();
    return DataJSON;
  };

  gettingInformationAboutArbitr = async () => {
    const api_url = await fetch(`https://damia.ru/api-arb/dela?q=${this.state.INN}&key=${API_ARBITR_KEY}`);
    const DataArbitrJSON = await api_url.json();
    return DataArbitrJSON;
  };

  gettingInformationAboutFSSP = async () => {
    const api_url = await fetch(`https://damia.ru/api-fssp/isps?inn=${this.state.INN}&format=2&key=${API_FSSP_KEY}`);
    const DataFSSPJSON = await api_url.json();
    return DataFSSPJSON;
  };

  gettingBookkeepingData = async () => {
    const api_url = await fetch(`https://api-fns.ru/api/bo?req=${this.state.INN}&key=${API_FNS_KEY}`);
    const DataBookkeeping = await api_url.json();
    return DataBookkeeping;
  };
}

const styles = StyleSheet.create({
  background: {
    marginTop: '15%',
    backgroundColor: '#F3F4F6', 
    height: '100%'
  },
  head: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    fontSize: 18,
    paddingTop: '10%',
    borderBottomWidth: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: '30%',
    borderBottomColor: 'grey'
  },
  button: {
    fontSize: 15,
    paddingTop: 30,
    textAlign: 'center',
    width: '80%',
    marginLeft: '10%'
  },
  main: {
    alignItems: 'center',
    paddingTop: 2,
    height: '4%',
    backgroundColor: '#77dd77'
  },
  text: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }, 
  imagine: {
    width: 425,
    height: 300,
    alignSelf:'center'
  },
  imgBackground: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});
export default HomeScreen;
