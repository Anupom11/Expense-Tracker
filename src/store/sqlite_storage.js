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

export const saveDataValue=(expenseTitle, expensePrice, expenseTime, expenseDesc, callback)=> {
    db.transaction(tx=> {
        tx.executeSql(
            "insert into ExpenseData(title, price, time, desc) values(?,?,?,?)", 
            [expenseTitle, expensePrice, expenseTime, expenseDesc], 
            (tx, results)=> {
                if(results.rowsAffected > 0) {
                    let msg = results.rowsAffected+" no of data inserted";
                    callback(msg);
                }
                else {
                    let msg = "No data inserted!";
                    callback(msg);
                }
            }, (err) => { 
                callback(err.message);
                console.log(err.message);  
            }
        )
    });
}

export const updateDataValue=(expenseID, expenseTitle, expensePrice, expenseTime, expenseDesc, callback)=> {
    db.transaction(tx=> {
        tx.executeSql(
            "update ExpenseData set title='"+expenseTitle+"', price='"+expensePrice+"', time='"+expenseTime+"', desc='"+expenseDesc+"' where id='"+expenseID+"' ",
            [],
            (tx, results)=> {
                if(results.rowsAffected > 0) {
                    let msg = results.rowsAffected+" no of data updated";
                    callback(msg);
                }
                else {
                    let msg = "No data updated!";
                    callback(msg);
                }
            },
            (err)=> {
                callback(err.message);
            }
        )
    })
}

export const getDataValue=(callback)=> {
    db.transaction(tx=> {
        tx.executeSql(
            "select * from ExpenseData",
            [],
            (tx, results)=> {
                let dataSet = [];

                if(results.rows.length > 0) {    
                    for(let i=0; i< results.rows.length; i++) {
                        dataSet[i] = results.rows.item(i);
                    }
                }

                callback(dataSet);
            }, 
            (err) => { 
                console.log(err.message); 
                callback([]);
            }
        )
    });
}

export const deleteDataValue=(id, callback)=> {
    db.transaction(tx=> {   
        tx.executeSql(
            "delete from ExpenseData where id=?",
            [id],
            (tx, results)=> { 
                callback(results.rowsAffected+" no of data deleted!");
            },
            (err) => {
                //console.log(err.message);
                callback(err.message);
            }
        )
    });
}

