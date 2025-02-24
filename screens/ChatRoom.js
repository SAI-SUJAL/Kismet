import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React, {useState, useLayoutEffect, useEffect, useRef} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {io} from 'socket.io-client';
import axios from 'axios';
import {AntDesign} from '@expo/vector-icons';

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  const navigation = useNavigation();
  const route = useRoute();
  const {senderId, receiverId, name} = route.params;

  const messageIdExists = messageId => {
    return messages.some(msg => msg._id === messageId);
  };

  // Update the receiveMessage event handler in your useEffect
  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io('http://192.168.29.223:8000');

    socketRef.current.on('connect', () => {
      console.log('Connected to Socket.IO server');
      // Join the chat with your user ID
      socketRef.current.emit('join', senderId);
    });

    socketRef.current.on('connect_error', error => {
      console.error('Socket connection error:', error);
    });

    socketRef.current.on('receiveMessage', newMessage => {
      console.log('Received new message:', newMessage);
      // Check if we already have this message (by ID)
      if (!messageIdExists(newMessage._id)) {
        setMessages(prevMessages => [...prevMessages, newMessage]);
        // Scroll to bottom when receiving messages
        setTimeout(scrollToBottom, 100);
      }
    });

    socketRef.current.on('receiveMissedMessages', missedMessages => {
      console.log('Received missed messages:', missedMessages);
      // Filter out messages we already have
      const uniqueMissedMessages = missedMessages.filter(
        msg => !messageIdExists(msg._id),
      );
      if (uniqueMissedMessages.length > 0) {
        setMessages(prevMessages => [...prevMessages, ...uniqueMissedMessages]);
        // Scroll to bottom after receiving missed messages
        setTimeout(scrollToBottom, 100);
      }
    });

    // Fetch initial messages
    fetchMessages();

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  // Effect to scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    const messageData = {
      senderId,
      receiverId,
      message: message.trim(),
    };

    // Clear the input field immediately
    setMessage('');

    // Emit the message to the server - let the server echo it back
    socketRef.current.emit('sendMessage', messageData);

    // No optimistic update - we'll wait for the server echo
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get('https://kismet.vercel.app/messages', {
        params: {senderId, receiverId},
      });
      setMessages(response.data);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.log('Error fetching messages:', error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoToCraftAI = () => {
    navigation.navigate('CraftAI', { previousScreen: 'ChatRoom' });
   
  };

  const formatTime = time => {
    const options = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', options);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#800000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{name}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        ref={scrollViewRef}
        onContentSizeChange={scrollToBottom}>
        {messages?.map((item, index) => (
          <Pressable
            key={item._id || `message-${index}-${Date.now()}`}
            style={[
              item?.senderId === route?.params?.senderId
                ? {
                    alignSelf: 'flex-end',
                    backgroundColor: '#800000',
                    padding: 8,
                    maxWidth: '60%',
                    borderRadius: 7,
                    margin: 10,
                  }
                : {
                    alignSelf: 'flex-start',
                    backgroundColor: '#452c63',
                    padding: 8,
                    margin: 10,
                    borderRadius: 7,
                    maxWidth: '60%',
                  },
            ]}>
            <Text
              style={{
                fontSize: 15,
                textAlign: 'left',
                color: 'white',
                fontWeight: '500',
              }}>
              {item?.message}
            </Text>
            <Text
              style={{
                fontSize: 9,
                textAlign: 'right',
                color: 'white',
                marginTop: 5,
              }}>
              {formatTime(item?.timestamp)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: '#800000',
          marginBottom: 30,
        }}>
        <TouchableOpacity onPress={handleGoToCraftAI}>
    <AntDesign
      name="aliwangwang" // Robot icon
      size={24} // Set an appropriate size
      color="black" // Set the color
      style={{ marginRight: 10 }} // Adjust margin for proper spacing
    />
  </TouchableOpacity>
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: '#dddddd',
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type your message..."
        />

        <Pressable
          onPress={sendMessage}
          style={{
            backgroundColor: '#800000',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#800000',
    backgroundColor: 'white',
    height: 60,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#800000',
  },
});
