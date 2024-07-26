import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');

const truncateText = (text, limit, showMore, ) => {
  if (text.length > limit) {
    return showMore ? `${text.substring(0, limit)}... ` : `${text.substring(0, limit)}...`;
  }
  return text;
};

const Card1 = ({ image, title, description,price,category, addToCart, toDetails }) => {
  return (
    <View style={styles.card}>

      <View style={styles.imgContain}>
        <Image style={styles.img} source={{ uri: image }} />
      </View>

      <Text style={styles.title}>{truncateText(title, 20, false)}</Text>
      <Text style={styles.price}>${price}</Text>
      <Text style={styles.title}>{truncateText(category, 40, true)}</Text>
      <Text style={styles.desc}>{truncateText(description, 40, true)}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={addToCart}>
          <Text style={styles.main}>add to cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toDetails}>
          <Text style={[styles.main, styles.primary]}>see more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (width / 2) - 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    margin: 4,
    backgroundColor: '#fff',
  },
  imgContain: {
    marginTop: 10,
    width: "100%",
    height: 200,
    position: "relative",
    marginBottom: 20,
  },
  img: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
    width: '100%',
    height: "100%",
    resizeMode: "contain",
  },
  title: {
    color:"gray",
    // textAlign: "left",
    fontSize: 12,
    paddingLeft: 10,
  },
  price:{
    color:"#DB4444",
    fontSize: 12,
    paddingLeft: 10,
  },
  desc: {
    textAlign: "left",
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom:40,
  },
  buttons: {
    position:"absolute",
    bottom:0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  main: {
    backgroundColor: "#DB4444",
    padding: 5,
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    width: '100%',
  },
  primary: {
    backgroundColor: "#000000",
  },
});

export default Card1;
