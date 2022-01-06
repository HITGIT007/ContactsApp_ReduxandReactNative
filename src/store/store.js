import { createStore } from 'redux'
//createStore : Creates a Redux store that holds the complete state tree of your app. 
//There should only be a single store in your app.

import { reducer } from './reducer'
/*reducer (Function): A reducing function that returns the next state tree,
 given the current state tree and an action to handle.*/
 


const store = createStore(reducer);

export { store };
/*(Store): An object that holds the complete state of your app. 
The only way to change its state is by dispatching actions. 
You may also subscribe to the changes to its state to update the UI.*/