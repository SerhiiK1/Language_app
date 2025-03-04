import React, { useState } from 'react';
import {View, ScrollView, Text, TextInput, Modal, Pressable, StyleSheet, Dimensions} from 'react-native'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NewCard = ({ front, back, visible, setVisible, setFront, setBack}) => {

    const [deleteVisible, setDeleteVisible] = useState(false)

    return(
        visible &&
        (<View style = {styles.newCardStyle}>
            <TextInput placeholder='Front' 
                style={styles.textInputStyle}
                onChangeText={setFront}
                value={front}/>


            <TextInput placeholder='Back' 
                style={styles.textInputStyle}
                onChangeText={setBack}
                value={back}/>
                

            <Pressable style={styles.deleteStyle}
                onPress={() => {
                    setDeleteVisible(true);
                }}>
                <Text>Delete</Text>
            </Pressable>
            <DeleteCardModal deleteVisible={deleteVisible} setDeleteVisible={setDeleteVisible} setVisible={setVisible}/>
        </View>)
    )
}

const DeleteCardModal = ({ deleteVisible, setDeleteVisible, setVisible}) => {
    const [hoveredButton, setHoveredButton] = useState(null);

    return(
        <SafeAreaProvider>
            <SafeAreaView>
                <Modal
                    animationType='none'
                    transparent= {true}
                    visible = {deleteVisible}
                    onRequestClose={() => {
                        setDeleteVisible(!deleteVisible)
                    }}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalView2}>
                                <View style={styles.modalContent}>
                                    <Text style={{fontSize: 20, color: 'red'}}>Are you sure you want delete the card?</Text>
                                </View>
                                <View style = {styles.modalBottom}>
                                    <Pressable 
                                        onPress={() => {setDeleteVisible(false)}}
                                        onMouseEnter={() => setHoveredButton('Cancel')}
                                        onMouseLeave={() => setHoveredButton(null)}
                                        style = {styles.modalContentBottom}>
                                            <Text style={hoveredButton === 'Cancel' 
                                                ? styles.hoveredText : null}>Cancel</Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => {
                                            setDeleteVisible(false)
                                            setVisible(false)
                                            

                                        }}
                                        onMouseEnter={() => setHoveredButton('Delete')}
                                        onMouseLeave={() => setHoveredButton(null)}
                                        style = {styles.modalContentBottom}>
                                            <Text style={hoveredButton === 'Delete' 
                                                ? styles.hoveredText : null}>Delete</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const CreateCardSet = ({navigation, visible, setVisible}) => {
    const [cardSet, setCardSet] = useState([])
    const [hoveredButton, setHoveredButton] = useState(null);
    const [id, setId] = useState(0)

    const addCard = () => {
        setCardSet([...cardSet, {id: id, front: '', back: '', visible: true}])
        setId(id + 1)
    }

    const setCardVisibility = (id, visibility) => {
        setCardSet(cardSet.map((card) => (card.id === id? {...card, visible: visibility} : card)))
    }

    const setCardFront = (id, front) => {
        setCardSet(cardSet.map((card) => (card.id === id? {...card, front: front} : card)))
    }

    const setCardBack = (id, back) => {
        setCardSet(cardSet.map((card) => (card.id === id? {...card, back: back} : card)))
    }

    return(
        <SafeAreaProvider>
            <SafeAreaView>
                <Modal
                    animationType='none'
                    transparent = {true}
                    visible = {visible}
                    onRequestClose={() => {
                        setVisible(!visible)
                    }}
                >
                    <View style = {styles.modalContainer}>
                        <View style = {styles.modalView}>
                            <ScrollView>
                                <View style = {styles.modalContent}>
                                    <Text>Enter the name of the card set</Text>
                                    {cardSet.map((card) => {return(
                                        <NewCard 
                                            key = {card.id}
                                            front = {card.front}
                                            back = {card.back}
                                            visible = {card.visible}
                                            setVisible = {visibility => setCardVisibility(card.id, visibility)}
                                            setFront = {front => setCardFront(card.id, front)}
                                            setBack = {back => setCardBack(card.id, back)}
                                        />)})
                                    }
                                </View>
                            </ScrollView>
                            <View style = {styles.modalBottom}>
                                <Pressable 
                                    onPress={() => {setVisible(!visible)}}
                                    onMouseEnter={() => setHoveredButton('close')}
                                    onMouseLeave={() => setHoveredButton(null)}
                                    style = {styles.modalContentBottom}>
                                        <Text style={hoveredButton === 'close' 
                                            ? styles.hoveredText : null}>Close</Text>
                                </Pressable>
                                <Pressable 
                                    onPress={() => {addCard()}}
                                    onMouseEnter={() => setHoveredButton('add')}
                                    onMouseLeave={() => setHoveredButton(null)}
                                    style = {styles.modalContentBottom}>
                                        <Text style={hoveredButton === 'add' 
                                            ? styles.hoveredText : null}>+</Text>
                                </Pressable>
                                <Pressable 
                                    onPress={() => { 
                                        navigation.navigate('CardSet')
                                        setVisible(!visible)
                                    }}
                                    onMouseEnter={() => setHoveredButton('create')}
                                    onMouseLeave={() => setHoveredButton(null)}
                                    style = {styles.modalContentBottom}>
                                        <Text style={hoveredButton === 'create' 
                                            ? styles.hoveredText : null}>Create</Text>
                                </Pressable>

                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    modalView:{
        alignItems: 'center',
        height: windowHeight * 0.6,
        width: windowWidth * 0.8,
        padding: 30,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowRadius: 1000,
        shadowOpacity: 1,
        elevation: 5,
        borderRadius: 20,
    },
    modalContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBottom:{
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalContentBottom:{
        justifyContent: 'center', 
        flex: 1, 
        alignItems: 'center', 
    },
    hoveredText: {
        textDecorationLine: 'underline',
    },
    newCardStyle:{
        height: 100,
        width: windowWidth * 0.7,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'grey',
        borderRadius: 3,
        margin: 5,
    },
    textInputStyle: {
        width: '90%', // Make the text input take the full width
        margin: 10, // Add some space between the inputs
        padding: 10, // Add padding inside the input
        backgroundColor: 'grey', // Set background color to white
        borderRadius: 5, // Add border radius for better appearance
    },
    deleteStyle: {
        backgroundColor: 'red',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width:60
    },
    modalView2:{
        alignItems: 'center',
        height: windowHeight * 0.4,
        width: windowWidth * 0.6,
        padding: 30,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowRadius: 800,
        shadowOpacity: 1,
        elevation: 5,
        borderRadius: 20   
    },
});

export default CreateCardSet

