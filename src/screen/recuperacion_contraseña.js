import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const PasswordRecoveryForm = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        console.log('Correo electrónico enviado:', email);
        // Implementar lógica para enviar correo electrónico de recuperación de contraseña
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperación de contraseña</Text>

            <Text style={styles.instructions}>
                Ingresa el correo electrónico asociado a tu cuenta y te enviaremos un enlace
                para restablecer tu contraseña.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
            />


            <TouchableOpacity onPress={() => navigation.navigate('Verificacion')}>
                <Text>Enviar correo electrónico</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
                <Text style={styles.link}>Regresar al inicio de sesión</Text>
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
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    instructions: {
        textAlign: 'center',
        marginBottom: 10,
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
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: 10,
        borderRadius: 5,
    },
    link: {
        marginTop: 10,
        textAlign: 'center',
        color: '#0000FF',
    },
});

export default PasswordRecoveryForm;
