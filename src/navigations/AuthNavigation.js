//AuthNavigation.js
import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login/Login'
import Signup from '../screens/Signup/Signup'
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword'

const AuthNavigation = createStackNavigator(
    {
        Login: { screen: Login },
        Signup: { screen: Signup },
        ForgetPassword: { screen: ForgetPassword }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
)

export default AuthNavigation