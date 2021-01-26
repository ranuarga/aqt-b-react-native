import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'

class Header extends React.Component {
    render() {
        return (
        <StatusBar
            barStyle="dark-content"
            backgroundColor="white"
        />
        )
    }
}

export default Header