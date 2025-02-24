import {StyleSheet, Text, View, Image, Pressable, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import 'core-js/stable/atob';
import {AuthContext} from '../AuthContext';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {jwtDecode} from 'jwt-decode';
import {SafeAreaView} from 'react-native-safe-area-context';

const ProfileScreen = () => {
  // const {isLoading, token} = useContext(AuthContext);
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [likes, setLikes] = useState([]);
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    console.log('hi');
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  console.log('token');
  const [currentProfile, setCurrentProfile] = useState(null);
  useEffect(() => {
    if (userId) {
      getUserDetails();
    }
  }, [userId]);

  const {token, isLoading, setToken} = useContext(AuthContext);

  console.log(token);

  useEffect(() => {
    // Check if the token is set and not in loading state
    if (!token) {
      // Navigate to the main screen
      navigation.navigate('Login');
    }
  }, [token, navigation]);

  const getUserDetails = async () => {
    try {
      // Make a GET request to the endpoint with the userId parameter
      const response = await axios.get(
        `https://kismet.vercel.app/users/${userId}`,
      );
      setLikes(response);
      // Check if the response contains the user data
      if (response.status === 200) {
        // Extract the user data from the response
        const userData = response.data.user;

        // Handle the user data as needed (e.g., set state, display in UI)
        console.log('User details:', userData);

        setCurrentProfile(userData); // Return the user data if needed
      } else {
        console.error('Error fetching user details:', response.data.message);
        return null; // Return null or handle the error appropriately
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
      return null; // Return null or handle the error appropriately
    }
  };
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('AuthToken cleared successfully');

      setToken('');
      // Perform any necessary actions after clearing the authToken
    } catch (error) {
      console.error('Failed to clear AuthToken:', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
      <View
        style={{
          paddingHorizontal: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Image
            style={{width: 100, height: 80, resizeMode: 'cover'}}
            source={{
              uri: 'https://branditechture.agency/brand-logos/wp-content/uploads/wpdm-cache/Hinge-App-900x0.png',
            }}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <AntDesign name="infocirlce" size={24} color="black" />
          <AntDesign name="setting" size={24} color="black" />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          onPress={() =>
            navigation.navigate('Details', {
              firstName: currentProfile.firstName,
              imageUrls: currentProfile.imageUrls,
              prompts: currentProfile.prompts,
              userId: userId,
              dateOfBirth: currentProfile.dateOfBirth,
              gender: currentProfile.gender,
              lookingFor: currentProfile.lookingFor,
              hometown: currentProfile.hometown,
              type: currentProfile.type,
              rollNumber: currentProfile.rollNumber,
              rating: currentProfile.rating,
              yearSectionBranch: currentProfile.yearSectionBranch,
            })
          }>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              resizeMode: 'cover',
              borderColor: '#662d91',
              borderWidth: 3,
              alignSelf: 'center',
            }}
            source={{
              uri: currentProfile?.imageUrls[0],
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              marginTop: 12,
            }}>
            <Text style={{fontSize: 19, fontWeight: '600', marginLeft: 20}}>
              {currentProfile?.firstName}
            </Text>
            <MaterialIcons name="verified" size={22} color="#662d91" />
          </View>
        </Pressable>
      </View>

      <View style={{marginTop: 30, marginHorizontal: 20}}>
        <Image
          style={{height: 250, width: '100%', borderRadius: 10}}
          source={{
            uri: 'https://res.cloudinary.com/dqhvqgftf/image/upload/v1739953878/jsnbctirogefdsjddczv.jpg',
          }}
        />
      </View>

      <Pressable
        onPress={() => navigation.navigate('Guidelines')}
        style={{
          marginVertical: 20,
          marginHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderColor: '#E0E0E0',
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons name="typewriter" size={24} color="white" />
        </View>
        <View>
          <Text style={{fontSize: 15, fontWeight: '600'}}>Guidelines</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('Mental')}
        style={{
          marginVertical: -5,
          marginHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderColor: '#E0E0E0',
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            backgroundColor: '#662d91',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons name="brain" size={24} color="white" />
        </View>
        <View>
          <Text style={{fontSize: 15, fontWeight: '600'}}>Saathi</Text>
        </View>
      </Pressable>

      <Pressable
        onPress={logout}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={{
          borderColor: '#E0E0E0',
          marginTop: 40,
          padding: 12,
          borderRadius: 30,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: 120,
          backgroundColor: pressed ? '#E0E0E0' : 'white', // Light gray effect when pressed
        }}>
        <Text style={{textAlign: 'center', fontWeight: '500'}}>Logout</Text>
      </Pressable>
      </ScrollView>
    </SafeAreaView>

  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
