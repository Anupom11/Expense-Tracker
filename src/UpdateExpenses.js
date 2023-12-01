import React, {useContext, useEffect, useState} from "react";

import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView, Pressable } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';
import { ExpensesContext } from "./store/Expenses-context";
import { updateDataValue } from "./store/sqlite_storage";

import Moment from 'moment';

import DatePicker from 'react-native-date-picker';

import {TextInputComponent, DescInputComponent } from '../src/component/FormComponents';

export default UpdateExpenseModal=({modalVisibility, handleUpdateExpenseModal, id, title, price, timeVal, desc})=> {

    const [modalVisible, setModalVisibile] = useState(true);

    /* const [expenseID, setExpenseID]         = useState('');
    const [expenseTitle, setExpenseTitle] = useState('');
    const [expensePrice, setExpensePrice] = useState();
    const [expenseTime, setExpenseTime] = useState(''); */

    const [inputValue, setInputvalue] = useState({
        expenseID: '',
        expenseTitle: '',
        expensePrice: '',
        expenseTime: '',
        expenseDesc: '',
    });

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const expensesCtx = useContext(ExpensesContext);

    useEffect(()=> {
        setModalVisibile(modalVisibility);

        /* setExpenseID(id);
        setExpenseTitle(title);
        setExpensePrice(price);
        setExpenseTime(timeVal); */

        inputChangeHandlerSection('expenseID', id);
        inputChangeHandlerSection('expenseTitle', title);
        inputChangeHandlerSection('expensePrice', price);
        inputChangeHandlerSection('expenseTime', timeVal);
        inputChangeHandlerSection('expenseDesc', desc);

    }, [false]);

    const inputChangeHandlerSection=(inputIdentifier, value)=> {
        setInputvalue((curInputvalues)=> {
            return {
                ...curInputvalues,
                [inputIdentifier]: value,
            }
        });
    }

    const HeaderSection=()=> {
        return (
            <>
                <View style={{flexDirection:'row', backgroundColor:'#1a1919', height:50, justifyContent:'space-between'}}>
                    <Text style={{color:'white', alignSelf:'center', fontSize:18, margin:5, fontWeight:'normal'}}>Update Expense</Text>
                    
                    <TouchableOpacity style={{alignSelf:'center', alignContent:'flex-end', marginEnd:10 }} onPress={()=> handleUpdateExpenseModal(false)}>
                        <Icon name='close' size={30} color="#ffffff" />
                    </TouchableOpacity>
                        
                </View>
            </>
        )
    }

    const updateExpenseData=()=> {
        if(inputValue.expenseTitle != '' && inputValue.expensePrice != 0 && inputValue.expenseTime != '') {

            const expenseFormattedVal = Moment(new Date(inputValue.expenseTime)).format("YYYY-MM-DD");

            updateDataValue(inputValue.expenseID, inputValue.expenseTitle, inputValue.expensePrice, expenseFormattedVal, response=> {
                alert(response);
            });

            /* expensesCtx.updateExpenses(
                expenseID,
                {
                    idVal:expenseID,
                    title: expenseTitle,
                    price: expensePrice,
                    time: expenseFormattedVal 
                }
            ); */

            alert("Data saved successfully");
            
            setModalVisibile(false); 
            handleUpdateExpenseModal(false)
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
            onRequestClose={()=> {setModalVisibile(false); handleUpdateExpenseModal(false)}} >

                <View style={{backgroundColor:'black', flex:1}}>

                    <HeaderSection/>
                
                    <View style={{marginTop:10}}>
                        
                        <TextInputComponent
                            label="Expense Title"
                            textInputConfig={{
                                keyboardType:"default",
                                placeholder:"Expense Title",
                                onChangeText: inputChangeHandlerSection.bind(this, 'expenseTitle'),
                                value: inputValue.expenseTitle
                            }}  />

                        <TextInputComponent
                            label="Price"
                            textInputConfig={{
                                keyboardType: 'numeric',
                                placeholder: "Expense Price",
                                onChangeText: inputChangeHandlerSection.bind(this, 'expensePrice'),
                                value: inputValue.expensePrice.toString(),
                                maxLength:15,
                            }}  />

                        <Pressable onPress={()=> setOpen(true)}>
                            <View pointerEvents="none">
                                <TextInputComponent
                                    label="Date"
                                    textInputConfig={{
                                        keyboardType: 'default',
                                        placeholder: "Expense time",
                                        maxLength:15,
                                        value: inputValue.expenseTime,
                                        onChangeText: inputChangeHandlerSection.bind(this, 'expenseTime'),
                                    }}  />
                            </View>
                        </Pressable>

                        <DescInputComponent
                            label="Description"
                            textInputConfig={{
                                keyboardType:"default",
                                placeholder:"Description",
                                onChangeText: inputChangeHandlerSection.bind(this, 'expenseDesc'),
                                value: inputValue.expenseDesc,
                                maxLengthVal:50, 
                                numberOfLine: 4,
                                multiline: true,   
                            }} />

                        {/* <Text style={{color:'white', marginStart:10, fontSize:16}}>Expense Title</Text>
                        <TextInput 
                            style={{backgroundColor:'white', margin:10, borderRadius:5}}
                            onChangeText={(text)=> setExpenseTitle(text)}
                            value={expenseTitle}
                            placeholder="Expense title"
                            maxLength={50} /> */}

                        {/* <Text style={{color:'white', marginStart:10, fontSize:16}}>Price</Text>
                        <TextInput 
                            style={{backgroundColor:'white', margin:10, borderRadius:5}}
                            onChangeText={(text)=> setExpensePrice(text)}
                            value={expensePrice+""}
                            placeholder="Expense Price"
                            keyboardType="numeric"
                            maxLength={15} /> */}

                        {/* <Text style={{color:'white', marginStart:10, fontSize:16}}>Date</Text>
                        <Pressable onPress={()=> setOpen(true)}>
                            <View pointerEvents="none">
                                <TextInput 
                                    style={{backgroundColor:'white', margin:10, borderRadius:5}}
                                    onChangeText={(text)=> setExpenseTime(text)}
                                    value={expenseTime}
                                    placeholder="Expense time"
                                    keyboardType="default"
                                    maxLength={15} />
                            </View>
                        </Pressable> */}

                        <DatePicker
                            modal
                            mode="date"
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false); 
                                inputChangeHandlerSection('expenseTime', date.toString());
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />

                        <TouchableOpacity style={{borderColor:'white', borderWidth:1, margin:15, alignItems:'center'}} onPress={()=> updateExpenseData()}>
                            <Text style={{color:"white", fontSize:16, margin:10}}>Update</Text>
                        </TouchableOpacity>

                    </View>

                    
                </View>
            

        </Modal>
    )

}