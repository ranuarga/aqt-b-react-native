import React from 'react'
import { StatusBar } from 'react-native'

class HeaderAuth extends React.Component {
    render() {
        return (
            <StatusBar
                barStyle="dark-content"
                backgroundColor="white"
            />
        )
    }
}

export default HeaderAuth