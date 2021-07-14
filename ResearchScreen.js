import 'react-native-gesture-handler';

import React, { useState } from 'react';
import {parseDataJSON, parseDataURL} from './Parser'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//const Stack = createStackNavigator();
import Header from './components/Header';

class ResearchScreen extends React.Component {

  constructor(){
    super()
  }

  state = {
    score: 80,
    scoreColor: 'black'
  }

  render(){
    const score = this.state.score;

    const { inn } = this.props.route.params;
    
    return (
      
      <View style={styles.background}>
        <Header />
        
        <Text style={styles.title}>{}</Text>
        <Text style={styles.head}>ИНН: {inn}</Text>
        <Text style={styles.head}>Директор: {}</Text>
        <Text style={styles.head}>Адрес: {}</Text>

        <Text style={[styles.score, { color: this.state.scoreColor }]}>{score}/100</Text>

        <View style={[styles.category, { backgroundColor: this.state.scoreColor }]}>
          <Button title="СУДЕБНАЯ НАГРУЗКА" color='#fff' fontWeight='bold' onPress={() => this.props.navigation.navigate('Courts')} />

        </View>

        <View style={[styles.category, { backgroundColor: this.state.scoreColor }]}>
          <Button title="БАНКРОТСТВО" color="#fff" fontWeight='bold' onPress={() => this.props.navigation.navigate('Taxes')} />
        </View>

      </View>

    );
  }

  increment = () => {
    this.setState({
      score: this.state.score + 1,
    })
    if (25 >= this.state.score < 74) {
      this.setState({
        scoreColor: '#FFB347'
      })
    }
    if (this.state.score >= 74) {
      this.setState({
        scoreColor: '#77dd77'
      })
    }
    if (this.state.score < 25) {
      this.setState({
        scoreColor: '#FF6961'
      })
    }
  }



  decrement = () => {
    this.setState({
      score: this.state.score - 1,
    })

    if (25 <= this.state.score <= 75) {
      this.setState({
        scoreColor: '#FFB346'
      })
    }

    if (this.state.score > 75) {
      this.setState({
        scoreColor: '#77dd77'
      })
    }
    if (this.state.score < 27) {
      this.setState({
        scoreColor: '#FF6961'
      })
    }
  }

}


//<Button title="Вернуться назад" onPress={() => this.props.navigation.navigate('Home')} />

const styles = StyleSheet.create({

  background: {
    backgroundColor: '#fff',
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
    textAlign: 'left',

    fontWeight: 'bold',
    marginTop: '5%',

  }

});
export default ResearchScreen;