import React from 'react';
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {callSignUp} from './pages/SignUpPage';
import {callSignIn} from './pages/SignInPage';
import {callHome} from './pages/HomePage';
import {callLeaderboard} from './pages/LeaderboardPage';
import {callAccount} from './pages/AccountPage';

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

const HomePage = ({navigation}) => {return(callHome({navigation}))}

const AccountPage = ({navigation}) => {return(callAccount({navigation}))}
    
const Leaderboard = ({navigation}) => {return(callLeaderboard({navigation}))}

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
