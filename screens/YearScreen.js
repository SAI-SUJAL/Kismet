import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import { useNavigation } from '@react-navigation/native';
  import { getRegistrationProgress, saveRegistrationProgress } from '../RegistrationUtils';
  
  const YearScreen = () => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const navigation = useNavigation();
  
    useEffect(() => {
      getRegistrationProgress('Year').then(progressData => {
        if (progressData) {
          setSelectedYear(progressData.year || '');
          setSelectedSection(progressData.section || '');
          setSelectedBranch(progressData.branch || '');
        }
      });
    }, []);
  
    const handleNext = () => {
        let formattedString = '';
      
        if (selectedYear === 'Alumni') {
          formattedString = 'Alumni';
        } else if (selectedYear && selectedSection && selectedBranch) {
          formattedString = `${selectedYear} ${selectedBranch} - ${selectedSection}`;
        }
      
        if (formattedString) {
          saveRegistrationProgress('Year', { formattedString });
        }
      
        navigation.navigate('Birth');
      };
      
  
    const yearOptions = ['1st year', '2nd year', '3rd year', '4th year', 'Alumni'];
    const sectionOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const branchOptions = ['CSE', 'CSM', 'IT','CSD', 'ECE', 'EEE'];
  
    const renderOptions = (options, selectedValue, setSelectedValue) => (
      options.map(option => (
        <TouchableOpacity
          key={option}
          onPress={() => setSelectedValue(option)}
          style={{
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: selectedValue === option ? '#800000' : 'gray',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: selectedValue === option ? '#800000' : 'black',
              fontWeight: selectedValue === option ? 'bold' : 'normal',
            }}>
            {option}
          </Text>
        </TouchableOpacity>
      ))
    );
  
    return (
        <ScrollView>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ marginTop: 20, marginHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                borderWidth: 2,
                borderColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SimpleLineIcons name="graduation" size={26} color="black" />
              
            </View>
            <Image
              style={{ width: 100, height: 40 }}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
              }}
            />
          </View>
          <Text style={{ fontSize: 23, fontWeight: 'bold', marginTop: 15 }}>
            Select Your Academic Details
          </Text>
          
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Year</Text>
          {renderOptions(yearOptions, selectedYear, setSelectedYear)}
          
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Section</Text>
          {renderOptions(sectionOptions, selectedSection, setSelectedSection)}
          
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Branch</Text>
          {renderOptions(branchOptions, selectedBranch, setSelectedBranch)}
          
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            style={{ marginTop: 30, marginLeft: 'auto' }}>
            <MaterialCommunityIcons
              name="arrow-right-circle"
              size={45}
              color="#800000"
              style={{ alignSelf: 'center', marginBottom: 30 }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView></ScrollView>
    );
  };
  
  export default YearScreen;
  
  const styles = StyleSheet.create({});
