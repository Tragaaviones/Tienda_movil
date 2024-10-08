import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RecuperarContrasena from './src/screen/recuperacion_contraseña.js';
import Verificacion from './src/screen/verificacion_codigo';
import cambiar_contraseña from './src/screen/cambiar_contraseña';
import crear_cuenta from './src/screen/crear_cuenta';
import Inicio from './src/screen/iniciosesion';
import Navigation from './src/navigation/navigation'

export default function App() {
    // Creamos una instancia del stack de navegación.
    const Stack = createNativeStackNavigator();

    return (
        // NavigationContainer envuelve toda la estructura de navegación para proporcionar el contexto necesario.
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Inicio' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Inicio" component={Inicio} />
                <Stack.Screen name="navigation" component={Navigation} />
                <Stack.Screen name="Recovery" component={RecuperarContrasena} />
                <Stack.Screen name="Verificacion" component={Verificacion} />
                <Stack.Screen name="cambiar_contraseña" component={cambiar_contraseña} />
                <Stack.Screen name="crear_cuenta" component={crear_cuenta} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}