import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import Badge from '../common/AddtoCartBadge';
import LoginScreen from '../screens/LoginScreen';
import CartPage from '../screens/CartPage';
import { useNavigation } from '@react-navigation/native';
import Details from '../screens/Details';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  const [isSearchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation(); // Hook for navigation

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        autoFocus
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
    </View>
  );

  const renderIcons = () => (
    <View style={styles.iconContainer}>
      <View style={styles.cartIconContainer}>
        <Icon
          name="cart-outline"
          size={25}
          style={styles.icon}
          onPress={() => navigation.navigate('Cart')} // Use navigation hook here
        />
        <Badge />
      </View>
      <Icon
        name={isSearchActive ? "close-outline" : "search-outline"}
        size={25}
        style={styles.icon}
        onPress={() => setSearchActive(!isSearchActive)}
      />
    </View>
  );

  return (
    <Stack.Navigator>
    
      <Stack.Screen
        name="Home"
        options={{
          headerLeft: () => null, // Remove back arrow
          headerTitle: isSearchActive ? renderSearchBar : 'Home', // Change title as needed
          headerRight: () => renderIcons(),
        }}
      >
        {(props) => <HomeScreen {...props} searchTerm={searchTerm} />}
      </Stack.Screen>
     
    </Stack.Navigator>
  );
}


const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomeNavigator" component={HomeNavigator} options={{ headerShown: false }}  />
      <Stack.Screen name="Cart" component={CartPage} />
      <Stack.Screen name='Details' component={Details} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 95,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  cartIconContainer: {
    position: 'relative',
  },
});

export default Navigator;
