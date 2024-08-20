
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, ScrollView, SafeAreaView, Image, Card } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons'; // Importamos el ícono
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

//recibimos por props la imagen del producto, nombre, precio y otras propiedades de productos para mostrarlas en el componente de 
//productoCard


export default function ProductoCard({ ip, imagenProducto, idProducto, nombreProducto, descripcionProducto
    , precioProducto, existenciasProducto, accionBotonProducto
}) {

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: `${ip}/tienda/api/imagenes/productos/${imagenProducto}` }}
                    style={styles.image}
                    resizeMode="contain" // Ajustar la imagen al contenedor
                />
            </View>
            <Text style={styles.textTitle}>{nombreProducto}</Text>
            <Text style={styles.text}>{descripcionProducto}</Text>
            <Text style={styles.textTitle}>Precio: <Text style={styles.textDentro}>${precioProducto}</Text></Text>
            <Text style={styles.textTitle}>Existencias: <Text style={styles.textDentro}>{existenciasProducto} {(existenciasProducto === 1) ? 'Unidad' : 'Unidades'}</Text></Text>
            <TouchableOpacity
                style={styles.cartButton}
                onPress={accionBotonProducto}>
                <FontAwesome name="plus-circle" size={24} color="white" />
                <Text style={styles.cartButtonText}>Agregar al carrito</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.cartButton}>
                <MaterialCommunityIcons name="comment-text-multiple-outline" size={24} color="white" />
                <Text style={styles.cartButtonText}>Comentarios y valoraciones</Text>
            </TouchableOpacity>
        </View>

    );
}


const styles = StyleSheet.create({
    containerFlat: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 0,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 10,
        marginVertical: 15,
        marginHorizontal: 30,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    textTitle: {
        fontSize: 16,
        marginBottom: 8, fontWeight: '700'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        marginLeft: 8,
    },
    button: {
        backgroundColor: '#00B207',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600'
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
        marginBottom: 12,
    },
    imageContainer: {
        alignItems: 'center', // Centrar imagen horizontalmente
    }, textDentro: {
        fontWeight: '400'
    },
    cartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00B207',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    cartButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
        textAlign: 'center'
    },
});

