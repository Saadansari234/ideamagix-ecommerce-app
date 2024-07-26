import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
const Badge = () => {
    const { getCartCount } = useContext(CartContext);
    const cartCount = getCartCount();
  return (
    <View style={styles.badgeContainer}>
        {
            cartCount > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              ):(
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>0</Text>
                </View>
              )
        }
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Badge;
