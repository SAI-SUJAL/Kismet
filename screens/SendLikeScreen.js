import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,TouchableOpacity,Platform,KeyboardAvoidingView
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PreFinalScreen from './PreFinalScreen';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
const SendLikeScreen = () => {
  const route = useRoute();
  const [comment, setComment] = useState('');
  const navigation = useNavigation();
  const userId = route?.params?.userId;
  console.log(route.params?.userId);
  const likeProfile = async () => {
    try {
      const response = await axios.post(
        'https://kismet.vercel.app/like-profile',
        {
          userId: route.params.userId,
          likedUserId: route.params.likedUserId,
          image: route?.params?.image,
          comment: comment,
        },
      );
      console.log(response.data.message); // Log success message
      if (response.status == 200) {
        navigation.goBack();
      }
      // Handle success: Update UI, show notifications, etc.
    } catch (error) {
      console.error('Error liking profile:', error);
      // Handle error: Show error message, retry logic, etc.
    }
  };
  const handleGoToCraftAI = () => {
    navigation.navigate('CraftAI', { previousScreen: 'SendLike' });
    // Make sure 'CraftAI' is the correct route
  };

  return (
     <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAF9F6'}}>
      <View
        style={{marginTop: 'auto', marginBottom: 'auto', marginHorizontal: 40}}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>
          {route?.params?.name}
        </Text>
        <Image
          style={{
            width: '100%',
            height: 350,
            resizeMode: 'cover',
            borderRadius: 10,
            marginTop: 10,
          }}
          source={{
            uri: route?.params?.image,
          }}
        />
        <TextInput
          value={comment}
          onChangeText={text => setComment(text)}
          placeholder="Add a comment"
          style={{
            padding: 15,
            backgroundColor: 'white',
            borderRadius: 8,
            marginTop: 14,
            fontSize: comment ? 17 : 17,
          }}
        />

        <View
          style={{
            marginVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <View
          
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFC0CB',
              paddingHorizontal: 14,
              paddingVertical: 10,
              gap: 4,
              borderRadius: 22,
            }}>
            <TouchableOpacity onPress={handleGoToCraftAI}>
              <AntDesign
                name="aliwangwang" // Robot icon
                size={24} // Set an appropriate size
                color="black" // Set the color
                style={{marginLeft: 2,marginRight:1}} // Adjust margin for proper spacing
              />
            </TouchableOpacity>
          </View>
          <Pressable
            onPress={likeProfile}
            style={{
              backgroundColor: '#FFFDD0',
              borderRadius: 20,
              padding: 10,
              flex: 1,
            }}>
            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
              Send Like
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView></KeyboardAvoidingView>
  );
};

export default SendLikeScreen;

const styles = StyleSheet.create({});
