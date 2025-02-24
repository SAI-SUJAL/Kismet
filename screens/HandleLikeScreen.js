import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Alert,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,Animated
} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import LottieView from 'lottie-react-native';
const HandleLikeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [showMatched, setShowMatched] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  console.log(route?.params);

  const removeFromReceivedLikes = async () => {
    try {
      const currentUserId = route?.params?.userId;
      const selectedUserId = route?.params?.selectedUserId;

      const response = await axios.post(
        'https://kismet.vercel.app/remove-received-like',
        {
          currentUserId,
          selectedUserId,
        },
      );

      if (response.status === 200) {
        console.log('User removed from received likes');
        navigation.goBack();
        // Handle success, such as updating UI or showing a success message
      } else {
        console.error('Failed to remove user from received likes');
        // Handle failure, such as showing an error message
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error removing user from received likes:', error);
      // Handle error, such as showing an error message
    }
  };

  const createMatch = async () => {
    try {
      const currentUserId = route?.params?.userId; // Example currentUserId
      const selectedUserId = route?.params?.selectedUserId; // Example selectedUserId
      const response = await axios.post(
        'https://kismet.vercel.app/create-match',
        {
          currentUserId,
          selectedUserId,
        },
      );

      if (response.status === 200) {
        setShowMatched(true);
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 1, // Fully visible
            duration: 500, // Smooth fade-in
            useNativeDriver: true,
          }).start();
        }, 300); // Show animation

        setTimeout(() => {
          setShowMatched(false);
          navigation.goBack(); // Navigate back after animation
        }, 2000);
      } else {
        console.error('Failed to create match');
        // Handle failure, such as showing an error message
      }
    } catch (error) {
      console.error('Error creating match:', error);
      // Handle error, such as showing an error message
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#D0D0D0',
          marginTop: 0,
          padding: 12,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{textAlign: 'center', fontSize: 15, fontWeight: '500'}}>
            All {route?.params?.likes}
          </Text>
          <Text
            style={{fontSize: 15, fontWeight: '500'}}
            onPress={() => navigation.goBack()}>
            Back
          </Text>
        </View>

        <View style={{marginVertical: 12}}>
          <Image
            style={{
              width: '100%',
              height: 180,
              borderRadius: 7,
              resizeMode: 'cover',
            }}
            source={{uri: route?.params.image}}
          />
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
              position: 'absolute',
              bottom: -22,
            }}>
            <View />
            <View>
              <Text>Liked your photo</Text>
            </View>
          </View>
        </View>

        <View style={{marginVertical: 25}}>
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
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                {route?.params?.name}
              </Text>
              {/* <View
                style={{
                  backgroundColor: '#452c63',
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 20,
                }}>
                <Text style={{textAlign: 'center', color: 'white'}}>
                  new here
                </Text>
              </View> */}
            </View>
            <View
              style={{
                backgroundColor: 'black',
                paddingHorizontal: 16,
                paddingVertical: 6,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                Kismet Users Rating: {route?.params?.rating}/10
              </Text>
            </View>
          </View>

          <View style={{marginVertical: 15}}>
            <View>
              {route?.params?.imageUrls?.length > 0 && (
                <View>
                  <Image
                    style={{
                      width: '100%',
                      height: 350,
                      resizeMode: 'cover',
                      borderRadius: 10,
                    }}
                    source={{
                      uri: route?.params?.imageUrls[0],
                    }}
                  />
                </View>
              )}
            </View>

            <View style={{marginVertical: 15}}>
              {route?.params?.prompts?.slice(0, 1).map((prompt, index) => (
                <View
                  key={`prompt-0-${prompt.id || index}`}
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
                    {route?.params?.dateOfBirth}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Ionicons name="person-outline" size={20} color="black" />
                  <Text style={{fontSize: 15}}>{route?.params?.gender}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Ionicons name="magnet-outline" size={20} color="black" />
                  <Text style={{fontSize: 15}}>{route?.params?.type}</Text>
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
                <SimpleLineIcons name="graduation" size={22} color="black" />
                <Text>RollNumber: {route?.params?.rollNumber}</Text>
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
                <Text>{route?.params?.YearSectionBranch || "1st Year CSE-B"}</Text>

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
                <Text>{route.params?.lookingFor}</Text>
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
                <Text style={{fontSize: 15}}>{route.params?.hometown}</Text>
              </View>
            </View>

            <View>
              {route?.params?.imageUrls?.slice(1, 3).map((item, index) => (
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
                </View>
              ))}
            </View>
            <View>
              {route?.params?.prompts?.slice(1, 2).map((prompt, index) => (
                <View
                  key={`prompt-1-${prompt.id || index}`}
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
              {route?.params?.imageUrls?.slice(3, 4).map((item, index) => (
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
                </View>
              ))}
            </View>
            <View style={{marginVertical: 15}}>
              {route?.params?.prompts?.slice(2, 3).map((prompt, index) => (
                <View
                  key={`prompt-2-${prompt.id || index}`}
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
              {route?.params?.imageUrls?.slice(4, 7).map((item, index) => (
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
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          {/* Match Animation Modal */}
          <Modal transparent visible={showMatched} animationType="fade">
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.7)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LottieView
                source={require('../assets/verifiedmarooncolor.json')} // Replace with actual file
                autoPlay
                loop={false}
                style={{width: 250, height: 250}}
              />
              <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.matchText}>Matched! Go Chat! 💬</Text>
          </Animated.View>
            </View>
          </Modal>
          {/* Modal */}
          <Modal
            animationType="fade"
            transparent
            visible={modalVisible}
            onRequestClose={closeModal}>
            <TouchableWithoutFeedback onPress={closeModal}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>
                    Match with {route?.params?.name}?
                  </Text>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.declineButton]}
                      onPress={() => {
                        closeModal();
                        removeFromReceivedLikes();
                      }}>
                      <Text style={styles.buttonText}>Decline</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button, styles.acceptButton]}
                      onPress={() => {
                        closeModal();
                        createMatch();
                      }}>
                      <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </ScrollView>

      <Pressable
        onPress={openModal}
        style={{
          position: 'absolute',
          bottom: 45,
          right: 12,
          backgroundColor: 'white',
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MaterialCommunityIcons
          name="message-outline"
          size={25}
          color="#C5B358"
        />
      </Pressable>
    </>
  );
};

export default HandleLikeScreen;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#C5B358',
  },
  declineButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  matchText: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
    fontWeight: 'bold',
  },
});
