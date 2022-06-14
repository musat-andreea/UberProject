import React, {useEffect, useState} from "react";
import {View, Text, ScrollView} from "react-native";
// import { Divider } from "react-native-elements";
import HeaderTabs from "../components/HeaderTabs";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import RestaurantItems, {localRestaurants} from "../components/RestaurantItems";
import {SafeAreaView, TouchableOpacity} from "react-native-web";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';
import AddRestaurant from "../components/AddRestaurant";

const YELP_API_KEY = "gGtSzxOZjxTBadvPP4j2eBorcbz912ekNer1uaDlCmr9RvdIO9AXHATY2QNSPPu0hQ194dW9m2ISbql6vMC0reCel_KJeDwrJZKQ4QKTdJnMN86rwhe4iDm1Yex3YnYx";

export default function Home({navigation}) {
    const [restaurantData, setRestaurantData] = React.useState(localRestaurants);
    const [filter, setFilter] = React.useState(0);
    const [activeTab, setActiveTab] = useState("Delivery");

    const translationY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translationY.value = event.contentOffset.y;
    });

    const stylez = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: translationY.value,
                },
            ],
        };
    });

    const HeaderButton = (props) => (
        <TouchableOpacity
            style={{
                backgroundColor: props.activeTab === props.text ? "turquoise" : "white",
                paddingVertical: 6,
                paddingHorizontal: 16,
                borderRadius: 30,
            }}
            onPress={() => props.setActiveTab(props.text)}
        >
            <Text
                style={{color: props.activeTab === props.text ? "white" : "turquoise", fontSize: 15, fontWeight: 900,}}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );

    // const [city, setCity] = useState("San Francisco");
    // const [activeTab, setActiveTab] = useState("Delivery");

    // const getRestaurantsFromYelp = () => {
    //     const yelpUrl = "https://api.yelp.com/v3/businesses/search?term=restaurants&location=LosAngeles";
    //
    //     const apiOptions = {
    //         headers: {
    //             Authorization: `Bearer ${YELP_API_KEY}`,
    //         },
    //     };
    //
    //     return fetch(yelpUrl, apiOptions)
    //         .then((res) => res.json())
    //         .then((json) =>
    //             setRestaurantData(json.businesses));
    // };

    // useEffect(() => {
    //    getRestaurantsFromYelp();
    // }, []);

    const handleFilterChange = (value) => {
        setFilter(value);
    };

    return (
        <SafeAreaView style={{backgroundColor: "#FBEEE6", flex: 1}}>
            <Animated.View style={[{backgroundColor: "white", padding: 15}, stylez]}>
                <View style={{flexDirection: "row", alignSelf: "center"}}>
                    <HeaderButton
                        text="Delivery"
                        btnColor="turquoise"
                        textColor="white"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <HeaderButton
                        text="Manage"
                        btnColor="white"
                        textColor="turquoise"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <HeaderButton
                        text="Add"
                        btnColor="white"
                        textColor="turquoise"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </View>
                <SearchBar/>
            </Animated.View>
            {activeTab == 'Delivery' &&
                <Animated.ScrollView
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}>

                    <Categories filter={filter} changeFilter={handleFilterChange}/>
                    <RestaurantItems filter={filter}/>
                </Animated.ScrollView>
            }

            {activeTab == 'Manage' &&
            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}>

                <Categories filter={filter} changeFilter={handleFilterChange}/>
                <RestaurantItems manage={true}  filter={filter}/>
            </Animated.ScrollView>
            }

            {activeTab == 'Add' &&
            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}>
                <AddRestaurant navigation={navigation}/>
            </Animated.ScrollView>
            }

        </SafeAreaView>
    );
}