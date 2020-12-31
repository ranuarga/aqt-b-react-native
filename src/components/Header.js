import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'

// pull in from DrawerTrigger.js
import DrawerTrigger from './DrawerTrigger'

class Header extends React.Component {
    render() {
        return (
        <View style={styles.header}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#042c4c"
            />
            <DrawerTrigger />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 18,
        backgroundColor: '#042c4c'
    }
});

export default Header;