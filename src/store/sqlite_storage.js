import React from "react";

const DBName = 'expense_tracker';
const DBLocation = '~expense_tracker.db';

var SQLite = require('react-native-sqlite-storage');

const db = SQLite.openDatabase({name: DBName, createFromLocation: DBLocation});

//===================================
SQLite.DEBUG(true);
SQLite.enablePromise(true);
SQLite.enablePromise(false);
//===================================

export const saveDataValue=()=> {
    db.transaction(tx=> {
        tx.executeSql(
            "insert into ExpenseData values(?,?,?,?)", 
            [1, 'Test Title', 1000, '10 Days ago'], 
            (tx, results)=> {
                console.log("Results::"+JSON.stringify(results));
            }, (err) => { console.log(err.message); alert('Error!' ,''+ err.message) }
        )
    });
}

export const getDataValue=()=> {
    db.transaction(tx=> {
        tx.executeSql(
            "select * from ExpenseData", 
            [],
            (tx, results)=> {
                console.log("Results::"+JSON.stringify(results));
            }, (err) => { console.log(err.message); alert('Error!' ,''+ err.message) }
        )
    });
}

