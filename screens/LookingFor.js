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
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  NavigationIndependentTree,
  useNavigation,
} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getRegistrationProgress, saveRegistrationProgress } from '../RegistrationUtils';

const LookingFor = () => {
  const [lookingFor,setLookingFor] = useState("");
  const navigation = useNavigation();
  
  
  useEffect(() => {
    getRegistrationProgress('LookingFor').then(progressData => {
      if (progressData) {
        setLookingFor(progressData.lookingFor || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (lookingFor.trim() !== '') {
      // Save the current progress data including the name
      saveRegistrationProgress('LookingFor', {lookingFor});
    }
    // Navigate to the next screen
    navigation.navigate('HomeTown');
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
          <Fontisto name="heart-eyes" size={28} color="black" />
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
        What are you looking for?
      </Text>



      <View style={{marginTop: 30, flexDirection: 'column', gap: 12}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontWeight: '500', fontSize: 15}}>Friends</Text>
          <Pressable onPress={() => setLookingFor('Friends')}>
            <FontAwesome
              name="circle"
              size={26}
              color={lookingFor == "Friends" ? '#800000' : '#F0F0F0'}
            />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontWeight: '500', fontSize: 15}}>Relationship</Text>
          <Pressable onPress={() => setLookingFor('Relationship')}>
            <FontAwesome
              name="circle"
              size={26}
              color={lookingFor == "Relationship" ? '#800000' : '#F0F0F0'}
            />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontWeight: '500', fontSize: 15}}>Friends and Relationship</Text>
          <Pressable onPress={() => setLookingFor('Friends and Relationship')}>
            <FontAwesome
              name="circle"
              size={26}
              color={lookingFor == "Friends and Relationship" ? '#800000' : '#F0F0F0'}
            />
          </Pressable>
        </View>
        <View
  style={{
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    marginVertical: 10,
  }}>
  <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#800000' }}>
    Whom will you view if you select?
  </Text>

  <Text style={{ fontSize: 14, color: '#333', marginTop: 5 }}>
    - Friends (F): you'll see both males & females who are looking for Friends or Friends & Relationship.
  </Text>
  
  <Text style={{ fontSize: 14, color: '#333', marginTop: 5 }}>
    - Relationship (R):See only the opposite gender who are looking for Relationship or Friends & Relationship.
  </Text>

  <Text style={{ fontSize: 14, color: '#333', marginTop: 5 }}>
    - Friends & Relationship (F&R): See both males & females who are looking for Friends or Friends & Relationship,  
      and only the opposite gender who are looking for Relationship.
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#800000' }}>
    (suggested)
  </Text>
  </Text>
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
export default LookingFor

const styles = StyleSheet.create({})