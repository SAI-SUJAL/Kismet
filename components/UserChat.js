import {Image, Pressable, StyleSheet, Text, View,TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { useEffect } from 'react';

const UserChat = ({item, userId, lastMessage}) => {
  const navigation = useNavigation();
  
  return (
    <ScrollView>
    <Pressable
      onPress={() =>
        navigation.navigate('ChatRoom', {
          image: item?.imageUrls[0],
          name: item?.firstName,
          receiverId: item?._id,
          senderId: userId,
        })
      }
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginVertical: 12,
      }}>
      <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { ...item })}
      >
        <Image
          style={{width: 70, height: 70, borderRadius: 35}}
          source={{uri: item?.imageUrls[0]}}
        />
        </TouchableOpacity>
      </View>

      <View>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 16,
            fontFamily: 'GeezaPro-Bold',
          }}>
          {item?.firstName}
        </Text>

        {/* Display either last message or notification */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            marginTop: 6,
            color: lastMessage ? 'green' : 'black', // Green if there's a message, black otherwise
          }}>
          {lastMessage
            ? `${lastMessage}` // Show message preview
            : `Start Chat with ${item?.firstName}`} {/* Default text */}
        </Text>
      </View>
    </Pressable></ScrollView>
  );
};

export default UserChat;

const styles = StyleSheet.create({});
