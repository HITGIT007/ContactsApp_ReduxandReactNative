import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { ContactsScreen, HomeScreen } from '../screens';
 
const { Navigator, Screen } = createStackNavigator();

const App = props => {
    return (
        <Navigator>
            <Screen name="home" component={HomeScreen} />
            <Screen name="contacts" component={ContactsScreen} />
        </Navigator>
    )
}

export default App;