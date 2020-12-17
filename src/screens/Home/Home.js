import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

export default function Home() {
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#000000"
            />
            <Text style={styles.welcome}>
                Welcome to React Native!
            </Text>
            <Text style={styles.instructions}>
                To get started, edit App.js
            </Text>
            <Text style={styles.instructions}>
                {instructions}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#000000',
    },
    instructions: {
        textAlign: 'center',
        color: '#000000',
        marginBottom: 5,
    },
});