import React from 'react';
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import CreateCardSet from './cards/CreateCardSet';
import {getItem} from '../utils/AsyncStorage';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {setExperienceData, fetchUserData} from './functions/Experience'


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

const HomeCardSet = ({navigation, name, uid}) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('CardSet', {name, uid});
            }}
            style={styles.card}
        >
            <Text style={{color: 'white', fontSize: 20}}>{`Name: ${name}`}</Text>
        </TouchableOpacity>
    )
}


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
        if (user) {
            getItem(user.uid)
            .then((cardSetsFile) => {
                if (!cardSetsFile) {
                    setHasCards(false);
                }
                else {
                    setCardSets(prevCardSets => [
                        ...prevCardSets, 
                        ...cardSetsFile.map(cardInfo => (
                            setHasCards(true),
                            <HomeCardSet 
                                key={cardInfo.name}
                                uid = {user.uid} 
                                navigation={navigation} 
                                name={cardInfo.name} 
                            />
                        ))
                    ]);
                }
                
            });

        }
    }, [user]);

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.app_view}>
                <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', backGroundColor: '#415D43'}} >Experience: {userData ? userData.experience : 'Loading...'}</Text>
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
                                setCreateCardVisible(true);
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
                    <CreateCardSet navigation={navigation} 
                        visible={CreateCardVisible} 
                        setVisible={setCreateCardVisible}
                        uid = {user ? user.uid : null}
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
        width: '100%',    
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
