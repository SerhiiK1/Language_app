import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {signUp} from './functions/SignUp';

export function callSignUp({navigation}){
    const [user, setUser]  = React.useState('');
    const [pw, setPw]  = React.useState('');
    const [valid, setValid] = React.useState(true)
    const [errorMsg, setErrorMsg] = React.useState('')
    return (
        <View>
            <View>
                <Text style = {styles.title}>Sign Up</Text>
            </View>
            <View style = {styles.input_view}>
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
            </View>
            <View style = {styles.button_view}>
                <Button
                    title = 'Create Account'
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
                />
            </View>
            <View>
            <Text 
                style = {styles.clickableText}
                onResponderGrant={() => {
                    setTextStyle('underline')
                    console.log(textStyle)
                }}
                onPress= {() => {
                    navigation.navigate('SignInPage')
                }}
            >
                Back To Log In
            </Text>
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
    }
});

