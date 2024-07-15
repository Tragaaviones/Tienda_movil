// Importaciones necesarias para el componente
import { useState, useEffect } from 'react';
import * as Constantes from '../utils/constantes';
import { View, Text, StyleSheet, SafeAreaView, Alert, FlatList } from 'react-native';
import ModalCompra from '../components/modals/modal_compra';
import Constants from 'expo-constants';
import ProductoCard from '../components/products/producto_card';
import RNPickerSelect from 'react-native-picker-select';

// Contenido de la página principal
export default function Productos() {

    // Definición de variables de estado
    const ip = Constantes.IP;
    const [dataProductos, setDataProductos] = useState([]); // Almacena los productos
    const [dataCategorias, setDataCategorias] = useState([]); // Almacena las categorías
    const [selectedValue, setSelectedValue] = useState(null); // Almacena la categoría seleccionada
    const [cantidad, setCantidad] = useState(''); // Almacena la cantidad de productos
    const [talla, setTalla] = useState(''); // Almacena la talla del producto
    const [modalVisible, setModalVisible] = useState(false); // Controla la visibilidad del modal
    const [idProductoModal, setIdProductoModal] = useState(''); // Almacena el ID del producto seleccionado
    const [nombreProductoModal, setNombreProductoModal] = useState(''); // Almacena el nombre del producto seleccionado

    // Función para manejar la compra de un producto
    const handleCompra = (nombre, id) => {
        setModalVisible(true);
        setIdProductoModal(id);
        setNombreProductoModal(nombre);
    };

    // Función para obtener los productos de una categoría específica
    const getProductos = async (idCategoriaSelect = 1) => {
        try {
            if (idCategoriaSelect <= 0) {
                return;
            }
            const formData = new FormData();
            formData.append('idCategoria', idCategoriaSelect);
            const response = await fetch(`${ip}/tienda/api/servicios/publico/producto.php?action=readProductosCategoria`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.status) {
                setDataProductos(data.dataset);
            } else {
                Alert.alert('Error productos', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al listar los productos');
        }
    };

    // Función para obtener todas las categorías
    const getCategorias = async () => {
        try {
            const response = await fetch(`${ip}/tienda/api/servicios/publico/categoria.php?action=readAll`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status) {
                setDataCategorias(data.dataset);
            } else {
                Alert.alert('Error categorias', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al listar las categorias');
        }
    };

    // Hook useEffect para obtener los productos y categorías al cargar el componente
    useEffect(() => {
        getProductos();
        getCategorias();
    }, []);

    // Renderizado de la UI del componente
    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.subtitle}>
                    Selecciona una categoria
                </Text>
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        style={{ inputAndroid: styles.picker }}
                        onValueChange={(value) => getProductos(value)}
                        placeholder={{ label: 'Selecciona una categoría...', value: null }}
                        items={dataCategorias.map(categoria => ({
                            label: categoria.nombre,
                            value: categoria.id_categoria,
                        }))}
                    />
                </View>
            </View>
            <ModalCompra
                visible={modalVisible}
                cerrarModal={setModalVisible}
                nombreProductoModal={nombreProductoModal}
                idProductoModal={idProductoModal}
                cantidad={cantidad}
                talla={talla}
                setTalla={setTalla}
                setCantidad={setCantidad}
            />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={dataProductos}
                    keyExtractor={(item) => item.id_producto}
                    renderItem={({ item }) => (
                        <ProductoCard
                            ip={ip}
                            imagenProducto={item.imagen}
                            idProducto={item.id_producto}
                            nombreProducto={item.nombre_producto}
                            descripcionProducto={item.descripcion_producto}
                            precioProducto={item.precio_unitario}
                            existenciasProducto={item.stock_producto}
                            accionBotonProducto={() => handleCompra(item.nombre_producto, item.id_producto)}
                        />
                    )}
                />
            </SafeAreaView>
            <View style={styles.footer}>

            </View>
        </View>
    );
}

// Se definen los estilos para el componente
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#B6D6F0'
    },
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    header: {
        alignItems: 'center',
        padding: 6,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingTop: 35,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 5,
        marginHorizontal: 5,
        color: '#000',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 40,
        borderTopWidth: 1,
        borderTopColor: '#ECA876',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#4da6ff',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
        backgroundColor: '#4da6ff',
        width: 310,
    },
    picker: {
        color: '#ffffff'
    },
});
