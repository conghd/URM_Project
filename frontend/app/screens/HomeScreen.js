import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { Appbar, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { getAdverts, reset } from '../services/advert/advertSlice';



const HomeScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const {user } = useSelector((state) => state.auth);
    const {adverts, isLoading, isError, isSuccess, message } = useSelector((state) => state.advert)
    const [condition, setCondition] = useState({keyword: "Statistics", category: "Science"})
    const {keyword, category} = condition;
  
    
    function renderProduct({ item }) {
        return (
          <Product key={item._id} {...item}
            onPress={() => {
              navigation.navigate('ProductDetails', {
                item: item,
                //productId: product.id,
              });
            }}
          />
        );
      }

    useEffect(() => {
        console.log("HomeScreen::useEffect()");
        dispatch(getAdverts({params: {keyword: keyword, category: category }}));
    }, []);


    useEffect(() => {
      console.log("HomeScreen::useEffect - navigation");
    }, [navigation]);

  return (
    <>
      <Appbar.Header 
        style={{backgroundColor: '#004e2e'}}
      >
        <Appbar.Content title="UR Marketplace" color='white'/>
        <Appbar.Action icon="plus"
          onPress={() => { navigation.navigate("ProductCreation")}}
          color='white' backgroundColor='#004e2e' />
      </Appbar.Header>

    <View style={styles.container}>
        <FlatList
          numColumns={2}
          horizontal={false}
          style={styles.productsList}
          contentContainerStyle={styles.productsListContainer}
          keyExtractor={(product) => product._id}
          data={adverts}
          renderItem={renderProduct}
          onRefresh={() => {dispatch(getAdverts(condition))}}
          refreshing={false}
        />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginVertical: 0,
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
   //color: '#686868',
   //buttonColor: '#686868',
  },
  productsList: {
    backgroundColor: '#eeeeee',
  },
  productsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 0,
    marginHorizontal: 0,
  },
});
export default HomeScreen;