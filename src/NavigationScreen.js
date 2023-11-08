import React, {useState} from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from "./Main";

import ExpensesContextProvider from "./store/Expenses-context";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <>
            <ExpensesContextProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Main">
                        <Stack.Screen name="Main" key={Main} component={Main} options={{headerShown:false}} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ExpensesContextProvider>
        </>
    )
}

export default App;



