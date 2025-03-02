import React from 'react';
import {View, Text, TextInput, Button, ScrollView} from 'react-native';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, } from '@google/generative-ai';

// Accessing the gemini ai model
const genAI = new GoogleGenerativeAI('AIzaSyCPWZ7-swlnXJjsDDyJAzlfgtpAAOglc2o');
const model = genAI.getGenerativeModel({model: 'gemini-2.0-pro-exp-02-05'});

// Model AI settings
const generationConfig = {
    temperature: 0.7,                   // Controls how creative a response is (higher -> more creative)
    topP: 0.75,                         // Controls how many different outputs it will choose from (0 - 1) (lower -> more focused output)
    topK: 15,                           // Controls how many tokens there are (# = k), 
    maxOutputTokens: 300,               // Controls how many words is a response (a token is a word or a substring)
    responseMimeType: "text/plain",
};


export function AskAi({navigation}){
    const [input, setInput] = React.useState('')
    const [result, setResult] = React.useState('')

    // Get a response from gemini
    async function run() {
        const chatSession = model.startChat({
            generationConfig,
            history: [
            ],
        });
        const response = await chatSession.sendMessage(input);
        setResult(response.response.text())
    }
      
    return (
        <ScrollView>
            <View>
                <TextInput
                    placeholder='Ask AI something'
                    onChangeText = {setInput}
                    style = {{width:200, height: 50}}
                />
                <Button
                    onPress={() => {
                        try {
                            run()
                        }
                        catch(error) {
                            console.log('There was an error getting a response', error.message)
                        }
                    }}
                />
            </View>
            <View>
                <Text>{result}</Text>
            </View>
        </ScrollView>
    )
}
