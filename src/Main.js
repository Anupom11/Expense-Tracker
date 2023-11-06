import React, {useState} from "react";
import {Text, Button, TextInput, View, Alert, TouchableOpacity, StatusBar, FlatList } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';
import UpdateExpensesModal from "./UpdateExpenses";
import AddExpenseModal from "./AddExpenses";

import { DATA } from "./dataset/datavalue";

const HeaderSection=({handleAddExpenseModal})=> {
    return (
        <>
            <View style={{flexDirection:'row', backgroundColor:'#1a1919', height:50, justifyContent:'space-between'}}>
                <Text style={{color:'white', alignSelf:'center', fontSize:18, margin:5, fontWeight:'normal'}}>Expense Tracker</Text>
                
                <TouchableOpacity style={{alignSelf:'center', alignContent:'flex-end', marginEnd:10 }} onPress={()=> handleAddExpenseModal(true)}>
                    <Icon name='plus' size={30} color="#ffffff" />
                </TouchableOpacity>

                
            </View>
        </>
    )
}

export default Main=()=> {

    const [addExpenseModal, setAddExpenseModal] = useState(false);
    const [updateExpenseModal, setUpdateExpenseModal] = useState(false);

    const [selectedExpenseTitle, setSelectedExpenseTitle] = useState('');
    const [selectedExpensePrice, setSelectedExpensePrice] = useState();
    const [selectedExpenseTime, setSelectedExpenseTime] = useState('');

    const ExpenseBodySection=()=> {
        return (
            <View style={{backgroundColor:'black', flex:1}}>
                
                <View style={{flexDirection:'row', justifyContent:'space-between', borderRadius:10, margin:10, padding: 10, backgroundColor:'white', height:50,  }}>
                    <Text style={{alignSelf:'center', fontSize:16, color:'black'}}>Last 7 days</Text>
                    <Text style={{alignSelf:'center', fontSize:18, fontWeight:'bold', color:'black'}}>Rs. 100</Text>
                </View>
    
                <FlatList
                    data={DATA}
                    renderItem={({item}) => <ExpenseDtlSection title={item.title} price={item.price} time={item.time}/> }
                    keyExtractor={item => item.id}
                />
    
            </View>
        )
    }

    const ExpenseDtlSection=({title, price, time})=> {
        return (            
            <TouchableOpacity 
                onPress={()=> handleUpdateExpenseModal(true, title, price, time)}
                onLongPress={()=> alert("Delete operation!")}>
                <View style={{flexDirection:'row', justifyContent:'space-between', borderRadius:10, borderColor:'white', borderWidth:1, margin:10, padding: 10, backgroundColor:'black', height:80,  }}>
                    <View style={{backgroundColor:'black', alignSelf:'center' }}>
                        <Text style={{alignSelf:'flex-start', maxWidth:250, maxHeight:30, fontWeight:'bold', fontSize:20, color:'white'}}>{title}</Text>
                        <Text style={{alignSelf:'flex-start', maxWidth:250, maxHeight:30, fontSize:18, color:'white'}}>{time}</Text>
                    </View>
                    <View style={{backgroundColor:'white', flexDirection:'row', height:60, width:120, padding:5, borderColor:'black', borderRadius:5, borderWidth:1, alignSelf:'center',  }}>
                        <Text style={{alignSelf:'center', alignItems:'center', maxWidth:120, maxHeight:20, fontSize:16, fontWeight:'bold', color:'black', }}>Rs. {price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const handleAddExpenseModal=(flag)=> {
        setAddExpenseModal(flag);
    }

    const handleUpdateExpenseModal=(flag, title, price, time)=> {
        setUpdateExpenseModal(flag);

        setSelectedExpenseTitle(title);
        setSelectedExpensePrice(price);
        setSelectedExpenseTime(time);
    }

    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor="#262626" 
                hidden={false} />

            {
                //headerSection()
                <HeaderSection handleAddExpenseModal={handleAddExpenseModal}/>
            }

            <View style={{backgroundColor:'black', flex:1}}>
            {
                ExpenseBodySection()
            }
            </View>

            {
                addExpenseModal ?
                    <AddExpenseModal
                        modalVisibility={addExpenseModal}
                        handleAddExpenseModal = {handleAddExpenseModal}  />
                : null
            }

            {
                updateExpenseModal ? 
                    <UpdateExpensesModal 
                        modalVisibility={updateExpenseModal} 
                        handleUpdateExpenseModal={handleUpdateExpenseModal}
                        title={selectedExpenseTitle} 
                        price={selectedExpensePrice} 
                        timeVal={selectedExpenseTime} /> 
                : null
            }

        </>
    )
}

