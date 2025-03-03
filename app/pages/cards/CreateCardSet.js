import React, { useState } from 'react';
import {View, ScrollView, Text, TextInput, Modal, Pressable, StyleSheet, Dimensions} from 'react-native'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NewCard = () => {
    
    const [front, setFront] = useState('')
    const [back, setBack] = useState('')

    return(
        <View style = {styles.newCardStyle}>
            <TextInput placeholder='Front' 
                style={styles.textInputStyle}
                onChangeText={setFront}/>


            <TextInput placeholder='Back' 
                style={styles.textInputStyle}
                onChangeText={setBack}/>

            <Pressable style={styles.deleteStyle}
                onPress={() => {DeleteCard}}>
                <Text>Delete</Text>
            </Pressable>
        </View>
    )
}

const DeleteCard = () => {
    const [cardSet, setCardSet] = useState([])
    const [hoveredButton, setHoveredButton] = useState(null);

    return(
        <SafeAreaProvider>
            <SafeAreaView>
                <Modal
                    animationType='none'
                    transparent= {false}
                    visible = {visible}
                    onRequestClose={() => {
                        setVisible(!visible)
                    }}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalView2}>
                                <View style={styles.modalContent}>
                                    <Text style={{fontSize: 10, color: 'red'}}>Are you sure you want delete the set?</Text>
                                </View>
                                <View style = {styles.modalBottom}>
                                    <Pressable 
                                        onPress={() => {setVisible(!visible)}}
                                        onMouseEnter={() => setHoveredButton('Cancel')}
                                        onMouseLeave={() => setHoveredButton(null)}
                                        style = {styles.modalContentBottom}>
                                            <Text style={hoveredButton === 'Cancel' 
                                                ? styles.hoveredText : null}>Cancel</Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => {
                                            setVisible(!visible)
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
    const [hoveredButton, setHoveredButton] = useState(null);
    const [cardSet, setCardSet] = useState([])
    const [id, setId] = useState(0)
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
                                    {cardSet}
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
                                    onPress={() => { 
                                        setCardSet([...cardSet, <NewCard />])


                                    }}
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
        borderRadius: 20
        
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

