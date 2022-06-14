import React, {useEffect} from "react";
// import { useState } from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {Button} from 'react-native';
import {windowHeight} from "../utils/Dimensions";
// import Animated, {
//     Value,
//     Easing,
//     startClock,
//     timing,
//     Clock,
//     useCode,
//     cond,
//     eq,
// } from 'react-native-reanimated';

export const localRestaurants = [
    {
        name: "Beachside Bar",
        image_url:
            "https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg",
        categories: ["Cafe", "Bar"],
        price: "$$",
        reviews: 1244,
        rating: 4.5,
    },
    {
        name: "Benihana",
        image_url:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
        categories: ["Cafe", "Bar"],
        price: "$$",
        reviews: 1244,
        rating: 3.7,
    },
    {
        name: "India's Grill",
        image_url:
            "https://14thlane.ro/files/pages/1/OurStory2.webp",
        categories: ["Indian", "Bar"],
        price: "$$",
        reviews: 700,
        rating: 4.9,
    },
];

export default function RestaurantItems({navigation, ...props}) {
    const [restaurantData, setRestaurantData] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const userId = 1;

    useEffect(() => {
        setFavorites([]);
        axios.get(`http://localhost:5000/favorites/${userId}`)
            .then((response) => {
                setFavorites(response.data);
            });
    }, []);

    useEffect(() => {
        setRestaurantData([]);
        if (!props.filter) {
            axios.get('http://localhost:5000/')
                .then((response) => {
                    setRestaurantData(response.data);
                })
        } else {
            axios.get(`http://localhost:5000/list/categories/${props.filter}/restaurants`)
                .then((response) => {
                    setRestaurantData(response.data);
                })
        }
    }, [props.filter]);


    return (
        <>
            {restaurantData.length > 0 && restaurantData.map((restaurant, index) => {
                console.log(restaurant.id);

                return <TouchableOpacity
                    key={index}
                    activeOpacity={1}
                    style={{marginBottom: 30}}
                    // onPress={() =>
                    //     navigation.navigate("RestaurantDetail", {
                    //         name: restaurant.name,
                    //         image: restaurant.image,
                    //         reviews: restaurant.reviews,
                    //         rating: restaurant.rating,
                    //         // categories: restaurant.categories,
                    //     })
                    // }
                >
                    <View
                        style={{marginTop: 10, padding: 15, backgroundColor: "white"}}
                    >
                        <RestaurantImage image={restaurant.image} restaurantId={restaurant.id}
                                         favorite={favorites.includes(restaurant.id)} userId={userId}/>
                        <RestaurantInfo restaurantId={restaurant.id} name={restaurant.name} rating={restaurant.rating}
                                        opening={restaurant.opening} close={restaurant.close} street={restaurant.street}
                                        city={restaurant.city} country={restaurant.country} manage={props.manage}/>
                    </View>
                </TouchableOpacity>
            })}
        </>
    );
};

const RestaurantImage = (props) => {
    const userId = props.userId;


    useEffect(() => {
        console.log('FAVORIT: ', props.favorite);

    }, [])
    const handleAddToFavorite = (event) => {
        let body = {
            userId: userId,
            restaurantId: props.restaurantId
        };


        axios.post('http://localhost:5000/favorites', body)
            .then(response => {
                event.target.style.color = 'red';

            })
            .catch(err => {
                alert(err);
            });
    };

    return (<>
        <Image
            source={{
                uri: props.image,
            }}
            style={{width: "100%", height: 180}}
        />
        <TouchableOpacity style={{position: "absolute", right: 20, top: 20}}>
            <MaterialCommunityIcons name="heart-outline" className="heart-fav" size={25} color="#fff"
                                    style={props.favorite == true ? {color: 'red'} : {color: 'white'}}
                                    onPress={handleAddToFavorite}
            />

            {/*<Icon*/}
            {/*    name="ios-star"*/}
            {/*    fontFamily="Ionicons"*/}
            {/*    size={30}/>*/}
            {/*<Animated.View*/}
            {/*    style={{*/}
            {/*        width: 300,*/}
            {/*        height: 300,*/}
            {/*        backgroundColor: 'red',*/}
            {/*        // opacity,*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<Button title="Hide" onPress={() => startAnimation.setValue(1)} />*/}
            {/*<Button title="Reset" onPress={() => setCounter((s) => s + 1)} />*/}

        </TouchableOpacity>
    </>);
};

const RestaurantInfo = (props) => {
    console.log(props.name);

    const [name, setName] = React.useState(props.name);
    const [open, setOpen] = React.useState(props.opening);
    const [close, setClose] = React.useState(props.close);


    const styles = StyleSheet.create({
        buttonContainer: {
            marginTop: 10,
            width: '100%',
            height: windowHeight / 15,
            backgroundColor: '#2e64e5',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
        },
        buttonText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#ffffff',
            fontFamily: 'Lato-Regular',
        },
    });


    const handleEditRestaurant = () => {
        let body = {
            id: props.restaurantId,
            name: name,
            opening: open,
            close: close,
        };

        axios.put('http://localhost:5000', body)
            .then(response => {
                console.log(response);
                window.location.reload();

            })
            .catch(err => {
                alert(err);
            })
    };

    const handleDeleteRestaurant = () => {

        axios.delete(`http://localhost:5000/${props.restaurantId}`)
            .then(response => {
                console.log(response);
                window.location.reload();

            })
            .catch(err => {
                alert(err);
            })
    };


    return <View
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
        }}
    >
        <View>
            {props.manage && <>
                <input style={{fontSize: 15, fontWeight: "bold"}} onChange={(e) => setName(e.target.value)}
                       value={name}></input>
                <br/>
                <input style={{fontSize: 15, fontWeight: "bold"}} onChange={(e) => setOpen(e.target.value)}
                       value={open}></input>
                <br/>
                <input style={{fontSize: 15, fontWeight: "bold"}} onChange={(e) => setClose(e.target.value)}
                       value={close}></input>


                <TouchableOpacity style={styles.buttonContainer} onPress={handleEditRestaurant}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={handleDeleteRestaurant}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </>
            }
            {!props.manage && <Text style={{fontSize: 15, fontWeight: "bold"}}>{name}</Text>}
            <Text style={{fontSize: 13, color: "blue"}}>{props.street}, {props.city}, {props.country}</Text>
            <Text style={{fontSize: 13, color: "blue"}}>30-45 • min</Text>
        </View>
        <View
            style={{
                backgroundColor: "#eee",
                height: 30,
                width: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
            }}
        >
            <Text>{props.rating}</Text>
        </View>
    </View>
};
