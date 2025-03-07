import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  NavigationIndependentTree,
  useNavigation,
} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getRegistrationProgress, saveRegistrationProgress } from '../RegistrationUtils';

const DatingType = () => {
  const [datingPreferences, setDatingPreferences] = useState('');
  const navigation = useNavigation();
  const chooseOption = option => {
    if (datingPreferences.includes(option)) {
      setDatingPreferences(
        datingPreferences.filter(selectedOption => selectedOption !== option),
      );
    } else {
      setDatingPreferences([...datingPreferences, option]);
    }
  };
  useEffect(()=>{
    getRegistrationProgress('Dating').then(progressData=>{
      if(progressData){
        setDatingPreferences(progressData.datingPreferences||[]);
      }
    })
  },[]);

  const handleNext = () => {
    if(datingPreferences.length>0)
    {
      saveRegistrationProgress('Dating',{datingPreferences})
    }
    navigation.navigate('LookingFor');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 90, marginHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderColor: 'black',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
               <AntDesign name="hearto" size={22} color="black" />
            
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
          Whom do you want to date?
        </Text>

        <Text style={{marginTop: 30, fontSize: 15, color: 'gray'}}>
          Select all the people you're open to meeting
        </Text>

        <View style={{marginTop: 30, flexDirection: 'column', gap: 12}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Men</Text>
            <Pressable onPress={() => chooseOption('Men')}>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  datingPreferences.includes('Men') ? '#800000' : '#F0F0F0'
                }
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Women</Text>
            <Pressable onPress={() => chooseOption('Women')}>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  datingPreferences.includes('Women') ? '#800000' : '#F0F0F0'
                }
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Everyone</Text>
            <Pressable onPress={() => chooseOption('Everyone')}>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  datingPreferences.includes('Everyone') ? '#800000' : '#F0F0F0'
                }
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
          <AntDesign name="checksquare" size={26} color="#800000" />
          <Text style={{fontSize: 15}}>Visible on profile</Text>
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
    </SafeAreaView>
  );
};

export default DatingType;

const styles = StyleSheet.create({});
