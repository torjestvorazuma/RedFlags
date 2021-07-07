
import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableWithoutFeedback} from 'react-native';
import Header from './components/Header';

export default function App() {
const onPress = () => console.log('отлично');
    return (
        <View>
            <Header />
            <Text style={styles.head}>Проверь надежность компании!</Text>
            <TextInput style={styles.input}  placeholder='Введите ИНН'/>
            <TouchableWithoutFeedback onPress={onPress}>
                <Text style={styles.button}>Проверка</Text>
            </TouchableWithoutFeedback>
        </View>
    );
}


const styles = StyleSheet.create({
    head: {
        fontSize: 15,
        paddingTop: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    input: {
        fontSize: 15,
        paddingTop: 30,
        borderBottomWidth : 1,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    button: {
        fontSize: 15,
        paddingTop: 30,
        textAlign: 'center',
        marginTop: 20,
        width: '80%',
        marginLeft: '10%',
        backgroundColor: 'red'
    }

});
