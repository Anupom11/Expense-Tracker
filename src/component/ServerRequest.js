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
    
    /* await axios.get(firebaseLink)
    .then(function(response) {
        //console.log("Res::"+JSON.stringify(response.data));

        let expenseDataSet = [];

        for(const key in response.data) { 
            const expenseData = {
                id: key,
                title: response.data[key].title,
                price: response.data[key].price,
                desc: response.data[key].desc
            };

            expenseDataSet.push(expenseData);
        } 

        return expenseDataSet; 

    })
    .catch(function(error) {
        console.log("Error::"+error);
        return [];
    }); */

    const response = await axios.get(firebaseLink);

    const expenseData = [];

    for(const key in response.data) {
        const expenseDataObj = {
            id: key,
            title: response.data[key].title,
            price: response.data[key].price,
            desc: response.data[key].desc
        };

        expenseData.push(expenseDataObj);

    }

    return expenseData;

}




