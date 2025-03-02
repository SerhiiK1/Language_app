import React from 'react';
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {callSignUp} from './pages/SignUpPage';
import {callSignIn} from './pages/SignInPage';
import {callHome} from './pages/HomePage';
import {callLeaderboard} from './pages/LeaderboardPage';
import {callAccount} from './pages/AccountPage';
import {AskAi} from './pages/functions/AiGenerate';
import {CardSet} from './pages/cards/Card'

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        
          <Stack.Navigator>
            <Stack.Screen name="SignUpPage" component={SignUpPage} />
            <Stack.Screen name="SignInPage" component={SignInPage} />
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="AccountPage" component={AccountPage}/>
            <Stack.Screen name="Leaderboard" component={Leaderboard}/>
            <Stack.Screen name="AskAiPage" component={AskAiPage} />
            <Stack.Screen name="CardSet" component={CardSetTrial} />
          </Stack.Navigator>
        
    );
};

const CardSetTrial = ({navigation}) => {return(CardSet({navigation}))}

const AskAiPage = ({navigation}) => {return(AskAi({navigation}))}

const SignUpPage = ({navigation}) => {return(callSignUp({navigation}))}

const SignInPage = ({navigation}) => {return(callSignIn({navigation}))}

const HomePage = ({navigation}) => {return(callHome({navigation}))}

const AccountPage = ({navigation}) => {return(callAccount({navigation}))}
    
const Leaderboard = ({navigation}) => {return(callLeaderboard({navigation}))}

export default App;
