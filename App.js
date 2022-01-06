import React from 'react'
import {NavigationContainer} from '@react-navigation/native'

import AppStack from './src/navigation/appstack'


import {Provider} from 'react-redux'
/*In order to integrate Redux to React or React Native application
we nee to import this provider.
The <Provider> component makes the Redux store 
available to any nested components that need to access the Redux store.*/


import { store } from './src/store/store'

const App = props => (
  //Each component of react native is a child of the main application
  //And here the main application is provided a parent called Provider
  //and Provider has a store which is mapped to each child of the provider
  //and each component that mapStateToProps then the store will be mapped 
  //to that particular component and so we can fetch the data by the mapStateToProps function
  <Provider store={store}>
    <NavigationContainer>
    <AppStack />
  </NavigationContainer>
  </Provider>
)

export default App;