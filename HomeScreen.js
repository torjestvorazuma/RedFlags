
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import Header from './components/Header';
import {postDataURL} from './Parser.js'
let firstToken;
let initialBusinessDataJSON;
let id;
let secondToken;
let secondRequestDataJSON;
let finalBusinessDataJSON;
class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      INN: '',
    };
    
  }

  render() {

    return (
      <View style={styles.background}>
        <Header />
        <Text style={styles.head}>Проверь надежность компании!{this.state.INN}</Text>
        <TextInput style={styles.input} placeholder='Введите ИНН' onChangeText={INN => this.setState({INN})}/>
        <Button title="Найти" onPress={() => {this.loadInitialBusinessData(),this.props.navigation.navigate('Research',{inn: this.state.INN, initialBusinessData: initialBusinessDataJSON})}} />
      </View>
    );
  }

  loadInitialBusinessData = () => {
    //const request = `page=1&pageSize=10&pbCaptchaToken=&token=&mode=search-all&queryAll=${this.state.INN}&queryUl=&okvedUl=&statusUl=&regionUl=&isMspUl=&mspUl1=1&mspUl2=2&mspUl3=3&queryIp=&okvedIp=&statusIp=&regionIp=&isMspIp=&mspIp1=1&mspIp2=2&mspIp3=3&queryUpr=&uprType1=1&uprType0=1&queryRdl=&dateRdl=&queryAddr=&regionAddr=&queryOgr=&ogrFl=1&ogrUl=1&npTypeDoc=1&ogrnUlDoc=&ogrnIpDoc=&nameUlDoc=&nameIpDoc=&formUlDoc=&formIpDoc=&ifnsDoc=&dateFromDoc=&dateToDoc=`;
    //const url1 = 'https://pb.nalog.ru/search-proc.json';
   
    /*const result = postDataURL(url1,request) 
      .then(data => {
      
      initialBusinessDataJSON = JSON.parse(data);
      console.log(jsonformat);
  
      }).then();*/
    const requestFirstToken = `page=1&pageSize=10&pbCaptchaToken=&token=&mode=search-all&queryAll=${this.state.INN}&queryUl=&okvedUl=&statusUl=&regionUl=&isMspUl=&mspUl1=1&mspUl2=2&mspUl3=3&queryIp=&okvedIp=&statusIp=&regionIp=&isMspIp=&mspIp1=1&mspIp2=2&mspIp3=3&queryUpr=&uprType1=1&uprType0=1&queryRdl=&dateRdl=&queryAddr=&regionAddr=&queryOgr=&ogrFl=1&ogrUl=1&npTypeDoc=1&ogrnUlDoc=&ogrnIpDoc=&nameUlDoc=&nameIpDoc=&formUlDoc=&formIpDoc=&ifnsDoc=&dateFromDoc=&dateToDoc=`;
   
    const result = postDataURL('https://pb.nalog.ru/search-proc.json', requestFirstToken)
        .then((data) => {
          return data;
      }).then(function(json){
        initialBusinessDataJSON = json;
      }).then(() =>{
        console.log("FIRST");
        firstToken = initialBusinessDataJSON["ul"]["data"][0]["token"];
        console.log(firstToken);
        console.log(initialBusinessDataJSON);
        console.log('smth');
        return fetch('https://pb.nalog.ru/company-proc.json', {method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'cookie' : '_ym_uid=1625468494103224867; _ym_d=1625468494; _ym_isad=2; pb-compare-inn-list=""; _ym_visorc=b; JSESSIONID=7DB23A281F0665975BFD27C4F9043AAD'
          
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: `token=${firstToken}&method=get-request`});
      }).then((response) => {
        return response.json();
      }).then((data) => {
        return data;
      }).then(function(json){
        secondRequestDataJSON = json;
      }).then(() =>{
        console.log("SECOND")
        secondToken = secondRequestDataJSON["token"];
        console.log(secondToken);
        id = secondRequestDataJSON["id"];
        console.log(id);
        console.log(secondRequestDataJSON);
        return fetch('https://pb.nalog.ru/company-proc.json', {method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'cookie' : '_ym_uid=1625468494103224867; _ym_d=1625468494; _ym_isad=2; pb-compare-inn-list=""; _ym_visorc=b; JSESSIONID=7DB23A281F0665975BFD27C4F9043AAD'
          
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: `token=${secondToken}&id=${id}&method=get-response`});
      }).then((response) => {
        return response.json();
      }).then((data) => {
        return data;
      }).then(function(json){
        finalBusinessDataJSON = json;
      }).then(() =>{
        console.log("THIRD")
        console.log(finalBusinessDataJSON);
      });
    
    //8602302853
  }
  
}

const styles = StyleSheet.create({

  background: {
    backgroundColor: '#fff', 
    height: '100%'
  },

  head: {
    fontSize: 20,
    paddingTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'grey',
    paddingTop: '50%'
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
  }

});
export default HomeScreen;