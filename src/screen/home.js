import React, { useEffect, useState } from 'react';
// Importa React y hooks de React (useEffect, useState).
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
// Importa componentes de React Native.
import Buttons from '../components/Buttons/buttoon';
// Importa un componente personalizado llamado Buttons.
import * as Constantes from '../utils/constantes';
// Importa constantes de un archivo local.

export default function Home({ navigation }) {
    // Define el componente Home que recibe navigation como prop.
    const [nombre, setNombre] = useState(null);
    // Estado para almacenar el nombre del usuario.
    const ip = Constantes.IP;
    // Obtiene la IP del archivo de constantes.

    const Cerrar = async () => {
        // Función para manejar el cierre de sesión.
        try {
            const response = await fetch(`${ip}/tienda/api/servicios/publico/cliente.php?action=logOut`, {
                method: 'GET'
            });
            // Realiza una solicitud GET para cerrar la sesión.

            const data = await response.json();
            // Convierte la respuesta a formato JSON.

            if (data.status) {
                navigation.navigate('Inicio');
                // Navega a la pantalla de inicio si la respuesta es exitosa.
            } else {
                console.log(data);
                // Muestra el error en la consola.
                Alert.alert('Error', data.error);
                // Muestra una alerta con el error.
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
            // Muestra una alerta si ocurre una excepción.
        }
    };

    const getUser = async () => {
        // Función para obtener los datos del usuario.
        try {
            const response = await fetch(`${ip}/tienda/api/servicios/publico/cliente.php?action=getUser`, {
                method: 'GET'
            });
            // Realiza una solicitud GET para obtener los datos del usuario.

            const data = await response.json();
            // Convierte la respuesta a formato JSON.

            console.log(data.name.nombre_cliente)
            // Muestra el nombre del cliente en la consola.
            if (data.status) {
                setNombre(data.name.nombre_cliente);
                // Actualiza el estado con el nombre del usuario.
            } else {
                console.log(data);
                // Muestra el error en la consola.
                Alert.alert('Error', data.error);
                // Muestra una alerta con el error.
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al obtener los datos del usuario');
            // Muestra una alerta si ocurre una excepción.
        }
    };

    useEffect(() => {
        getUser();
    }, [])
    // useEffect se usa para ejecutar getUser cuando el componente se monta.

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenid@</Text>
            {/* Título de bienvenida */}
            <Text style={styles.subtitle}>
                {nombre ? nombre : 'No hay Nombre para mostrar'}
                {/* Muestra el nombre del usuario o un mensaje por defecto si no hay nombre */}
            </Text>
            <Buttons
                textoBoton='Cerrar Sesión'
                accionBoton={Cerrar}
            />
            {/* Botón para cerrar sesión */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // Estilo para el contenedor principal
    image: {
        width: 100,
        height: 100,
        marginBottom: 10
    },
    // Estilo para las imágenes
    button: {
        borderWidth: 2,
        borderColor: "black",
        width: 100,
        borderRadius: 10,
        backgroundColor: "darkblue"
    },
    // Estilo para los botones
    buttonText: {
        textAlign: 'center',
        color: "white"
    },
    // Estilo para el texto de los botones
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
        color: '#5C3D2E', // Color marrón para el título
    },
    // Estilo para el título
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 5,
        color: '#5C3D2E', // Color marrón para el subtítulo
    },
    // Estilo para el subtítulo
});
