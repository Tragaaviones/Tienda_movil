import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import Input from '../components/inputs/input'
import InputEmail from '../components/inputs/input_email'
import * as Constantes from '../utils/constantes'
import { useFocusEffect } from '@react-navigation/native';

export default function Inicio({ navigation }) {

    const ip = Constantes.IP;

    const [isContra, setIsContra] = useState(true)
    const [email, setEmail] = useState('');
    const [contrasenia, setPassword] = useState('');

    // Efecto para cargar los detalles del carrito al cargar la pantalla o al enfocarse en ella
    useFocusEffect(
        // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
        React.useCallback(() => {
            validarSesion(); // Llama a la función getDetalleCarrito.
        }, [])
    );

    const validarSesion = async () => {
        try {
            const response = await fetch(`${ip}/tienda/api/servicios/publico/cliente.php?action=getUser`, {
                method: 'GET'
            });

            const data = await response.json();

            if (data.status === 1) {
                navigation.navigate('navigation');
                console.log("Se ingresa con la sesión activa")
            } else {
                console.log("No hay sesión activa")
                return
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al validar la sesión');
        }
    }

    const cerrarSesion = async () => {
        try {
            const response = await fetch(`${ip}/tienda/api/servicios/publico/cliente.php?action=logOut`, {
                method: 'GET'
            });

            const data = await response.json();

            if (data.status) {
                console.log("Sesión Finalizada")
            } else {
                console.log('No se pudo eliminar la sesión')
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión con bryancito');
        }
    }

    const Login = async () => {
        if (!email || !contrasenia) {
            Alert.alert('Error', 'Por favor ingrese su correo y contraseña');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', contrasenia);

            const response = await fetch(`${ip}/tienda/api/servicios/publico/cliente.php?action=logIn`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status) {
                setPassword('')
                setEmail('')
                navigation.navigate('navigation');
            } else {
                console.log(data);
                Alert.alert('Error sesión', data.error);
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
        }
    };

    useEffect(() => { validarSesion() }, [])

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

            <TouchableOpacity onPress={() => navigation.navigate('Recuperacion')}>
                <Text style={styles.link}>¿Olvidaste la contraseña?</Text>
            </TouchableOpacity>

            <Text style={styles.link}>¿No tienes cuenta?</Text>

            <TouchableOpacity onPress={() => navigation.navigate('crear_cuenta')}>
                <Text style={styles.linkText}>Crea una nueva cuenta</Text>
            </TouchableOpacity>
        </View>
    );
};

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
});

