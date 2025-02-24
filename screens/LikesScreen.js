import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import 'core-js/stable/atob';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
const LikesScreen = () => {
  const navigation = useNavigation();
  const [option, setOption] = useState('Recent');
  const [userId, setUserId] = useState('');
  const [likes, setLikes] = useState([]);
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
  const fetchReceivedLikes = async () => {
    try {
      const response = await axios.get(
        `https://kismet.vercel.app/received-likes/${userId}`,
      );
      const receivedLikes = response.data.receivedLikes;
      console.log(receivedLikes); // Handle received likes in your frontend
      setLikes(receivedLikes);
    } catch (error) {
      console.error('Error fetching received likes:', error);
      // Handle error in the frontend
    }
  };

  useEffect(() => {
    if (userId) {
      fetchReceivedLikes();
    }
  }, [userId]);
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchReceivedLikes();
      }
    }, [userId]),
  );
  if (likes <= 0) {
    return (
      <SafeAreaView style={styles.marsafeArea}><ScrollView>
        <View style={styles.noMatchesContainer}>
          <LottieView
            source={require('../assets/search.json')} // Ensure this file exists in your assets folder
            autoPlay
            loop
            style={styles.lottie}
            speed={1}
          />
          <Text style={styles.noMatchesText}>No Likes yet!</Text>
          <Text style={styles.noMatchesText2}>
            Wait till someone likes your Profile.
          </Text>
        </View></ScrollView>
      </SafeAreaView>
    );
  }
  console.log('likes', likes.length);
  return (
    <ScrollView
      style={{marginTop: 5, padding: 15, flex: 1, backgroundColor: '#FAF9F6'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginTop: 15,
          }}>
          Likes You
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            backgroundColor: '#E25822',
            padding: 10,
            borderRadius: 30,
          }}>
          <SimpleLineIcons name="fire" size={24} color="Black" />
          <Text
            style={{textAlign: 'center', fontWeight: 'bold', color: 'Black'}}>
            Let's go!
          </Text>
        </View>
      </View>

      <View
        style={{
          marginVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: '#D0D0D0',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons name="filter" size={22} color="black" />
        </View>
        <Pressable
          onPress={() => setOption('Recent')}
          style={{
            borderColor: option == 'Recent' ? 'transparent' : '#808080',
            borderWidth: 0.7,
            padding: 10,
            borderRadius: 20,
            backgroundColor: option == 'Recent' ? 'black' : 'transparent',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '400',
              color: option == 'Recent' ? 'white' : '#808080',
            }}>
            Recent
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setOption('your type')}
          style={{
            borderColor: option == 'your type' ? 'transparent' : '#808080',
            borderWidth: 0.7,
            padding: 10,
            borderRadius: 20,
            backgroundColor: option == 'your type' ? 'black' : 'transparent',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '400',
              color: option == 'your type' ? 'white' : '#808080',
            }}>
            your type
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setOption('Last Active')}
          style={{
            borderColor: option == 'Last Active' ? 'transparent' : '#808080',
            borderWidth: 0.7,
            padding: 10,
            borderRadius: 20,
            backgroundColor: option == 'Last Active' ? 'black' : 'transparent',
            likes: likes?.length,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '400',
              color: option == 'Last Active' ? 'white' : '#808080',
            }}>
            Last Active
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setOption('Nearby')}
          style={{
            borderColor: option == 'Nearby' ? 'transparent' : '#808080',
            borderWidth: 0.7,
            padding: 10,
            borderRadius: 20,
            backgroundColor: option == 'Nearby' ? 'black' : 'transparent',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '400',
              color: option == 'Nearby' ? 'white' : '#808080',
            }}>
            Nearby
          </Text>
        </Pressable>
      </View>

      <View>
        {likes.length > 0 && (
          <Pressable
            onPress={() =>
              navigation.navigate('HandleLike', {
                name: likes[0].userId?.firstName,
                image: likes[0].image,
                imageUrls: likes[0].userId?.imageUrls,
                prompts: likes[0].userId?.prompts,
                userId: userId,
                selectedUserId: likes[0].userId?._id,
                likes: likes?.length,
                rollNumber: likes[0].userId?.rollNumber,
                dateOfBirth: likes[0].userId?.dateOfBirth,
                gender: likes[0].userId?.gender,
                lookingFor: likes[0].userId?.lookingFor,
                hometown: likes[0].userId?.hometown,
                type: likes[0].userId?.type,
                yearSectionBranch: likes[0]?.userId?.yearSectionBranch,
                rating: likes[0]?.userId?.rating,
              })
            }
            style={{
              padding: 20,
              borderColor: '#E0E0E0',
              borderWidth: 1,
              borderRadius: 7,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingHorizontal: 16,
                paddingVertical: 12,
                backgroundColor: '#f0f0f0',
                borderRadius: 5,
                marginBottom: 8,
                width: 145,
              }}>
              <View />
              <View>
                <Text>Liked your photo</Text>
              </View>
            </View>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>
              {likes[0].userId?.firstName}
            </Text>
            <Image
              source={{uri: likes[0].userId?.imageUrls[0]}}
              style={{
                width: '100%',
                height: 350,
                resizeMode: 'cover',
                borderRadius: 10,
                marginTop: 20,
              }}
            />
          </Pressable>
        )}
      </View>

      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          fontFamily: 'GeezaPro-Bold',
          marginTop: 20,
        }}>
        Up Next
      </Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 20,
        }}>
        {likes.slice(1).map((like, index) => (
          <View 
          key={`like-${like.userId?._id || index}`} 
          style={{marginVertical: 10, backgroundColor: 'white'}}
        >
            <View style={{padding: 12}}>
              {like.comment ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    backgroundColor: '#F5F3C6',
                    borderRadius: 5,
                    marginBottom: 8,
                    width: 145,
                  }}>
                  <View />
                  <View>
                    <Text>{like?.comment}</Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    backgroundColor: '#f0f0f0',
                    borderRadius: 5,
                    marginBottom: 8,
                    width: 145,
                  }}>
                  <View />
                  <View>
                    <Text>Liked your photo</Text>
                  </View>
                </View>
              )}

              <Text style={{fontSize: 17, fontWeight: '500'}}>
                {like?.userId?.firstName}
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Image
                key={index}
                source={{uri: like.userId?.imageUrls[0]}}
                style={{height: 220, width: 180, borderRadius: 4}}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({
  marsafeArea: {
    flex: 1,
    backgroundColor: '#D0D0D0',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#800000',
    padding: 20,
  },
  noMatchesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noMatchesText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  noMatchesText2: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },  lottie: {
    width: 300, // Bigger animation
    height: 300,
  },
});
