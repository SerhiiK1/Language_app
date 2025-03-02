import React from 'react';
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

export function callAccount({navigation}){
    return(
        <View>
            <Text>Account info</Text>  
    

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