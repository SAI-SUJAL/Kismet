// import React, { useState, useRef } from 'react';
// import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
// import axios from 'axios';
// import * as Clipboard from 'expo-clipboard'; // Using Expo's Clipboard API

// const CraftAIMessage = () => {
//   const [aiResponse, setAiResponse] = useState('');
//   const [userInput, setUserInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const timeoutRef = useRef(null);

//   const getAIResponse = async () => {
//     if (!userInput.trim()) return;
    
//     setIsLoading(true);
    
//     // Set a timeout for the request (20 seconds)
//     const TIMEOUT_DURATION = 20000;
    
//     try {
//       // Create a promise that rejects after the timeout
//       const timeoutPromise = new Promise((_, reject) => {
//         timeoutRef.current = setTimeout(() => {
//           reject(new Error('Request timed out'));
//         }, TIMEOUT_DURATION);
//       });
      
//       // Create the actual request promise
//       const requestPromise = axios.post('http://10.0.2.2:8000/api/craftMessage', {
//         message: userInput,
//       });
      
//       // Race the two promises
//       const response = await Promise.race([requestPromise, timeoutPromise]);
      
//       // Clear the timeout if request succeeds
//       clearTimeout(timeoutRef.current);
      
//       setAiResponse(response.data.response);
//     } catch (error) {
//       clearTimeout(timeoutRef.current);
      
//       if (error.message === 'Request timed out') {
//         setAiResponse('');
//         Alert.alert(
//           'Request Timeout',
//           'The request took too long to complete. Please try again with a simpler prompt.',
//           [
//             {
//               text: 'Try Again',
//               onPress: () => {
//                 setUserInput('');
//                 setIsLoading(false);
//               }
//             }
//           ]
//         );
//       } else {
//         console.error('Error fetching AI response:', error);
//         setAiResponse('Error getting response. Please try again.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const clearInput = () => {
//     setUserInput('');
//     setAiResponse('');
//     clearTimeout(timeoutRef.current);
//   };

//   const copyToClipboard = async () => {
//     if (aiResponse) {
//       try {
//         await Clipboard.setStringAsync(aiResponse);
//         Alert.alert('Success', 'Copied to clipboard!');
//       } catch (error) {
//         console.error('Error copying to clipboard:', error);
//         Alert.alert('Error', 'Failed to copy to clipboard');
//       }
//     }
//   };

//   return (
//     <View style={styles.mainContainer}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
//           <Text style={styles.clearButtonText}>Clear</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           onPress={copyToClipboard} 
//           style={[styles.copyButton, !aiResponse && styles.buttonDisabled]}
//           disabled={!aiResponse}
//         >
//           <Text style={styles.copyButtonText}>Copy</Text>
//         </TouchableOpacity>
//       </View>
      
//       {/* Scrollable Content Area */}
//       <ScrollView 
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollViewContent}
//         keyboardShouldPersistTaps="handled"
//       >
//         {aiResponse ? (
//           <Text style={styles.response}>{aiResponse}</Text>
//         ) : isLoading ? (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#800000" />
//             <Text style={styles.loadingText}>Generating response...</Text>
//           </View>
//         ) : (
//           <Text style={styles.placeholderText}>
//             Use our LLM to craft poems, jokes, and more!
//           </Text>
//         )}
//       </ScrollView>
      
