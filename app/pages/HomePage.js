import React, {useRef} from 'react';
import {View, Text, Button,PanResponder, Animated, StyleSheet, TouchableOpacity, Image} from 'react-native';
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

const HomeCardSet = ({navigation, name, uid, setCreateCardVisible, setEdit, setEditName}) => {

    // Create a ref to store the initial position of the card
    const initalPosition = useRef(new Animated.ValueXY()).current;

    // Create a ref to store the position of the card
    const position =
        useRef(new Animated.ValueXY()).current;

    // State to track if the card is being dragged
    const [dragging, setDragging] = React.useState(false);

    // Create a pan responder to handle touch events
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {

                // When touch gesture starts, 
                //set dragging to true
                setDragging(true);
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    {
                        dx: position.x,
                        dy: position.y,
                    },
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                
                // When touch gesture is released, 
                //set dragging to false
                setDragging(false);
                Animated.spring(position, {
                    toValue: initalPosition,
                    useNativeDriver: false,
                }).start()
            },
        })
    ).current;

    return (
        <Animated.View
            onPress={() => {
                navigation.navigate('CardSet', { name, uid });
            }}
            style={[styles.card,
                {
                    transform: position.getTranslateTransform(),
                    opacity: dragging ? 0.8 : 1,
                },
            ]}
            {...panResponder.panHandlers}
        >
            <View style={styles.cardContent}>
                <Text style={{color: 'white', fontSize: 20}}>{`Name: ${name}`}</Text>
            </View>
        </Animated.View>
    )
}


export function callHome({navigation}){
    const [CreateCardVisible, setCreateCardVisible] = React.useState(false)
    const [cards, setCards] = React.useState([])
    const [edit, setEdit] = React.useState(false)
    const [editName, setEditName] = React.useState('')
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
                                setCreateCardVisible={setCreateCardVisible}
                                setEdit={setEdit}
                                setEditName = {setEditName}
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
                                source={require('./Assets/Leaderboard.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.button}> 
                        <TouchableOpacity
                            style={styles.touchable_button}
                            onPress={() => {
                                setCreateCardVisible(true);
                                setEdit(true)
                                setEditName('')
                            }}>   
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
                            }}>     
                            <Image
                                source={require('./Assets/Settings.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View> 
                    <CreateCardSet navigation={navigation} 
                        visible={CreateCardVisible} 
                        setVisible={setCreateCardVisible}
                        uid={user ? user.uid : null}
                        edit={edit}
                        setEdit = {setEdit}
                        editName={editName}
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
        userSelect: 'none',
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#709775",
        borderRadius: 10,
        elevation: 5,
        margin: 10,
    },
    cardContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    },
    editButton: {
        width: '100%',
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#415D43",
        borderRadius: 10,
        marginTop: 10,
    },
});
