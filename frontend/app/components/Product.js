import React, { useEffect } from 'react';
import { Text, Image,StyleSheet, View, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import * as Config from '../../config'
/*
          */
const Product = ({ _id, title, price, images, onPress }) => {
  return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.infoContainer}>
          <Image style={styles.thumb} source={
            (images && images.length > 0) ?
                ({uri: Config.BE_RESOURCE_URL + images[0]}) :
                ({uri: Config.BE_RESOURCE_URL + "/images/no-image-available.jpeg"})
          } />
          <Text style={styles.name}>{title}</Text>
          <Text style={styles.price}>{(price === '0' || price === 0 || price === '') ? "FREE": `$${price}` }</Text>
        </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    //borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 0,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 0,
    marginHorizontal: 0,
  },
  thumb: {
    height: 128,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    //width: '100%',
    width: 196,
  },
  infoContainer: {
    padding: 5,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#272727",
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: "#272727",
  },
});

export default Product;