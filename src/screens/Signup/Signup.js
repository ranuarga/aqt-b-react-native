import React from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'

const { height } = Dimensions.get('window')

export default class Signup extends React.Component {
    state = {
        screenHeight: height
    }

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight })
    }
    
    goToLogin = () => this.props.navigation.navigate('Login')

    render() {
        const scrollEnabled = this.state.screenHeight > height;
        return (
            <View style={styles.container}>
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollView}
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={this.onContentSizeChange}
                >
                    <View style={styles.content}>
                        <Text style={styles.logo}>Farmer Register</Text>
                        <View style={styles.inputView}>
                            <TextInput name='nik' placeholder='NIK' autoCapitalize='none' style={styles.inputText}/>
                        </View>
                        <View style={styles.inputView}>
                            <TextInput name='name' placeholder='Name' autoCapitalize='sentences' style={styles.inputText}/>
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                name='username'
                                // value={username}
                                placeholder='Username'
                                autoCapitalize='none'
                                // onChangeText={this.handleUsernameChange}
                                style={styles.inputText}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput name='email' placeholder='Email' autoCapitalize='none' style={styles.inputText}/>
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                name='password'
                                // value={password}
                                placeholder='Password'
                                secureTextEntry
                                // onChangeText={this.handlePasswordChange}
                                style={styles.inputText}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput name='address' placeholder='Address' autoCapitalize='sentences' style={styles.inputText}/>
                        </View>
                        <View style={styles.inputView}>
                            <TextInput name='phone' placeholder='Phone' autoCapitalize='none' style={styles.inputText}/>
                        </View>
                        <View style={styles.inputView}>
                            <TextInput name='gender' placeholder='Gender' autoCapitalize='sentences' style={styles.inputText}/>
                        </View>
                        <TouchableOpacity style={styles.registerBtn}>
                            <Text style={styles.registerText}>REGISTER</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.goToLogin} style={styles.loginBtn}>
                            <Text style={styles.inputText}>Login Page</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
    content: {
        flexGrow: 1,
        justifyContent: 'space-between',
        padding: 10
    },
    scrollView: {
        flexGrow: 1
    },
    logo:{
        fontWeight:"bold",
        fontSize:46,
        color:"#000000",
        marginBottom:40
    },
    registerText:{
        fontWeight:"bold",
        color:"#FFFFFF"
    },
    inputView:{
        backgroundColor:"#e6e6e6",
        borderRadius:25,
        height:50,
        marginBottom: 15,
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
    registerBtn:{
        backgroundColor:"#57b846",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    loginBtn: {
        alignItems:"center",
        justifyContent:"center",
    }
})