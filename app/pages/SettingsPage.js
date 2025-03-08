import React, { useState } from 'react';
import {View, Text, Button, TextInput, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {signOutUser} from './functions/SignOut';

export function callSettings({navigation}){
    const [modalVisible, setModalVisible] = React.useState(false);
    
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.app_view}>
                <Text style={{color: 'white'}}>Settings</Text> 
                <View style={styles.account_button}>
                    <TouchableOpacity
                        style={styles.touchable_button}
                        onPress={() => {
                            navigation.navigate('AccountPage');
                        }}
                    >
                        <Image
                            source={require('./Assets/Profile.png')}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                </View>
                <View style = {styles.signOutButton}>
                    <TouchableOpacity
                        style = {{justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => {
                            setModalVisible(true);
                        }}
                        >
                            <Text style={styles.button_text}>Sign Out</Text>
                        </TouchableOpacity>
                </View>
                {modalVisible && (
                    <View style={styles.modal}>
                        <Text style={styles.modalText}>Are you sure you want to sign out?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => {
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.button_text}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => {
                                    signOutUser();
                                    navigation.navigate('SignInPage');
                                }}
                            >
                                <Text style={styles.button_text}>Sign Out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                <View style={styles.bottom_buttons}>
                    <View style = {styles.button}>
                        <TouchableOpacity
                            style={styles.touchable_button}
                            onPress={() => {
                                navigation.navigate('HomePage');
                            }}
                        >
                            <Image
                                source={require('./Assets/Home.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.button}>
                        <TouchableOpacity
                            style={styles.touchable_button}
                            onPress={() => {
                                navigation.navigate('Leaderboard');
                            }}
                        >
                            <Image
                                source={require('./Assets/Leaderboard.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.button}> 
                        <TouchableOpacity
                            style={styles.touchable_button}
                            onPress={() => {
                                navigation.navigate('HomePage');
                            }}
                        >
                            <Image
                                source={require('./Assets/FlashCards.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View> 
                    <View style = {styles.button}> 
                        <TouchableOpacity
                            style={styles.touchable_button}
                            onPress={() => {
                                navigation.navigate('SettingsPage');
                            }}
                            >
                            <Image
                                source={require('./Assets/Settings.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
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
    signOutButton: {
        backgroundColor: '#A1CCA5',
        width: '10%',
        height: '5%',
        borderRadius: 5,
    },
    app_view: {
        backgroundColor: '#111D13',
        flex: 1,
        width: null,
        height: null,
    },
    image: {
        width: 40,
        height: 40,
        alignSelf: 'center',
        alignContent: 'center',
    },
    touchable_button: {
        backgroundColor: '#A1CCA5',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '30%',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        backgroundColor: '#A1CCA5',
        padding: 10,
        borderRadius: 5,
        height: '100%',
        width: '45%',
        alignItems: 'center',
    },
});
