import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
    return (
        <View style={styles.main}>
            <Text style={styles.text}>RedFlags</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        paddingTop: 50, // внутренний отступ сверху
        height: 100,// высота объекта
        backgroundColor: 'red'
    },
    text: {
        fontSize: 30, // размер шрифта
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});