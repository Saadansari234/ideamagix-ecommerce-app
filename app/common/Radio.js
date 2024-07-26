// components/CustomRadioButton.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomRadioButton = ({ isSelected, onPress, label }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.radioButton}>
        {isSelected ? <View style={styles.radioButtonIcon} /> : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonIcon: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  label: {
    fontSize: 16,
  },
});

export default CustomRadioButton;
