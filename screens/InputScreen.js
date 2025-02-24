import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,KeyboardAvoidingView,Platform
} from 'react-native';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../RegistrationUtils.js';

export default function InputScreen({navigation}) {
  const [rollNumber, setRollNumber] = useState('');
  const [adminNumber, setAdminNumber] = useState(''); // New state for admin number
  useEffect(() => {
    getRegistrationProgress('InputScreen').then(progressData => {
      if (progressData) {
        setRollNumber(progressData.rollNumber || '');
        setAdminNumber(progressData.adminNumber || '');
      }
    });
  }, []);
  const handleNext = () => {
    console.log(rollNumber);
    console.log(adminNumber);
    
    if (!rollNumber.trim() || !adminNumber.trim()) {
      alert('Please enter both roll number and admin number.');
      return;
    }
    
    // Roll number validation function
    const isValidRollNumber = (rollNumber) => {
      if (rollNumber[0] !== '1' && rollNumber[0] !== '2') {
        return false;
      }
    
      const length = rollNumber.length;
    
      if (length === 12) {
        return true;
      }
    
      if (
        (length === 10 || (length === 11 && rollNumber[10] === ' ')) &&
        rollNumber[2].toLowerCase() === 'b' &&
        rollNumber[3].toLowerCase() === 'd'
      ) {
        return true;
      }
      else if (
        (length === 10 || (length === 11 && rollNumber[10] === ' ')) &&
        rollNumber[2].toLowerCase() === 'p'
      ) {
        return true;
      }
    
      return false;
    };
    
    if (!isValidRollNumber(rollNumber)) {
      alert('Invalid RollNumber');
      return;
    }
    
    // Convert to uppercase & trim only after validation
    const trimmedRollNumber = rollNumber.toUpperCase().trim();
    setRollNumber(trimmedRollNumber);
    
    // Save progress after ensuring it's valid
    saveRegistrationProgress('InputScreen', { rollNumber: trimmedRollNumber, adminNumber });
    
    // Navigate to Camera Screen with processed values
    navigation.navigate('expocam', {
      rollNumber: trimmedRollNumber,
      adminNumber: adminNumber.trim(),
    });
  };

  return (
    <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
    <View style={styles.container}>
      <Text style={styles.heading}>Verification</Text>
      
      <Text style={styles.label}>Enter your Roll Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 21bd1a66xx"
        value={rollNumber}
        onChangeText={setRollNumber}
        autoCapitalize="none"
        placeholderTextColor="#A18A8A" // Subtle placeholder color
      />

      <Text style={styles.label}>Enter your Admin Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Check your ID"
        value={adminNumber}
        onChangeText={text => setAdminNumber(text)}
        autoCapitalize="none"
        placeholderTextColor="#A18A8A" // Subtle placeholder color
      /> 

      <Text style={styles.note}>Fill details from your ID card and then
        Open the Camera and Scan QR/barcode in your ID card
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
    </View></KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FAF3F3', // Subtle background for an elegant look
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#800000', // Medium maroon for a bold heading
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#4D2C2C', // Darker maroon for labels
  },
  input: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#FFF', // Clean white background for inputs
    fontSize: 16,
    color: '#4D2C2C', // Consistent dark maroon text for inputs
    elevation: 2, // Subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  note: {
    fontSize: 14,
    color: '#804E4E', // Muted maroon for secondary text like notes
    marginBottom: 20,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#800000', // Medium maroon button
    paddingVertical: 15,
    borderRadius: 25, // Fully rounded corners for a modern look
    alignItems: 'center',
    elevation: 5, // Subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFF', // White text for contrast on maroon buttons
    fontSize: 16,
    fontWeight: '600',
  },
});
