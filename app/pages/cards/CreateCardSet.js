import React from 'react'
import {View, Text, TouchableOpacity, Modal, Pressable, StyleSheet, Dimensions} from 'react-native'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context'
import {CardSet} from './Card'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CreateCardSet = ({navigation, visible, setVisible}) => {
    
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
                            <View style = {styles.modalContent}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('CardSet')
                                        setVisible(!visible)
                                    }}
                                >
                                    <Text>Create</Text>
                                </TouchableOpacity>
                            </View>
                            <Pressable 
                                onPress={() => {setVisible(!visible)}}
                                style = {styles.modalClose}>
                                    <Text>Close</Text>
                            </Pressable>
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
    modalClose:{
        marginBottom: 10
    }
});

export default CreateCardSet

