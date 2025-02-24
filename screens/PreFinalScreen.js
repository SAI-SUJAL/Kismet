import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  Alert,Platform
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState, createContext, useContext} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import {
  NavigationIndependentTree,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../AuthContext';
import {
  saveRegistrationProgress,
  getRegistrationProgress,
} from '../RegistrationUtils';
import axios from 'axios';
const Prefinal = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState();
  const {token, setToken} = useContext(AuthContext);
  useEffect(() => {
    getAllUserData();
  }, []);

  useEffect(() => {
    // Check if the token is set and not in loading state
    if (token) {
      // Navigate to the main screen
      navigation.replace('MainStack', {screen: 'Main'});
    }
  }, [token, navigation]);

  const getAllUserData = async () => {
    try {
      // Define an array to store data for each screen
      const screens = [
        'InputScreen',
        'Name',
        'Year',
        // 'Email',
        'Password',
        'Birth',

        'Gender',
        'Type',
        'Dating',
        'LookingFor',
        'Hometown',
        'Photos',
        'Prompts',
      ];
      let userData = {};
      for (const screenName of screens) {
        const screenData = await getRegistrationProgress(screenName);
        if (screenData) {
          userData = {...userData, ...screenData}; // Merge screen data into user data
        }
      }
      setUserData(userData);
    } catch (error) {
      console.log('error', error);
    }
  };
  const clearAllScreenData = async () => {
    try {
      const screens = [
        'InputScreen',
        'Name',
        'Year',
        // 'Email',
        'Password',
        'Birth',

        'Gender',
        'Type',
        'Dating',
        'LookingFor',
        'Hometown',
        'Photos',
        'Prompts',
      ];
      // Loop through each screen and remove its data from AsyncStorage
      for (const screenName of screens) {
        const key = `registration_progress_${screenName}`;
        await AsyncStorage.removeItem(key);
      }
      console.log('All screen data cleared successfully');
    } catch (error) {
      console.error('Error clearing screen data:', error);
    }
  };
  const registerUser = async () => {
    // if (!userData.rollNumber || !userData.password || !userData.firstName) {
    //   Alert.alert('Error', 'Go back and Please fill in all required fields.');
    //   return; // Stop the registration process if fields are missing
    // }

    try {
      const response = await axios
        .post('https://kismet.vercel.app/register', userData)
        .then(response => {
          console.log(response);
          const token = response.data.token;
          AsyncStorage.setItem('token', token);
          setToken(token);
        });
      // Assuming the response contains the user data and token

      // Store the token in AsyncStorage
      // navigation.replace('Main', {
      //   screen: 'Home',
      // });
      //   navigation.replace('MainStack', {screen: 'Main'});

      clearAllScreenData();
    } catch (error) {
      if (error.response && error.response.data.error) {
        if (error.response.data.error === 'User already exists') {
          Alert.alert('Error', 'A user with this roll number already exists.');
        } else {
          // For other errors
          Alert.alert(
            'Error',
            'An error occurred while registering. Please try again.',
          );
        }
      } else {
        // Network or other errors
        Alert.alert(
          'Error',
          'Unable to connect. Please check your internet connection.',
        );
      }
    }
  };
  console.log('user data', userData);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="light-content" backgroundColor="#800000" />
      <View style={{marginTop: 80, paddingHorizontal: 20}}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            fontFamily: Platform.OS === 'ios' ? 'GeezaPro-Bold':'sans-serif',
            textAlign: 'center', // Centers text for better alignment
            color: '#333', // Darker shade for better readability
          }}>
          You're all set!
        </Text>

        <Text
          style={{
            fontSize: 20,
            fontWeight: '600', // Slightly reduced for visual hierarchy
            fontFamily: 'sans-serif',
            textAlign: 'center',
            // Lighter shade for contrast
            marginTop: 10,
          }}>
          We’re setting up your profile now.
        </Text>
      </View>

      <View>
        <LottieView
          source={require('../assets/love.json')}
          style={{
            height: 260,
            width: 300,
            alignSelf: 'center',
            marginTop: 40,
            justifyContent: 'center',
          }}
          autoPlay
          loop={true}
          speed={0.7}
        />
      </View>

      <Pressable
        onPress={registerUser}
        style={{
          backgroundColor: '#800000', // Fixed the hex color (was '#80000')
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 25, // Rounded corners for a button look
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute', // Position it above the bottom
          bottom: 30, // Moves the button upwards from the bottom
          alignSelf: 'center', // Centers the button horizontally
          shadowColor: '#000', // Adds shadow for depth (iOS)
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 5, // Android shadow
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Finish Registering
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Prefinal;

const styles = StyleSheet.create({});
