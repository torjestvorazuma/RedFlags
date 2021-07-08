
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import Header from './components/Header';

class HomeScreen extends React.Component {
  render() {
    return (
      <View >
        <Header />
        <Text style={styles.head}>Проверь надежность компании!</Text>
        <TextInput style={styles.input} placeholder='Введите ИНН' />
        <Button title="Найти" onPress={() => this.props.navigation.navigate('Research')} />
      </View >
    );
  }
}


const styles = StyleSheet.create({
  head: {
    fontSize: 15,
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
  button: {
    fontSize: 15,
    paddingTop: 30,
    textAlign: 'center',
    width: '80%',
    marginLeft: '10%',
    backgroundColor: '#ceffbc'
  }

});
export default HomeScreen;