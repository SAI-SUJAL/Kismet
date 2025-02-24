import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  NavigationIndependentTree,
  useNavigation,
} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getRegistrationProgress, saveRegistrationProgress } from '../RegistrationUtils';

const TypeScreen = () => {
  const [type, setType] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    getRegistrationProgress('Type').then(progressData => {
      if (progressData) {
        setType(progressData.type || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (type.trim() !== '') {
      // Save the current progress data including the name
      saveRegistrationProgress('Type', {type});
    }
    // Navigate to the next screen
    // navigation.navigate('Dating');
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
                <Ionicons name="options-sharp" size={26} color="black" />
              
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
              What's your sexuality?
            </Text>
    
            <Text style={{marginTop: 30, fontSize: 15, color: 'gray'}}>
            Kismet users are matched based on these three gender groups. Changes
            can be made later.
            </Text>
    
            <View style={{marginTop: 30, flexDirection: 'column', gap: 12}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: '500', fontSize: 15}}>Straight</Text>
                <Pressable onPress={() => setType('Straight')}>
                  <FontAwesome
                    name="circle"
                    size={26}
                    color={type == 'Straight' ? '#800000' : '#F0F0F0'}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: '500', fontSize: 15}}>Gay</Text>
                <Pressable onPress={() => setType('Gay')}>
                  <FontAwesome
                    name="circle"
                    size={26}
                    color={type == 'Gay' ? '#800000' : '#F0F0F0'}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: '500', fontSize: 15}}>Lesbian</Text>
                <Pressable onPress={() => setType('Lesbian')}>
                  <FontAwesome
                    name="circle"
                    size={26}
                    color={type == 'Lesbian' ? '#800000' : '#F0F0F0'}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: '500', fontSize: 15}}>Bisexual</Text>
                <Pressable onPress={() => setType('Bisexual')}>
                  <FontAwesome
                    name="circle"
                    size={26}
                    color={type == 'Bisexual' ? '#800000' : '#F0F0F0'}
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
export default TypeScreen;

const styles = StyleSheet.create({});
