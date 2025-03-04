import React from 'react';
import {TouchableOpacity, Text, StyleSheet } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {getItem} from '../../utils/AsyncStorage'
import CreateCardSet from './CreateCardSet';

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

export function CardSet({navigation, name}) {
   // const [CreateCardVisible, setCreateCardVisible] = React.useState(false) can be changed if needed
    const [card, setCard] = React.useState([])
    React.useEffect(() => {
        getItem(name).then((cards) => {
            cards.map((card) => {
                setCard([...cards, {front: card.front, back: card.back}])
            })
        })
    }, [])

    const [index, setIndex] = React.useState(0)

    const [frontDisable, setFrontDisable] = React.useState(false)
    const [backDisable, setBackDisable] = React.useState(true)

    const increment = () => {
        if (index < card.length - 1){
            setBackDisable(false)
            if (index == card.length - 2) {
                setFrontDisable(true)
            }
            setIndex(index + 1)
        }
    }

    const decrement = () => {
        if (index > 0){
            setFrontDisable(false)
            if (index == 1) {
                setBackDisable(true)
            }
            setIndex(index - 1)
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
                <TouchableOpacity  style = {{width: 200, height: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#415D43'}}
                    onPress={() => {
                        //setCreateCardVisible(true); for now it does not work
                        navigation.navigate('HomePage');
                    }}
                    >
                    <Text style={{color: 'white'}}>Create more flash cards</Text>
                </TouchableOpacity>
                {/**
                <CreateCardSet navigation={navigation} 
                    visible={CreateCardVisible} 
                    setVisible={setCreateCardVisible}
                />
                Will be changed later*/}
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
    text: { fontSize: 20, fontWeight: "bold" },
    disabledButton: {
        backgroundColor: 'grey'
    }
})

