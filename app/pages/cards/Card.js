import React from 'react';
import {TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {getItem} from '../../utils/AsyncStorage'
import CreateCardSet from './CreateCardSet';
import { setExperienceData, fetchUserData } from '../functions/Experience';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {initializeApp} from 'firebase/app';


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


const Card = ({front, back}) => {
    const [isFlipped, setFlipped] = React.useState(false)


    const handleFlip = () =>{
        setFlipped(!isFlipped)
    }

    return (
        <TouchableOpacity style = {styles.card} onPress={handleFlip}>
            <Text style = {styles.text}> {isFlipped ? back : front}</Text>
        </TouchableOpacity>
    )
}

export function CardSet({navigation, uid, name}) {
   // const [CreateCardVisible, setCreateCardVisible] = React.useState(false) can be changed if needed
    const [card, setCard] = React.useState([])
    const [index, setIndex] = React.useState(0)

    const [frontDisable, setFrontDisable] = React.useState(false)
    const [backDisable, setBackDisable] = React.useState(true)
    const [inputText, setInputText] = React.useState('')

    const [user, setUser] = React.useState(null);
    const [userData, setUserData] = React.useState(null);

    React.useEffect(() => {
        getItem(uid).then((cardSets) => {
            cardSets.map((cardInfo) => {
                if (cardInfo.name === name) {
                    (cardInfo.cards).map((cards) => {
                        setCard([...card, {front: cards.front, back: cards.back}])
                    })
                }
            })
        })
    }, [])
    
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

    const increment = () => {
        let localIndex = index + 1
        
        if (localIndex <= card.length - 1){
            setBackDisable(false)
            if (localIndex == card.length - 2) {
                setFrontDisable(true)
            }
            setIndex(localIndex)
        }

    }

    const decrement = () => {
        let localIndex = index -1
        if (localIndex >= 0){
            setFrontDisable(false)
            if (localIndex == 0) {
                setBackDisable(true)
            }
            setIndex(localIndex)
        }
    }

   
    return(
        <SafeAreaProvider>
            <SafeAreaView style = {styles.container}>
                <TouchableOpacity style = {[styles.card, backDisable && styles.disabledButton]} 
                    disabled = {backDisable} 
                    onPress={decrement}>
                    <Text>back</Text>
                </TouchableOpacity>
                {card.length > 0 && (
                    <Card front = {card[index].front} back = {card[index].back} />
                )}
                <TouchableOpacity style = {[styles.card, frontDisable && styles.disabledButton]} 
                    disabled = {frontDisable} 
                    onPress={increment}>
                    <Text>next</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView>
                <TextInput                        
                    style = {styles.input}
                    color = '#A1CCA5'
                    onChangeText={setInputText}
                    placeholder=''
                />
                <TouchableOpacity style = {{width: 150, height: 70, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#415D43'}}
                    onPress={() => {
                        if (inputText === card[index].back) {
                            setExperienceData(user.uid, userData.experience + 5);
                            increment();
                        } else {
                            alert('Incorrect, try again.');
                        }
                    }}
                >
                    <Text style={{color: 'white'}}>Check</Text>
                </TouchableOpacity>
                <TouchableOpacity  style = {{width: 200, height: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#415D43'}}
                    onPress={() => {
                        navigation.navigate('HomePage');
                    }}
                    >
                    <Text style={{color: 'white'}}>Create more flash cards</Text>
                </TouchableOpacity>
            </SafeAreaView>

            
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20,
        alignItems: "center" , 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    card: {
        width: 200,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8c471",
        borderRadius: 10,
        elevation: 5,
        marginVertical: 10,
    },
    input:{
        width: 200,
        height: 50,
        backgroundColor: '#f8c471',
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    text: { fontSize: 20, fontWeight: "bold" },
    disabledButton: {
        backgroundColor: 'grey'
    }
})

