import React from 'react';
import { logout } from '../../utils/JWTAuth'
import Loader from '../../components/Loader'
import Header from '../../components/Header'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MqttService from '../../utils/mqtt/MqttService'
import OfflineNotification from '../../components/OfflineNotification'

export default class Home extends React.Component {
    _isMounted = false

    state = {
        isConnected: false,
        loading: false,
        feed1: '',
        ph: '',
        temperature: '',
        do2: '',
        ammonia: '',
        feed2: '',
        duty_cycle: '' 
    }

    componentDidMount() {
        this._isMounted = true
        MqttService.connectClient(
            this.mqttSuccessHandler,
            this.mqttConnectionLostHandler
        )
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    mqttSuccessHandler = () => {
        MqttService.subscribe('AQT28X', this.onSub)
        if (this._isMounted) {
            this.setState({
                isConnected: true
            })
        }
    }

    mqttConnectionLostHandler = () => {
        this.setState({
            isConnected: false
        })
    }

    onSub = message => {
        let split_msg = message.split('#')
        this.setState({
            feed1: split_msg[0],
            ph: split_msg[1],
            temperature: split_msg[2],
            do2: split_msg[3],
            ammonia: split_msg[4],
            feed2: split_msg[5],
            duty_cycle: split_msg[6]
        })
    }

    onLogout = async () => {
        this.setState({
            loading: true
        })
        try {
            await MqttService.unsubscribe('AQT28X')
            await MqttService.disconnectClient()
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
        const { 
            isConnected,
            feed1,
            ph,
            temperature,
            do2,
            ammonia,
            feed2,
            duty_cycle 
        } = this.state
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
                        pH value: {ph}
                    </Text>
                    <Text style={styles.instructions}>
                        Temperature value: {temperature} &deg;C
                    </Text>
                    <Text style={styles.instructions}>
                        Dissolved Oxygen value: {do2} mg/L
                    </Text>
                    <Text style={styles.instructions}>
                        Ammonia value: {ammonia} ppm
                    </Text>
                    <Text style={styles.instructions}>
                        Duty Cycle value: {duty_cycle} %
                    </Text>
                    <Text style={styles.instructions}>
                        Feeder 1 value: {feed1} cm
                    </Text>
                    <Text style={styles.instructions}>
                        Feeder 2 value: {feed2} cm
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