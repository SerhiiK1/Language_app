import React from 'react';
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
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
            <Stack.Screen name="AccountPage" component={AccountPage}/>
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

const HomePage = ({ navigation, route }) => {
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
                }}
                onPress={() => {
                    navigation.navigate('AccountPage');
                }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold'}}>Account</Text>
            </TouchableOpacity>

            <Text style={{color: 'black', fontSize: 20, textAlign: 'center', justifyContent: 'center'}}>No flash cards here yet :(</Text>
        </View>
    );
};

const AccountPage = ({navigation}) => {
    return(
        <View>
            <Text>Account info</Text>          
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
