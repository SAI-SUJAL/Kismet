import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, { useState,useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { saveRegistrationProgress,getRegistrationProgress} from '../RegistrationUtils';

const PromptScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [prompts, setPrompts] = useState([]);

  // Load saved progress when component mounts
  useEffect(() => {
    const loadSavedProgress = async () => {
      try {
        const progressData = await getRegistrationProgress('Prompts');
        if (progressData?.prompts) {
          setPrompts(progressData.prompts);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    };
    loadSavedProgress();
  }, []);

  // Update prompts when returning from ShowPromptScreen
  useEffect(() => {
    if (route.params?.prompts) {
      setPrompts(route.params.prompts);
    }
  }, [route.params?.prompts]);

  const handleSelectAgain = () => {
    navigation.navigate('ShowPrompts');
  };

  const handleSelect = () => {
    navigation.navigate('ShowPrompts', { existingPrompts: prompts });
  };

  const handleNext = async () => {
    try {
      saveRegistrationProgress('Prompts', {prompts});
    } catch (error) {
      console.error('Error saving progress:', error);
      // Add error handling UI feedback here
    }
  };

  return (
    <View>
      <View style={{ marginTop: 90, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            <Feather name="file-text" size={26} color="black" />
          </View>
          <Image
            style={{ width: 100, height: 40 }}
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
          Write your profile answers
        </Text>

        <View style={{ marginTop: 20, flexDirection: 'column', gap: 20 }}>
          {route?.params?.prompts ? (
            route?.params?.prompts?.map((item, index) => (
              <Pressable
                key={index} // Add unique key for each item
                onPress={() => navigation.navigate('ShowPrompts')}
                style={{
                  borderColor: '#707070',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 70,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                  }}>
                  {item?.question}
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                    marginTop: 3,
                  }}>
                  {item?.answer}
                </Text>
              </Pressable>
            ))
          ) : (
            <View>
              {/* Render empty prompts if none are present */}
              {[...Array(4)].map((_, idx) => (
                <Pressable
                  key={`empty-prompt-${idx}`} // Use unique keys for empty prompts
                  onPress={() => navigation.navigate('ShowPrompts')}
                  style={{
                    borderColor: '#707070',
                    borderWidth: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderStyle: 'dashed',
                    borderRadius: 10,
                    height: 70,
                    marginVertical: 15,
                  }}>
                  <Text
                    style={{
                      color: 'gray',
                      fontWeight: '600',
                      fontStyle: 'italic',
                      fontSize: 15,
                    }}>
                    Select a Prompt
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      fontWeight: '600',
                      fontStyle: 'italic',
                      fontSize: 15,
                      marginTop: 3,
                    }}>
                    And write your own answer
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
        <View
          style={{
            padding: 20,
          }}>
          <Button
            title={
              route?.params?.prompts && route?.params?.prompts.length > 0
                ? 'Select Again'
                : 'Select'
            }
            onPress={
              route?.params?.prompts && route?.params?.prompts.length > 0
                ? handleSelectAgain
                : handleSelect
            }
            color="#581845"
            style={{
              borderRadius:
                route?.params?.prompts && route?.params?.prompts.length > 0
                  ? 10
                  : 50, // Rounded if no prompts
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (route?.params?.prompts?.length == 4) {
              try {
                saveRegistrationProgress('Prompts', {prompts});
              } catch (error) {
                console.error('Error saving progress:', error);
                // Add error handling UI feedback here
              }
              // Navigate to the next screen if there are prompts
              navigation.navigate('PreFinal');
            } else if (
              route?.params?.prompts?.length > 0 &&
              route?.params?.prompts?.length < 4
              
            ) {alert('Please add 4 prompts before proceeding!');
            } else {
              // Optionally show an alert or handle when there are no prompts
              alert('Please add 4 prompts before proceeding!');
            }
          }}
          activeOpacity={0.8}
          style={{ marginTop: 30, marginLeft: 'auto' }}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color={route?.params?.prompts?.length == 4 ? '#581845' : '#d3d3d3'}
            style={{ alignSelf: 'center', marginTop: 20 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PromptScreen;

const styles = StyleSheet.create({});
