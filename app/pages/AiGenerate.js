import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCPWZ7-swlnXJjsDDyJAzlfgtpAAOglc2o');
const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});

export function AskAi({navigation}){
    const [input, setInput] = React.useState('')
    const [result, setResult] = React.useState('')

    const handleGenerate = async () =>{
        const temp = await model.generateContent(input)
        setResult(temp.response.text())
    }
    return (
        <View>
            <View>
                <TextInput
                    placeholder='Ask AI something'
                    onChangeText = {setInput}
                    style = {{width:200, height: 50}}
                />
                <Button
                    onPress={() => {
                        try {
                            handleGenerate()
                        }
                        catch(error) {
                            console.log('There was an error getting a response')
                        }
                    }}
                />
            </View>
            <View>
                <Text>{result}</Text>
            </View>
        </View>
    )
}
