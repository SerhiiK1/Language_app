import React from 'react';
import {View, Text, Button, TextInput, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export function callLeaderboard({navigation}){
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.app_view}>
                <Text style={{color: 'white'}}>Leaderboard</Text> 
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
                                source={require('./Assets/Leaderboard.svg')}
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
    },
    bottom_buttons:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        width: '100%',     
        flex: 1,
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
    }
});