//       {/* Fixed Footer */}
//       <View style={styles.footer}>
//         <TextInput
//           value={userInput}
//           onChangeText={setUserInput}
//           placeholder="Type your prompt here..."
//           style={styles.input}
//           multiline={false}
//           returnKeyType="send"
//           onSubmitEditing={!isLoading && userInput.trim() ? getAIResponse : null}
//         />
//         <TouchableOpacity 
//           onPress={getAIResponse} 
//           style={[styles.button, (!userInput.trim() || isLoading) && styles.buttonDisabled]}
//           disabled={!userInput.trim() || isLoading}
//         >
//           <Text style={styles.buttonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 17,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     backgroundColor: '#fff',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     padding: 20,
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   loadingContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 30,
//   },
//   loadingText: {
//     marginTop: 15,
//     fontSize: 16,
//     color: '#666',
//   },
//   placeholderText: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: '#666',
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   response: {
//     fontSize: 16,
//     lineHeight: 24,
//     color: '#333',
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     minHeight: 100,
//   },
//   footer: {
//     flexDirection: 'row',
//     padding: 15,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//   },
//   input: {
//     flex: 1,
//     height: 45,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 22.5,
//     paddingHorizontal: 15,
//     backgroundColor: '#f5f5f5',
//   },
//   button: {
//     backgroundColor: '#800000',
//     width: 80,
//     borderRadius: 22.5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 10,
//   },
//   buttonDisabled: {
//     backgroundColor: '#ccc',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '600',
//   },
//   clearButton: {
//     backgroundColor: '#eee',
//     padding: 10,
//     borderRadius: 10,
//     flex: 1,
//     marginRight: 10,
//   },
//   clearButtonText: {
//     color: '#333',
//     textAlign: 'center',
//     fontWeight: '500',
//   },
//   copyButton: {
//     backgroundColor: '#800000',
//     padding: 10,
//     borderRadius: 10,
//     flex: 1,
//   },
//   copyButtonText: {
//     color: 'white',
//     textAlign: 'center',
//     fontWeight: '500',
//   },
// });

// export default CraftAIMessage;
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import { useRoute } from '@react-navigation/native';
import { KeyboardAvoidingView,Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
// Replace with your Hugging Face API token (can be created for free at huggingface.co)
const API_KEY_ONE = Constants.expoConfig.extra.EXPO_PUBLIC_API_KEY_ONE;

const MODEL_ID='mistralai/Mistral-7B-Instruct-v0.3'
const CraftAIMessage = () => {
  const [aiResponse, setAiResponse] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);
  const route = useRoute();
  
  // Determine the placeholder text based on the previous screen
  const getPlaceholderText = () => {
    if (route?.params?.previousScreen === 'ChatRoom') {
      return "Need help crafting the perfect reply? Let AI assist you!";
    } else if (route?.params?.previousScreen === 'SendLike') {
      return "Use our LLM to craft impressive messages, poems, jokes, and more—to spark connections and get matched effortlessly.";
    }
    else if(route?.params?.previousScreen === 'Details'){
      return "Enhance your profile with AI!"
    }
    return  "Let AI help you understand them better!"
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getAIResponse = async () => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    
    // Set a timeout for the request (10 seconds - smaller models are faster)
    const TIMEOUT_DURATION = 30000;
    
    try {
      // Create a promise that rejects after the timeout
      const timeoutPromise = new Promise((_, reject) => {
        timeoutRef.current = setTimeout(() => {
          reject(new Error('Request timed out'));
        }, TIMEOUT_DURATION);
      });
      
      // Create the request to Hugging Face Inference API
      const requestPromise = axios.post(
        // `https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3`,
        `https://api-inference.huggingface.co/models/${MODEL_ID}`,
        {
          inputs: userInput,
          parameters: {
            max_length: 100, // Keeping responses shorter for speed
            temperature: 0.7,
            top_p: 0.9,
            do_sample: true,
            
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY_ONE}`,
            'Content-Type': 'application/json',
          }
        }
      );
      
      // Race the two promises
      const response = await Promise.race([requestPromise, timeoutPromise]);
      
      // Clear the timeout if request succeeds
      clearTimeout(timeoutRef.current);
      
      // Extract response (Hugging Face returns different formats depending on the model)
      let result;
      if (Array.isArray(response.data) && response.data[0].generated_text) {
        result = response.data[0].generated_text;
      } else if (typeof response.data === 'string') {
        result = response.data;
      } else if (response.data.generated_text) {
        result = response.data.generated_text;
      } else {
        result = JSON.stringify(response.data);
      }
      
      setAiResponse(result);
    } catch (error) {
      clearTimeout(timeoutRef.current);
      
      if (error.message === 'Request timed out') {
        Alert.alert(
          'Request Timeout',
          'The request took too long to complete. Please try again with a simpler prompt.',
          [
            {
              text: 'Try Again',
              onPress: () => {
                setUserInput('');
                setIsLoading(false);
              }
            }
          ]
        );
      } else {
        console.error('Error fetching AI response:', error);
        
        // Handle Hugging Face specific errors
        if (error.response && error.response.status === 503) {
          setAiResponse('The model is currently loading. Please try again in a few seconds.');
        } else if (error.response && error.response.status === 429) {
          setAiResponse('Rate limit exceeded. Please try again later.');
        } else {
          setAiResponse('Error getting response. Please try again.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearInput = () => {
    setUserInput('');
    setAiResponse('');
    clearTimeout(timeoutRef.current);
  };

  const copyToClipboard = async () => {
    if (aiResponse) {
      try {
        await Clipboard.setStringAsync(aiResponse);
        Alert.alert('Success', 'Copied to clipboard!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        Alert.alert('Error', 'Failed to copy to clipboard');
      }
    }
  };

  return (
     <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1}}>
    <SafeAreaView style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={copyToClipboard} 
          style={[styles.copyButton, !aiResponse && styles.buttonDisabled]}
          disabled={!aiResponse}
        >
          <Text style={styles.copyButtonText}>Copy</Text>
        </TouchableOpacity>
      </View>
      
      {/* Scrollable Content Area */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        {aiResponse ? (
          <Text style={styles.response}>{aiResponse}</Text>
        ) : isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#800000" />
            <Text style={styles.loadingText}>Generating response...</Text>
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
            {getPlaceholderText()}
            </Text>
            {/* <Text style={styles.modelInfo}>
              Using model: {MODEL_ID}
            </Text> */}
          </View>
        )}
      </ScrollView>
      
      {/* Fixed Footer */}
      <View style={styles.footer}>
        <TextInput
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your prompt here..."
          style={styles.input}
          multiline={false}
          returnKeyType="send"
          onSubmitEditing={!isLoading && userInput.trim() ? getAIResponse : null}
        />
        <TouchableOpacity 
          onPress={getAIResponse} 
          style={[styles.button, (!userInput.trim() || isLoading) && styles.buttonDisabled]}
          disabled={!userInput.trim() || isLoading}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView></KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  placeholderText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 15,
  },
  modelInfo: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  response: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 100,
  },
  footer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 22.5,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#800000',
    width: 80,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  clearButtonText: {
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  copyButton: {
    backgroundColor: '#800000',
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  copyButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default CraftAIMessage;