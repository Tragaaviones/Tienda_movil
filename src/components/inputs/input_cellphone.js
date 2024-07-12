import React, { useState } from 'react';
import { Platform, TextInput, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function Input_cellphone({ telefono, setTelefono }) {
    return (
        <TextInputMask
            style={styles.Input}
            placeholder="Teléfono"
            placeholderTextColor="#000000"
            type={'custom'}
            options={{
                mask: '9999-9999' // Formato para el número de teléfono
            }}
            value={telefono}
            onChangeText={setTelefono}
        />
    );
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: '#ffffff',
        color: "#000000",
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        padding: Platform.OS === 'ios' ? 15 : 10, // Estilo de la barra de pestañas, altura diferente para iOS y Android,
    },

});