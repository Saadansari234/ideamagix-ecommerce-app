// components/Header.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({ onFilterPress, onSortPress }) => {
  
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onFilterPress}>
        <Icon name="filter-outline" size={25} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSortPress}>
        <Icon name="swap-vertical-outline" size={25} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: 'white',
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default Header;
