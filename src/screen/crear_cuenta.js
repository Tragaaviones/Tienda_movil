import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CreateAccountForm = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        console.log('Usuario:', username);
        console.log('Correo electrónico:', email);
        console.log('Contraseña:', password);
        console.log('Confirmar contraseña:', confirmPassword);
        // Implementar lógica para crear cuenta
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crea una cuenta</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                onChangeText={(text) => setUsername(text)}
            />

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

            <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                secureTextEntry={true}
                onChangeText={(text) => setConfirmPassword(text)}
            />

            <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
                <Text style={styles.linkText}>Crear cuenta</Text>
            </TouchableOpacity>
            <Text style={styles.link}>¿Ya tienes una cuenta?/</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
                <Text style={styles.linkText}>Iniciar sesión en la pantalla inicio</Text>
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
    },
    linkText: {
        color: '#2522AF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CreateAccountForm;
