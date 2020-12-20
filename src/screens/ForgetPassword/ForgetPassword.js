import React from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native'

export default class Login extends React.Component {
    goToLogin = () => this.props.navigation.navigate('Login')

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Forget Password</Text>
                <View style={styles.inputView}>
                    <TextInput name='email' placeholder='Email' autoCapitalize='none' style={styles.inputText}/>
                </View>
                <TouchableOpacity style={styles.resetBtn}>
                    <Text style={styles.resetText}>RESET PASSWORD</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.goToLogin}>
                    <Text style={styles.inputText}>Login Here</Text>
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
        fontSize:42,
        color:"#000000",
        marginBottom:40
    },
    resetText:{
        fontWeight:"bold",
        color:"#FFFFFF"
    },
    inputView:{
        width:"80%",
        backgroundColor:"#e6e6e6",
        borderRadius:25,
        height:50,
        marginBottom:10,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"#999999"
    },
    resetBtn:{
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