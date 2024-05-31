import React from "react";
import axios from "axios";

const api_key = 'AIzaSyClpWak70deVwAeI5D06tkvAce-vYKfZFY ';

const authenticate=(mode, data, callback)=> {

    const link = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${api_key}`;

    const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
 
    axios.post(link, data, config)
    .then(res=> { 
        callback(res)
    })
    .catch(error=> {
        // failed to create account. Error 
        callback(error);
    });
}

export async function do_login_op(email, password, callback) {
    const data = {
        email: email,
        password: password,
        returnSecureToken: true,
    }
    
    authenticate('signInWithPassword', data, resp=> {
        callback(resp);
    });

}

export async function create_user(email, password, callback) {

    const data = {
        email: email,
        password: password,
        returnSecureToken: true,
    } 

    authenticate('signUp', data, resp=> {
        callback(resp);
    });

}

