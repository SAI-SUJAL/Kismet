import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const AnimationScreen = () => {
  const navigation=useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.goBack();
    }, 4000);
  }, []);
  return (
    <View>
      <Text>Congrats its a match!!!!!!!!!!</Text>
    </View>
  )
}

export default AnimationScreen

const styles = StyleSheet.create({})