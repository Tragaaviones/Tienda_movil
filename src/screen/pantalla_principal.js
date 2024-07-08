//Importaciones 

import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import { useEffect, useState } from 'react';
import * as Constantes from '../utils/constantes'


// Contenido de la página principal
export default function Home({ navigation }) {

    const [nombre, setNombre] = useState(null);
    const ip = Constantes.IP;

    const handleLogout = async () => {
        try {
            const response = await fetch(`${ip}/tienda/api/servicios/publico/cliente.php?action=logOut`, {
                method: 'GET'
            });

            const data = await response.json();

            if (data.status) {
                navigation.navigate('Inicio');
            } else {
                console.log(data);
                // Alert the user about the error
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
        }
    };

    const getUser = async () => {
        try {
            const response = await fetch(`${ip}/tienda/api/servicios/publico/cliente.php?action=getUser`, {
                method: 'GET'
            });

            const data = await response.json();

            console.log(data.name.nombre_cliente)
            if (data.status) {
                //codigo para mostrar el correo del usuario
                //setCorreo(data.username)
                //codigo para mostrar el nombre del usuario
                setNombre(data.name.nombre_cliente)

            } else {
                console.log(data);
                // Alert the user about the error
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
        }
    };

    useEffect(() => {
        getUser();
    }, [])

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Image source={require('../imagenes/Logo.png')} style={styles.logo} />
                <TextInput style={styles.searchInput} placeholder="Buscar productos..." />
                <TouchableOpacity style={styles.cartIcon}>

                </TouchableOpacity>

            </View>

            <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.buttonText}>Añadir al Carrito</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.container}>
                {[1, 2, 3, 4].map((item, index) => (
                    <Card key={index} containerStyle={styles.card}>
                        <Card.Image style={styles.productImage} source={require('../imagenes/botas8.jpg')} />
                        <Card.Divider />
                        <Text style={styles.productName}>Producto {item}</Text>
                        <Text style={styles.productPrice}>$10.00</Text>
                        <TouchableOpacity style={styles.button} onPress={() => { /* lógica para añadir al carrito */ }}>
                            <Text style={styles.buttonText}>Añadir al Carrito</Text>
                        </TouchableOpacity>
                    </Card>
                ))}
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => { /* lógica para navegar a Home */ }}>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => { /* lógica para navegar a otra pantalla */ }}>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('pantalla_principal')}>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => { /* lógica para navegar a otra pantalla */ }}>

                </TouchableOpacity>
            </View>
        </View>
    );
}

//Se comienza el código css
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingTop: 35,
    },
    logo: {
        width: 50,
        height: 50,
    },
    searchInput: {
        flex: 1,
        marginLeft: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    cartIcon: {
        marginLeft: 16,
    },
    container: {
        padding: 16,
        margin: 20,
        alignItems: 'center',
    },
    card: {
        width: '100%',
        marginBottom: 16,
    },
    productImage: {
        height: 150,
        resizeMode: 'cover',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    productPrice: {
        fontSize: 16,
        color: '#888',
        marginVertical: 8,
    },
    button: {
        backgroundColor: '#00B207',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
});
