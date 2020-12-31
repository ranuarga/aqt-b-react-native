import React from 'react'
import { login, isLoggedIn } from '../../utils/JWTAuth'
import Loader from '../../components/Loader'
import HeaderAuth from '../../components/HeaderAuth'
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native'

export default class Login extends React.Component {
    state = {
        username: '',
        password: '',
        loading: false
    }

    componentDidMount () {
        isLoggedIn()
            .then(res => {
                if(res)
                    this.props.navigation.navigate('App')
            })
            .catch(err => console.log(err));
    }

    handleUsernameChange = username => {
        this.setState({ username })
    }

    handlePasswordChange = password => {
        this.setState({ password })
    }

    onLogin = async () => {
        let data = this.state
        this.setState({
            loading: true
        })
        try {
            let success = await login(data)
            this.setState({
                loading: false
            })
            if (success) {
                this.props.navigation.navigate('App')
            } else {
                alert('Login Failed')
            }
        } catch (error) {
            alert(error)
        }
    }

    goToSignup = () => this.props.navigation.navigate('Signup')

    goToForgetPassword = () => this.props.navigation.navigate('ForgetPassword')

    render() {
        const { username, password } = this.state

        return (
            <View style={styles.container}>
                <HeaderAuth/>
                <Loader loading={this.state.loading} />
                <Text style={styles.logo}>Farmer Login</Text>
                <View style={styles.inputView}>
                    <TextInput
                        name='username'
                        value={username}
                        placeholder='Username'
                        autoCapitalize='none'
                        onChangeText={this.handleUsernameChange}
                        style={styles.inputText}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        name='password'
                        value={password}
                        placeholder='Password'
                        secureTextEntry
                        onChangeText={this.handlePasswordChange}
                        style={styles.inputText}
                    />
                </View>
                <TouchableOpacity onPress={this.goToForgetPassword}>
                    <Text style={styles.forgotText}>Forget Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={this.onLogin}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.goToSignup}>
                    <Text style={styles.inputText}>Create your Account</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo:{
        fontWeight:"bold",
        fontSize:46,
        color:"#000000",
        marginBottom:40
    },
    loginText:{
        fontWeight:"bold",
        color:"#FFFFFF"
    },
    inputView:{
        width:"80%",
        backgroundColor:"#e6e6e6",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"#999999"
    },
    forgotText:{
        color:"#999999",
        fontSize:11
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#57b846",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    }
})