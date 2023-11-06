import React, {useEffect, useState} from "react";

import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';

export default UpdateExpenseModal=({modalVisibility, handleUpdateExpenseModal, title, price, timeVal})=> {

    const [modalVisible, setModalVisibile] = useState(true);

    const [expenseTitle, setExpenseTitle] = useState('');
    const [expensePrice, setExpensePrice] = useState();
    const [expenseTime, setExpenseTime] = useState('');

    useEffect(()=> {
        setModalVisibile(modalVisibility);

        setExpenseTitle(title);
        setExpensePrice(price);
        setExpenseTime(timeVal);

    }, [false]);

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

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=> {setModalVisibile(false); handleUpdateExpenseModal(false)}} >

            
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

                        <TouchableOpacity style={{borderColor:'white', borderWidth:1, margin:15, alignItems:'center'}}>
                            <Text style={{color:"white", fontSize:16, margin:10}}>Update</Text>
                        </TouchableOpacity>

                    </View>

                    
                </View>
            

        </Modal>
    )

}