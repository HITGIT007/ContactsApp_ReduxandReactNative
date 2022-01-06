import * as Types from './types'
const initialState = {
    contacts: []
}

const reducer = (state = initialState, action) => {
//Here the reducer will take two parameters
//The action will be coming as an event from the screens as an event to the reducer
//Based on the action the state will be updated by the reducer
    switch (action.type) {
        case Types.UPDATE_CONTACTS:
            return { ...state, contacts: action.payload.contacts }
            //https://stackoverflow.com/questions/49725708/why-action-payload-use-in-reactjs
        default: return state;//If it's not that action then it will return the state as it is
   }
}

export { reducer };