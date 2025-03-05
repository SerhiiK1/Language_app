import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export function callSettings({navigation}){
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.app_view}>
                <Text style={{color: 'white'}}>Settings</Text> 
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
                <View style={styles.bottom_buttons}>
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
                {/** needs to be moved later
                <View style={styles.button}>
                    <Button
                        title= 'AI'
                        color = '#A1CCA5'
                        onPress={() => {
                            navigation.navigate('HomePage');
                        }}>
                    </Button>
                </View>
                */}
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '25%', 
        height: '10%',
    },
    bottom_buttons:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        width: '100%',     
        flex: 1,
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
