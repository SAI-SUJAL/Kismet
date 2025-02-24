import {Pressable, StyleSheet, Text, View,Image  ,TouchableOpacity} from 'react-native';
import React, {useState,useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  NavigationIndependentTree,
  useNavigation,
} from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../RegistrationUtils';
const GenderScreen = () => {
  const [gender, setGender] = useState('');
   const navigation = useNavigation();
   useEffect(() => {
    getRegistrationProgress('Gender').then((progressData) => {
      if (progressData) {
        setGender(progressData.gender || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (gender.trim() !== '') {
      // Save the current progress data including the name
      saveRegistrationProgress('Gender', { gender });
    }
    // Navigate to the next screen
    navigation.navigate('Type');
  
    
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
            <MaterialCommunityIcons
              name="gender-male-female-variant"
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
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginTop: 15,
          }}>
          Which gender describes you the best?
        </Text>
        <Text style={{marginTop: 30, fontSize: 15, color: 'gray'}}>
          Kismet users are matched based on these three gender groups. Changes
          can be made later.
        </Text>
        <View
          style={{marginTop: 30}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>Men</Text>
            <Pressable onPress={() => setGender('Men')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Men' ? 'blue' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 12,
            }}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>Women</Text>
            <Pressable onPress={() => setGender('Women')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Women' ? 'pink' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>Non-Binary</Text>
            <Pressable onPress={() => setGender('Non-Binary')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Non-Binary' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <AntDesign name="checksquare" size={26} color="maroon" />
          <Text style={{fontSize: 15}}>Visible on Profile</Text>
          </View>
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            style={{marginTop: 30, marginLeft: 'auto'}}>
            <MaterialCommunityIcons
              name="arrow-right-circle"
              size={45}
              color="maroon"
              style={{alignSelf: 'center', marginTop: 20}}
            />
          </TouchableOpacity>
        </View>
   
    </SafeAreaView>
  );
};

export default GenderScreen;

const styles = StyleSheet.create({});
