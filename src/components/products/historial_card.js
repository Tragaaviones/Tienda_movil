
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, ScrollView, SafeAreaView, Image, Card } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons'; // Importamos el ícono

export default function HistorialCard({ ip, imagenProducto, fechaProducto, nombreProducto, descripcionProducto
    , cantidadProducto
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
            <Text style={styles.textTitle}>Producto: <Text style={styles.textDentro}>{nombreProducto}</Text></Text>
            <Text style={styles.textTitle}>Descripcion: <Text style={styles.textDentro}>{descripcionProducto}</Text></Text>
            <Text style={styles.textTitle}>Fecha de compra: <Text style={styles.textDentro}>{fechaProducto}</Text></Text>
            <Text style={styles.textTitle}>Cantidad comprada: <Text style={styles.textDentro}>{cantidadProducto} {(cantidadProducto === 1) ? 'Unidad' : 'Unidades'}</Text></Text>
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
    textTitle: {
        fontSize: 16,
        marginBottom: 8, fontWeight: '700'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
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
});

