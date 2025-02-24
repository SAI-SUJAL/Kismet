import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LikesScreen from '../screens/LikesScreen';
import {NavigationContainer} from '@react-navigation/native';
import BasicInfo from '../screens/BasicInfo';
import NameScreen from '../screens/NameScreen';
import EmailScreen from '../screens/EmailScreen';
import PasswordScreen from '../screens/PasswordScreen';
import BirthScreen from '../screens/BirthScreen';
import GenderScreen from '../screens/GenderScreen';
import TypeScreen from '../screens/TypeScreen';
import DatingType from '../screens/DatingType';
import LookingFor from '../screens/LookingFor';
import PhotosScreen from '../screens/PhotosScreen';
import PromptScreen from '../screens/PromptScreen';
import ShowPromptScreen from '../screens/ShowPromptScreen';
import PreFinalScreen from '../screens/PreFinalScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import Login from '../screens/Login';
import EXPOCAM from '../screens/EXPOCAM';
import InputScreen from '../screens/InputScreen';
import VerificationResult from '../screens/VerificationResult';
import HomeTown from '../screens/HomeTown';
import AnimationScreen from '../screens/AnimationScreen';
import ChatRoom from '../screens/ChatRoom';
import SendLikeScreen from '../screens/SendLikeScreen';
import ProfileDetailsScreen from '../screens/ProfileDetailsScreen';
import HandleLikeScreen from '../screens/HandleLikeScreen';
import {AuthContext} from '../AuthContext';
import {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CraftAIMessage from '../screens/CraftAIMessage';
import GuideLinesScreen from '../screens/GuideLinesScreen';
import YearScreen from '../screens/YearScreen';
import MentalHealthChatbot from '../screens/MentalHealthChatbot';
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const {token, setToken} = useContext(AuthContext);
  // const {isLoading, token, logout} = useContext(AuthContext);
  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarStyle: {backgroundColor: '#101010'},

            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <MaterialCommunityIcons name="home" size={35} color="white" />
              ) : (
                <MaterialCommunityIcons
                  name="home"
                  size={35}
                  color="#989898"
                />
              ),
          }}
        />
        <Tab.Screen
          name="Likes"
          component={LikesScreen}
          options={{
            tabBarStyle: {backgroundColor: '#101010'},

            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Entypo name="heart" size={30} color="white" />
              ) : (
                <Entypo name="heart" size={30} color="#989898" />
              ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarStyle: {backgroundColor: '#101010'},

            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <MaterialIcons
                  name="chat-bubble-outline"
                  size={30}
                  color="white"
                />
              ) : (
                <MaterialIcons
                  name="chat-bubble-outline"
                  size={30}
                  color="#989898"
                />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarStyle: {backgroundColor: '#101010'},

            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons
                  name="person-circle-outline"
                  size={30}
                  color="white"
                />
              ) : (
                <Ionicons
                  name="person-circle-outline"
                  size={30}
                  color="#989898"
                />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Basic"
          component={BasicInfo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InputScreen"
          component={InputScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="expocam"
          component={EXPOCAM}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerificationResult"
          component={VerificationResult}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Name"
          component={NameScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Year"
          component={YearScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Password"
          component={PasswordScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Birth"
          component={BirthScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Gender"
          component={GenderScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Type"
          component={TypeScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Dating"
          component={DatingType}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="LookingFor"
          component={LookingFor}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeTown"
          component={HomeTown}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Photos"
          component={PhotosScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Prompts"
          component={PromptScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ShowPrompts"
          component={ShowPromptScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="PreFinal"
          component={PreFinalScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };
  const Welcomestack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };
  const MainStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{
            gestureEnabled: false, // Prevents going back
          }}
        />
        <Stack.Screen
          name="Animation"
          component={AnimationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CraftAI"
          component={CraftAIMessage}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Details"
          component={ProfileDetailsScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="SendLike"
          component={SendLikeScreen}
          options={{headerShown: false}}
        />
           <Stack.Screen
          name="HandleLike"
          component={HandleLikeScreen}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
        />
         <Stack.Screen
          name="Guidelines"
          component={GuideLinesScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Mental"
          component={MentalHealthChatbot}
          options={{headerShown: false}}
        />
        

      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      {!token ? <Welcomestack /> : <MainStack />}
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
