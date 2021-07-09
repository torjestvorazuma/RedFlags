
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import Header from './components/Header';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <Header />
        <Text style={styles.head}>Проверь надежность компании!</Text>
        <TextInput style={styles.input} placeholder='Введите ИНН' />
        <Button title="Найти" onPress={() => this.props.navigation.navigate('Research')} />
      </View>
    );
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