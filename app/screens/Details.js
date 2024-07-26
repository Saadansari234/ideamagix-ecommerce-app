import React, { useContext, useState, } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Modal, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext'; // Adjust the path if necessary

const Details = ({ route, navigation }) => {
    const { item } = route.params;
    const { isGuest, token } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', address: '' });

    const handlePlaceOrder = () => {
        if (token) {
            Alert.alert('Order Success', 'Your order has been placed successfully.');
        } else if (isGuest) {
            setModalVisible(true);
        } else {
            Alert.alert('Error', 'Please log in to place an order.');
        }
    };

    const handleFormSubmit = () => {
        // Handle form submission logic here
        Alert.alert('Order Success', 'Your order has been placed successfully.');
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>Description: {item.description}</Text>
            <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
            <View style={styles.starcontainer}>
                <Icon name="star" size={20} color="#FFD700" />
                <Icon name="star" size={20} color="#FFD700" />
                <Icon name="star" size={20} color="#FFD700" />
                <Icon name="star" size={20} color="#FFD700" />
                <Icon name="star" size={20} color="#FFD700" />
            </View>
            <Text>Category: {item.category}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
                    <Text style={styles.main}>Place Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={[styles.main, styles.primary]} onPress={()=>navigation.navigate('HomeNavigator')}>Go Back</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for guest form */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Enter your details</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={formData.name}
                            onChangeText={(text) => setFormData({ ...formData, name: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={formData.email}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            value={formData.address}
                            onChangeText={(text) => setFormData({ ...formData, address: text })}
                        />
                        <Button title="Submit" style={styles.modalbutton} onPress={handleFormSubmit} />
                        <Button title="Cancel"  style={styles.modalbutton} onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: 200,
        objectFit: "contain",
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    price: {
        color: "#DB4444",
        marginVertical: 10,
    },
    desc: {
        color: "gray",
        fontSize:12,
    },
    starcontainer: {
        flexDirection: "row",
    },
    main: {
        marginTop: 20,
        backgroundColor: "#DB4444",
        padding: 10,
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        width: '100%',
        borderRadius: 5,
    },
    primary: {
        backgroundColor: "#000000",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
    button:{
        marginVertical:5,
    },
    modalbutton:{
        marginVertical:5,
    }
});

export default Details;
