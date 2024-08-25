import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Alert, FlatList, Image } from 'react-native';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons'; 
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; 

export default function ProductoCard({ ip, imagenProducto, idProducto, nombreProducto, descripcionProducto, precioProducto, existenciasProducto, accionBotonProducto }) {
    const [showModal, setShowModal] = useState(false);
    const [calificacion, setCalificacion] = useState(null);
    const [comentario, setComentario] = useState('');

    const submitValoracion = () => {
        // Aquí puedes manejar la lógica para enviar la valoración
        console.log('Calificación:', calificacion);
        console.log('Comentario:', comentario);
        Alert.alert('Gracias por tu valoración!'); // Mensaje de confirmación
        setShowModal(false);
        // Resetear los campos
        setCalificacion(null);
        setComentario('');
    };

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: $`{ip}/tienda/api/imagenes/productos/${imagenProducto}` }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.textTitle}>{nombreProducto}</Text>
            <Text style={styles.text}>{descripcionProducto}</Text>
            <Text style={styles.textTitle}>Precio: <Text style={styles.textDentro}>${precioProducto}</Text></Text>
            <Text style={styles.textTitle}>Existencias: <Text style={styles.textDentro}>{existenciasProducto} {(existenciasProducto === 1) ? 'Unidad' : 'Unidades'}</Text></Text>
            <TouchableOpacity
                style={styles.cartButton}
                onPress={accionBotonProducto}>
                <FontAwesome name="plus-circle" size={24} color="white" />
                <Text style={styles.cartButtonText}>Agregar al carrito</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ratingButton} onPress={() => setShowModal(true)}>
                <Text style={styles.ratingButtonText}>Calificar producto</Text>
            </TouchableOpacity>

            <Modal visible={showModal} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Calificación del producto</Text>
                        <View style={styles.ratingContainer}>
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <TouchableOpacity key={rating} onPress={() => setCalificacion(rating)}>
                                    <Text style={calificacion >= rating ? styles.selectedStar : styles.star}>★</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Escribe tu comentario aquí..."
                            value={comentario}
                            onChangeText={setComentario}
                            multiline={true}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.button} onPress={submitValoracion}>
                                <Text style={styles.buttonText}>Guardar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setShowModal(false)}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 10,
        marginVertical: 15,
        marginHorizontal: 30,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    textTitle: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '700',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
        marginBottom: 12,
    },
    imageContainer: {
        alignItems: 'center',
    },
    textDentro: {
        fontWeight: '400',
    },
    cartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00B207',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    cartButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
        textAlign: 'center',
    },
    ratingButton: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginVertical: 10,
    },
    ratingButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        height: 80,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        textAlignVertical: 'top',
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    star: {
        fontSize: 30,
        color: '#ccc',
    },
    selectedStar: {
        fontSize: 30,
        color: '#FFD700',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#28a745',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});