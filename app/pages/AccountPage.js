import React from 'react';
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { setExperienceData, fetchUserData} from './functions/Experience';

const firebaseConfig = {
    apiKey: "AIzaSyAvf-gvB_eXWSYcRytg052UAqQI7XTgBNY",
    authDomain: "languageapp-5fa29.firebaseapp.com",
    projectId: "languageapp-5fa29",
    storageBucket: "languageapp-5fa29.firebasestorage.app",
    messagingSenderId: "672634105164",
    appId: "1:672634105164:web:73bf5dbb2a0e1b4ae7f3e9",
    measurementId: "G-20CR15B4WH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function callAccount({navigation}){
    const [user, setUser] = React.useState(null);
    const [userData, setUserData] = React.useState(null);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    React.useEffect(() => {
        if (user) {
            fetchUserData(user.uid).then((data) => {
                setUserData(data);
            });
        }
    }, [user]);

    return(   
        <SafeAreaProvider>
            <SafeAreaView style={styles.app_view}>
                <Text style={{color: 'white', fontSize: 30}}>User Information:</Text> 
                <Text style={{color: 'white', fontSize: 20}}>Uesr id: {user ? user.uid : 'No user signed in'}</Text> 
                <Text style={{color: 'white', fontSize: 20}}>Email: {user ? user.email : 'No user signed in'}</Text>
                <Text style={{color: 'white', fontSize: 20}}>Experience: {userData ? userData.experience : 'Loading...'}</Text>

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
    bottom_buttons:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        width: '100%',     
        flex: 1,
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
    }
});
