import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
    return (
        <View style={styles.main}>
            <Text style={styles.text}>GreenFlags</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        paddingTop: 10,
        height: '8%',
        backgroundColor: '#77dd77'//'#ceffbc'
    },
    text: {
        fontSize: 35,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});