//AppNavigation.js
import { createDrawerNavigator } from 'react-navigation-drawer'
import Home from '../screens/Home/Home'

const AppNavigation = createDrawerNavigator(
    {
        Home: { screen: Home }
    },
    {
        initialRouteName: 'Home'
    }
)

export default AppNavigation