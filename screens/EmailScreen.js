import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../RegistrationUtils';

const EmailScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
      getRegistrationProgress('Email').then(progressData => {
        if (progressData) {
          setEmail(progressData.email || '');
        }
      });
    }, []);
  
    const handleNext = () => {
      if (email.trim() !== '') {
        // Save the current progress data including the name
        saveRegistrationProgress('Email', { email });
      }
      // Navigate to the next screen
      navigation.navigate('Password');
    };
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 90, marginHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22, // Makes the view circular
              borderWidth: 2, // Border width around the circle
              borderColor: 'black', // Border color around the circle
              justifyContent: 'center', // Centers the icon vertically
              alignItems: 'center', // Centers the icon horizontally
            }}>
            <Fontisto name="email" size={26} color="black" />
          </View>
          <Image
            style={{width: 100, height: 40}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginTop: 15,
          }}>
          Please provide a valid email
        </Text>
        <Text style={{fontSize: 15, marginTop: 10, color: 'gray'}}>
          Email verification helps us keep the account secure
        </Text>
        <TextInput
          autoFocus={true}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Enter your email"
          placeholderTextColor={'#BEBEBE'}
          style={{
            width: 340,
            marginVertical: 10,
            marginTop: 25,
            borderBottomColor: 'black', // Change underline color here
            borderBottomWidth: 1, // Proper casing for underline thickness
            paddingBottom: 10, // Proper casing for padding
            fontFamily: 'GeezaPro-Bold',
            fontSize: email ? 22 : 22, // Dynamic font size logic (unchanged here)
          }}
        />

        <Text style={{color: 'gray', marginTop: 7, fontSize: 15}}>
          Note: You will be asked to verify your email
        </Text>
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{marginTop: 30, marginLeft: 'auto'}}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color="#581845"
            style={{alignSelf: 'center', marginTop: 20}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({});
