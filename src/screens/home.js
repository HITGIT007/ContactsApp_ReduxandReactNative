//This app is about getting users contact from phone and process it and 
//store it inside redux and then access the contacts inside the contacts screen
import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
/*TouchableOpacity : A wrapper for making views respond properly to touches. 
On press down, the opacity of the wrapped view is decreased, dimming it.*/


import { connect } from 'react-redux'
/*The connect() function connects a React component to a Redux store.
It provides its connected component with the pieces of the data it needs 
from the store, and the functions it can use to dispatch actions to the store.
It does not modify the component class passed to it; instead, it returns a new,
connected component class that wraps the component you passed in.*/


import * as Permissions from 'expo-permissions'
import * as Contacts from 'expo-contacts'

import { useEffect } from 'react/cjs/react.development'
import * as Types from '../store/types'
const App = (props) => {
    const [contacts, setContacts] = useState([]);

    const fetchContactsAsync = async () => {    

        // check for contacts permission
        const { status } = await Permissions.getAsync(Permissions.CONTACTS);
        let finalStatus = status;
        
        if (finalStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.CONTACTS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') return;

        const { data } = await Contacts.getContactsAsync();

        setContacts(data);

        // Save Contacts To Redux
        props.updateContacts(data);

    }

    useEffect(() => {
        fetchContactsAsync();
    }, [])

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('contacts')} style={styles.btn}>
                <Text style={{ color: '#fff' }}>Contacts</Text>
            </TouchableOpacity>
            <Text>{ contacts.length }</Text>
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
    },
    btn: {
        marginVertical: 10,
        backgroundColor: 'rgba(81,135,185,1)',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    }
})

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    updateContacts: contacts => dispatch({
        //then dispatch function is sending an action 
        //The action is an object which has two parameters and one is called type
        type: Types.UPDATE_CONTACTS, //what kind of action is sent, means what kind of event is triggered
        payload: {//This is the data contained by the event and here it is contacts 
            //which is assigned to contacts in reducer file
                    contacts
                 }
    })
});
//mapDispatchToProps sends events or actions to modify the data inside of the store
//It triggers the action and on the base of the action the reducer modifies the state

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
//The connect component connects the mapStateToProps and mapDispatchToProps functions
//and maps it to the component and in this case it's App 

/*function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)
The mapStateToProps and mapDispatchToProps deals with your Redux store’s state and
 dispatch, respectively. state and dispatch will be supplied to your mapStateToProps
  or mapDispatchToProps functions as the first argument.
The returns of mapStateToProps and mapDispatchToProps are referred to internally as
 stateProps and dispatchProps, respectively. They will be supplied to mergeProps, 
 if defined, as the first and the second argument, where the third argument will be 
 ownProps. The combined result, commonly referred to as mergedProps, 
 will then be supplied to your connected component.
*/
export default connectComponent(App);

