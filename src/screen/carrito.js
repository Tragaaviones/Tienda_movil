import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


export default function Carrito() {
    return (
        <View
        style={[styles.container]}>
            <Text>Try editing me! 🎉</Text>
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
    }
});
