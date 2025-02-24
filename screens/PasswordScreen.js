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
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../RegistrationUtils';

const PasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // New state to toggle password visibility
  
  const navigation = useNavigation();
  
  useEffect(() => {
      getRegistrationProgress('Password').then(progressData => {
        if (progressData) {
          setPassword(progressData.password || '');
        }
      });
    }, []);
  
    const handleNext = () => {
      if (password.trim() !== '') {
        // Save the current progress data including the name
        saveRegistrationProgress('Password', { password });
      }
      // Navigate to the next screen
      navigation.navigate('Year');
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
            <Feather name="lock" size={26} color="black" />
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
          Please choose a password
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 25}}>
          <TextInput
            autoFocus={true}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!showPassword} // Toggle secureTextEntry based on state
            placeholder="Enter your password"
            placeholderTextColor={'#BEBEBE'}
            style={{
              width: 300,
              marginVertical: 10,
              borderBottomColor: 'black', // Change underline color here
              borderBottomWidth: 1, // Proper casing for underline thickness
              paddingBottom: 10, // Proper casing for padding
              fontFamily: 'GeezaPro-Bold',
              fontSize: 22,
            }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={24}
              color="black"
              style={{marginLeft: 10}}
            />
          </TouchableOpacity>
        </View>

        <Text style={{color: 'gray', marginTop: 7, fontSize: 15}}>
          Note: Your details are safe with us
        </Text>
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{marginTop: 30, marginLeft: 'auto'}}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color="#800000"
            style={{alignSelf: 'center', marginTop: 20}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({});
