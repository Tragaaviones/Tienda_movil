import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import * as Constantes from '../utils/constantes';
import Constants from 'expo-constants';
// Import de componentes personalizados
import Input from '../components/inputs/input';
import Buttons from '../components/Buttons/buttoon';
import InputEmail from '../components/inputs/input_email';
import InputPassword from '../components/inputs/input_password';
import { Button } from 'react-native-elements';

export default function RecuperarContrasena({ navigation }) {
    const ip = Constantes.IP;

    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [nuevaClave, setNuevaClave] = useState('');
    const [isContra, setIsContra] = useState(true); // Estado para manejar la visibilidad de la contraseña

    const handleResetPassword = async () => {
        if (!email.trim()) {
            Alert.alert("Debes ingresar un correo electrónico");
            return;
        }
        if (!token.trim() || !nuevaClave.trim()) {
            Alert.alert("Debes llenar todos los campos");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('correo_cliente', email);
            formData.append('token', token);
            formData.append('contra_cliente', nuevaClave);
            const response = await fetch(`${ip}/tienda/api/servicios/publico/cliente.php?action=recovery`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert(
                    'Contraseña actualizada correctamente',
                    '',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('Inicio'),
                        },
                    ]
                );
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Ocurrió un error al intentar actualizar la contraseña');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>

                <View style={styles.containerInputs}>
                <Text style={styles.texto}>Recuperar Contraseña</Text>
                <Image source={require('../imagenes/recuperacion.png')} style={styles.profileImage} />
                    <View style={styles.InputEmail}>
                        <InputEmail
                            placeHolder='Correo Electrónico'
                            setValor={email}
                            setTextChange={setEmail}
                        />
                    </View>

                    <View style={styles.inputToken}>
                        <Input
                            placeHolder='Ingrese el Token'
                            setValor={token}
                            setTextChange={setToken}
                            contra={isContra}
                        />
                    </View>

                    <View style={styles.inputNuevacontra}>
                        <Input
                            placeHolder='Nueva Contraseña'
                            setValor={nuevaClave}
                            setTextChange={setNuevaClave}
                            contra={isContra}
                        />
                    </View>

                    <View style={styles.button}>
                        <Buttons
                            textoBoton='Actualizar Contraseña'
                            accionBoton={handleResetPassword}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9FACF4',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight + 5
    },
    scrollViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        color: '#322C2B',
        fontWeight: '900',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    containerInputs: {
        marginTop: 150,
        alignItems: 'center',
    },
    button:{
        alignItems: 'center'
    },
    profileImage: {
        width: 175,
        height: 120,
        paddingTop: 200,
    
    }

});
