// Importamos React para poder utilizar JSX y React components.
import React from "react";

// Importamos el componente para crear un Bottom Tab Navigator de @react-navigation/bottom-tabs.
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Importamos NavigationContainer de @react-navigation/native para envolver nuestra estructura de navegación.
import { NavigationContainer } from '@react-navigation/native';

// Importamos el componente para crear un Native Stack Navigator de @react-navigation/native-stack.
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importamos los iconos de MaterialCommunityIcons de @expo/vector-icons.
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importamos las pantallas que utilizaremos en nuestra aplicación.
import Productos from "../screen/pantalla_principal";
import Categoria from '../screen/home';

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
            }}>
            {/* Definimos cada pantalla en el Tab Navigator */}
            <Tab.Screen
                name="Productos"
                component={Productos}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="inbox-multiple" size={24} color="black" />
                    ),
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#9368EE'
                    },
                }}
            />
            <Tab.Screen
                name="Categorias"
                component={Categoria}
                options={{
                    tabBarLabel: 'Categorias',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="text-box-outline" size={24} color="black" />
                    ),
                    headerShown: true,
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

// export default function Navigation() {
//     return (
//         <NavigationContainer>
//             <Mytabs />
//         </NavigationContainer>
//     )
// }