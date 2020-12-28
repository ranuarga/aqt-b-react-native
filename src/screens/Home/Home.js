import React from 'react';
import { logout } from '../../utils/JWTAuth'
import Loader from '../../components/Loader'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';

export default class Home extends React.Component {
    state = {
        loading: false
    }

    onLogout = async () => {
        this.setState({
            loading: true
        })
        try {
            await logout()
            this.setState({
                loading: false
            })
            this.props.navigation.navigate('Login')
        } catch (error) {
            alert(error)
        }
    }    

    render() {
        return (
            <View style={styles.container}>
                <Loader loading={this.state.loading} />
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#000000"
                />
                <Text style={styles.welcome}>
                    Home
                </Text>
                <Text style={styles.instructions}>
                    Under Construction
                </Text>
                <TouchableOpacity onPress={this.onLogout}>
                    <Text>LOGOUT</Text>
                </TouchableOpacity>
            </View>
        )
    }
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