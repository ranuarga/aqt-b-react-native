import React from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'
import { LogBox } from 'react-native';
import { register } from '../../utils/JWTAuth'
import Loader from '../../components/Loader'

const { height } = Dimensions.get('window')

export default class Signup extends React.Component {
    state = { 
        idUser : '', name : '', username : '',
		email : '', password : '', address : '',
		phone : '', gender : '', screenHeight: height,
        ddlSelectedValue: 'L', loading: false
    }

    handleIdUserChange = idUser => { this.setState({ idUser }) }
    handleNameChange = name => { this.setState({ name }) }
    handleUsernameChange = username => { this.setState({ username }) }
    handleEmailChange = email => { this.setState({ email }) }
    handlePasswordChange = password => { this.setState({ password }) }
    handleAddressChange = address => { this.setState({ address }) }
    handlePhoneChange = phone => { this.setState({ phone }) }

    onRegister = async () => {
        let post_data = this.state
        this.setState({
            loading: true
        })
        try {
            let success = await register(post_data)
            this.setState({
                loading: false
            })
            if (success) {
                alert('Register Success')
                this.props.navigation.navigate('Login')
            } else {
                alert('Register Failed')
            }
        } catch (error) {
            alert(error)
        }
    }
    
    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight })
    }

    setSelectedStateValue = (ddlValue) => {
        this.setState({ ddlSelectedValue: ddlValue })
        this.setState({ gender: ddlValue })
    }
    
    goToLogin = () => this.props.navigation.navigate('Login')

    componentDidMount() {
        LogBox.ignoreLogs([
            'Animated: `useNativeDriver`',
            'componentWillUpdate',
            'componentWillReceiveProps'
        ]);
    }
    
    render() {
        const scrollEnabled = this.state.screenHeight > height;
        let data_gender = [
            {
                label: 'Laki - laki',
                value: 'L'
            },
            {
                label: 'Perempuan',
                value: 'P'
            }
        ]
        const { idUser, name, username, email, password, address, phone } = this.state
        
        return (
            <View style={styles.container}>
                <Loader loading={this.state.loading} />
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollView}
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={this.onContentSizeChange}
                >
                    <View style={styles.content}>
                        <Text style={styles.logo}>Farmer Register</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                name='idUser'
                                value={idUser}
                                placeholder='NIK'
                                autoCapitalize='none'
                                onChangeText={this.handleIdUserChange}
                                style={styles.inputText}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                name='name'
                                value={name}
                                placeholder='Name'
                                autoCapitalize='sentences'
                                onChangeText={this.handleNameChange}
                                style={styles.inputText}
                            />
                        </View>
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
                                name='email'
                                value={email}
                                placeholder='Email'
                                autoCapitalize='none'
                                onChangeText={this.handleEmailChange}
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
                        <View style={styles.inputView}>
                            <TextInput
                                name='address'
                                value={address}
                                placeholder='Address'
                                autoCapitalize='sentences'
                                onChangeText={this.handleAddressChange}
                                style={styles.inputText}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                name='phone'
                                value={phone}
                                placeholder='Phone'
                                autoCapitalize='none'
                                onChangeText={this.handlePhoneChange}
                                style={styles.inputText}
                            />
                        </View>
                        <View style={styles.dropdownView}>
                            <Dropdown
                                label='Gender'
                                data={data_gender}
                                value={this.state.ddlSelectedValue}
                                style={styles.inputDropdown}
                                useNativeDriver={true}
                                onChangeText={(value,index,data)=>this.setSelectedStateValue(value)}
                            />
                        </View>
                        <TouchableOpacity style={styles.registerBtn} onPress={this.onRegister}>
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
    dropdownView:{
        backgroundColor:"#e6e6e6",
        borderRadius:25,
        height:65,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"#999999"
    },
    inputDropdown:{
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