import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import AppStack from './src/navigation/appstack'
import {Provider} from 'react-redux'
import { store } from './src/store/store'

const App = props => (
  <Provider store={store}>
    <NavigationContainer>
    <AppStack />
  </NavigationContainer>
  </Provider>
)

export default App;