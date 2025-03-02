import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';

export function callAccount({navigation}){
    return(
        <View>
            <Text>Account info</Text>  
            <View style={styles.account_button}>
                <Button
                    title= 'Account'
                    color= '#415D43'
                    onPress={() => {
                        navigation.navigate('AccountPage');
                    }}
                >
                </Button>
            </View>
            <View style={{flexDirection: 'row', padding: 10, justifyContent: 'flex-end'}}>
                <View style = {styles.button}>
                <Button 
                    title= 'Home'
                    color = '#A1CCA5'
                    onPress={() => {
                        navigation.navigate('HomePage');
                    }}>     
                </Button>
                </View>
                <View style = {styles.button}>
                    <Button 
                        title= 'Leaderboard'
                        color = '#A1CCA5'
                        onPress={() => {
                            navigation.navigate('Leaderboard');
                        }}> 
                    </Button>
                </View>
                <View style = {styles.button}> 
                    <Button 
                        title= 'Add more flash cards'
                        color = '#A1CCA5'
                        onPress={() => {
                            navigation.navigate('HomePage');
                        }}>     
                    </Button>
                </View>
                <View style = {styles.button}> 
                    <Button 
                        title= 'Settings'
                        color = '#A1CCA5'
                        onPress={() => {
                            navigation.navigate('SettingsPage');
                        }}>     
                    </Button>
                </View>  
            </View>          
        </View>
    );
};

const styles = StyleSheet.create({
    account_button: {
        backgroundColor: '#415D43',
        width: 82,
        height: 82,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '25%',
        marginBottom: 10,
        height: '10%',
    },
    button_text: {
        fontSize: 15,
        color: 'black',
    }
});