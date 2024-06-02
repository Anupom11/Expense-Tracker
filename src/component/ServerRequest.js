import React, { useContext } from "react";
import axios from "axios";

import { AuthContext } from "../store/auth-context";

const firebaseBaseLink = 'https://expensetracker-6a6d5-default-rtdb.asia-southeast1.firebasedatabase.app/';

const firebaseLink = 'https://expensetracker-6a6d5-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json';

export function StoreExpenseData(authCtx, expenseData) { 

    const url = firebaseLink + "?auth=" + authCtx.token;

    axios.post(url, expenseData)
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

export async function FetchExpenseData(authCtx) { 
    
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

    const url = firebaseLink + '?auth='+authCtx.token; 

    const response = await axios.get(url);

    const expenseData = [];

    for(const key in response.data) {
        const expenseDataObj = {
            id: key,
            title: response.data[key].expenseTitle,
            price: response.data[key].expensePrice,
            desc: response.data[key].expenseDesc,
            time: response.data[key].expenseTime,
        };

        expenseData.push(expenseDataObj);
    }

    return expenseData;

}

export function updateFirebaseExpData(authCtx, id, expenseData) {
    
    const url = firebaseBaseLink + `/expenses/${id}.json` + '?auth='+authCtx.token; 

    return axios.put(url, expenseData)
}

export async function deleteFirebaseExpData(authCtx, id) { 

    const url = firebaseBaseLink + `/expenses/${id}.json` + '?auth='+authCtx.token; 

    const retrn = axios.delete(url);  

    if(retrn != null) 
        alert("Data deleted successfully!");
    else 
        alert("Failed to delete data!");

    return retrn;
}



