import React, { useState, useRef, useEffect } from 'react'; // Importa React y algunos hooks de React
import * as Constantes from '../utils/constantes'; // Importa constantes desde un archivo local
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, Modal } from 'react-native'; // Importa componentes de React Native

export default function Perfil() {
    const ip = Constantes.IP; // Asigna la IP desde las constantes a una variable local
    const [modalVisible, setModalVisible] = useState(false); // Estado para manejar la visibilidad del modal
    const [perfil, setPerfil] = useState(null); // Estado para almacenar los datos del perfil
    const [nombre, setNombre] = useState(''); // Estado para el nombre
    const [apellido, setApellido] = useState(''); // Estado para el apellido
    const [correo, setCorreo] = useState(''); // Estado para el correo
    const [telefono, setTelefono] = useState(''); // Estado para el teléfono
    const [direccion, setDireccion] = useState(''); // Estado para la dirección

    // Referencias para los TextInput
    const nombreRef = useRef(null);
    const apellidoRef = useRef(null);
    const correoRef = useRef(null);
    const telefonoRef = useRef(null);
    const direccionRef = useRef(null);

    // Función para leer el perfil del usuario desde una API
    const readProfile = async () => {
        try {
            const response = await fetch(`${ip}/tienda/api/servicios/publico/cliente.php?action=readProfile`, {
                method: 'GET',
            });

            const data = await response.json();

            if (data.status) {
                setPerfil(data.dataset); // Guarda los datos del perfil en el estado
                setNombre(data.dataset.nombre_cliente); // Establece el nombre en el estado
                setApellido(data.dataset.apellido_cliente); // Establece el apellido en el estado
                setCorreo(data.dataset.correo_cliente); // Establece el correo en el estado
                setTelefono(data.dataset.telefono_cliente); // Establece el teléfono en el estado
                setDireccion(data.dataset.direccion_cliente); // Establece la dirección en el estado
            } else {
                Alert.alert('Error', data.error); // Muestra un mensaje de error si la respuesta no es exitosa
                console.log(data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al obtener los datos del perfil'); // Muestra un mensaje de error si ocurre una excepción
        }
    };

    // Función para manejar la actualización de los datos del perfil
    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('nombre_perfil', nombre); // Añade el nombre al FormData
            formData.append('apellido_perfil', apellido); // Añade el apellido al FormData
            formData.append('correo_perfil', correo); // Añade el correo al FormData
            formData.append('telefono_perfil', telefono); // Añade el teléfono al FormData
            formData.append('direccion_perfil', direccion); // Añade la dirección al FormData

            const url = `${ip}/tienda/api/servicios/publico/cliente.php?action=editProfile`;

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.status) {
                Alert.alert('Perfil actualizado', 'Los datos del perfil han sido actualizados correctamente'); // Muestra un mensaje de éxito

                // Limpia los campos de texto
                nombreRef.current.clear();
                apellidoRef.current.clear();
                correoRef.current.clear();
                telefonoRef.current.clear();
                direccionRef.current.clear();

                readProfile(); // Vuelve a leer el perfil actualizado
            } else {
                Alert.alert('Error', 'No se pudo actualizar el perfil'); // Muestra un mensaje de error si no se pudo actualizar
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al actualizar el perfil'); // Muestra un mensaje de error si ocurre una excepción
        }
    };

    // Hook useEffect para leer el perfil cuando el componente se monta
    useEffect(() => {
        readProfile();
    }, []);

    return (
        <View style={styles.container}>
            {perfil ? ( // Verifica si los datos del perfil están disponibles
                <>
                    <Image source={require('../imagenes/login.png')} style={styles.profileImage} />
                    <Text style={styles.title}>Perfil</Text>
                    <Text style={styles.input}>Nombre usuario: {perfil.nombre_cliente}</Text>
                    <Text style={styles.input}>Apellido usuario: {perfil.apellido_cliente}</Text>
                    <Text style={styles.input}>Correo electronico: {perfil.correo_cliente}</Text>
                    <Text style={styles.input}>Telefono: {perfil.telefono_cliente}</Text>
                    <Text style={styles.input}>Dirección: {perfil.direccion_cliente}</Text>
                </>
            ) : (
                <Text>Cargando...</Text> // Muestra un mensaje de carga si los datos del perfil no están disponibles
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.button, styles.updateButton]}>
                    <Text style={styles.buttonText}>Actualizar</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible); // Cierra el modal cuando se solicita
                }}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>Actualizar Perfil</Text>
                    <TextInput
                        ref={nombreRef}
                        style={styles.inputModal}
                        placeholder="Nombre"
                        value={nombre}
                        onChangeText={setNombre}
                    />
                    <TextInput
                        ref={apellidoRef}
                        style={styles.inputModal}
                        placeholder="Apellido"
                        value={apellido}
                        onChangeText={setApellido}
                    />
                    <TextInput
                        ref={correoRef}
                        style={styles.inputModal}
                        placeholder="Correo"
                        value={correo}
                        onChangeText={setCorreo}
                    />
                    <TextInput
                        ref={telefonoRef}
                        style={styles.inputModal}
                        placeholder="Telefono"
                        value={telefono}
                        onChangeText={setTelefono}
                    />
                    <TextInput
                        ref={direccionRef}
                        style={styles.inputModal}
                        placeholder="Dirección"
                        value={direccion}
                        onChangeText={setDireccion}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>Actuzalizar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)} >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECA876',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 2
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 20,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#000',
        backgroundColor: '#fff',
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 10,
        padding: 8
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
    modalView: {
        top: 100,
        margin: 20,
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
    inputModal: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 10,
        width: '100%',
    },
});
