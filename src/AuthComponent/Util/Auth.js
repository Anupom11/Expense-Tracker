import React from "react";
import axios from "axios";

const api_key = 'AIzaSyClpWak70deVwAeI5D06tkvAce-vYKfZFY ';

const createUserLink = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+api_key;

export async function create_user(email, password, callback) {

    const data = {
        email: email,
        password: password,
        returnSecureToken: true,
    } 

    const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
 
    axios.post(createUserLink, data, config)
    .then(res=> { 
        callback(res)
    })
    .catch(error=> {
        // failed to create account. Error 
        callback(error);
    });
}

