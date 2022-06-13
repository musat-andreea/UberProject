import React, { useState } from "react";
import { View, Text } from "react-native";
import {TouchableOpacity} from "react-native-web";

export default function HeaderTabs() {

    return (
        <View style={{ flexDirection: "row", alignSelf: "center"}}>
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
        </View>
    )
}

