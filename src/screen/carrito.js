// HomeScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const ProductCard = ({ product, navigation }) => {
  return (
    <View style={styles.productCard}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Button title="Ver detalles" onPress={() => navigation.navigate('ProductDetails', { product })} />
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const products = [
    {
      id: 1,
      image: 'https://example.com/product1.jpg',
      name: 'Camiseta de la selección Francesa de 1998',
      price: '$100',
    },
    {
      id: 2,
      image: 'https://example.com/product2.jpg',
      name: 'Camiseta del Inter de Milán de 1906',
      price: '$150',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tienda de Camisetas de Fútbol</Text>
      <View style={styles.products}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} navigation={navigation} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#4CAF50',
  },
});

export default HomeScreen;
