import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';

import Inicio from './src/screen/iniciosesion';
import Recuperacion from './src/screen/cambiar_contraseña';
import Verificacion from './src/screen/verificacion_codigo';
import cambiar_contraseña from './src/screen/cambiar_contraseña';
import crear_cuenta from './src/screen/crear_cuenta';
import home from './src/screen/pantalla_principal';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Inicio" component={Inicio} />
            <Stack.Screen name="Recuperacion" component={Recuperacion} />
            <Stack.Screen name="Verificacion" component={Verificacion} />
            <Stack.Screen name="cambiar_contraseña" component={cambiar_contraseña} />
            <Stack.Screen name="crear_cuenta" component={crear_cuenta} />
            <Stack.Screen name="home" component={home} />
        </Stack.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}