import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {Button} from 'react-native';
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import {windowHeight, windowWidth} from "../utils/Dimensions";


export default function AddRestaurant({navigation, ...props}) {
    const [name, setName] = React.useState('');
    const [opening, setOpening] = React.useState('');
    const [close, setClose] = React.useState('');
    const [image, setImage] = React.useState('');



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

    const handleAddRestaurant = () =>
    {
        let body = {
            name: name,
            opening: opening,
            close: close,
            image: image,
        };

       axios.post('http://localhost:5000', body)
           .then(response => {
                console.log(response);
               window.location.reload();

       })
           .catch(err => {
               alert(err);
           })
    };

    return (
        <>
            <FormInput
                labelValue={name}
                onChangeText={(restaurantName) => setName(restaurantName)}
                placeholderText="Name"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={opening}
                onChangeText={(openHour) => setOpening(openHour)}
                placeholderText="Open hour"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={close}
                onChangeText={(openHour) => setClose(openHour)}
                placeholderText="Close hour"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={image}
                onChangeText={(openHour) => setImage(openHour)}
                placeholderText="Image"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TouchableOpacity style={styles.buttonContainer} onPress={handleAddRestaurant}>
                <Text style={styles.buttonText}>Add restaurant</Text>
            </TouchableOpacity>

        </>
    );
};