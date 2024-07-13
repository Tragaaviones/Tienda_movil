import React, { useState } from 'react';
// Importa React y el hook useState.
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
// Importa componentes de React Native.

const PasswordRecoveryForm = ({ navigation }) => {
    // Define el componente PasswordRecoveryForm que recibe navigation como prop.
    const [email, setEmail] = useState('');
    // Estado para almacenar el correo electrónico.

    const handleSubmit = () => {
        console.log('Correo electrónico enviado:', email);
        // Lógica para enviar el correo electrónico de recuperación de contraseña.
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperación de contraseña</Text>
            {/* Título de la pantalla */}

            <Text style={styles.instructions}>
                Ingresa el correo electrónico asociado a tu cuenta y te enviaremos un enlace
                para restablecer tu contraseña.
            </Text>
            {/* Instrucciones para el usuario */}

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
            />
            {/* Campo de entrada para el correo electrónico */}

            <TouchableOpacity onPress={() => navigation.navigate('Verificacion')}>
                <Text>Enviar correo electrónico</Text>
            </TouchableOpacity>
            {/* Botón para enviar el correo electrónico */}

            <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
                <Text style={styles.link}>Regresar al inicio de sesión</Text>
            </TouchableOpacity>
            {/* Enlace para regresar a la pantalla de inicio de sesión */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECA876',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    // Estilo para el contenedor principal
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    // Estilo para el logo (no se usa en este código, pero está definido)
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    // Estilo para el título
    instructions: {
        textAlign: 'center',
        marginBottom: 10,
    },
    // Estilo para las instrucciones
    input: {
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    // Estilo para el campo de entrada
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: 10,
        borderRadius: 5,
    },
    // Estilo para el botón (no se usa en este código, pero está definido)
    link: {
        marginTop: 10,
        textAlign: 'center',
        color: '#0000FF',
    },
    // Estilo para el enlace
});

export default PasswordRecoveryForm;
// Exporta el componente PasswordRecoveryForm.
