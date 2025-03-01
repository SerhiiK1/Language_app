import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {signIn} from './functions/SignIn';

export function callSignIn({navigation}){
    const [user, setUser]  = React.useState('');
    const [pw, setPw]  = React.useState('');
    const [valid, setValid] = React.useState(true)
    const [errorMsg, setErrorMsg] = React.useState('')
    return (
        <View>
            <View>
                <Text style = {styles.title}>Sign In</Text>
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
                    title = 'Sign In'
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
            </View>
            <View>
            <Text 
                style = {styles.clickableText}
                onPress= {() => {
                    navigation.navigate('SignUpPage')
                }}
            >
                Create an account
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

