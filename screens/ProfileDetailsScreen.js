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
  TouchableWithoutFeedback,
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
const ProfileDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route?.params);
  const handleGoToCraftAI = () => {
    navigation.navigate('CraftAI', { previousScreen: 'Details'})
   
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#D0D0D0', padding: 12}}>
      <View style={{marginVertical: 0}}>
        <View
          style={{ 
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
             gap: 10,
          }}>
          <TouchableOpacity
           onPress={handleGoToCraftAI}
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
            style={{
              borderColor: '#808080',
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
              Kismet Users Rated {route?.params?.firstName} :{' '}
              {route?.params?.rating?.toFixed(1) || '10.0'}/10
            </Text>
          </Pressable>
        </View>

        <View style={{marginVertical: 15}}>
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
                marginBottom:10
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                 
                }}>
                {route?.params?.firstName}
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
              <Entypo name="dots-three-horizontal" size={22} color="black" />
            </View>
          </View>
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
                <Text style={{fontSize: 15}}>{route?.params?.dateOfBirth}</Text>
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
              <View key={`image-1-${index}`} style={{marginVertical: 10}}>
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
              <View key={`image-3-${index}`} style={{marginVertical: 10}}>
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
              <View key={`image-4-${index}`} style={{marginVertical: 10}}>
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
    </ScrollView>
  );
};
export default ProfileDetailsScreen;
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

  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
