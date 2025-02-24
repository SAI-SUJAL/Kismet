// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   SafeAreaView,
//   Pressable,
//   Image,
//   Linking
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { useNavigation } from '@react-navigation/native';

// const GuidelinesScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </Pressable>
//         <Text style={styles.headerTitle}>Guidelines</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//         <View style={styles.imageContainer}>
//           <Image
//             source={{
//               uri: 'https://img.freepik.com/free-vector/qa-engineers-concept-illustration_114360-2235.jpg',
//             }}
//             style={styles.guidelineImage}
//             resizeMode="contain"
//           />
//         </View>

//         <View style={styles.contentContainer}>
//           <Text style={styles.sectionTitle}>General Guidelines</Text>

//           <View style={styles.guidelineItem}>
//             <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
//             <Text style={styles.guidelineText}>
//               You cannot edit Photos/Prompts after submission.
//             </Text>
//           </View>

//           <View style={styles.guidelineItem}>
//             <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
//             <Text style={styles.guidelineText}>
//               Keep prompts appropriate and respectful.
//             </Text>
//           </View>

//           <View style={styles.guidelineItem}>
//             <MaterialIcons name="error" size={24} color="#F44336" />
//             <Text style={styles.guidelineText}>
//               Cannot edit content due to storage issues.
//             </Text>
//           </View>

//           <View style={styles.divider} />

//           <Text style={styles.sectionTitle}>Report Fraud</Text>
//           <View style={styles.reportSection}>
//             <MaterialIcons name="report-problem" size={24} color="#FF9800" />
//             <Text style={styles.reportText}>
//               If you detect fraud or catfishing, please report to:
//             </Text>
//           </View>
//           <Text style={styles.emailText}>xyz@gmail.com</Text>

//           <View style={styles.divider} />

//           <Text style={styles.sectionTitle}>Account Deletion</Text>
//           <View style={styles.deletionSteps}>
//             <View style={styles.stepItem}>
//               <View style={styles.stepNumber}>
//                 <Text style={styles.stepNumberText}>1</Text>
//               </View>
//               <Text style={styles.stepText}>Pay ₹60 to UPI ID: example@upi</Text>
//             </View>
//             <View style={styles.stepItem}>
//               <View style={styles.stepNumber}>
//                 <Text style={styles.stepNumberText}>2</Text>
//               </View>
//               <Text style={styles.stepText}>Take a screenshot of the payment</Text>
//             </View>
//             <View style={styles.stepItem}>
//               <View style={styles.stepNumber}>
//                 <Text style={styles.stepNumberText}>3</Text>
//               </View>
//               <Text style={styles.stepText}>Send the screenshot to xyz@gmail.com</Text>
//             </View>
//           </View>

//           <View style={styles.divider} />

//           <Text style={styles.sectionTitle}>Account Updation</Text>
//           <View style={styles.deletionSteps}>
//             <View style={styles.stepItem}>
//               <View style={styles.stepNumber}>
//                 <Text style={styles.stepNumberText}>1</Text>
//               </View>
//               <Text style={styles.stepText}>Check Online for prompts that you like</Text>
//             </View>
//             <View style={styles.stepItem}>
//               <View style={styles.stepNumber}>
//                 <Text style={styles.stepNumberText}>2</Text>
//               </View>
//               <Text style={styles.stepText}>Select answers and finalize choices</Text>
//             </View>
//             <View style={styles.stepItem}>
//               <View style={styles.stepNumber}>
//                 <Text style={styles.stepNumberText}>3</Text>
//               </View>
//               <Text style={styles.stepText}>Pay ₹40 to UPI ID: example@upi</Text>
//             </View>
//             <View style={styles.stepItem}>
//               <View style={styles.stepNumber}>
//                 <Text style={styles.stepNumberText}>4</Text>
//               </View>
//               <Text style={styles.stepText}>
//                 Send the selected questions and answers along with payment proof to xyz@gmail.com
//               </Text>
//             </View>
//             <View style={styles.stepItem}>
//               <View style={styles.stepNumber}>
//                 <Text style={styles.stepNumberText}>5</Text>
//               </View>
//               <Text style={styles.stepText}>
//                 For photos, directly attach and send to xyz@gmail.com
//               </Text>
//             </View>
//           </View>

//           {/* Image added at the bottom */}
//           <View style={styles.imageContainer}>
//             <Image
//               source={require('C:/Users/91998/Desktop/MyApp/assets/kismetlimited.png')}  // Local image path
//               style={styles.guidelineImage}
//               resizeMode="contain"
//             />
//           </View>
//         </View>
//       </ScrollView>

