import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import {
  NavigationIndependentTree,
  useNavigation,
} from '@react-navigation/native';
// import NameScreen from './NameScreen';
import Verification from '../screens/Verification';
import {Ionicons} from '@expo/vector-icons';
// import LinearGradient from 'react-native-linear-gradient';

const BasicInfo = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar barStyle="light-content" backgroundColor="#800000" />

        <TouchableOpacity
          style={{
            paddingHorizontal: 18,
            marginTop: Platform.OS === 'ios' ? 30 : 30,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 22,
            borderWidth: 1.5,
            borderColor: 'white',
            paddingVertical: 10,
            paddingHorizontal: 15,
            alignSelf: 'center',
            maxWidth: '90%',marginRight: 14,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: -4,
              
            }}>
            <Ionicons
              name="sparkles-sharp"
              size={22}
              style={{
                textShadowColor: 'black',
                textShadowOffset: {width: 1, height: 1},
                textShadowRadius: 2,
                paddingVertical: 20,
                color: 'black',
                marginRight: 10,
                
              }}
            />
          </View>

          <View style={{marginBottom: -4}}>
            <Text
              style={{
                color: 'black',
                fontSize: 22,
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                flexShrink: 1,
              }}>
              You’re not like the rest—your profile shouldn’t be either.
            </Text>
          </View>
        </TouchableOpacity>

        <View>
          <LottieView
            style={{
              height: 500,
              width: 450,
              alignSelf: 'center',
              marginTop: 40,
              justifyContent: 'center',
            }}
            source={require('../assets/dating1.json')}
            autoPlay
            loop={true}
            speed={0.9}
          />
        </View>
        <Pressable
          style={{
            backgroundColor: 'maroon',
            padding: 15,
            marginTop: 'auto',
            borderRadius: 30, // Makes the button curvy
            width: 200, // Button width
            alignSelf: 'center', // Centers the button horizontally
            alignItems: 'center', // Centers text inside the button
            marginBottom: 250, // Adds some space from the bottom
          }}
           onPress={() => navigation.navigate('InputScreen')}>
          {/* onPress={() => navigation.navigate('Name')}>  */}
          <Text
            style={{
              color: 'white', // Text color
              fontWeight: '600', // Text weight
              fontSize: 17, // Text size
            }}>
            Enter Basic Info
          </Text>
        </Pressable>
      </SafeAreaView>
    </ScrollView>
  );
};

export default BasicInfo;

const styles = StyleSheet.create({});
