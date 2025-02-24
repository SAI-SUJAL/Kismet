import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { getRegistrationProgress, saveRegistrationProgress } from '../RegistrationUtils';

const { width, height } = Dimensions.get('window');

export default function VerificationResult({ route, navigation }) {
  const { isMatch } = route.params;
  const {rollNumber} = route.params;

  
  const handleContinue = () => {
    console.log(rollNumber)
    console.log(isMatch)
    if(isMatch)
      if(rollNumber!=='')
      {
        saveRegistrationProgress('VerificationResult',{rollNumber});
      }

    navigation.navigate('Name');
  };

  const handleGoBack = () => {
    navigation.navigate('InputScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.result, isMatch ? styles.successText : styles.failedText]}>
        {isMatch ? 'Verification Successful!' : 'Verification Failed!'}
      </Text>

      {isMatch ? (
        <View style={styles.contentContainer}>
          <LottieView
            style={styles.animation}
            source={require('../assets/verifiedmarooncolor.json')}
            autoPlay
            loop={true}
            speed={1}
          />
          <TouchableOpacity
            style={[styles.button, styles.continueButton]}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <LottieView
            style={styles.animation}
            source={require('../assets/best.json')}
            autoPlay 
            loop={true}
            speed={0.7}
          />
          <Text style={styles.messageText}>
            Please go back and retry the QR code scan.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.goBackButton]}
            onPress={handleGoBack}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF3F3', // Matching input screen background
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  result: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  successText: {
    color: '#4D2C2C', // Dark maroon for consistency
  },
  failedText: {
    color: '#800000', // Maroon for failed text
  },
  animation: {
    
    height: height * 0.25, // 25% of screen height
    width: width * 0.6, // 60% of screen width
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain', // Ensures the entire animation is visible without distortion
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#804E4E', // Muted maroon from input screen
    marginVertical: 20,
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 25, // Fully rounded corners like input screen
    alignItems: 'center',
    marginTop: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
  continueButton: {
    backgroundColor: '#800000', // Maroon button
  },
  goBackButton: {
    backgroundColor: '#800000', // Darker maroon for variation
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});