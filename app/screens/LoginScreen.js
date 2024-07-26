// LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert,TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
const LoginScreen = ({ navigation }) => {
    const { login, useGuestAccount } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError]=useState(false)
    useEffect(() => {
        const checkLoginStatus = async () => {
            const guestStatus = await AsyncStorage.getItem('isGuest');
            const UserStatus = await AsyncStorage.getItem('token');
            if (guestStatus === 'true' || UserStatus !== "") {
                navigation.navigate('HomeNavigator');
            }
        };
        checkLoginStatus();
    }, []);

    const handleLogin = async () => {
        const result = await login(username, password);
        if (result.success) {
            // Alert.alert('Login successful!');
            navigation.navigate('HomeNavigator');
            setError(false)
        } else {
            // Alert.alert('Login failed', result.message);
            setError(true)
        }
    };

    const handleGuest = async () => {
        await useGuestAccount();
        navigation.navigate('HomeNavigator');
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {
            error ? (<Text style={styles.errror}>username or password is wrong</Text>):null
        }
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.guestButton} onPress={handleGuest}>
          <Text style={styles.guestButtonText}>Use a guest account</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 40,
      color: '#333',
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#DB4444',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    guestButton: {
      width: '100%',
      height: 50,
      borderColor: '#DB4444',
      borderWidth: 2,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    guestButtonText: {
      color: '#DB4444',
      fontSize: 18,
      fontWeight: 'bold',
    },
    errror:{
    color:"red"
    }
  });
export default LoginScreen;
