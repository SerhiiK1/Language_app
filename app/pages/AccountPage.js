import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
//import { doc, getDoc } from "firebase/firestore";
//import { db } from "./firebase";


export function callAccount({navigation}){
    /**
    const fetchUserData = async (uid) => {
        const userDoc = doc(db, "users", uid);
        const userSnapshot = await getDoc(userDoc);
      
        if (userSnapshot.exists()) {
          console.log("User Data:", userSnapshot.data());
        } else {
          console.log("No such user data found!");
        }
    };
    To get user data but it does not work yet*/
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.app_view}>
                <Text style={{color: 'white'}}>Account info</Text>  
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
    },
    app_view: {
        backgroundColor: '#111D13',
        flex: 1,
        width: null,
        height: null,
    }
});
