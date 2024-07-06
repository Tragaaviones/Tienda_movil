import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const LoginForm = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [contraseña, setPassword] = useState('');

    const handleSubmit = () => {
        console.log('Formulario enviado:', { email, contraseña });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inicio de sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity onPress={() => navigation.navigate('pantalla_uno')}>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#000000',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    link: {
        marginTop: 10,
        textAlign: 'center',
        color: '#000000',
    },
    linkText: {
        color: '#2522AF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default LoginForm;
