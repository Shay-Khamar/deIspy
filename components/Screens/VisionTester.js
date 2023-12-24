import { View, Text, Button, Image, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import CameraComponent from '../CameraComponent';
import { takePictureAsync } from '../CameraComponent';
import CameraButton from '../Buttons/CameraButton';
import AnswerField from '../AnswerField';
import GuessCounter from '../Displays/GuessCounter';
import IconButton from '../Buttons/IconButton';
import { FontAwesome } from '@expo/vector-icons';

const API_KEY = 'AIzaSyDaoNemYFLYR_uJ17SXmoZGbGkwmOmXlyw';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
async function callGoogleVisionAsync(image) {
    const body = {
        requests: [
            {
                image: {
                    content: image,
                },
                features: [
                    {
                        type: 'OBJECT_LOCALIZATION',
                        maxResults: 5,
                    },
                ],
            },
        ],
    };

    try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
  
        const result = await response.json();
        console.log('callGoogleVisionAsync -> results', result);
  
        if (result.responses && result.responses.length > 0) {
          const objects = result.responses[0].localizedObjectAnnotations.map((annotation) => annotation.name);
          return objects;
        } else {
          return [];
        }
      } catch (error) {
        console.error('Error calling Google Vision API:', error.message);
        return [];
      }
};

const VisionTester = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [guess, setGuess] = useState('')
    const [remainingGuesses, setRemainingGuesses] = useState(3);
    
  
    const handlePictureTaken = async (base64) => {
      try {
          const labels = await callGoogleVisionAsync(base64);
  
          if (labels && labels.length > 0) {
              const randomIndex = Math.floor(Math.random() * labels.length);
              const selectedItem = labels[randomIndex];
              console.log('Line 66 Selected item:', selectedItem);
  
              setSelectedItem(selectedItem);
              if (selectedItem !== null) {
                
                  if (guess.toLowerCase() === selectedItem.toLowerCase()) {
                      console.log('You are Correct!');
                  } else {
                      console.log('Incorrect. Try again.');
                      setRemainingGuesses(prevGuesses => prevGuesses - 1);
                  }
          
              setGuess('');
              } else {
                  console.log('No item selected yet.');
              }
          } else {
              console.log('No items found in the response.');
          }
      } catch (error) {
          console.error('Error calling Google Vision API:', error.message);
      }
  };

  const handleGuess = () => {
    if (selectedItem != null) {
        if (guess.toLowerCase() === selectedItem.toLowerCase()) {
            console.log('You are Correct!');
        } else {
            console.log('Incorrect. Try again.');
            setRemainingGuesses(prevGuesses => prevGuesses - 1);
        }
    } else {
        console.log('No item selected yet.'); // Handle the case where no item is selected
    }

    setGuess('');
};


  
  
  
  return (
    <View style={styles.container}>

      <View style={styles.answerField}>
        <AnswerField
       placeholder="enter your guess here"
        onChangeText={text => setGuess(text)}
        value={guess}
      />
        </View>
      <View style={styles.camera}>
      <CameraComponent onPictureTaken={handlePictureTaken}/>
      </View>
      <View style={styles.counterView}>
      <GuessCounter chancesLeft={remainingGuesses}/>
      </View>
      <View styles={styles.guessButton}>
      <CameraButton onTouch={handleGuess} text="Guess" color="#000" textColor="#fff"/>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    text:{
      alignSelf: 'center',
      margin: 10,
    },

    camera:{
      justifyContent: 'center',
      alignItems: 'center',

    },

    answerField:{
      position:  'absolute',
      top: 0,
      alignItems: 'center',
      paddingTop: '10%',
      //width: '100%',

    },

    counterView:{
      paddingBottom: '2%',
      position: 'absolute',
      bottom: 0,
      right: 0,
      padding: 3,
      
    },

    guessButton:{
      paddingBottom: '2%',
      position: 'absolute',
      bottom: 0,
      left: 0,
      padding: 3,
    }
  

  });
  

export default VisionTester;
