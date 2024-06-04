import React from "react";

import EncryptedStorage from 'react-native-encrypted-storage';

// For storing key
export const storeDataSecurly=async(key, value)=> {  
    try {
        await EncryptedStorage.setItem(
            key, value
        );

        // Congrats! You've just stored your first value!
    } catch (error) {
        // There was an error on the native side
    }
}

// For retrieving key
export const getSecureData=async({key})=> {
    try {   
        const session = await EncryptedStorage.getItem(key);
    
        if (session !== undefined) {
            return session;
        }
    } catch (error) { 
        // There was an error on the native side
        return null;
    }
}

// For removing key
export const removeSecureKey=({key})=> {
   
}







