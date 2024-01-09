/**
 * React Native components and utilities import
 */
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Dimensions,
  Animated,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

// Import custom components
import CameraComponent from '../Displays/CameraComponent';
import AnswerField from '../Inputs/AnswerField';
import GuessCounter from '../Displays/GuessCounter';
import IconButton from '../Buttons/IconButton';
import HintText from '../Displays/HintText';
import ToastMessage from '../Displays/ToastMessage';
import Modal from '../Displays/Modal';

/**
 * Google Vision API key and endpoint URL
 */
const API_KEY = 'AIzaSyDaoNemYFLYR_uJ17SXmoZGbGkwmOmXlyw';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

/**
 * Function to call Google Vision API asynchronously
 * @param {string} image - Base64 encoded image
 * @returns {Promise<Array>} - Array of recognized objects
 */
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
      const objects = result.responses[0].localizedObjectAnnotations.map(
        (annotation) => annotation.name
      );
      return objects;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error calling Google Vision API:', error.message);
    return [];
  }
}

/**
 * Main component for Vision Tester
 * @returns {JSX.Element} - React component
 */
const VisionTester = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [guess, setGuess] = useState('');
  const [remainingGuesses, setRemainingGuesses] = useState(3);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const [cameraKey, setCameraKey] = useState(0);
  const [modalMessage, setModalMessage] = useState('');
  const [modalHeader, setModalHeader] = useState('');


  const modalRef = useRef(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.openAnimation();
    }
  };

  const closeModal = () => {
      if (modalRef.current) {
        modalRef.current.closeAnimation();
        setModalVisible(false);
      }

      

  };

  const onModalHide = () => {
    closeModal();
    setModalVisible(false);
  };

  const resetGame = () => {
    setSelectedItem(null);
    setGuess('');
    setRemainingGuesses(3);
    setShowToast(false);
    setToastMessage('');
    onModalHide();
    setCameraKey(prevKey => prevKey + 1); // Increment the key
  };

  /**
   * Effect hook to handle keyboard appearance and disappearance
   */
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  /**
   * Handles the action after taking a picture
   * @param {string} base64 - Base64 encoded image
   * @returns {void}
   */
  const handlePictureTaken = async (base64) => {
    try {
      const labels = await callGoogleVisionAsync(base64);

      if (labels && labels.length > 0) {
        const randomIndex = Math.floor(Math.random() * labels.length);
        const selectedItem = labels[randomIndex];
        console.log('Line 66 Selected item:', selectedItem);

        setSelectedItem(selectedItem);
      } else {
        console.log('No items found in the response.');
      }
    } catch (error) {
      console.error('Error calling Google Vision API:', error.message);
    }
  };

  /**
   * Handles the user's guess
   * @returns {void}
   */
  const handleGuess = () => {
    if (selectedItem !== null) {
      const isCorrectGuess = guess.toLowerCase() === selectedItem.toLowerCase();

      if(isCorrectGuess){
        setModalHeader('Correct!');
        setModalMessage('Well done! You guessed correctly do you want to play again?');
        setModalVisible(true);
        openModal();
      } else {
        setRemainingGuesses((prevGuesses) => prevGuesses - 1);
        if (remainingGuesses === 1) {
          setModalHeader('Nice Try!');
          setModalMessage(`Unlucky it was actually ${selectedItem}. Do you want to play again?`);
          setModalVisible(true);
          openModal();
        } else {
          setToastMessage('Incorrect guess. Try again.');
          setShowToast(true);
        }
      }
      
    } else {
      console.log('No item selected yet.');
    }

    setGuess('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.content, { paddingBottom: keyboardHeight, position: 'relative' }]}>
        
          <ToastMessage
            message={toastMessage}
            visible={showToast}
            opacityValue={opacity}
            onHide={() => {
              setShowToast(false);
              setToastMessage('');
            }}
          />
          <HintText selectedItem={selectedItem} />
          <View style={styles.answerField}>
            <AnswerField
              onChangeText={(text) => setGuess(text)}
              value={guess}
              selectedItem={selectedItem}
              isEnabled={selectedItem != null}
              opacity={selectedItem ? 1 : 0.5}
            />
            <View style={{ opacity: selectedItem ? 1 : 0.5 }}>
            <IconButton
              onTouch={handleGuess}
              iconName="ios-checkbox"
              color="#FF6347"
              iconSize={55}
            />
            </View>
          </View>
          <CameraComponent key={cameraKey} onPictureTaken={handlePictureTaken} />
        </View>
        <View style={styles.footer}>
          <View style={{opacity: selectedItem ? 1 : 0.5}}>
          <GuessCounter chancesLeft={remainingGuesses} />
          </View>
        </View>
        <View style={styles.modalContainer}>
            <Modal
             ref={modalRef}
             visible={modalVisible}
             header={modalHeader}
             button1={resetGame}
             message={modalMessage}
            />
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
    paddingHorizontal: 20, // Padding to maintain space around the elements
  },
  answerField: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,    
  },

  modalContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems:'center',
    justifyContent:'center',
  }
});


export default VisionTester;
