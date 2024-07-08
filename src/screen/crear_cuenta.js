
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import * as Constantes from '../utils/constantes'
import Constants from 'expo-constants';
import Input from '../components/inputs/input'
import Input_password from '../components/inputs/input_password'
import Input_cellphone from '../components/inputs/input_cellphone';
import Input_email from '../components/inputs/input_email';


export default function CreateAccountForm({ navigation }) {

    const ip = Constantes.IP;

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [clave, setClave] = useState('')
    const [confirmarClave, setConfirmarClave] = useState('')

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('nombre_cliente', nombre);
            formData.append('apellido_cliente', apellido);
            formData.append('correo_cliente', email);
            formData.append('direccion_cliente', direccion);
            formData.append('telefono_cliente', telefono);
            formData.append('contra_cliente', clave);
            formData.append('confirmar_contra', confirmarClave);

            const response = await fetch(`${ip}/tienda/api/servicios/publico/cliente.php?action=signUpMovil`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert('Datos Guardados correctamente');
                navigation.navigate('Sesion');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Ocurrió un error al intentar crear el usuario');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crea una cuenta</Text>

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


