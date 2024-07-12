import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Definición del componente ResetPasswordForm
const ResetPasswordForm = ({ navigation }) => {
    // Definición de estados para manejar las contraseñas
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = () => {
        console.log('Nueva contraseña:', newPassword);
        console.log('Confirmar contraseña:', confirmPassword);
        // Implementar lógica para restablecer la contraseña
    };

    // Retorno del JSX que define la UI del componente
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Restablecer contraseña</Text>

            <Text style={styles.instructions}>
                Ingresa tu nueva contraseña y confirma para completar el proceso de
                restablecimiento.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Nueva contraseña"
                secureTextEntry={true}
                onChangeText={(text) => setNewPassword(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                secureTextEntry={true}
                onChangeText={(text) => setConfirmPassword(text)}
            />

            <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
                <Text>Restablecer contraseña</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Inicio')}>
                <Text style={styles.link}>Regresar al unicio</Text>
            </TouchableOpacity>
        </View>
    );
};
// Definición de estilos para el componente
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
        backgroundColor: '#2522AF',
        color: 'white',
        padding: 10,
        borderRadius: 5,
    },
    link: {
        color: '#2522AF',
        fontWeight: 'bold',
        textAlign: 'center',
    },

});

export default ResetPasswordForm;