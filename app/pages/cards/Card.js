import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

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

export function CardSet ({navigation}) {
    const card = [
        {front: 'hello', back: 'hola'},
        {front: 'bye', back: 'adios'},
        {front: 'thank you', back: 'gracias'},
        {front: 'beach', back: 'puta'},
    ]

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
        <View style = {styles.container}>
            <TouchableOpacity style = {[styles.card, backDisable && styles.disabledButton]} 
                disabled = {backDisable} 
                onPress={decrement}>
                <Text>back</Text>
            </TouchableOpacity>
            <Card front = {card[index].front} back = {card[index].back} />
            <TouchableOpacity style = {[styles.card, frontDisable && styles.disabledButton]} 
                disabled = {frontDisable} 
                onPress={increment}>
                <Text>next</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: "center" , flexDirection: 'row', justifyContent: 'space-between'},
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

