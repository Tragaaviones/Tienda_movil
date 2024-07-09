import React, { useState } from 'react';
// Importa React y el hook useState para manejar el estado del componente.
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
// Importa componentes de React Native para crear la interfaz de usuario.

const PasswordRecoveryForm = ({ navigation }) => {
    // Define el componente PasswordRecoveryForm que recibe la prop `navigation` para la navegación entre pantallas.
    const [codigo, setCodigo] = useState('');
    // Declara un estado `codigo` con su respectiva función de actualización `setCodigo` usando el hook useState.

    const handleSubmit = () => {
        // Define la función handleSubmit que se ejecutará al enviar el formulario.
        console.log('Código aceptado:', codigo);
        // Imprime el código ingresado en la consola.
        // Aquí se debe implementar la lógica para verificar el código de recuperación.
    };

    return (
        <View style={styles.container}>
            {/* Contenedor principal con estilos aplicados */}
            <Text style={styles.title}>Recuperación de contraseña</Text>
            {/* Título de la pantalla */}

            <Text style={styles.instructions}>
                Ingresa el código que se envió a tu correo electrónico, asi podras
                cambiar de contraseña
            </Text>
            {/* Instrucciones para el usuario */}

            <TextInput
                style={styles.input}
                placeholder="Código"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => setCodigo(text)}
            />
            {/* Campo de entrada para el código de recuperación */}

            <TouchableOpacity onPress={() => navigation.navigate('cambiar_contraseña')}>
                <Text>Verificar código</Text>
            </TouchableOpacity>
            {/* Botón para verificar el código */}

            <TouchableOpacity onPress={() => navigation.navigate('Recuperacion')}>
                <Text style={styles.link}>Regresar al inicio de sesión</Text>
            </TouchableOpacity>
            {/* Enlace para regresar a la pantalla de recuperación */}
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
    // Estilo para el contenedor principal.
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    // Estilo para el logo (no se usa en este código, pero está definido).
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    // Estilo para el título.
    instructions: {
        textAlign: 'center',
        marginBottom: 10,
    },
    // Estilo para las instrucciones.
    input: {
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    // Estilo para el campo de entrada.
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: 10,
        borderRadius: 5,
    },
    // Estilo para el botón (no se usa en este código, pero está definido).
    link: {
        marginTop: 10,
        textAlign: 'center',
        color: '#0000FF',
    },
    // Estilo para el enlace.
});

export default PasswordRecoveryForm;
// Exporta el componente PasswordRecoveryForm.
