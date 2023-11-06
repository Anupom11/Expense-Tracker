import React, {useState} from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from "./Main";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" key={Main} component={Main} options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;