//       <View style={styles.footer}>
//         <Pressable
//           style={styles.okayButton}
//           onPress={() => navigation.goBack()}>
//           <Text style={styles.okayButtonText}>Okay</Text>
//         </Pressable>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEEEEE',
//   },
//   backButton: {
//     padding: 4,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333333',
//   },
//   scrollContainer: {
//     flex: 1,
//   },
//   imageContainer: {
//     alignItems: 'center',
//     paddingVertical: 24,
//   },
//   guidelineImage: {
//     width: '100%',
//     height: 300,
//   },
//   contentContainer: {
//     paddingHorizontal: 24,
//     paddingBottom: 100,
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#333333',
//   },
//   guidelineItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   guidelineText: {
//     fontSize: 16,
//     marginLeft: 12,
//     flex: 1,
//     color: '#333333',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#EEEEEE',
//     marginVertical: 24,
//   },
//   reportSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   reportText: {
//     fontSize: 16,
//     marginLeft: 12,
//     flex: 1,
//     color: '#333333',
//   },
//   emailText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#2196F3',
//     marginLeft: 36,
//   },
//   deletionSteps: {
//     marginTop: 16,
//   },
//   stepItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   stepNumber: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: '#662d91',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   stepNumberText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   stepText: {
//     fontSize: 16,
//     flex: 1,
//     color: '#333333',
//   },
//   footer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#FFFFFF',
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     borderTopWidth: 1,
//     borderTopColor: '#EEEEEE',
//   },
//   okayButton: {
//     backgroundColor: '#662d91',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   okayButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default GuidelinesScreen;import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  Image,
  Linking,
  Alert,
  Modal,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useState} from 'react';

const GuidelinesScreen = () => {
  const navigation = useNavigation();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [verificationModalVisible, setVerificationModalVisible] =
    useState(false);

  const SUPPORT_EMAIL = 'kismetdatingkmit@gmail.com';

  const initiateDeleteAccount = () => {
    setDeleteModalVisible(true);
  };

  const handlePayment = () => {
    const paymentLink = 'https://razorpay.me/@kismetlimited';
    setDeleteModalVisible(false);

    Linking.openURL(paymentLink)
      .then(() => {
        setVerificationModalVisible(true);
      })
      .catch(err => {
        Alert.alert('Error', "Couldn't open payment page. Please try again.");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>Guidelines</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-vector/qa-engineers-concept-illustration_114360-2235.jpg',
            }}
            style={styles.guidelineImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>General Guidelines</Text>

          <View style={styles.guidelineItem}>
            <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
            <Text style={styles.guidelineText}>
              You cannot edit Photos/Prompts after submission.
            </Text>
          </View>

          <View style={styles.guidelineItem}>
            <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
            <Text style={styles.guidelineText}>
              Keep Conversations appropriate and respectful.
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Report Fraud</Text>
          <View style={styles.reportSection}>
            <MaterialIcons name="report-problem" size={24} color="#FF9800" />
            <Text style={styles.reportText}>
              If you detect fraud or catfishing, please report to our customer
              support email.
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Account Deletion</Text>
          <View style={styles.deletionSteps}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Pay ₹100 to UPI </Text>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>
                Take a screenshot of the payment
              </Text>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>
                Send the screenshot & your rollnumber to customer support email
              </Text>
            </View>
          </View>

          <Pressable
            style={styles.deleteAccountButton}
            onPress={initiateDeleteAccount}>
            <MaterialIcons name="delete-forever" size={24} color="#FFFFFF" />
            <Text style={styles.deleteAccountButtonText}>Delete Account</Text>
          </Pressable>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Account Updation</Text>
          <View style={styles.deletionSteps}>
  <View style={styles.stepItem}>
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>1</Text>
    </View>
    <Text style={styles.stepText}>
      Pay ₹40 via UPI QR for any profile updates. For prompts, browse available options, choose answers, and finalize selections. Send your selections, payment screenshot, and user ID to support via email.
    </Text>
  </View>
  <View style={styles.stepItem}>
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>2</Text>
    </View>
    <Text style={styles.stepText}>
      For photo submissions, pay ₹60 and attach your images along with the payment screenshot. Submit these to customer support for processing.
    </Text>
  </View>
  <View style={styles.stepItem}>
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>3</Text>
    </View>
    <Text style={styles.stepText}>
      To reset your rating, pay ₹30 and send the payment screenshot along with your user ID to customer support.
    </Text>
  </View>
</View>


          <View style={styles.supportSection}>
            <MaterialIcons name="email" size={24} color="#662d91" />
            <Text style={styles.supportText}>
              Customer Support Email: {SUPPORT_EMAIL}
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={require('C:/Users/91998/Desktop/MyApp/assets/kismetlimited.png')}
              style={styles.guidelineImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.okayButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.okayButtonText}>Okay</Text>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <MaterialIcons
              name="warning"
              size={48}
              color="#FF3B30"
              style={styles.warningIcon}
            />
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text style={styles.modalText}>
              To delete your account, you need to complete the payment process
              (₹100).
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setDeleteModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handlePayment}>
                <Text style={styles.confirmButtonText}>Proceed to Payment</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  scrollContainer: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  guidelineImage: {
    width: '100%',
    height: 300,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  guidelineText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
    color: '#333333',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 24,
  },
  reportSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
    color: '#333333',
  },
  emailText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
    marginLeft: 36,
  },
  deletionSteps: {
    marginTop: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#662d91',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 16,
    flex: 1,
    color: '#333333',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  okayButton: {
    backgroundColor: '#662d91',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  okayButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Delete Account Button Styles
  deleteAccountButton: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  deleteAccountButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  // Modal Styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  warningIcon: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#FF3B30',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    color: '#333333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    flex: 1,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#EEEEEE',
    marginRight: 8,
  },
  confirmButton: {
    backgroundColor: '#FF3B30',
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#333333',
    fontWeight: '600',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  // Input Styles
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
  },
  supportSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  supportText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333333',
  },
});

// Don't forget to import TextInput

export default GuidelinesScreen;
