import {createContext, useReducer} from 'react';

import {DATA} from '../dataset/datavalue';

export const ExpensesContext = createContext({
    expenses: [],
    addExpenses:({id, title, price, time})=> {},
    deleteExpenses:(id)=> {},
    updateExpenses:(id, {idVal, title, price, time})=> {},
});

function expensesReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id:id}, ...state]; 

        case 'UPDATE': 
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );

            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        
        case 'DELETE':
            return state.filter((expense)=> expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DATA);

    function addExpense(expenseData) {
        dispatch({type:'ADD', payload: expenseData});
    }

    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenseData) {
        dispatch({type: 'UPDATE', payload: {id:id, data: expenseData}});
    }

    const value = {
        expenses: expensesState,
        addExpenses: addExpense,
        deleteExpenses: deleteExpense,
        updateExpenses: updateExpense
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;








