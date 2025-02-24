import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const Verification = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [image, setImage] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  // Function to handle image picking
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setVerificationStatus('Image Uploaded!'); // Show uploaded message
    }
  };

  // Function to send data to the API
  const verifyRollNumber = async () => {
    if (!rollNumber || !image) {
      alert("Please provide a roll number and an image.");
      return;
    }

    setIsLoading(true); // Start loading before making the request

    try {
      const formData = new FormData();
      formData.append('rollNumber', rollNumber);
      formData.append('barcodeImage', {
        uri: image,
        type: 'image/jpeg',
        name: 'barcode.jpg',
      });

      // Make the API request
      const response = await axios.post('https://your-api-endpoint.com/verify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.isVerified) {
        setVerificationStatus('Roll Number Verified!');
      } else {
        setVerificationStatus('Verification Failed!');
      }
    } catch (error) {
      console.error("API request failed: ", error);
      setVerificationStatus('Error verifying roll number.');
    } finally {
      setIsLoading(false); // Stop loading after the request is done
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Roll Number Verification</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Roll Number"
        value={rollNumber}
        onChangeText={setRollNumber}
        keyboardType="default"
      />
      
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Barcode/QR Code Image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}
      {image && <Text style={styles.uploadStatus}>Image Uploaded!</Text>} {/* Show upload status */}

      <TouchableOpacity style={styles.button} onPress={verifyRollNumber} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </TouchableOpacity>
      
      {verificationStatus && <Text style={styles.result}>{verificationStatus}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  uploadStatus: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});

