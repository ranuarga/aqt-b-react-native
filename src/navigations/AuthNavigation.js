//AuthNavigation.js
import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login/Login'
import Signup from '../screens/Signup/Signup'

const AuthNavigation = createStackNavigator(
    {
        Login: { screen: Login },
        Signup: { screen: Signup }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
)

export default AuthNavigation