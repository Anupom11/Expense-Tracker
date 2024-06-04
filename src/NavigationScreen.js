import React, {useContext, useEffect, useState} from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from "./Main";
import Login from "./AuthComponent/Screen/Login";
import SignUp from "./AuthComponent/Screen/SignUp";

import ExpensesContextProvider from "./store/Expenses-context";

import AuthContextProvider, {AuthContext} from "./store/auth-context";

import { getSecureData } from "./AuthComponent/Util/StoreTokenSecurly";

const Stack = createNativeStackNavigator();

function App() {

    return (
        <>
            <AuthContextProvider>
                <ExpensesContextProvider>
                    <Navigation/>
                </ExpensesContextProvider>
            </AuthContextProvider> 
        </>
    )
}

function Navigation() {

    const authCtx = useContext(AuthContext);

    useEffect(()=> {

        async function checkUserDetails() {
            const dataGet = JSON.parse(await getSecureData("user_session"));
            if(dataGet !==null && dataGet !== undefined) {
                authCtx.authenticate(dataGet.accessToken);
            }
        }

        checkUserDetails();

    }, []);

    return (
        <NavigationContainer> 
        {
            ! authCtx.isAuthenticated ?
                <AuthStack/>
            :
                <AuthenticatedStack/>
        } 
        </NavigationContainer>
    )
}

function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" key={Login} component={Login} options={{headerShown:true}}/>
            <Stack.Screen name="SignUp" key={SignUp} component={SignUp} options={{headerShown: true}}/>
        </Stack.Navigator>
    )
}

function AuthenticatedStack() {
    return ( 
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" key={Main} component={Main} options={{headerShown:false}} />
        </Stack.Navigator> 
    )
}

export default App;



