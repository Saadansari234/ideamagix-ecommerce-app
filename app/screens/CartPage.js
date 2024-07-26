import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { CartContext } from '../context/CartContext'; // Adjust the path as needed

const CartPage = ({navigation}) => {
  const { cart, removeFromCart } = useContext(CartContext);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>Quantity: {item.quantity}</Text>
        <Text>Price: ${item.price.toFixed(2)}</Text>
        <Text>Total: ${(item.price * item.quantity).toFixed(2)}</Text>
        <Text style={styles.seemoreButton}  onPress={() => navigation.navigate('Details', { item })} >
          See more
        </Text>
        <Text style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
          Remove
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCartItem}
        />
      ) : (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 10,
    width: 60,
    height: 60,
    position:"relative"
  },
  image: {
    width:"100%",
   height:"100%",
   objectFit:"contain",
   position:"absolute",
   right:0,
   left:0,
   bottom:0,
   top:0,
    borderRadius: 5,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButton: {
    color: 'red',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888',
  },
  seemoreButton:{
    color: 'green',
    marginTop: 8,
    textDecorationLine: 'underline',
  }
});

export default CartPage;
