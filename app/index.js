import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {signUp} from './SignUp';
import {signIn} from './SignIn';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        
          <Stack.Navigator>
            <Stack.Screen name="SignUpPage" component={SignUpPage} />
            <Stack.Screen name="SignInPage" component={SignInPage} />
            <Stack.Screen name="HomePage" component={HomePage} />
          </Stack.Navigator>
        
    );
};

const SignUpPage = ({navigation}) => {
    const [user, setUser]  = React.useState('');
    const [pw, setPw]  = React.useState('');
    const [valid, setValid] = React.useState(true)
    const [errorMsg, setErrorMsg] = React.useState('')
    return (
        <View>
            <Text>Sign Up</Text>
            <TextInput
                style = {styles.input}
                onChangeText={setUser}
                placeholder='Email'
            />
            <TextInput
                style = {styles.input}
                onChangeText={setPw}
                placeholder='Password'
            />
            <Text
                visibility = {valid}
                style = {styles.error_msg}
            >
                {errorMsg}
            </Text>
            <Button
                onPress={() => {
                    signUp(user, pw)
                    .then((error) => {
                        if (!error) {
                            setValid(true)
                            navigation.navigate('HomePage')
                        } else {
                            if (user.length === 0 || !(user.includes('@'))) {
                                setErrorMsg('Invalid email')
                            }
                            else if (pw.length < 8){
                                setErrorMsg('Password must be 8 characters long')
                            }
                            else {
                                setErrorMsg('Email already in use or wrong email')
                            }
                            setValid(false)
                        }
                    })
                }} 
                title = 'Create Account'
                style = {{height: 40, margin: 10, padding: 10}}
            />
            <Text 
                style = {styles.clickable_text}
                onPress= {() => {
                    navigation.navigate('SignInPage')
                }}
            >
                Back To Log In
            </Text>
        </View>
    );
};

const SignInPage = ({navigation, route}) => {
    const [user, setUser]  = React.useState('');
    const [pw, setPw]  = React.useState('');
    const [valid, setValid] = React.useState(true)
    const [errorMsg, setErrorMsg] = React.useState('')
    return (
        <View>
            <Text>Sign In</Text>
            <TextInput
                style = {styles.input}
                onChangeText={setUser}
                placeholder='Email'
            />
            <TextInput
                style = {styles.input}
                onChangeText={setPw}
                placeholder='Password'
            />
            <Text
                visibility = {valid}
                style = {styles.error_msg}
            >
                {errorMsg}
            </Text>
            <Button
                title = 'Sign In'
                style = {{height: 40, margin: 10, padding: 10}}
                onPress={() => {
                    signIn(user, pw)
                    .then((error) => {
                        if (!error) {
                            setValid(true)
                            navigation.navigate('HomePage')
                        } else {
                            setErrorMsg('Wrong email or Password')
                            setValid(false)
                        }
                    })
                }} 
            />
            <Text 
                style = {styles.clickable_text}
                onPress= {() => {
                    navigation.navigate('SignUpPage')
                }}
            >
                Create an account
            </Text>
        </View>
    );
};

const HomePage = ({navigation, route}) => {
    return(
        <View>
            <Text>Home</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 5,
        padding: 10
    },
    error_msg: {
        color: 'red',
        fontSize: 15,
        margin: 12
    },
    clickable_text: {
        color: 'grey',
        fontSize: 10,
    }
});

export default App;
