import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {signIn} from './functions/SignIn';

export function callSignIn({navigation}){
    const [user, setUser]  = React.useState('');
    const [pw, setPw]  = React.useState('');
    const [valid, setValid] = React.useState(true)
    const [errorMsg, setErrorMsg] = React.useState('')
    return (
        <SafeAreaProvider>
            <SafeAreaView style = {styles.app_view}>
                <View>
                    <Text style = {styles.title}>Sign In</Text>
                </View>
                <View style = {styles.input_view}>
                    <TextInput
                        style = {styles.input}
                        color = '#A1CCA5'
                        onChangeText={setUser}
                        placeholder='Email'
                    />
                    <TextInput
                        style = {styles.input}
                        color = '#A1CCA5'
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
                        color = '#A1CCA5'
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
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    input_view: {
        marginTop: 10,
        alignSelf: 'center',
        width: '70%'
    },
    input: {
        height: 40,
        backgroundColor: '#2c462e',
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
        textAlign: 'center',
        color: '#9ee5aa'
    },
    button_view: {
        backgroundColor: '#415D43',
        width: '45%',
        alignSelf: 'center',
    },
    app_view: {
        backgroundColor: '#111D13',
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center'
    }
});

