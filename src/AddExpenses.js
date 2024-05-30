import React, {useEffect, useState, useContext} from "react";

import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView, Pressable, } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';

import { ExpensesContext } from "./store/Expenses-context";

import { getDataValue, saveDataValue } from "./store/sqlite_storage";

import Moment from 'moment';

import DatePicker from 'react-native-date-picker';

import { TextInputComponent, DescInputComponent, TextInputComponent1 } from "./component/FormComponents";

import { StoreExpenseData } from "./component/ServerRequest";

export default AddExpenseModal=({modalVisibility, handleAddExpenseModal, addFirebaseDataMode})=> {

    const [modalVisible, setModalVisibile] = useState(true);

    const [addFirebaseDataModeVal, setAddFirebaseDataModeVal] = useState(false);      //<--- state variable for firebase data add operation

    //---------------------------------------------------
    const [inputValue, setInputValue] = useState({
        expenseTitle: '',
        expensePrice: '',
        expenseTime: '',
        expenseDesc: ''
    });
    //---------------------------------------------------

    //---------------------------------------------------------
    const [expTitleValid, setExpTitleValid] = useState(true);
    const [expPriceValid, setExpPriceValid] = useState(true);
    const [expTimeValid, setExpTimeValid]   = useState(true);
    const [expDescValid, setExpDescValid]   = useState(true);
    //---------------------------------------------------------

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const expensesCtx = useContext(ExpensesContext);

    useEffect(()=> {
        setModalVisibile(modalVisibility);

        setAddFirebaseDataModeVal(addFirebaseDataMode);

    }, [false]);

    const inputChangeHandler=(inputIndentifier, enteredValue)=> { 

        setInputValue((curInputValues)=> {
            return {
                ...curInputValues,
                [inputIndentifier]: enteredValue
            };
        });
    }

    const HeaderSection=()=> {
        return (
            <>
                <View style={{flexDirection:'row', backgroundColor:'#1a1919', height:50, justifyContent:'space-between'}}>

                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'white', alignSelf:'center', fontSize:18, margin:5, fontWeight:'normal'}}>Add Expense</Text>
                        {
                            addFirebaseDataModeVal ? 
                                <Text style={{color:'red', alignSelf:'center', fontSize:18, margin:5, fontWeight:'normal'}}>(Firebase)</Text>
                            :
                                null
                        }
                    </View>
                    
                    <TouchableOpacity style={{alignSelf:'center', alignContent:'flex-end', marginEnd:10 }} onPress={()=> handleAddExpenseModal(false)}>
                        <Icon name='close' size={30} color="#ffffff" />
                    </TouchableOpacity>
                        
                </View>
            </>
        )
    }

    const addExpenseData=()=> {

        if(inputValue.expenseTitle != '' && inputValue.expensePrice != '' && inputValue.expenseTime != '') {

            //-------------------------
            setExpTitleValid(true);
            setExpPriceValid(true);
            setExpTimeValid(true);
            //-------------------------

            const expenseFormattedVal = Moment(new Date(inputValue.expenseTime)).format("YYYY-MM-DD"); 

            if(!addFirebaseDataModeVal) {
                saveDataValue(inputValue.expenseTitle, inputValue.expensePrice, expenseFormattedVal, inputValue.expenseDesc, response=> {
                    alert(response);
                });
            }
            else {
                //-----------------------------------------
                // method to save data on firebase
                const expenseDataSet = {
                    expenseTitle: inputValue.expenseTitle,
                    expensePrice: inputValue.expensePrice,
                    expenseTime: expenseFormattedVal,
                    expenseDesc: inputValue.expenseDesc
                };

                StoreExpenseData(expenseDataSet);
                //-----------------------------------------
            }
            
            /* expensesCtx.addExpenses({
                id:new Date().toString + Math.random.toString(),
                title: expenseTitle,
                price: expensePrice,
                time: expenseFormattedVal 
            }); */

            alert("Data saved successfully");
            
            setModalVisibile(false); 
            handleAddExpenseModal(false);

        }
        else {
            //-----------------------------------------------
            if(inputValue.expenseTitle.trim() === '') { 
                setExpTitleValid(false);  
            } else {
                setExpTitleValid(true);
            }
            
            if(inputValue.expensePrice.trim() === '') {   
                setExpPriceValid(false); 
            } else {
                setExpPriceValid(true);
            }

            if(inputValue.expenseTime.trim() === '') {
                setExpTimeValid(false);  
            } else {
                setExpTimeValid(true);
            }
            //-------------------------------------------------

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

                <ScrollView>

                    <View style={{backgroundColor:'black', flex:1}}>

                        <HeaderSection/>
                    
                        <View style={{marginTop:10}}>
                        
                            <TextInputComponent
                                label="Expense Title"
                                invalid= {expTitleValid}
                                textInputConfig={{
                                    keyboardType:"default",
                                    placeholder:"Expense Title",
                                    onChangeText: inputChangeHandler.bind(this, 'expenseTitle'),
                                    value: inputValue.expenseTitle,
                                }}
                            />

                            <TextInputComponent
                                label="Expense Price"
                                invalid= {expPriceValid}
                                textInputConfig={{
                                    keyboardType: "numeric",
                                    placeholder: "Expense Price",
                                    onChangeText: inputChangeHandler.bind(this, 'expensePrice'),
                                    value: inputValue.expensePrice.toString(),
                                }}  />

                            <Pressable onPress={()=> setOpen(true)}>
                                <View pointerEvents="none">
                                    <TextInputComponent
                                        label="Date"
                                        invalid= {expTimeValid}
                                        textInputConfig={{
                                            keyboardType: "default",
                                            placeholder: "Expense Date",
                                            onChangeText: inputChangeHandler.bind(this, 'expenseTime'), 
                                            value: inputValue.expenseTime,
                                        }}  />
                                </View>
                            </Pressable>

                            <DatePicker
                                modal
                                mode="date"
                                open={open}
                                date={date}
                                onConfirm={(date) => {
                                    setOpen(false) ; 
                                    inputChangeHandler('expenseTime', date.toString()); 
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />

                            <DescInputComponent
                                label="Description"
                                textInputConfig={{
                                    keyboardType:"default",
                                    placeholder:"Description",
                                    onChangeText: inputChangeHandler.bind(this, 'expenseDesc'),
                                    value: inputValue.expenseDesc,
                                    maxLengthVal:50, 
                                    numberOfLine: 4,
                                    multiline: true,   
                                }} />

                            <TouchableOpacity style={{borderColor:'white', borderWidth:1, margin:15, alignItems:'center'}} onPress={()=>addExpenseData()}>
                                <Text style={{color:"white", fontSize:16, margin:10}}>Save</Text>
                            </TouchableOpacity>

                        </View>

                    </View>      
                       
                </ScrollView>
            
            </View>

        </Modal>
    )

}


