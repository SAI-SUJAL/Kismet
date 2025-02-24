// {
//   "name": "MyApp",
//   "displayName": "MyApp",

//   "plugins": [
//     [
//       "expo-camera",
//       {
//         "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
//         "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone",
//         "recordAudioAndroid": true
//       }
//     ],
//     [
//       "expo-image-picker",
//       {
//         "photosPermission": "The app accesses your photos to let you share them with your friends."
//       }
//     ]
//   ],
//   "android": {
//     "permissions": [
//       "android.permission.CAMERA",
//       "android.permission.RECORD_AUDIO"
//     ],
//     "package": "com.anonymous.myapp"
//   }
// }
export default {
  expo: {
    name: "MyApp",
    displayName: "MyApp",
    owner:"saisujal",



    plugins: [
      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
          microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone",
          recordAudioAndroid: true
        }
      ],
      [
        "expo-image-picker",
        {
          photosPermission: "The app accesses your photos to let you share them with your friends."
        }
      ]
    ],
    
    android: {
      permissions: [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO"
      ],
      package: "com.anonymous.myapp"
    },

    extra: {
      EXPO_PUBLIC_API_KEY_ONE: process.env.EXPO_PUBLIC_API_KEY_ONE ,
      EXPO_PUBLIC_API_KEY_TWO: process.env.EXPO_PUBLIC_API_KEY_TWO ,
      eas: {
        projectId: "9d7bf19d-1da4-4a6c-add7-c7cc49915cfe"
      }
    }
    
  }
};
