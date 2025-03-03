import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export function callLeaderboard({navigation}){
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.app_view}>
                <Text style={{color: 'white'}}>Leaderboard</Text> 
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
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '25%', 
        height: '10%',
    },
    account_button: {
        backgroundColor: '#415D43',
        width: 82,
        height: 82,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_text: {
        fontSize: 15,
        color: 'black',
    },
    app_view: {
        backgroundColor: '#111D13',
        flex: 1,
        width: null,
        height: null,
    }
});
