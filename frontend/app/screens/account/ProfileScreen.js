import * as React from 'react';
import { View, StyleSheet, TextInput, ImageBackground, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useState, useEffect } from 'react';
import { Text, Button, ActivityIndicator, Avatar } from 'react-native-paper';
import { logout } from '../../services/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Product from '../../components/Product';
import { getAdverts, reset } from '../../services/advert/advertSlice';

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const {adverts, isLoading, isError, isSuccess, message } = useSelector((state) => state.advert)
    const { isLogoutLoading } = useSelector(state => state.auth.logoutState);
    const [condition, setCondition] = useState({keyword: "Statistics", category: "Science"})
    const {keyword, category} = condition;

    const { user } = useSelector(state => state.auth);

    function renderProduct({ item }) {
        return (
          <Product key={item._id} {...item}
            onPress={() => {
              //navigation.navigate('ProductDetails', {
              //  item: item,
                //productId: product.id,
              //});
            }}
          />
        );
      }

    useEffect(() => {
        console.log("SplashScreen::useEffect()");
        dispatch(getAdverts({params: {keyword: keyword, category: category }}));
    }, []);

    const handleSignOut= (e) => {
        console.log("ProfileScreen::handleSignOut");
        dispatch(logout());
    }

    return (

        <View style={styles.container}>
            <View style={styles.account}>
                <View style={styles.avatar}>
                    <Avatar.Image size={64} source={require('../../../assets/user3.jpeg')}/>
                </View>
                <View style={styles.info}>
                    <Text>{user.name}</Text>
                    <Text>{user.email}</Text>
                    <View style={styles.info2}>
                        <Text variant='titleMedium'>My Listings</Text>
                    </View>
                </View>
                <ActivityIndicator 
                    size={'small'}
                    style={styles.loading}
                    animating={false} />
                <View style={styles.sub}>
                    <Button 
                        //icon="camera"
                        mode="contained"
                        onPress={() => handleSignOut() }
                        >
                        Sign Out
                    </Button>
                </View>
                </View>
            <View style={styles.mylisting}>

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
            {/**
        */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    account: {
        flex: 1,
        backgroundColor: "lightgrey",
        flexDirection: "row",
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
    },
    avatar: {
        flex: 2
    },
    info: {
        paddingTop: 10,
        flex: 3,

    },
    info2: {
        paddingTop: 50,
        paddingLeft: 50,
        flex: 1,
    },
    mylisting: {
        flex:3,
        backgroundColor: "#00FF00",
    },
    loading: {
        marginTop: 10,
        marginBottom: 10,
    }

});

export default ProfileScreen;