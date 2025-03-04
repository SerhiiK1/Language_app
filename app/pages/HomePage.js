import React from 'react';
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import CreateCardSet from './cards/CreateCardSet';
import {getAllKeys} from '../utils/AsyncStorage';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { doc, setDoc, getDoc, initializeFirestore } from "firebase/firestore";
import {setExperienceData, fetchUserData} from './functions/Experience'

const HomeCardSet = ({navigation, name}) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('CardSet', {name});
            }}
            style={styles.card}
        >
            <Text style={{color: 'white', fontSize: 20}}>{`Name: ${name}`}</Text>
        </TouchableOpacity>
    )
}


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
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});
const auth = getAuth(app);



export function callHome({navigation}){
    const [CreateCardVisible, setCreateCardVisible] = React.useState(false)
    const [cardSets, setCardSets] = React.useState([])
    const [hasCards, setHasCards] = React.useState(false)
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

    React.useEffect(() => {
        getAllKeys().then((keys) => {
            setCardSets(keys.map((key) => <HomeCardSet key={key} name={key} navigation={navigation}/>))
            setHasCards(keys.length > 0)
        })
    }, [])
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.app_view}>
                <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', backGroundColor: '#415D43'}} >Experience: {userData ? userData.experience : 'Loading...'}</Text>
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
                <View style={styles.title_view}>
                    <Text style={styles.title}>Flash Cards</Text>
                </View>
                <View style={styles.card_view}>
                    {cardSets}
                </View>
                
                    {!hasCards &&
                    (<Text style={{color: 'white', fontSize: 20, textAlign: 'center', justifyContent: 'center'}}>{`No flash cards here yet :(`}</Text>)}

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
                                setCreateCardVisible(true);
                                
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
                    <CreateCardSet navigation={navigation} 
                        visible={CreateCardVisible} 
                        setVisible={setCreateCardVisible}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};


const styles = StyleSheet.create({
    button: {
       backgroundColor: '#415D43',
        width: '25%', 
        height: '10%',
    },
    button_text: {
        fontSize: 15,
        color: 'black',
    },
    account_button: {
        backgroundColor: '#415D43',
        width: 82,
        height: 82,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom_buttons:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        padding: 10,
        flex: 1,
    },
    app_view: {
        backgroundColor: '#111D13',
        flex: 1,
        width: null,
        height: null,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        width: '100%',
        textAlign: 'center',
    },
    title_view: {
        backgroundColor: '#415D43',
        width: '50%',
        alignSelf: 'center',
        padding: 10,
        margin: 10,
    },
    card: {
        width: 200,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#709775",
        borderRadius: 10,
        elevation: 5,
        margin: 10,
    },
    card_view: {
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
});
