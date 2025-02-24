
import {CameraView, useCameraPermissions} from 'expo-camera';
import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';

export default function EXPOCAM({route, navigation}) {
  const {rollNumber} = route.params; // Get the roll number from the input screen
  const [scannedData, setScannedData] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const debounceTimeout = useRef(null); // Use ref to store the timeout

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to access the camera.
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarcodeScanned = scanningResult => {
    // Clear the previous timeout to prevent excessive firing of the function
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout to handle the scan with a delay (e.g., 500ms)
    debounceTimeout.current = setTimeout(() => {
      const {data, type} = scanningResult;
      const normalizedData = data?.trim(); // Normalize the scanned data
      const rollNumber = route.params?.rollNumber?.toUpperCase().trim(); // Normalize roll number from params
      const adminNumber = route.params?.adminNumber?.toLowerCase().trim(); // Normalize admin number from params

      // Debugging the scan type and data
      console.log('Scanned Type:', type);
      console.log('Scanned Data:', normalizedData);
      console.log('Roll Number:', rollNumber);

      if (!rollNumber) {
        Alert.alert('Error', 'Roll number is not provided.');
        return;
      }

      if (type === 'code128') {
        // Exact match for CODE_128 barcodes (roll number should match exactly)
        const isMatch = normalizedData === rollNumber;

        Alert.alert(
          'Code 128 Verification',
          isMatch
            ? 'Exact roll number matched!'
            : 'Roll number does not match.',
          [
            {
              text: 'OK',
              onPress: () =>
               
                navigation.navigate('VerificationResult', {isMatch,rollNumber}),
                
            },
          ],
        );
      } else if (type === 'qr') {
        const isUpper = data => data.split(',').every(part => /^\d+$/.test(part.trim()) || part.trim() === part.trim().toUpperCase());
        const parts = normalizedData.split(',');
        const commaCount = (normalizedData.match(/,/g) || []).length; // Count the commas in normalizedData

        // Check if there are exactly 5 commas in the normalized data
        if (commaCount !== 5) {
          Alert.alert('Error', 'Invalid QR, kathalu padaku');
          return;
        }

        // Extract values
        const extractedAdminNumber = parts[0]?.trim();
        const branch = parts[1]?.trim();
        const extractedRollNumber = parts[2]?.trim();
        const phoneNumber = parts[5]?.trim();

        // Check if the extracted phone number is valid (10-digit)
        const isValidPhoneNumber = /^\d{10}$/.test(phoneNumber);

        // Check if the extracted branch matches valid branches
        const validBranches = ['it', 'csd', 'csm', 'cse'];
        const isBranchMatch = validBranches.includes(branch?.toLowerCase());

        // Define `isMatch` for all conditions
        const isMatch =
          extractedAdminNumber === adminNumber && // Admin number matches
          extractedRollNumber === rollNumber && // Roll number matches
          isBranchMatch && // Branch matches
          isValidPhoneNumber &&commaCount && isUpper(normalizedData); // Valid 10-digit phone number

        // Log for debugging
        console.log('Extracted Admin Number:', extractedAdminNumber);
        console.log('Extracted Branch:', branch);
        console.log('Extracted Roll Number:', extractedRollNumber);
        console.log('Extracted Phone Number:', phoneNumber);
        console.log('Is Branch Match:', isBranchMatch);
        console.log('Is Phone Number Valid:', isValidPhoneNumber);
        console.log('Is Match:', isMatch);
        console.log('Is Upper:', isUpper(normalizedData));
        Alert.alert(
          'QR Code Verification',
          isMatch
            ? 'All data matches successfully!'
            : 'Data mismatch. Verification failed.',
          [
            {
              text: 'OK',
              onPress: () =>
                navigation.navigate('VerificationResult', {isMatch,rollNumber}),
            },
          ],
        );
      } else {
        // If it's an unknown barcode type, show an alert
        Alert.alert(
          'Unknown Barcode Type',
          'Unsupported barcode type scanned.',
        );
      }
    }, 200); // Delay in milliseconds (500ms)
    // Delay in milliseconds (500ms)
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'code128'], // Support QR and Code 128 barcodes
        }}
        onBarcodeScanned={handleBarcodeScanned}
      />
      <Text style={styles.instruction}>
        Scan the barcode/QR code in Your IDcard for 5s and remove.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  camera: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
    borderRadius: 8,
  },
  instruction: {
    marginTop: 20,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    paddingBottom: 10,
  },
});
