import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Alert, Image, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons'; 

export default function ProductoCard({ ip, imagenProducto, idProducto, nombreProducto, descripcionProducto, precioProducto, existenciasProducto, accionBotonProducto }) {
    const [showModalAgregar, setShowModalAgregar] = useState(false);
    const [showModalVer, setShowModalVer] = useState(false);
    const [comentario, setComentario] = useState('');
    const [valoracion, setValoracion] = useState(0);
    const [comentariosValoraciones, setComentariosValoraciones] = useState([]);

    useEffect(() => {
        fillCommentsAndRatings();
    }, []);



    const fillCommentsAndRatings = async () => {
        try {
          const response = await fetch(`${ip}/tienda/api/servicios/publico/comentarios.php?action=readAllPublic`, {
            method: 'POST', // O usa 'GET' si no necesitas enviar datos
          });
      
          const comentariosValoracionesData = await response.json();
      
          if (comentariosValoracionesData.status && Array.isArray(comentariosValoracionesData.dataset)) {
            setComentariosValoraciones(comentariosValoracionesData.dataset);
          } else {
            setComentariosValoraciones([]);
          }
        } catch (error) {
          console.error('Error fetching comments and ratings:', error);
          setComentariosValoraciones([]);
        }
      };
      
    
    const submitValoracion = async () => {
        const formData = new FormData();
        formData.append('comentario', comentario);
        formData.append('VALORACION', valoracion);
        
        const response = await fetch(`${ip}/tienda/api/servicios/publico/comentarios.php?action=createRow`, {
            method: 'POST',
            body: formData,
        });

        const DATA = await response.json();

        if (DATA.status) {
            Alert.alert('Gracias por tu comentario!');
            setComentario('');
            setValoracion(0);
            setShowModalAgregar(false);
            fillCommentsAndRatings(); // Recargar comentarios después de agregar uno nuevo
        } else {
            Alert.alert('Error', DATA.error);
        }
    };

    const closeModal = () => setShowModalVer(false);

    const generateStars = (rating) => {
        return [1, 2, 3, 4, 5].map(star => (
            <FontAwesome key={star} name={star <= rating ? 'star' : 'star-o'} size={24} color="gold" />
        ));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: `${ip}/tienda/api/imagenes/productos/${imagenProducto}` }}
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
                onPress={accionBotonProducto}
            >
                <Text style={styles.cartButtonText}>Agregar al carrito</Text>
            </TouchableOpacity>

            {/* Botón para abrir el modal de agregar comentario */}
            <TouchableOpacity
                style={styles.commentButton}
                onPress={() => setShowModalAgregar(true)}
            >
                <Text style={styles.commentButtonText}>Agregar comentario</Text>
            </TouchableOpacity>

            {/* Modal para agregar comentario */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModalAgregar}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <TextInput
                            placeholder="Escribe tu comentario"
                            value={comentario}
                            onChangeText={setComentario}
                            style={styles.input}
                        />
                        <Text>Calificación:</Text>
                        <View style={styles.starsContainer}>
                            {[1, 2, 3, 4, 5].map(star => (
                                <TouchableOpacity key={star} onPress={() => setValoracion(star)}>
                                    <FontAwesome name={star <= valoracion ? 'star' : 'star-o'} size={24} color="gold" />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={submitValoracion}
                        >
                            <Text style={styles.submitButtonText}>Enviar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setShowModalAgregar(false)}
                        >
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Botón para abrir el modal de ver comentarios */}
            <TouchableOpacity
                style={styles.viewCommentsButton}
                onPress={() => setShowModalVer(true)}
            >
                <Text style={styles.viewCommentsButtonText}>Ver comentarios</Text>
            </TouchableOpacity>

            {/* Modal para ver comentarios */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModalVer}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Valoraciones del Producto</Text>
                        <ScrollView style={styles.commentList}>
                            {comentariosValoraciones.length > 0 ? (
                                comentariosValoraciones.map((comment, index) => (
                                    <View key={index} style={styles.commentCard}>
                                        <Text style={styles.commentTitle}>{comment.nombre_cliente} {comment.apellido_cliente}</Text>
                                        <View style={styles.commentStars}>
                                            {generateStars(comment.calificacion_producto)}
                                        </View>
                                        <Text style={styles.commentDate}>{formatDate(comment.fecha_comentario)}</Text>
                                        <Text style={styles.commentText}>{comment.comentario}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.noCommentsText}>No hay comentarios ni valoraciones disponibles.</Text>
                            )}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closeModal}
                        >
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    imageContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
    },
    textDentro: {
        fontWeight: 'normal',
    },
    cartButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    cartButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    commentButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    viewCommentsButton: {
        backgroundColor: '#17a2b8',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    commentButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    viewCommentsButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    starsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentList: {
        maxHeight: 300,
        width: '100%',
    },
    commentCard: {
        padding: 10,
        marginBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    commentTitle: {
        fontWeight: 'bold',
    },
    commentStars: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    commentDate: {
        fontSize: 12,
        color: 'gray',
    },
    commentText: {
        fontSize: 14,
    },
    noCommentsText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'gray',
    },
});
