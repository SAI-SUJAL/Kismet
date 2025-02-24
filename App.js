// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { CameraView, useCameraPermissions } from 'expo-camera';

// export default function TestCamera() {
//   const [cameraType, setCameraType] = useState('back');
//   const [permission, requestPermission] = useCameraPermissions();

//   if (!permission) {
//     return <Text>Requesting camera permission...</Text>;
//   }

//   if (!permission.granted) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="Grant permission" />
//       </View>
//     );
//   }

//   const toggleCameraType = () => {
//     setCameraType((prevType) => (prevType === 'back' ? 'front' : 'back'));
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <CameraView style={{ flex: 1 }} facing={cameraType}>
//         <View style={styles.cameraContent}>
//           <Text style={styles.text}>Scan something!</Text>
//           <Button title="Toggle Camera" onPress={toggleCameraType} />
//         </View>
//       </CameraView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   cameraContent: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   text: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import StackNavigator from './navigation/StackNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthProvider} from './AuthContext';

function Section({children, title}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
    
    <AuthProvider>
      <>
        <StackNavigator />
       
      </>
    </AuthProvider></>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensures SafeAreaView takes up full screen height
    justifyContent: 'center', // Centers the content vertically
    alignItems: 'center', // Centers the content horizontally
    paddingTop: 20, // Adds some padding from the top if needed
  },
  container: {
    alignItems: 'center', // Centers the content inside the container
    padding: 20, // Padding for the container
  },
  title: {
    fontSize: 30, // Larger font size for the title
    fontWeight: 'bold', // Title styling
  },
  sectionContainer: {
    marginTop: 100,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
