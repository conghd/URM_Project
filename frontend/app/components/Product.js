import React, { useEffect } from 'react';
import {Dimensions, Text, Image,StyleSheet, View, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import * as Config from '../../config'
/*
          */


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');
const Product = ({ _id, title, price, images, onPress, index }) => {
  const odd_style = {marginLeft: 5}
  const even_style = {marginRight: 5}
  const style = (index % 2 == 0) ? even_style : odd_style;

  return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={{...styles.infoContainer, ...style}}>
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
    //backgroundColor: 'white',
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
    width: windowDimensions.width / 2 - 5,
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 0,
    marginBottom: 10,
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