import * as React from "react";
import {useEffect, useState} from "react";
import {View, Text, YellowBox, Platform, StyleSheet} from "react-native";
import {StackNavigator} from 'react-navigation';
import Home from "./screens/Home";
import AddItem from "./screens/AddItem";
import ListItem from "./screens/ListItem";
import Providers from "./navigation";
import OnboardingScreen from "./screens/OnboardingScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import {AsyncStorage} from "@react-native-community/async-storage";
import AuthStack from "./navigation/AuthStack";
import AddRestaurant from "./components/AddRestaurant";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
const AppStack = createStackNavigator();
const ThemeContext = React.createContext('dark');

export default function App() {
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

    return (
        // <Home/>

        <ThemeContext.Provider value={'light'}>
            <NavigationContainer>
                <AppStack.Navigator
                    headerMode="none"
                >
                    <AppStack.Screen name="Home" component={Home}/>
                    <AppStack.Screen name="AddRestaurant" component={AddRestaurant}/>
                    {/*<AppStack.Screen name="Login" component={LoginScreen}/>*/}
                </AppStack.Navigator>
                {/*<AuthStack/>*/}
            </NavigationContainer>
        </ThemeContext.Provider>

        //   <OnboardingScreen />
        //   <NavigationContainer>
        //     <AppStack.Navigator
        //       headerMode="none"
        //     >
        //       <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
        //       {/*<AppStack.Screen name="Login" component={LoginScreen}/>*/}
        //     </AppStack.Navigator>
        //     {/*<AuthStack/>*/}
        //   </NavigationContainer>
    );

}
// const App = () => {
//
//     const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
//
//     useEffect(() => {
//         AsyncStorage.getItem('alreadyLaunched').then(value => {
//             if(value == null) {
//                 AsyncStorage.setItem('alreadyLaunched', 'true');
//                 setIsFirstLaunch(true);
//             } else {
//                 setIsFirstLaunch(false);
//             }
//         })
//     }, []);
//
//     if( isFirstLaunch === null) {
//         return null;
//     } else if ( isFirstLaunch === true ) {
//         return (
//             <NavigationContainer>
//                 <AppStack.Navigator
//                     headerMode="none"
//                 >
//                     <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
//                     <AppStack.Screen name="Login" component={LoginScreen}/>
//                 </AppStack.Navigator>
//             </NavigationContainer>
//         )
//     } else {
//         return <LoginScreen />;
//     }
// };

// export default App;
