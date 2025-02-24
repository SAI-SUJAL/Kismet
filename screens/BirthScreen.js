import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../RegistrationUtils';
const BirthScreen = () => {
  const navigation = useNavigation();
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  
  const handleDayChange = text => {
    setDay(text);
    if (text.length == 2) {
      monthRef.current.focus();
    }
  };
  const handleMonthChange = text => {
    setMonth(text);
    if (text.length == 2) {
      yearRef.current.focus();
    }
  };
  const handleYearChange = text => {
    setYear(text);
  };
  useEffect(() => {
    getRegistrationProgress('Birth')
      .then(progressData => {
        console.log("Retrieved progressData:", progressData); // Debugging step
        
        if (progressData?.dateOfBirth) {
          const dateParts = progressData.dateOfBirth.split('/');
  
          if (dateParts.length === 3) { // Ensure it's a valid date format
            const [dayValue, monthValue, yearValue] = dateParts;
            setDay(dayValue || '');   // Prevent undefined values
            setMonth(monthValue || '');
            setYear(yearValue || '');
          }
        }
      })
      .catch(error => console.error("Error fetching registration progress:", error));
  }, []);
  
  const handleNext = () => {
    if (day.trim() !== '' && month.trim() !== '' && year.trim() !== '') {
      // Construct the date string in the desired format
      const dateOfBirth = `${day}/${month}/${year}`;

      // Save the current progress data including the date of birth
      saveRegistrationProgress('Birth', {dateOfBirth});
    navigation.navigate('Gender');
  }};
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 90, marginHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22, // Makes the view circular
              borderWidth: 2, // Border width around the circle
              borderColor: 'black', // Border color around the circle
              justifyContent: 'center', // Centers the icon vertically
              alignItems: 'center', // Centers the icon horizontally
            }}>
            <MaterialCommunityIcons
              name="cake-variant-outline"
              size={26}
              color="black"
            />
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
          What's your date of birth?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 80,
            justifyContent: 'center',
          }}>
          <TextInput
            autoFocus={true}
            placeholder="DD"
            maxlength={2}
            keyboardType="numeric"
            value={day}
            onChangeText={handleDayChange}
            style={{
              width: 60,
              fontWeight: 'bold',

              borderBottomColor: 'black', // Change underline color here
              borderBottomWidth: 1, // Proper casing for underline thickness
              padding: 10, // Proper casing for padding
              fontFamily: 'GeezaPro-Bold',
              fontSize: day ? 20 : 20, // Dynamic font size logic (unchanged here)
            }}
          />
          <TextInput
            ref={monthRef}
            placeholder="MM"
            maxlength={2}
            keyboardType="numeric"
            value={month}
            onChangeText={handleMonthChange}
            style={{
              width: 60,
              fontWeight: 'bold',
              borderBottomColor: 'black', // Change underline color here
              borderBottomWidth: 1, // Proper casing for underline thickness
              padding: 10, // Proper casing for padding
              fontFamily: 'GeezaPro-Bold',
              fontSize: month ? 20 : 20, // Dynamic font size logic (unchanged here)
            }}
          />
          <TextInput
            ref={yearRef}
            placeholder="YYYY"
            maxlength={4}
            keyboardType="numeric"
            value={year}
            onChangeText={handleYearChange}
            style={{
              width: 75,
              fontWeight: 'bold',
              borderBottomColor: 'black', // Change underline color here
              borderBottomWidth: 1, // Proper casing for underline thickness
              padding: 10, // Proper casing for padding
              fontFamily: 'GeezaPro-Bold',
              fontSize: year ? 20 : 20, // Dynamic font size logic (unchanged here)
            }}
          />
        </View>
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{marginTop: 30, marginLeft: 'auto'}}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color="#800000"
            style={{alignSelf: 'center', marginTop: 20}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BirthScreen;

const styles = StyleSheet.create({});
