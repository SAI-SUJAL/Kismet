import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,KeyboardAvoidingView,Platform
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NavigationIndependentTree,
  useNavigation,
} from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../RegistrationUtils';
const NameScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    getRegistrationProgress('Name').then(progressData => {
      if (progressData) {
        setFirstName(progressData.firstName || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (firstName.trim() !== '') {
      // Save the current progress data including the name
      saveRegistrationProgress('Name', { firstName });
    }
    // Navigate to the next screen
    navigation.navigate('Password');
  };

  return (
    <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1}}>
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Text style={{marginTop: 80, textAlign: 'center', color: 'gray'}}>
        NO BACKGROUND CHECKS ARE CONDUCTED
      </Text>
      <View style={{marginTop: 30, marginHorizontal: 20}}>
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
            <MaterialCommunityIcons
              name="newspaper-variant-outline"
              size={26}
              color="black"
            />
          </View>
          <Image
            style={{width: 100, height: 40}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>
        <View style={{marginTop: 30}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              fontFamily: 'GeezaPro-Bold',
            }}>
            What's your name?
          </Text>
          <TextInput
            autoFocus={true}
            value={firstName}
            onChangeText={text => setFirstName(text)}
            style={{
              width: 340,
              marginVertical: 10,
              fontSize: firstName ? 22 : 22,
              marginTop: 25,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingBottom: 10,
              fontFamily: 'GeezaPro-Bold',
            }}
            placeholder="First name (required)"
            placeholderTextColor={'#BEBEBE'}
          />
          <TextInput
            value={lastName}
            onChangeText={text => setLastName(text)}
            placeholder="Last Name"
            placeholderTextColor={'#BEBEBE'}
            style={{
              width: 340,
              marginVertical: 10,
              marginTop: 20,
              borderBottomColor: 'black', // Change underline color here
              borderBottomWidth: 1, // Proper casing for underline thickness
              paddingBottom: 10, // Proper casing for padding
              fontFamily: 'GeezaPro-Bold',
              fontSize: firstName ? 22 : 22, // Dynamic font size logic (unchanged here)
            }}
          />
          <Text style={{fontsize: 15, color: 'gray', fontweight: '500'}}>
            Last name is optional
          </Text>
        </View>
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
    </SafeAreaView></KeyboardAvoidingView>
  );
};

export default NameScreen;

const styles = StyleSheet.create({});
