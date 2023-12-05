import React from "react";
import axios from "axios";

const firebaseLink = 'https://expensetracker-6a6d5-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json';

export function StoreExpenseData(expenseData) { 
    axios.post(firebaseLink, expenseData)
    .then(function(response) {
        console.log("Axios::"+response);
    })
    .catch(function(error) {
        console.log("Error:"+error);
    })
    .finally(function() {
        console.log("Finally section!");
    });
}

export async function FetchExpenseData() { 
    
    axios.get(firebaseLink)
    .then(function(response) {
        //console.log("Res::"+JSON.stringify(response.data));

        for(const key in response.data) {
            console.log("Key::"+key);
            console.log("Data::"+JSON.stringify(response.data[key]));
        }

    })
    .catch(function(error) {
        console.log("Error::"+error);
    })
    .finally(function() {
        console.log("Finally section");
    });
}




