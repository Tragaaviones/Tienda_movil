import { useState, useEffect } from 'react';
import * as Constantes from '../utils/constantes'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';

export default function Perfil() {
    const ip = Constantes.IP;
    const [perfil, setPerfil] = useState(null);

    const readProfile = async () => {
        try {
            const response = await fetch(`${ip}/tienda/api/servicios/publico/cliente.php?action=readProfile`, {
                method: 'GET',
            });

            const data = await response.json();

            if (data.status) {
                setPerfil(data.dataset);
            } else {
                Alert.alert('Error', data.error);
                console.log(data.error)
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al obtener los datos del perfil');
        }
    };

    useEffect(() => {
        readProfile();
    }, []);

    return (
        <View style={styles.container}>
            {perfil ? (
                <>
                    <Image source={require('../imagenes/login.png')} style={styles.profileImage} />
                    <Text style={styles.title}>Perfil</Text>
                    <Text style={styles.input}>Nombre usuario: {perfil.nombre_cliente}</Text>
                    <Text style={styles.input}>Apellido usuario: {perfil.apellido_cliente}</Text>
                    <Text style={styles.input}>Correo electronico: {perfil.correo_cliente}</Text>
                    <Text style={styles.input}>Telefono: {perfil.telefono_cliente}</Text>
                    <Text style={styles.input}>Dirección: {perfil.direccion_cliente}</Text>
                </>
            ) : (
                <Text>Cargando...</Text>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.updateButton]}>
                    <Text style={styles.buttonText}>Actualizar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECA876',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 2
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 20,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#000',
        backgroundColor: '#fff',
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 10,
        padding: 8
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#ff4d4d',
    },
    updateButton: {
        backgroundColor: '#4da6ff',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
