import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Axios to handle API requests

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState(''); // ✅ Added userId state
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading as true

  // Function to check if user is logged in
  const isLoggedIn = async () => {
    try {
      const userToken = await AsyncStorage.getItem('token');
      const storedUserId = await AsyncStorage.getItem('userId'); // ✅ Retrieve userId
      if (userToken) {
        setToken(userToken);
        if (storedUserId) setUserId(storedUserId); // ✅ Set userId if exists
      }
      setIsLoading(false);
    } catch (error) {
      console.log('Error checking login status:', error);
      setIsLoading(false);
    }
  };

  // Function to handle login
  const login = async (rollNumber, password) => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        rollNumber,
        password,
      });

      // Save token & userId in AsyncStorage and state
      const { token: userToken, userId: fetchedUserId } = response.data;
      await AsyncStorage.setItem('token', userToken);
      await AsyncStorage.setItem('userId', fetchedUserId); // ✅ Store userId
      setToken(userToken);
      setUserId(fetchedUserId); // ✅ Update userId in state
    } catch (error) {
      console.log('Login failed:', error);
      throw error; // Handle login errors in UI
    }
  };

  // Function to handle logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Remove token
      await AsyncStorage.removeItem('userId'); // ✅ Remove userId
      setToken('');
      setUserId(''); // ✅ Clear userId
    } catch (error) {
      console.log('Logout failed:', error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        userId, // ✅ Provide userId in context
        isLoading,
        setToken,
        setUserId, // ✅ Provide setUserId function
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
