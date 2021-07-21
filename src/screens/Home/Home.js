import React from 'react';
import { logout, getDevice } from '../../utils/JWTAuth'
import Loader from '../../components/Loader'
import Header from '../../components/Header'
import { StyleSheet, Text, View, TouchableOpacity, LogBox } from 'react-native'
import MqttService from '../../utils/mqtt/MqttService'
import OfflineNotification from '../../components/OfflineNotification'
import { Dropdown } from 'react-native-material-dropdown'

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
        duty_cycle: '',
        idDevice: '',
        data_device: []
    }

    setSelectedStateValue = (ddlValue) => {
        if(this.state.idDevice != '') {
            MqttService.unsubscribe(this.state.idDevice)
        }
        this.setState({ 
            idDevice: ddlValue,
            feed1: '',
            ph: '',
            temperature: '',
            do2: '',
            ammonia: '',
            feed2: '',
            duty_cycle: ''
        })
        MqttService.subscribe(this.state.idDevice, this.onSub)
        MqttService.publishMessage(this.state.idDevice + '/ASKING', '1')
    }

    async componentDidMount() {
        LogBox.ignoreLogs([
            'Animated: `useNativeDriver`',
            'componentWillUpdate',
            'componentWillReceiveProps'
        ])

        this._isMounted = true
        MqttService.connectClient(
            this.mqttSuccessHandler,
            this.mqttConnectionLostHandler
        )
        try {
            let devices = []
            let success = await getDevice()
            if(success) {
                success.forEach(device => {
                    let arr = {
                        'label': device.name,
                        'value': device.id
                    }
                    devices.push(arr)
                })
            }
            this.setState({ data_device: devices })
        } catch (error) {
            alert(error)
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    mqttSuccessHandler = () => {
        console.log('Connection Success')
        if (this._isMounted) {
            this.setState({
                isConnected: true
            })
        }
        // MqttService.subscribe('AQT28X', this.onSub)
        // if (this._isMounted) {
        //     this.setState({
        //         isConnected: true
        //     })
        // }
    }

    mqttConnectionLostHandler = () => {
        console.log('Connection Lost')
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
            await MqttService.unsubscribe(this.state.idDevice)
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
            duty_cycle,
            data_device
        } = this.state
        return (
            <React.Fragment>
                <Header />
                <View style={styles.container}>
                    {/* { !isConnected && <OfflineNotification/> } */}
                    <Loader loading={this.state.loading} />
                    <Text style={styles.welcome}>
                        Monitoring Page
                    </Text>
                    <Dropdown
                        label='Device'
                        data={data_device}
                        value={this.state.idDevice}                            
                        useNativeDriver={true}                            
                        containerStyle={{width: 200}}
                        onChangeText={(value,index,data) => this.setSelectedStateValue(value)}
                    />
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
                    <TouchableOpacity
                        onPress={this.onLogout}
                        style={styles.bottom}
                    >
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
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 30,
        color: '#000000',
    },
    instructions: {
        textAlign: 'center',
        color: '#000000',
        marginBottom: 5,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30
    }
});