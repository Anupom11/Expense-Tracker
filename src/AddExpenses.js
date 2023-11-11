import React, {useEffect, useState, useContext} from "react";

import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';

import { ExpensesContext } from "./store/Expenses-context";

import { getDataValue, saveDataValue } from "./store/sqlite_storage";

export default AddExpenseModal=({modalVisibility, handleAddExpenseModal})=> {

    const [modalVisible, setModalVisibile] = useState(true);

    const [expenseTitle, setExpenseTitle] = useState('');
    const [expensePrice, setExpensePrice] = useState(0);
    const [expenseTime, setExpenseTime] = useState('');

    const expensesCtx = useContext(ExpensesContext);

    useEffect(()=> {
        setModalVisibile(modalVisibility);
    }, [false]);

    const HeaderSection=()=> {
        return (
            <>
                <View style={{flexDirection:'row', backgroundColor:'#1a1919', height:50, justifyContent:'space-between'}}>
                    <Text style={{color:'white', alignSelf:'center', fontSize:18, margin:5, fontWeight:'normal'}}>Add Expense</Text>
                    
                    <TouchableOpacity style={{alignSelf:'center', alignContent:'flex-end', marginEnd:10 }} onPress={()=> handleAddExpenseModal(false)}>
                        <Icon name='close' size={30} color="#ffffff" />
                    </TouchableOpacity>
                        
                </View>
            </>
        )
    }

    const addExpenseData=()=> {
        if(expenseTitle != '' && expensePrice != 0 && expenseTime != '') {

            saveDataValue(expenseTitle, expensePrice, expenseTime, response=> {
                alert(response);
            });
            
            expensesCtx.addExpenses({
                id:new Date().toString + Math.random.toString(),
                title: expenseTitle,
                price: expensePrice,
                time: expenseTime 
            });

            alert("Data saved successfully");
            
            setModalVisibile(false); 
            handleAddExpenseModal(false)
        }
        else {
            alert('Please add the data!');
        }
        
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=> {setModalVisibile(false); handleAddExpenseModal(false)}} >

            
                <View style={{backgroundColor:'black', flex:1}}>

                    <HeaderSection/>
                
                    <View style={{marginTop:10}}>
                        <Text style={{color:'white', marginStart:10, fontSize:16}}>Expense Title</Text>
                        <TextInput 
                            style={{backgroundColor:'white', margin:10, borderRadius:5}}
                            onChangeText={(text)=> setExpenseTitle(text)}
                            value={expenseTitle}
                            placeholder="Expense title"
                            maxLength={50} />

                        <Text style={{color:'white', marginStart:10, fontSize:16}}>Price</Text>
                        <TextInput 
                            style={{backgroundColor:'white', margin:10, borderRadius:5}}
                            onChangeText={(text)=> setExpensePrice(text)}
                            value={expensePrice+""}
                            placeholder="Expense Price"
                            keyboardType="numeric"
                            maxLength={15} />

                        <Text style={{color:'white', marginStart:10, fontSize:16}}>Date</Text>
                        <TextInput 
                            style={{backgroundColor:'white', margin:10, borderRadius:5}}
                            onChangeText={(text)=> setExpenseTime(text)}
                            value={expenseTime}
                            placeholder="Expense time"
                            keyboardType="default"
                            maxLength={15} />

                        <TouchableOpacity style={{borderColor:'white', borderWidth:1, margin:15, alignItems:'center'}} onPress={()=>addExpenseData()}>
                            <Text style={{color:"white", fontSize:16, margin:10}}>Save</Text>
                        </TouchableOpacity>

                    </View>

                    
                </View>
            

        </Modal>
    )

}