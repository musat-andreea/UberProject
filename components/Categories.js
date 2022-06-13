import React, {useEffect} from "react";
import { View, Text, Image, ScrollView } from "react-native";
import axios from "axios";

const items = [
    {
        image: require("../assets/images/shopping-bag.png"),
        text: "Pick-up",
    },
    {
        image: require("../assets/images/soft-drink.png"),
        text: "Soft Drinks",
    },
    {
        image: require("../assets/images/bread.png"),
        text: "Bakery Items",
    },
    {
        image: require("../assets/images/fast-food.png"),
        text: "Fast Foods",
    },
    {
        image: require("../assets/images/deals.png"),
        text: "Deals",
    },
    {
        image: require("../assets/images/coffee.png"),
        text: "Coffee & Tea",
    },
    {
        image: require("../assets/images/desserts.png"),
        text: "Desserts",
    },
];

export default function Categories(props) {
    const [categories, setCategories] = React.useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/list/categories')
            .then((response) => {
                setCategories(response.data);
            });
    }, []);

    return (
        <View
            style={{
                marginTop: 5,
                backgroundColor: "#fff",
                paddingVertical: 10,
                paddingLeft: 20,
            }}
        >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((item, index) => (
                    <View key={index} style={{ alignItems: "center", marginRight: 30 }}>
                        <Image
                            source={item?.image}
                            style={{
                                width: 50,
                                height: 40,
                                resizeMode: "contain",
                            }}
                        />
                        <Text style={{ fontSize: 13, fontWeight: "900" }} onPress={() => {props.changeFilter(item.id)}}>{item.type}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}