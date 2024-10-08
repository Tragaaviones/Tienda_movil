
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';

export default function Buttons({ textoBoton, accionBoton }) {

    return (
        <>
            <TouchableOpacity style={styles.button} onPress={accionBoton}>
                <Text style={styles.buttonText}>{textoBoton}</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({

    button: {
        borderWidth: 1,
        borderColor: "#007bff",
        width: Platform.OS === 'ios' ? 200 : 200,
        borderRadius: 10,
        backgroundColor: "#007bff",
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginVertical: 5
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFF", fontWeight: '800', textTransform: 'uppercase'
    }
});