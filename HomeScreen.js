import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, ImageBackground } from 'react-native';
import Header from './components/Header';

const API_FNS_KEY = '252dffd2565f4318d5b19b08337d2a315c028fa5';
const API_ARBITR_KEY = 'f4db1d9e4e66dc74b3f62d4c076aced4fcfc715a';
const API_FSSP_KEY = 'a445ee2e028fc7eb9b9ea2a57925bc0f7148bce3';

let finalDataJSON;
let finalAdressDataJSON;
let finalFSSPDataJSON;
//INN EXAMPLE: 8602302853
//7605016030
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
    const finalDataJSON = await this.gettingInformationCompany();
    const finalAdressDataJSON = await this.gettingInformationAboutAdress();
    const finalArbitrDataJSON = await this.gettingInformationAboutArbitr();
    const finalFSSPDataJSON = await this.gettingInformationAboutFSSP();
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
    this.setState({error: 'Запрос обломился'})
  }
  
 
};

  render() {
    //On button press load data from website and pass values to next screen
    const {error, INN} = this.state;
    return (
      <View style={styles.background}>
        <ImageBackground style={ styles.imgBackground } source={require('./components/background1.png')}>
        <Image style={styles.imagine} source={require('./components/mainpic.png')}/>
        <Text style={styles.head}>Проверь благонадежность компании</Text>
        <TextInput style={styles.input} placeholder='Введите ИНН' onChangeText={INN => this.setState({INN})}/>
        <Button title="Найти" color="#5961AB"  onPress={this.onPress}  /> 
        {error ? <Text>{error}</Text> : null}
        </ImageBackground>
      </View>
    );
  }

  gettingInformationCompany = async () => {
    const api_url = await fetch(`https://api-fns.ru/api/egr?req=${this.state.INN}&key=${API_FNS_KEY}`);
    const finalDataJSON = await api_url.json();
    //console.log(finalDataJSON);
    return finalDataJSON;
  };

  gettingInformationAboutAdress = async () => {
    const data = await this.gettingInformationCompany();
    const api_url = await fetch(`https://api-fns.ru/api/search?q=${data.items[0].ЮЛ.Адрес.АдресПолн}&key=${API_FNS_KEY}`);
    const DataJSON = await api_url.json();
    //console.log(DataJSON);
    return DataJSON;
  };

  gettingInformationAboutArbitr = async () => {
    const api_url = await fetch(`https://damia.ru/api-arb/dela?q=${this.state.INN}&key=${API_ARBITR_KEY}`);
    const DataArbitrJSON = await api_url.json();
    //console.log(DataArbitrJSON);
    return DataArbitrJSON;
  };

  gettingInformationAboutFSSP = async () => {
    const api_url = await fetch(`https://damia.ru/api-fssp/isps?inn=${this.state.INN}&format=2&key=${API_FSSP_KEY}`);
    const DataFSSPJSON = await api_url.json();
    console.log(52,DataFSSPJSON);
    return DataFSSPJSON;
  };

  gettingBookkeepingData = async () => {
    const api_url = await fetch(`https://api-fns.ru/api/bo?req=${this.state.INN}&key=${API_FNS_KEY}`);
    const DataBookkeeping = await api_url.json();
    console.log(49,DataBookkeeping[`${Object.keys(DataBookkeeping)[0]}`]['2020']);
    return DataBookkeeping;
  };
}


const styles = StyleSheet.create({

  background: {
    backgroundColor: '#F3F4F6', 
    height: '100%'
  },

  head: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    //paddingTop: '50%'
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
    backgroundColor: '#77dd77'//'#ceffbc'
},
text: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
}, 
imagine: {
  //position: 'absolute',
  //width: '50%',
  //height: '50%',
  //justifyContent: 'center',
  //alignItems: 'center',
  width: 425,
  height: 300,
  alignSelf:'center'
  

},
imgBackground: {
  flex: 1,
  width: null,
  height: null,
  resizeMode: 'cover',
  //justifyContent: "center",
  //alignItems: "center",
  //resizeMode: 'cover',
  //top: 0,
  //opacity: 0.7
},

});
export default HomeScreen;