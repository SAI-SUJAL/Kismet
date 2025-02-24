import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Pressable,
  Image,
  Modal,
  TouchableOpacity,
  Touchable,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../AuthContext';
import {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import * as FileSystem from 'expo-file-system';
import Feather from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import Constants from 'expo-constants';
const HomeScreen = () => {
  const navigation = useNavigation();
  const [option, setOption] = useState('Compatible');
  const [userId, setUserId] = useState('');
  const [profilesData, setProfilesData] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [isResetting, setIsResetting] = useState(false);
  const [viewedProfiles, setViewedProfiles] = useState(new Set());
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
 

console.log("API Key One:", Constants.expoConfig.extra.EXPO_PUBLIC_API_KEY_ONE);
console.log("API Key Two:", Constants.expoConfig.extra.EXPO_PUBLIC_API_KEY_TWO);


  const handleCross = async () => {
    if (currentProfile) {
      // Add current profile to viewed profiles
      setViewedProfiles(prev => new Set(prev).add(currentProfile._id));

      // Save viewed profiles to AsyncStorage
      try {
        const updatedViewedProfiles = new Set([
          ...viewedProfiles,
          currentProfile._id,
        ]);
        await AsyncStorage.setItem(
          'viewedProfiles',
          JSON.stringify([...updatedViewedProfiles]),
        );
      } catch (error) {
        console.log('Error saving viewed profiles:', error);
      }
    }
    navigateToNextProfile();
  };

  const navigateToNextProfile = () => {
    const nextIndex = currentProfileIndex + 1;
    if (nextIndex < profilesData.length) {
      setCurrentProfileIndex(nextIndex);
      setCurrentProfile(profilesData[nextIndex]);
      setSelectedRating(0);
      setHasRated(false);
      // navigation.navigate('Animation');
    } else {
      setCurrentProfile(null);
    }
  };

  const resetLikes = async () => {
    setSelectedRating(0);
    setHasRated(false);
    setIsResetting(true);
    try {
      const response = await axios.post(
        `https://kismet.vercel.app/reset-likes`,
        {userId},
      );
      if (response.data.success) {
        // Clear viewed profiles
        setViewedProfiles(new Set());
        await AsyncStorage.removeItem('viewedProfiles');

        // Reset the current state
        setCurrentProfileIndex(0);
        // Fetch new matches
        await fetchMatches();
      }
    } catch (error) {
      console.log('Error resetting likes:', error);
    } finally {
      setIsResetting(false);
    }
  };

  const fetchMatches = async () => {
    try {
      const response = await axios.get(
        `https://kismet.vercel.app/matches?userId=${userId}`,
      );
      const matches = response.data.matches;

      // Load viewed profiles from AsyncStorage
      const savedViewedProfiles = await AsyncStorage.getItem('viewedProfiles');
      const viewedProfilesSet = savedViewedProfiles
        ? new Set(JSON.parse(savedViewedProfiles))
        : new Set();

      setViewedProfiles(viewedProfilesSet);

      // Filter out already viewed profiles
      const availableProfiles = matches.filter(
        profile => !viewedProfilesSet.has(profile._id),
      );

      setProfilesData(availableProfiles);

      if (availableProfiles.length > 0) {
        setCurrentProfile(availableProfiles[0]);
        setCurrentProfileIndex(0);
      } else {
        setCurrentProfile(null);
      }
    } catch (error) {
      console.log('error', error);
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
      setSelectedRating(0);
      setHasRated(false);
    }, [userId]),
  );

  const handleRating = async rating => {
    try {
      const response = await axios.post(
        'https://kismet.vercel.app/update-rating',
        {
          userId: currentProfile._id,
          rating: rating,
        },
      );

      // Update the current profile's rating with the new average
      setCurrentProfile(prev => ({
        ...prev,
        rating: response.data.newRating,
      }));
      setHasRated(true);
      setSelectedRating(rating);

      setShowRatingModal(false);
    } catch (error) {
      console.log('Error updating rating:', error);
    }
  };
  const RatingModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showRatingModal}
      onRequestClose={() => setShowRatingModal(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Rate {currentProfile?.firstName} (Anonymous)
          </Text>
          <View style={styles.ratingContainer}>
            {[...Array(10)].map((_, index) => (
              <Pressable
                key={index}
                onPress={() => handleRating(index + 1)}
                disabled={hasRated} // Disable after rating
                style={[
                  styles.ratingButton,
                  selectedRating === index + 1 && styles.selectedRating,
                  hasRated && styles.disabledRating, // Apply disabled style
                ]}>
                <Text style={styles.ratingText}>{index + 1}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable
            style={styles.closeButton}
            onPress={() => setShowRatingModal(false)}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
  if (!currentProfile) {
    return (
      <SafeAreaView style={styles.marsafeArea}>
  <ScrollView 
    contentContainerStyle={styles.scrollViewContent} 
    keyboardShouldPersistTaps="handled"
  >
    <View style={styles.noMatchesContainer}>
      {/* Lottie Animation */}
      <LottieView
        source={require('../assets/noprofile.json')} 
        autoPlay
        loop
        style={styles.lottie}
        speed={1}
      />
      
      {/* No Matches Text */}
      <Text style={styles.noMatchesText}>
        No more profiles left:( Wait till you get matched
      </Text>

      {/* OR Separator */}
      <Text style={styles.noMatchesText}>OR</Text>

      {/* Reset Button */}
      <Pressable 
        style={styles.resetButton} 
        onPress={resetLikes} 
        disabled={isResetting}
      >
        <Text style={styles.resetButtonText}>
          {isResetting ? 'Resetting...' : 'Reset Likes'}
        </Text>
      </Pressable>
    </View> 
  </ScrollView>
</SafeAreaView>

    );
  }
  console.log('profiles', currentProfile);
  console.log('profiles', profilesData);
  console.log('dnegey');
  console.log('Image URL:', decodeURIComponent(currentProfile?.imageUrls[0]));
  const imageUrl = decodeURIComponent(currentProfile?.imageUrls[0]);

  return (
    <>
      <SafeAreaView style={styles.marsafeArea}>
        <ScrollView style={{marginTop: 20}}>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CraftAI');
              }}
              style={{
                width: 40, // Slightly increased for perfect centering
                height: 40,
                borderRadius: 20, // Keep it circular
                backgroundColor: '#D0D0D0',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1.5, // Black outline thickness
                borderColor: 'black', // Outline color
              }}>
              <Ionicons
                name="sparkles-sharp"
                size={24}
                color="black"
                style={{
                  marginTop: 2, // Fine-tune vertical alignment
                  marginLeft: 2, // Fine-tune horizontal alignment
                }}
              />
            </TouchableOpacity>

            <Pressable
              onPress={() => setOption('Compatible')}
              style={{
                borderWidth: 0.7,
                padding: 10,
                borderRadius: 20,
                backgroundColor: 'black',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: '400',
                  color: option == 'Compatible' ? 'white' : '#808080',
                  backgroundColor: 'black',
                }}>
                Compatible
              </Text>
            </Pressable>
            <Pressable
              style={{
                borderColor: option == 'New here' ? 'transparent' : '#808080',
                borderWidth: 0.7,
                padding: 10,
                borderRadius: 20,
                backgroundColor: 'black',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: '400',
                  color: 'white',
                }}>
                Kismet Users Rating:{' '}
                {currentProfile?.rating?.toFixed(1) || '10.0'}/10
              </Text>
            </Pressable>
          </View>
          <View style={{marginHorizontal: 12, marginVertical: 12}}>
            {/* {profiles?.map((item, index) => ( */}
            <>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                      }}>
                      {currentProfile?.firstName}
                    </Text>
                    <View
                      style={{
                        backgroundColor: '#452c63',
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 20,
                      }}>
                      <Text style={{textAlign: 'center', color: 'white'}}>
                        new here
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 15,
                    }}>
                    <Entypo
                      name="dots-three-horizontal"
                      size={22}
                      color="black"
                    />
                  </View>
                </View>

                <View style={{marginVertical: 15}}>
                  <View>
                    {currentProfile?.imageUrls?.length > 0 && (
                      <View>
                        <Image
                          style={{
                            width: '100%',
                            height: 350,
                            resizeMode: 'cover',
                            borderRadius: 10,
                          }}
                          source={{
                            uri: currentProfile?.imageUrls[0],
                          }}
                        />

                        <Pressable
                          onPress={() => {
                            navigation.navigate('SendLike', {
                              image: currentProfile?.imageUrls[0],
                              name: currentProfile?.firstName,
                              userId: userId,
                              likedUserId: currentProfile?._id,
                            });
                          }}
                          style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            backgroundColor: 'white',
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <AntDesign name="hearto" size={25} color="#C5B358" />
                        </Pressable>
                      </View>
                    )}
                  </View>

                  <View style={{marginVertical: 15}}>
                    {currentProfile?.prompts
                      .slice(0, 1)
                      .map((prompt, index) => (
                        <View
                          key={`prompt-1-${index}`}
                          style={{
                            backgroundColor: 'white',

                            padding: 12,
                            borderRadius: 10,
                            height: 150,
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: '500',
                              color: 'black',
                            }}>
                            {prompt.question}
                          </Text>
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: '600',
                              marginTop: 20,
                              color: 'black',
                            }}>
                            {prompt.answer}
                          </Text>
                        </View>
                      ))}
                  </View>

                  {/* profile details to come here */}
                  <View
                    style={{
                      backgroundColor: 'white',
                      padding: 10,
                      borderRadius: 8,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingTop: 5,
                        alignItems: 'center',
                        gap: 20,
                        borderBottomWidth: 0.8,
                        borderBottomColor: '#E0E0E0',
                        paddingBottom: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                        <MaterialCommunityIcons
                          name="cake-variant-outline"
                          size={22}
                          color="black"
                        />
                        <Text style={{fontSize: 15}}>
                          {currentProfile?.dateOfBirth}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                        <Ionicons
                          name="person-outline"
                          size={20}
                          color="black"
                        />
                        <Text style={{fontSize: 15}}>
                          {currentProfile?.gender}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                        <Ionicons
                          name="magnet-outline"
                          size={20}
                          color="black"
                        />
                        <Text style={{fontSize: 15}}>
                          {currentProfile?.type}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12,
                        marginTop: 15,
                        borderBottomWidth: 0.8,
                        borderBottomColor: '#E0E0E0',
                        paddingBottom: 10,
                      }}>
                      <SimpleLineIcons
                        name="graduation"
                        size={22}
                        color="black"
                      />
                      <Text> {currentProfile?.rollNumber}</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12,
                        marginTop: 15,
                        borderBottomWidth: 0.8,
                        borderBottomColor: '#E0E0E0',
                        paddingBottom: 10,
                      }}>
                      <Ionicons name="book-outline" size={20} color="black" />
                      <Text>{currentProfile?.YearSectionBranch || "1st Year CSE-B"}</Text>

                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12,
                        marginTop: 15,
                        borderBottomWidth: 0.7,
                        borderBottomColor: '#E0E0E0',
                        paddingBottom: 10,
                      }}>
                      <Feather name="search" size={20} color="black" />
                      <Text>{currentProfile?.lookingFor}</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12,
                        marginTop: 15,
                        borderBottomWidth: 0.7,
                        borderBottomColor: '#E0E0E0',
                        paddingBottom: 10,
                      }}>
                      <Octicons name="home" size={20} color="black" />
                      <Text style={{fontSize: 15}}>
                        {currentProfile?.hometown}
                      </Text>
                    </View>
                  </View>

                  <View>
                    {currentProfile?.imageUrls
                      ?.slice(1, 3)
                      .map((item, index) => (
                        <View
                          key={`image-1-${index}`}
                          style={{marginVertical: 10}}>
                          <Image
                            style={{
                              width: '100%',
                              height: 350,
                              resizeMode: 'cover',
                              borderRadius: 10,
                            }}
                            source={{uri: item}}
                          />
                          <Pressable
                            onPress={() =>
                              navigation.navigate('SendLike', {
                                image: item,
                                name: currentProfile?.firstName,
                                userId: userId,
                                likedUserId: currentProfile?._id,
                              })
                            }
                            style={{
                              position: 'absolute',
                              bottom: 10,
                              right: 10,
                              backgroundColor: 'white',
                              width: 42,
                              height: 42,
                              borderRadius: 21,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <AntDesign
                              name="hearto"
                              size={25}
                              color="#C5B358"
                            />
                          </Pressable>
                        </View>
                      ))}
                  </View>

                  <View style={{marginVertical: 15}}>
                    {currentProfile?.prompts
                      .slice(1, 2)
                      .map((prompt, index) => (
                        <View
                          key={`prompt-2-${index}`}
                          style={{
                            backgroundColor: 'white',
                            padding: 12,
                            borderRadius: 10,
                            height: 150,
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontSize: 15, fontWeight: '500'}}>
                            {prompt.question}
                          </Text>
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: '600',
                              marginTop: 20,
                            }}>
                            {prompt.answer}
                          </Text>
                        </View>
                      ))}
                  </View>

                  <View>
                    {currentProfile?.imageUrls
                      ?.slice(3, 4)
                      .map((item, index) => (
                        <View key={index} style={{marginVertical: 10}}>
                          <Image
                            style={{
                              width: '100%',
                              height: 350,
                              resizeMode: 'cover',
                              borderRadius: 10,
                            }}
                            source={{
                              uri: item,
                            }}
                          />
                          <Pressable
                            onPress={() =>
                              navigation.navigate('SendLike', {
                                image: currentProfile?.imageUrls[index + 3],
                                name: currentProfile?.firstName,
                                userId: userId,
                                likedUserId: currentProfile?._id,
                              })
                            }
                            style={{
                              position: 'absolute',
                              bottom: 10,
                              right: 10,
                              backgroundColor: 'white',
                              width: 42,
                              height: 42,
                              borderRadius: 21,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <AntDesign
                              name="hearto"
                              size={25}
                              color="#C5B358"
                            />
                          </Pressable>
                        </View>
                      ))}
                  </View>

                  <View style={{marginVertical: 15}}>
                    {currentProfile?.prompts
                      .slice(2, 3)
                      .map((prompt, index) => (
                        <View
                          key={`prompt-3-${index}`}
                          style={{
                            backgroundColor: 'white',
                            padding: 12,
                            borderRadius: 10,
                            height: 150,
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontSize: 15, fontWeight: '500'}}>
                            {prompt.question}
                          </Text>
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: '600',
                              marginTop: 20,
                            }}>
                            {prompt.answer}
                          </Text>
                        </View>
                      ))}
                  </View>

                  <View>
                    {currentProfile?.imageUrls
                      ?.slice(4, 7)
                      .map((item, index) => (
                        <View
                          key={`image-3-${index}`}
                          style={{marginVertical: 10}}>
                          <Image
                            style={{
                              width: '100%',
                              height: 350,
                              resizeMode: 'cover',
                              borderRadius: 10,
                            }}
                            source={{uri: item}}
                          />
                          <Pressable
                            onPress={() =>
                              navigation.navigate('SendLike', {
                                image: item,
                                name: currentProfile?.firstName,
                                userId: userId,
                                likedUserId: currentProfile?._id,
                              })
                            }
                            style={{
                              position: 'absolute',
                              bottom: 10,
                              right: 10,
                              backgroundColor: 'white',
                              width: 42,
                              height: 42,
                              borderRadius: 21,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <AntDesign
                              name="hearto"
                              size={25}
                              color="#C5B358"
                            />
                          </Pressable>
                        </View>
                      ))}
                  </View>
                </View>

                <Pressable
                  style={({pressed}) => [
                    styles.rateProfileButton,
                    pressed && {opacity: 0.4}, // Changes opacity when pressed
                  ]}
                  onPress={() => {
                    setTimeout(() => {
                      setShowRatingModal(true);
                    }, 150); // 1-second delay
                  }}>
                  <Text style={styles.rateProfileText}>
                    Anonymously Rate {currentProfile?.firstName}?
                  </Text>
                </Pressable>
              </View>
            </>
            {/* ))} */}
          </View>
        </ScrollView>
        <RatingModal />
        <Pressable
          onPress={handleCross}
          style={{
            position: 'absolute',
            bottom: 15,
            left: 12,
            backgroundColor: 'white',
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Entypo name="cross" size={25} color="#800000" />
        </Pressable>
       
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  kismetRating: {
    marginLeft: 0,
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  ratingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRating: {
    backgroundColor: '#4B0D0D',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#4B0D0D',
    borderRadius: 10,
    width: '100%',
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rateProfileButton: {
    backgroundColor: '#D0D0D0',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  rateProfileText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  crossButton: {
    position: 'absolute',
    bottom: 15,
    left: 12,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  resetButton: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 8,
  },
  resetButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledRating: {
    opacity: 0.5, // Dim the button to indicate it's disabled
  },  
  lottie: {
    width: 300, // Bigger animation
    height: 300,
  },
});
