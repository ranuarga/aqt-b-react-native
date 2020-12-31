import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// withNavigation allows components to dispatch navigation actions
import { withNavigation } from 'react-navigation';

// DrawerActions is a specific type of navigation dispatcher
import { DrawerActions } from 'react-navigation-drawer';

class DrawerTrigger extends React.Component {
    render() {
        return (
        <TouchableOpacity style={styles.trigger}
            onPress={() => {
                this.props.navigation.dispatch(DrawerActions.openDrawer())
            }}
        >
            <Ionicons
                name={'list-sharp'}
                size={30}
                color={'white'}
            />
        </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    trigger: {
        marginLeft: 22,
        borderRadius: 30,
        width: 45,
        height: 45,
    }
});

export default withNavigation(DrawerTrigger);