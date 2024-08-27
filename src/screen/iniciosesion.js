import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import Input from '../components/inputs/input';
import InputEmail from '../components/inputs/input_email';
import * as Constantes from '../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';

// Componente principal de la pantalla de inicio
export default function Inicio({ navigation }) {
    // Obtiene la IP desde las constantes
    const ip = Constantes.IP;

    // Definición de estados locales
    const [isContra, setIsContra] = useState(true); // Estado para manejar la visibilidad de la contraseña
    const [email, setEmail] = useState(''); // Estado para almacenar el email
    const [contrasenia, setPassword] = useState(''); // Estado para almacenar la contraseña

    // Efecto para cargar los detalles del carrito al cargar la pantalla o al enfocarse en ella
    useFocusEffect(
        // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
        React.useCallback(() => {
            validarSesion(); // Llama a la función validarSesion.
        }, [])
    );

    // Función para validar la sesión del usuario
    const validarSesion = async () => {
        try {
            // Realiza una solicitud GET para verificar la sesión del usuario
            const response = await fetch(`${ip}/tienda/api/servicios/publico/cliente.php?action=getUser`, {
                method: 'GET'
            });

            const data = await response.json();

            if (data.status === 1) {
                navigation.navigate('navigation'); // Navega a la pantalla principal si hay sesión activa
                console.log("Se ingresa con la sesión activa");
            } else {
                console.log("No hay sesión activa");
                return;
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al validar la sesión');
        }
    };

    // Función para cerrar la sesión del usuario
    const cerrarSesion = async () => {
        try {
            // Realiza una solicitud GET para cerrar la sesión del usuario
            const response = await fetch(`${ip}/tienda/api/servicios/publico/cliente.php?action=logOut`, {
                method: 'GET'
            });

            const data = await response.json();

            if (data.status) {
                console.log("Sesión Finalizada");
            } else {
                console.log('No se pudo eliminar la sesión');
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión con bryancito');
        }
    };

    // Función para iniciar sesión
    const Login = async () => {
        if (!email || !contrasenia) {
            Alert.alert('Error', 'Por favor ingrese su correo y contraseña');
            return;
        }

        try {
            // Crea un objeto FormData con los datos de inicio de sesión
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', contrasenia);

            // Realiza una solicitud POST para iniciar sesión
            const response = await fetch(`${ip}/tienda/api/servicios/publico/cliente.php?action=logIn`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status) {
                setPassword('');
                setEmail('');
                navigation.navigate('navigation'); // Navega a la pantalla principal si el inicio de sesión es exitoso
            } else {
                console.log(data);
                Alert.alert('Error sesión', data.error);
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
        }
    };

    // Efecto para validar la sesión cuando se monta el componente
    useEffect(() => { validarSesion() }, []);

    const irRecu = async () => {
        navigation.navigate('Recovery');
      };
      
    // Renderizado del componente
    return (
        <View style={styles.container}>
            <Image source={require('../imagenes/logo_login.png')} style={styles.profileImage} />
            <Text style={styles.title}>Inicio de sesión</Text>

            <InputEmail
                placeHolder={"Correo electronico"}
                setValor={email}
                setTextChange={setEmail}
            />

            <Input
                placeHolder={"Contraseña"}
                setValor={contrasenia}
                setTextChange={setPassword}
                contra={isContra}
            />

            <TouchableOpacity onPress={Login}>
                <Text style={styles.linkText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <Text style={styles.link}>¿No tienes cuenta?</Text>

            <TouchableOpacity onPress={() => navigation.navigate('crear_cuenta')}>
                <Text style={styles.linkText}>Crea una nueva cuenta</Text>
                <TouchableOpacity onPress={irRecu}><Text style={styles.textRegistrar}>¿Olvidastes tu contraseña?</Text></TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
}

// Estilos para el componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#328FE1',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    link: {
        marginTop: 10,
        textAlign: 'center',
        color: '#fff',
    },
    linkText: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    profileImage: {
        width: 300,
        height: 100,
        marginBottom: 20,
    },
    textRegistrar: {
        color: '#322C2B', fontWeight: '700',
        fontSize: 18,
        marginTop: 10
      },
});
