import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
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
        type: Types.UPDATE_CONTACTS, payload: {
        contacts
    }})
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(App);

