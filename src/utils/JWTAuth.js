import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'

const SERVER_URL = "https://aqt-b-api.herokuapp.com";

const login = async (data) => {
    const LOGIN_ENDPOINT = `${SERVER_URL}/login`;

    try {
        let response = await axios.post(LOGIN_ENDPOINT, data)
        // console.log(response)
        if(response.status === 200 && response.data.data.token) {
            let token = response.data.data.token
            let name = response.data.data.name
            let idUser = response.data.data.idUser

            AsyncStorage.setItem('token', token)
            AsyncStorage.setItem('name', name)
            AsyncStorage.setItem('idUser', JSON.stringify(idUser))

            return true
        }
    } catch(e) {
        console.log(e)
    }

    return false
}

const register = async (data) => {
    const SIGNUP_ENDPOINT = `${SERVER_URL}/register`;
    try {
        let response = await axios({
            method: 'post',
            responseType: 'json',
            url: SIGNUP_ENDPOINT,
            data: data
        });
        if(response.data.success) 
            return true
        else
            return false
    } catch(e){
        console.log(e);
    }
}

const logout = async () => {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('name')
    await AsyncStorage.removeItem('idUser')
}

const isLoggedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('token')
            .then(res => {
                if (res !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
        });
}

export { 
    login, 
    register,
    logout,
    isLoggedIn
}