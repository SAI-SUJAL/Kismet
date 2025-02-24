import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,Platform
} from 'react-native';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
const {width} = Dimensions.get('window');

const WelcomeScreen = ({navigation}) => {
  return (
  
    <ScrollView style={styles.safeArea}>  
      {/* Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="#4B0D0D" />
      {/* Title & Subtitle */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Kismet</Text>
        <Text style={styles.subtitle}>KMIT's first-ever friendship platform.</Text>
      </View>

      <View style={styles.container}>
        {/* Lottie Animation */}
        <LottieView
          source={require('../assets/chatsdating.json')} // Path to your Lottie file
          autoPlay
          loop
          style={styles.animation}
          speed={2}
        />

        {/* Title */}

        {/* Buttons */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
          <Text style={styles.signupText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View></ScrollView>
  
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Platform.OS === 'ios' ? '#4B0D0D' : '#4B0D0D', // Deep Maroon
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B0D0D', // Deep Maroon
    padding: 20,
  },
  animation: {
    alignItems: 'center',
    width: width * 1,
    height: width * 1,
    marginBottom: 30,
  },
  headerContainer: {
    // Moves only the title & subtitle down
    alignItems: 'center',
  },
  title: {
    marginTop: Platform.OS === 'ios' ? 80 : 40,
    fontSize: 40,
    color: '#FFFFFF', // White
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#E0E0E0', // Light Gray
    marginBottom: 30,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#FFFFFF', // White
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  signupButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    borderColor: '#FFFFFF', // White Border
    borderWidth: 2,
  },
  buttonText: {
    color: '#4B0D0D', // Deep Maroon
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#FFFFFF', // White
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
