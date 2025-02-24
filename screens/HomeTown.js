import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../RegistrationUtils';

const metroStations = [
  "L. B. Nagar", "Victoria Memorial", "Chaitanya Puri", "Dilsukhnagar", "Musarambagh", "New Market","Abids","Khairatabad",
  "Malakpet", "M.G.Bus Station", "Osmania College", "Gandhi Bhavan", "Nampally", "Assembly", "LakdikaPul","Bowenpally","Kompally",
  "Khairtabad", "Irrum Manzil", "Punjagutta", "Ameerpet", "S. R. Nagar", "ESI Hospital", "Erragadda", "Bharat Nagar",
  "Moosapet", "Balanagar", "Kukatpally", "KPHB Colony", "JNTU College", "Miyapur", "Falaknuma", "Shamsheer Gunj","Kokapet",
  "Shalibanda", "Charminar", "Salarjung Museum", "Sultan Bazar", "Narayanguda","HimayatNagar", "Chikkadapally", "RTC X Raods","Vanasthalipuram","Kothapet",
  "Musheerabad", "Gandhi Hospital", "Secunderabad West", "Nagole", "Uppal", "Stadium", "NGRI","Nacharam","Nalakunta","Medipatnam",
  ,"Habsiguda", "Tarnaka", "Mettuguda", "Secunderabad (East)", "Parade Grounds", "Paradise", "Rasoolpura", "Prakash Nagar",
  "Begumpet", "Madhura Nagar", "Yousufguda", "Road # 5 - Jubilee Hills", "Jubilee Hills Check Post", "Peddamma Temple","Banjara Hills",
  "Madhapur", "Durgam Cheruvu", "Hi-tech City", "Cyber Gateway", "RaiDurg","Sanikpuri","Marredpally","Koti","Kachiguda","Ramanthapur","GachiBowli"
];

const HomeTown = () => {
  const [hometown, setHometown] = useState('');
  const [filteredStations, setFilteredStations] = useState(metroStations);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Hometown').then(progressData => {
      if (progressData) {
        setHometown(progressData.hometown || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (hometown.trim() !== '') {
      saveRegistrationProgress('Hometown', { hometown });
    }
    navigation.navigate('Photos');
  };

  const normalizeString = (str) => {
    return str.toLowerCase().replace(/\s|\.|-/g, '');
  };

  const handleSearch = (text) => {
    setHometown(text);
    setShowDropdown(true);
    if (text.length === 0) {
      setFilteredStations(metroStations);
    } else {
      const normalizedText = normalizeString(text);
      const filtered = metroStations.filter(station =>
        normalizeString(station).includes(normalizedText)
      );
      setFilteredStations(filtered);
    }
  };

  const selectStation = (station) => {
    setHometown(station);
    setShowDropdown(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 90, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.iconContainer}>
            <FontAwesome name="home" size={28} color="black" />
          </View>
          <Text style={styles.title}>Where do you stay?</Text>
        </View>
        <Text style={styles.subtitle}>Kindly provide the area name.</Text>

        <TextInput
          value={hometown}
          onChangeText={handleSearch}
          autoFocus={true}
          style={styles.input}
          placeholder="Eg: Kukatpally"
          placeholderTextColor={'#BEBEBE'}
        />

        {showDropdown && filteredStations.length > 0 && (
          <FlatList
            data={filteredStations}
            keyExtractor={(item, index) => index.toString()}
            style={styles.dropdown}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectStation(item)} style={styles.dropdownItem}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        <TouchableOpacity onPress={handleNext} activeOpacity={0.8} style={styles.nextButton}>
          <MaterialCommunityIcons name="arrow-right-circle" size={45} color="maroon" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeTown;

const styles = StyleSheet.create({
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subtitle: {
    marginTop: 28,
    fontSize: 15,
    color: 'gray',
  },
  input: {
    width: 340,
    marginVertical: 10,
    fontSize: 22,
    marginTop: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  dropdown: {
    maxHeight: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  nextButton: {
    marginTop: 30,
    alignSelf: 'flex-end',

  },
});
