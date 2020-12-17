//AppNavigation.js
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Home/Home'

const AppNavigation = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        initialRouteName: 'Home'
    }
)

export default AppNavigation