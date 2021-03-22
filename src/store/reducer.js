import * as Types from './types'
const initialState = {
    contacts: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.UPDATE_CONTACTS:
            return { ...state, contacts: action.payload.contacts }
        default: return state;
   }
}

export { reducer };