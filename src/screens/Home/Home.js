import React from 'react';
import { logout } from '../../utils/JWTAuth'
import Loader from '../../components/Loader'
import Header from '../../components/Header'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MqttService from '../../utils/mqtt/MqttService'
import OfflineNotification from '../../components/OfflineNotification'

export default class Home extends React.Component {
    state = {
        isConnected: false,
        loading: false,
        message: ''
    }

    componentDidMount() {
        MqttService.connectClient(
            this.mqttSuccessHandler,
            this.mqttConnectionLostHandler
        )
    }

    mqttSuccessHandler = () => {
        console.info('connected to mqtt')
        MqttService.subscribe('AQT28X', this.onSub)
        this.setState({
            isConnected: true
        })
    }

    mqttConnectionLostHandler = () => {
        this.setState({
            isConnected: false
        })
    }

    onSub = message => {
        this.setState({
            message,
        })
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
        const { isConnected, message } = this.state
        return (
            <React.Fragment>
                <Header/>
                <View style={styles.container}>
                    {/* { !isConnected && <OfflineNotification/> } */}
                    <Loader loading={this.state.loading} />
                    <Text style={styles.welcome}>
                        AQT28X
                    </Text>
                    <Text style={styles.instructions}>
                        You received message: {message}
                    </Text>
                    <TouchableOpacity onPress={this.onLogout}>
                        <Text>LOGOUT</Text>
                    </TouchableOpacity>
                </View>
            </React.Fragment>
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