// components/CustomCheckbox.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomCheckbox = ({ isChecked, onToggle, label }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle}>
      <View style={[styles.box, isChecked && styles.checked]}>
        {isChecked && <View style={styles.checkmark} />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checked: {
    backgroundColor: '#DB4444',
    borderColor: '#DB4444',
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  label: {
    fontSize: 16,
  },
});

export default CustomCheckbox;
