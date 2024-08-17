import React, { useState, useEffect, useCallback } from 'react'; // Importa React y algunos hooks de React
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../utils/constantes'; // Importa constantes desde un archivo local
import { StyleSheet, Text, View, Image, Alert, SafeAreaView, FlatList } from 'react-native'; // Importa componentes de React Native
import HistorialCard from '../components/products/historial_card';
import Constants from 'expo-constants';

export default function Historial() {
    const ip = Constantes.IP; // Asigna la IP desde las constantes a una variable local
    const [dataHistorial, setDataHistorial] = useState([]); // Almacena los productos

    // Función para obtener los productos de una categoría específica
    const getProductos = async () => {
        try {
            const response = await fetch(`${ip}/tienda/api/servicios/publico/pedido.php?action=history`, {
                method: 'GET',
            });
            const data = await response.json();
            if (data.status) {
                setDataHistorial(data.dataset);
            } else {
                Alert.alert('Error productos', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al listar sus pedidos');
        }
    };

    // Hook useEffect para obtener los productos y categorías al cargar el componente
    useEffect(() => {
        getProductos();
    }, []);

        // Ejecuta fillList cuando la pantalla recibe foco
        useFocusEffect(
            useCallback(() => {
                getProductos();
            }, [])
        );

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.subtitle}>
                    Historial de compras
                </Text>
            </View>
            <View style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={dataHistorial}
                        keyExtractor={(item) => item.id_producto}
                        renderItem={({ item }) => (
                            <HistorialCard
                                ip={ip}
                                imagenProducto={item.imagen}
                                fechaProducto={item.fecha_venta}
                                nombreProducto={item.nombre_producto}
                                descripcionProducto={item.descripcion}
                                cantidadProducto={item.cantidad_producto}
                            />
                        )}
                    />
                </SafeAreaView>
                <View style={styles.footer}>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#B6D6F0'
    },
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 40,
        borderTopWidth: 1,
        borderTopColor: '#ECA876',
    },
    header: {
        alignItems: 'center',
        padding: 6,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingTop: 35,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 5,
        marginHorizontal: 5,
        color: '#000',
    },
});
