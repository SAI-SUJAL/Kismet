import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import 'core-js/stable/atob';
import LottieView from 'lottie-react-native';

import {useFocusEffect} from '@react-navigation/native';
import UserChat from '../components/UserChat';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatScreen = () => {
  const [matches, setMatches] = useState([]);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.userId);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };

    fetchUser();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://kismet.vercel.app/get-matches/${userId}`,
      );
      setMatches(response.data.matches);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMatches();
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchMatches();
      }
    }, [userId]),
  );

  return (
    <SafeAreaView>
    <ScrollView style={{marginTop: 10, padding: 12}}>
      <View>
        <Text style={{fontSize: 20, fontWeight: '500'}}>Your Matches</Text>
        <View style={{marginVertical: 12}}>
          {loading ? (
            <Text style={styles.message}>Loading...</Text>
          ) : matches.length > 0 ? (
            matches.map((item, index) => (
              <UserChat
                key={index}
                userId={userId}
                item={item}
                lastMessage={item.lastMessage}
                // rollNumber={item.rollNumber}
                // rating={item.rating}
                // type={item.type}
                // gender={item.gender}
                // lookingFor={item.lookingFor}
                // hometown={item.hometown}
                // yearSectionBranch={item.yearSectionBranch}
                // prompts={item.prompts}
                // dateOfBirth={item.dateOfBirth}
              />
            ))
          ) : (
            <View style={styles.noMatchesContainer}>
            <LottieView
                    source={require('../assets/nomatchesyet.json')} 
                    autoPlay
                    loop
                    style={styles.lottie}
                    speed={1}
                  />
            <Text style={styles.message}>
              No matches yet to have a convo :(
            </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView></SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  message: {
    fontSize: 16,
    fontWeight: '400',
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  lottie: {
    width: 300, // Bigger animation
    height: 300,
    alignContent:'center'
  },
});
