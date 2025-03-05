import React, { useState } from 'react';
import {View, ScrollView, Text, TextInput, Modal, Pressable, StyleSheet, Dimensions} from 'react-native'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context'
import {getItem, setItem} from '../../utils/AsyncStorage'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NewCard = ({ front, back, visible, setVisible, setFront, setBack, edit}) => {

    const [deleteVisible, setDeleteVisible] = useState(false)

    return(
        visible &&
        (<View style = {styles.newCardContainer}>
            <View style = {styles.newCardView}>
                <Text>Front</Text>
                <TextInput placeholder='Front' 
                    style={styles.textInputStyle}
                    onChangeText={setFront}
                    value={front}
                    editable = {edit}/>
                
            </View>
            <View style = {styles.newCardView}>
                <Text>Back</Text>


                <TextInput placeholder='Back' 
                    style={styles.textInputStyle}
                    onChangeText={setBack}
                    value={back}
                    editable = {edit}/>
                    

                {edit &&
                    <Pressable style={styles.deleteStyle}
                    onPress={() => {
                        setDeleteVisible(true);
                    }}>
                    <Text>Delete</Text>
                </Pressable>}
            </View>
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
                                <View style = {styles.modalButtonBottom}>
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

const CloseCreateCardModal = ({closeVisible, setCloseVisible, setVisible,visible, setCardSet, setName, setId, setErrorMsg}) => {
    const [hoveredButton, setHoveredButton] = useState(null);

    return(
        <SafeAreaProvider>
            <SafeAreaView>
                <Modal
                    animationType='none'
                    transparent = {true}
                    visible = {closeVisible}
                    onRequestClose={() => {
                        setCloseVisible(!closeVisible)
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView2}>
                            <View style={styles.modalContent}>
                                <Text style={{fontSize: 20, color: 'red'}}>Are you sure you want close?</Text>
                                <Text style={{fontSize: 10}}>All progress will be lost</Text>
                            </View>
                            <View style = {styles.modalButtonBottom}>
                                <Pressable 
                                    onPress={() => {setCloseVisible(false)}}
                                    onMouseEnter={() => setHoveredButton('Cancel')}
                                    onMouseLeave={() => setHoveredButton(null)}
                                    style = {styles.modalContentBottom}>
                                        <Text style={hoveredButton === 'Cancel' 
                                            ? styles.hoveredText : null}>Cancel</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => {
                                        setCloseVisible(false)
                                        setVisible(!visible)
                                        setCardSet([])
                                        setName('')
                                        setId(0)
                                        setErrorMsg('')
                                    }}
                                    onMouseEnter={() => setHoveredButton('Close')}
                                    onMouseLeave={() => setHoveredButton(null)}
                                    style = {styles.modalContentBottom}>
                                        <Text style={hoveredButton === 'Close' 
                                            ? styles.hoveredText : null}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
const CreateCardSet = ({navigation, visible, setVisible, uid, edit, setEdit, editName}) => {
    const [name, setName] = useState(editName); // Initialize name with editName if provided
    const [cardSet, setCardSet] = useState([])
    const [hoveredButton, setHoveredButton] = useState(null);
    const [id, setId] = useState(0)
    const [letSave, setLetSave] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')
    const [closeVisible, setCloseVisible] = useState(false)

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

    async function saveCardSet () {
        let errorMessage = '';
        let canSave = true;
        const outCard = {name: name, cards: []};
        if (name === '') {
            canSave = false;
            errorMessage = 'Name of set must be filled'
        }
        else {
            cardSet.forEach((card) => {
                if (card.visible){
                    if (card.front !== '' && card.back !== '') {
                    
                        outCard.cards.push({front: card.front, back: card.back});
                    
                    } else {
                        canSave = false;
                        errorMessage = 'Cards must be filled';
                    }
                }
            });
        }

        try {
            const existingData = await getItem(uid);
            const newData = [];
            if (existingData) {
                existingData.forEach((data) => {
                    if (data.name !== name) {
                        newData.push(data);
                    }
                    else {
                        canSave = false;
                        setErrorMsg('Name already exists');
                    }
                });
            }
            setLetSave(canSave);

            if (canSave) {
                newData.push(outCard);
                await setItem(uid, newData);
                navigation.navigate('CardSet', { uid , name});
                setVisible(!visible);
            }
        } catch (e) {
            console.log('Error saving ' + e);
        }
    }

    React.useEffect(() => {
        if (!edit) {
            setName(editName)
            getItem(uid).then((cardSets) => {
                if (cardSets) {
                    let localId = 0;
                    const updatedCardSet = cardSets.flatMap((cardSetInfo) => {
                        if (cardSetInfo.name === editName) {
                            return cardSetInfo.cards.map(cardInfo => (
                                {id: localId++, front: cardInfo.front, back: cardInfo.back, visible: true}
                            ));
                        }
                        return [];
                    });
                    setCardSet(updatedCardSet);
                    setId(localId);
                }
            });
        }
    }, [visible]);

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
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
                                <View style = {styles.modalTitle}>
                                    {!edit &&
                                    <Text>{`Name: ${editName}`}</Text>}
                                    
                                    {edit && <TextInput placeholder='Name'
                                        style={styles.textInputStyle}
                                        onChangeText={setName}
                                        value={editName}/>}
                                </View>
                                <View style = {styles.modalContent}>
                                    {cardSet.map((card) => {return(
                                        <NewCard 
                                            key = {card.id}
                                            front = {card.front}
                                            back = {card.back}
                                            visible = {card.visible}
                                            setVisible = {visibility => setCardVisibility(card.id, visibility)}
                                            setFront = {front => setCardFront(card.id, front)}
                                            setBack = {back => setCardBack(card.id, back)}
                                            edit = {edit}
                                        />)})
                                    }
                                </View>
                            </ScrollView>
                            <View style = {styles.modalBottom}>
                                <View style = {styles.error_message_view}>
                                    {!letSave &&
                                    <Text style = {styles.error_message}>{errorMsg}</Text>}
                                </View>
                                <View style = {styles.modalButtonBottom}>
                                    <Pressable 
                                        onPress={() => {
                                            if (edit){
                                                setCloseVisible(true)

                                            }
                                            else {
                                                setVisible(!visible)
                                                setCardSet([])
                                                setName('')
                                                setId(0)
                                                setErrorMsg('')
                                            }
                                        }}
                                        onMouseEnter={() => setHoveredButton('close')}
                                        onMouseLeave={() => setHoveredButton(null)}
                                        style = {styles.modalContentBottom}>
                                            <Text style={hoveredButton === 'close' 
                                                ? styles.hoveredText : null}>Close</Text>
                                    </Pressable>
                                    {edit &&
                                        <Pressable 
                                        onPress={() => {addCard()}}
                                        onMouseEnter={() => setHoveredButton('add')}
                                        onMouseLeave={() => setHoveredButton(null)}
                                        style = {styles.modalContentBottom}>
                                            <Text style={hoveredButton === 'add' 
                                                ? styles.hoveredText : null}>+</Text>
                                        </Pressable>}
                                    <Pressable 
                                        onPress={() => {
                                            saveCardSet();
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
                    </View>
                </Modal>
                <CloseCreateCardModal closeVisible={closeVisible} 
                    setCloseVisible={setCloseVisible}
                    setVisible={setVisible}
                    visible={visible} 
                    setCardSet={setCardSet} 
                    setName={setName} 
                    setId={setId} 
                    setErrorMsg={setErrorMsg}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modalView:{
        alignItems: 'center',
        justifyContent: 'center',
        height: windowHeight * 0.7,
        width: windowWidth * 0.8,
        padding: 30,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowRadius: 100,
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
        width: '100%',
    },
    modalBottom:{
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButtonBottom:{
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
    newCardContainer:{
        flex: 1,
        margin: 10,
        flexDirection: 'row',
        width: '100%',
    },
    newCardView: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
        width: '50%',
    },
    textInputStyle: {
        width: windowWidth *0.3 , // Make the text input take the full width
        margin: 10, // Add some space between the inputs
        padding: 10, // Add padding inside the input
        backgroundColor: 'grey', 
        borderRadius: 5, 
    },
    deleteStyle: {
        backgroundColor: 'red',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60
    },
    modalView2:{
        alignItems: 'center',
        justifyContent: 'center',
        height: windowHeight * 0.4,
        width: windowWidth * 0.8,
        padding: 30,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowRadius: 800,
        shadowOpacity: 1,
        elevation: 5,
        borderRadius: 20   
    },
    modalTitle:{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',      
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
        padding: 10,
    },
    error_message:{
        color: 'red',
        fontSize: 15,
    },
    error_message_view:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CreateCardSet

