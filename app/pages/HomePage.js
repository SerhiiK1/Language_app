import React from 'react';
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import CreateCardSet from './cards/CreateCardSet';

export function callHome({navigation}){
    const [CreateCardVisible, setCreateCardVisible] = React.useState(false)
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.app_view}>
                <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', backGroundColor: '#415D43'}} >Experience: </Text>
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
                <Text style={{color: 'white', fontSize: 20, textAlign: 'center', justifyContent: 'center'}}>No flash cards here yet :(</Text>

                <View style={{flexDirection: 'row', padding: 10, justifyContent: 'flex-end'}}>
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
    app_view: {
        backgroundColor: '#111D13',
        flex: 1,
        width: null,
        height: null,
    }
});
