import React from 'react'
import { View, Text, StyleSheet, Dimensions, Linking } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
//Through this connect it is connected
import * as Types from '../store/types'
const { width } = Dimensions.get('screen')



const App = (props) => {

    const deleteItem = (number) => {
        const filter = props.contacts.filter(contact => contact.phoneNumbers[0].number !== number)
        props.updateContacts(filter);//updating the state in Redux store
        //and mapDispatchToProps will send teh action to reducer
    }

    return (
        <View style={styles.container}>
            <Text>Contacts</Text>
            <Text>{props.contacts.length}</Text>
            <FlatList data={props.contacts} renderItem={({ item }) => (
                <TouchableOpacity 
                    onLongPress={() => deleteItem(item.phoneNumbers[0].number)} 
                    onPress={() => Linking.openURL(`tel:${item.phoneNumbers[0].number}`)} 
                    style={styles.btn}
                >
                    <Text>{ item.phoneNumbers[0].number }</Text>
                </TouchableOpacity>
            )}  />
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
        padding: 10,
        backgroundColor: '#ADD8E6',
        width: width / 1.05,
        marginVertical: 10
    }
})

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    updateContacts: contacts => dispatch({
        type: Types.UPDATE_CONTACTS, 
        payload: {contacts}})
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(App);