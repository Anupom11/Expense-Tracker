import React, {useState} from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from "./Main";
import Login from "./AuthComponent/Screen/Login";
import SignUp from "./AuthComponent/Screen/SignUp";

import ExpensesContextProvider from "./store/Expenses-context";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <>
            <ExpensesContextProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen name="Main" key={Main} component={Main} options={{headerShown:false}} />
                        <Stack.Screen name="Login" key={Login} component={Login} options={{headerShown:true}}/>
                        <Stack.Screen name="SignUp" key={SignUp} component={SignUp} options={{headerShown: true}}/>
                    </Stack.Navigator>
                     
                </NavigationContainer>
            </ExpensesContextProvider>
        </>
    )
}

export default App;



