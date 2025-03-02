import React from 'react';
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity} from 'react-native';


export function callHome({navigation}){
    return(
        <View>
            <Text style={{color: 'green', fontSize: 30, fontWeight: 'bold'}} >Experience: </Text>
            <TouchableOpacity
                style={{
                    width: 60,
                    height: 60,
                    backgroundColor: 'blue',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 20, 
                    alignSelf: 'flex-end',
                    borderRadius: 10,
                }}
                onPress={() => {
                    navigation.navigate('AccountPage');
                }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold'}}>Account</Text>
            </TouchableOpacity>

            <Text style={{color: 'black', fontSize: 20, textAlign: 'center', justifyContent: 'center'}}>No flash cards here yet :(</Text>

            <View style={{flexDirection: 'row', padding: 10}}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    navigation.navigate('HomePage');
                }}>     
                <Text style={styles.button_text}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Leaderboard');
                }}>
                <Text style={styles.button_text}>Leaderboard</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    navigation.navigate('HomePage');
                }}>
                <Text style={styles.button_text}>Add more flash cards</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    button: {
        width: '25%', 
        height: '10%',
        borderWidth: 1,
        borderColor: 'black',
    },
    button_text: {
        fontSize: 15,
        color: 'black',
    }
});