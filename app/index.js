import React from 'react';
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {callSignUp} from './pages/SignUpPage';
import {callSignIn} from './pages/SignInPage';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        
          <Stack.Navigator>
            <Stack.Screen name="SignUpPage" component={SignUpPage} />
            <Stack.Screen name="SignInPage" component={SignInPage} />
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="AccountPage" component={AccountPage}/>
            <Stack.Screen name="Leaderboard" component={Leaderboard}/>
          </Stack.Navigator>
        
    );
};

const SignUpPage = ({navigation}) => {return(callSignUp({navigation}))}

const SignInPage = ({navigation}) => {return(callSignIn({navigation}))}

const HomePage = ({navigation}) => {
    return (
        <View>
            <Text style={{color: 'green', fontSize: 30, fontWeight: 'bold'}} >Experience: </Text>
            <TouchableOpacity
                style={{
                    width: 60,
                    height: 60,
                    backgroundColor: 'blue',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 20, 
                    alignSelf: 'flex-end',
                    borderRadius: 10,
                }}
                onPress={() => {
                    navigation.navigate('AccountPage');
                }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold'}}>Account</Text>
            </TouchableOpacity>

            <Text style={{color: 'black', fontSize: 20, textAlign: 'center', justifyContent: 'center'}}>No flash cards here yet :(</Text>

            <View style={{flexDirection: 'row', padding: 10}}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    navigation.navigate('HomePage');
                }}>     
                <Text style={{fontSize: 10, color: 'black'}}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Leaderboard');
                }}>
                <Text style={{fontSize: 10, color: 'black'}}>Leaderboard</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    navigation.navigate('HomePage');
                }}>
                <Text style={{fontSize: 10, color: 'black'}}>Add more flash cards</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

const AccountPage = ({navigation}) => {
    return(
        <View>
            <Text>Account info</Text>  


            <View style={{flexDirection: 'row', padding: 10}}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    navigation.navigate('HomePage');
                }}>     
                <Text style={{fontSize: 10, color: 'black'}}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Leaderboard');
                }}>
                <Text style={{fontSize: 10, color: 'black'}}>Leaderboard</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    navigation.navigate('HomePage');
                }}>
                <Text style={{fontSize: 10, color: 'black'}}>Add more flash cards</Text>
            </TouchableOpacity>
            </View>          
        </View>
    );
};

const Leaderboard = ({navigation}) => {
    return(
        <View>
            <Text>Leaderboard</Text> 

            <View style={{flexDirection: 'row', padding: 10}}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    navigation.navigate('HomePage');
                }}>     
                <Text style={{fontSize: 10, color: 'black'}}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Leaderboard');
                }}>
                <Text style={{fontSize: 10, color: 'black'}}>Leaderboard</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    navigation.navigate('HomePage');
                }}>
                <Text style={{fontSize: 10, color: 'black'}}>Add more flash cards</Text>
            </TouchableOpacity>
            </View>         
        </View>
    );
};

const styles = StyleSheet.create({
    input_view: {
        marginTop: 10,
        alignSelf: 'center',
        width: '30%'
    },
    input: {
        height: 40,
        backgroundColor: 'grey',
        margin: 10,
        padding: 10
        
    },
    error_msg: {
        color: 'red',
        fontSize: 15,
        marginBottom: 12,
        textAlign: 'center'
    },
    clickableText: {
        color: 'grey',
        margin: 10,
        fontSize: 15,
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    title: {
        fontSize: 40,
        textAlign: 'center'
    },
    button_view: {
        width: '20%',
        alignSelf: 'center'
    },
    app_view: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around'
    }
});

export default App;
