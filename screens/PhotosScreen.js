import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../RegistrationUtils';
import axios from 'axios';

const PhotosScreen = () => {
  const navigation = useNavigation();
  const [imageUrls, setImageUrls] = useState(['', '', '', '', '', '']);

  const handleAddImage = async () => {
    

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [4, 3],
      quality:1,
    });

    if (!result.canceled) {
      const updatedImageUrls = [...imageUrls];
      const firstEmptyIndex = updatedImageUrls.findIndex(url => url === '');
      if (firstEmptyIndex !== -1) {
        updatedImageUrls[firstEmptyIndex] = result.assets[0].uri;
        setImageUrls(updatedImageUrls);
      }
    } else {
      console.log('Image selection canceled.');
    }
  };

  // Function to handle deleting a specific image
  const handleDeleteImage = index => {
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls[index] = ''; // Remove the image by resetting its position to empty
    setImageUrls(updatedImageUrls);
  };
  useEffect(() => {
    // Fetch the saved image URLs from AsyncStorage
    getRegistrationProgress('Photos').then(progressData => {
      if (progressData && progressData.imageUrls) {
        setImageUrls(progressData.imageUrls);
      }
    });
  }, []);

  const handleNext = async () => {
    try {
      const filledImages = imageUrls.filter(url => url !== '');
  
      if (filledImages.length >= 4) {
        console.log('🖼️ Current imageUrls before saving:', imageUrls);
  
        // Upload images to Cloudinary if they are not already uploaded
        const uploadedUrls = await Promise.all(
          filledImages.map(async imageUri => {
            if (!imageUri.startsWith('http')) {
              console.log('Uploading image:', imageUri);
              return await uploadImageToCloudinary(imageUri);
            }
            return imageUri; // Keep already uploaded URLs
          })
        );
  
        console.log('✅ Uploaded Cloudinary URLs:', uploadedUrls);
  
        if (uploadedUrls.includes(null)) {
          console.error('⚠️ Some images failed to upload');
          alert('Some images failed to upload. Please try again.');
          return;
        }
  
        // Save the final Cloudinary URLs in MongoDB
        await saveImageUrlsToMongoDB(uploadedUrls);
  
        // Save registration progress locally
        saveRegistrationProgress('Photos', { imageUrls: uploadedUrls });
  
        // Navigate to the next screen
        navigation.navigate('Prompts');
      } else {
        alert('Please add at least 3 images before proceeding!');
      }
    } catch (error) {
      console.error('❌ Error in handleNext:', error);
    }
  };
  
  const uploadImageToCloudinary = async (imageUri) => {
    console.log("📤 Uploading image to Cloudinary:", imageUri);
  
    const data = new FormData();
    data.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    data.append("upload_preset", "Dating"); // Ensure this exists in Cloudinary
    data.append("cloud_name", "dqhvqgftf");
  
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dqhvqgftf/image/upload",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      console.log("✅ Upload Successful:", response.data);
      
      // Check if Cloudinary actually returned a secure URL
      if (!response.data.secure_url) {
        throw new Error("Cloudinary did not return a secure_url");
      }
  
      return response.data.secure_url;
    } catch (error) {
      console.error("❌ Error uploading image:", error.response?.data || error);
      return null;
    }
  };
  
  // Function to send all Cloudinary URLs to MongoDB
  const saveImageUrlsToMongoDB = async (imageUrls) => {
    try {
      console.log("📤 Sending data to MongoDB:", { imageUrls });
  
      const response = await axios.post(
        "https://kismet.vercel.app/api/images",
        { imageUrls },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      console.log("✅ MongoDB Response:", response.data);
      console.log("✅ Images successfully saved to MongoDB");
    } catch (error) {
      console.error("❌ Error saving image URLs to MongoDB:", error.response?.data || error);
    }
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
            <MaterialIcons name="photo-camera-back" size={28} color="black" />
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
          Pick your photos and videos
        </Text>
        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 20,
            }}>
            {imageUrls?.slice(0, 3).map((url, index) => (
              <Pressable
                onPress={handleAddImage}
                key={index}
                style={{
                  borderColor: '#800000',
                  borderWidth:  2,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 100,
                }}>
                {url ? (
                  <View
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                    }}>
                    <Image
                      source={{uri: url}}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        resizeMode: 'cover',
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderRadius: 20,
                        padding: 5,
                      }}
                      onPress={() => handleDeleteImage(index)}>
                      <MaterialCommunityIcons
                        name="trash-can"
                        size={20}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <EvilIcons name="image" size={26} color="black" />
                )}
              </Pressable>
            ))}
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 20,
            }}>
            {imageUrls.slice(3, 6).map((url, index) => (
              <Pressable
                onPress={handleAddImage}
                key={index}
                style={{
                  borderColor: '#800000',
                  borderWidth: url ? 0 : 2,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 100,
                }}>
                {url ? (
                  <View
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                    }}>
                    <Image
                      source={{uri: url}}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        resizeMode: 'cover',
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderRadius: 20,
                        padding: 5,
                      }}
                      onPress={() => handleDeleteImage(index + 3)} // Adjust index for second row
                    >
                      <MaterialCommunityIcons
                        name="trash-can"
                        size={20}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <EvilIcons name="image" size={22} color="black" />
                )}
              </Pressable>
            ))}
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              color: '#800000',
              marginTop: 3,
            }}>
            Add Minimum 3 photos
          </Text>
        </View>

        <Button onPress={handleAddImage} title="Add Image" />

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{marginTop: 30, marginLeft: 'auto'}}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color={
              imageUrls.filter(url => url !== '').length >= 3
                ? '#800000'
                : '#d3d3d3'
            }
            style={{alignSelf: 'center', marginTop: 20}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PhotosScreen;
