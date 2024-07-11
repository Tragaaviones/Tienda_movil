import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

export default function Perfil() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Actualizar perfil</Text>
            <Image source={require('../imagenes/login.png')} style={styles.profileImage} />
            <TextInput style={styles.input} placeholder="Nombres" />
            <TextInput style={styles.input} placeholder="Apellidos" />
            <TextInput style={styles.input} placeholder="Correo electrónico" />
            <TextInput style={styles.input} placeholder="Telefono" keyboardType="phone-pad" />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
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
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 45,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 10,
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
