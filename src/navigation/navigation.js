// Importamos React para poder utilizar JSX y React components.
import React from "react";

// Importamos el componente para crear un Bottom Tab Navigator de @react-navigation/bottom-tabs.
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importamos NavigationContainer de @react-navigation/native para envolver nuestra estructura de navegación.
import { NavigationContainer } from "@react-navigation/native";

// Importamos el componente para crear un Native Stack Navigator de @react-navigation/native-stack.
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importamos los iconos de MaterialCommunityIcons de @expo/vector-icons.
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importamos las pantallas que utilizaremos en nuestra aplicación.
import Home from "../screen/home";
import Productos from "../screen/pantalla_principal";
import Carrito from '../screen/carrito';
import Perfil from "../screen/perfil";
import Historial from "../screen/historial";


import { color } from "react-native-elements/dist/helpers";

// Creamos una instancia del Bottom Tab Navigator.
const Tab = createBottomTabNavigator();

// Definimos el componente Mytabs como una función que retorna el Tab Navigator configurado.
function Mytabs() {
    return (
        // Definimos el Tab Navigator con sus pantallas y opciones.
        <Tab.Navigator
            // Configuramos opciones globales para las pantallas del Tab Navigator.
            screenOptions={{
                headerShown: false, // No mostrar el encabezado por defecto.
                tabBarActiveTintColor: 'purple', // Color de los iconos activos en la barra de navegación.
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 10, // Ajusta este valor para subir la barra de navegación.
                    left: 10,
                    right: 10,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 60,
                    paddingBottom: 10
                },

            }}>
            {/* Definimos cada pantalla en el Tab Navigator */}
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home-outline" size={24} color="black" />
                    ),
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#9368EE'
                    },
                }}
            />
            <Tab.Screen
                name="Productos"
                component={Productos}
                options={{
                    tabBarLabel: 'Productos',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="inbox-multiple" size={24} color="black" />
                    ),
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#9368EE'
                    },
                }}
            />
            <Tab.Screen
                name="Carrito"
                component={Carrito}
                options={{
                    tabBarLabel: 'Carrito',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cart-outline" size={24} color="black" />
                    ),
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#9368EE'
                    },
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-convert" size={24} color="black" />
                    ),
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#9368EE'
                    },
                }}
            />
            <Tab.Screen
                name="Historial"
                component={Historial}
                options={{
                    tabBarLabel: 'Historial',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-convert" size={24} color="black" />
                    ),
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#9368EE'
                    },
                }}
            />
        </Tab.Navigator>
    );
}

// Exportamos el componente Mytabs para que pueda ser utilizado en otros lugares.
export default Mytabs;
