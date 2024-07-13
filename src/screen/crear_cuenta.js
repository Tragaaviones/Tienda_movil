import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
// Importa componentes necesarios de react-native.
import { useState } from 'react';
// Importa useState de react para manejar el estado.
import * as Constantes from '../utils/constantes';
// Importa constantes de un archivo local.
import Constants from 'expo-constants';
// Importa constantes de expo-constants.
import Input from '../components/inputs/input';
// Importa un componente Input personalizado.
import Input_password from '../components/inputs/input_password';
// Importa un componente Input_password personalizado.
import Input_cellphone from '../components/inputs/input_cellphone';
// Importa un componente Input_cellphone personalizado.
import Input_email from '../components/inputs/input_email';
// Importa un componente Input_email personalizado.

export default function CreateAccountForm({ navigation }) {
    // Define el componente CreateAccountForm que recibe navigation como prop.
    const ip = Constantes.IP;
    // Obtiene la IP del archivo de constantes.

    // Estados para almacenar los datos del formulario.
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');
    // Expresiones regulares para validar teléfono
    const telefonoRegex = /^\d{4}-\d{4}$/;

    const handleSubmit = async () => {
        // Función para manejar el envío del formulario.
        try {
            // Validar los campos
            if (!nombre.trim() || !apellido.trim() || !email.trim() || !direccion.trim() ||
                !telefono.trim() || !clave.trim() || !confirmarClave.trim()) {
                Alert.alert("Campos vacios", "Debes llenar todos los campos");
                return;
            } else if (!telefonoRegex.test(telefono)) {
                Alert.alert("El teléfono debe tener el formato correcto (####-####)");
                return;
            }

            const formData = new FormData();
            // Crea un objeto FormData para enviar los datos.
            formData.append('nombre_cliente', nombre);
            formData.append('apellido_cliente', apellido);
            formData.append('correo_cliente', email);
            formData.append('direccion_cliente', direccion);
            formData.append('telefono_cliente', telefono);
            formData.append('contra_cliente', clave);
            formData.append('confirmar_contra', confirmarClave);

            // Envía los datos al servidor.
            const response = await fetch(`${ip}/tienda/api/servicios/publico/cliente.php?action=signUpMovil`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            // Procesa la respuesta del servidor.
            if (data.status) {
                Alert.alert('Datos Guardados correctamente');
                // Muestra una alerta y navega a la pantalla de sesión si la respuesta es exitosa.
                navigation.navigate('Inicio');
            } else {
                Alert.alert('Error', data.error);
                // Muestra una alerta con el error si ocurre algún problema.
            }
        } catch (error) {
            Alert.alert('Ocurrió un error al intentar crear el usuario');
            // Muestra una alerta si ocurre una excepción.
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crea una cuenta</Text>
            {/* Renderiza el título del formulario. */}

            {/* Campos de entrada personalizados para cada dato del formulario. */}
            <Input
                placeHolder='Nombre del cliente'
                setValor={nombre}
                setTextChange={setNombre}
            />

            <Input
                placeHolder='Apellido del cliente'
                setValor={apellido}
                setTextChange={setApellido}
            />

            <Input_email
                placeHolder='Correo electronico'
                setValor={email}
                setTextChange={setEmail}
            />

            <Input_password
                placeHolder='Dirección Cliente'
                setValor={setDireccion}
                valor={direccion}
                setTextChange={setDireccion}
            />

            <Input_cellphone
                telefono={telefono}
                setTelefono={setTelefono}
            />

            <Input
                placeHolder='Clave'
                contra={true}
                setValor={clave}
                setTextChange={setClave} />

            <Input
                placeHolder='Confirmar Clave'
                contra={true}
                setValor={confirmarClave}
                setTextChange={setConfirmarClave} />

            <TouchableOpacity onPress={handleSubmit}>
                {/* Botón para enviar el formulario. */}
                <Text style={styles.linkText}>Crear cuenta</Text>
            </TouchableOpacity>
            <Text style={styles.link}>¿Ya tienes una cuenta?</Text>
            {/* Texto para usuarios que ya tienen una cuenta. */}
            <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
                {/* Botón para navegar a la pantalla de inicio de sesión. */}
                <Text style={styles.linkText}>Iniciar sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    // Definición de estilos para el componente.
    container: {
        flex: 1,
        backgroundColor: '#ECA876',
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
