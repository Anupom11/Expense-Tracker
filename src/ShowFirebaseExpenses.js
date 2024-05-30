import React, {useEffect, useState, useContext} from "react";

import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView, Pressable, FlatList, Alert, async } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';

import { FetchExpenseData, deleteFirebaseExpData } from "./component/ServerRequest";

export default ShowFirebaseExpenseModal=({modalVisibility, handleShowFirebaseModal, addFirebaseDataOpFlag, handleFirebaseUpdateOp})=> {

    const [modalVisible, setModalVisibile] = useState(true);

    const [DATA, setDATA] = useState([]);

    useEffect(()=> {
        setModalVisibile(modalVisibility);

        getExpenseDataSet();    // call the method to get expense data from firebase

    }, [false]);

    const HeaderSection=()=> {
        return (
            <>
                <View style={{flexDirection:'row', backgroundColor:'#1a1919', height:50, justifyContent:'space-between'}}>
                    <Text style={{color:'white', alignSelf:'center', fontSize:18, margin:5, fontWeight:'normal'}}>Firebase Expense Data</Text>
                    
                    <View style={{flexDirection:'row', alignContent:'flex-end', marginEnd:10}} >
                        <TouchableOpacity style={{alignSelf:'center', marginStart:15, marginEnd:20 }} onPress={()=> addFirebaseDataOpFlag(true)}>
                            <Icon name='plus' size={30} color="#ffffff" />
                        </TouchableOpacity>

                        <TouchableOpacity style={{alignSelf:'center', alignContent:'flex-end', marginEnd:10 }} onPress={()=> handleShowFirebaseModal(false)}>
                            <Icon name='close' size={30} color="#ffffff" />
                        </TouchableOpacity> 
                    </View>

                </View>
            </>
        )
    }

    //--------------------------------------------------------
    // method to get the data from firebase
    async function getExpenseDataSet() {            
        const dataset = await FetchExpenseData(); 
        setDATA(dataset);
        //console.log("Data1::"+JSON.stringify(dataset));
    }
    //--------------------------------------------------------

    const ExpenseFirebaseDataSet=()=> {
        return (
            <View style={{backgroundColor:'black', flex:1}}>
                {
                    DATA.length > 0 ?
                        <View>
                            <FlatList
                                //refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={()=> getExpenseData() } /> }
                                data={DATA}
                                renderItem={({item}) => <ExpenseDtlSection id={item.id} title={item.title} price={item.price} time={item.time} desc={item.desc}/> }
                                keyExtractor={item => item.id}
                            />
                        </View>
                    :
                        <View style={{ alignSelf:'center', backgroundColor:'black', marginTop:50}}>
                            <Text style={{color:'white'}}>No expense data present!</Text>
                        </View>
                }
            </View>
        )
    }

    const handleExpDtlUpdateOp=({id, title, price, time, desc})=> {

        // hide the modal
        setModalVisibile(false);
        handleShowFirebaseModal(false);

        handleFirebaseUpdateOp({id, title, price, time, desc});

    }

    const handleFirebaseDeleteOp=(id)=> {
        Alert.alert('Confirm', 'Are you sure you want to delete?', [
            {
                text: 'Cancel',
                style: 'Cancel',
            }, 
            {
                text: 'delete',
                onPress: ()=> deleteFirebaseExpData(id)
            }
        ]);
    }

    const ExpenseDtlSection=({id, title, price, time, desc})=> { 
        return (            
            <TouchableOpacity onPress={()=> handleExpDtlUpdateOp({id, title, price, time, desc}) } onLongPress={()=> handleFirebaseDeleteOp(id)}>
                <View style={{flexDirection:'row', justifyContent:'space-between', borderRadius:10, borderColor:'white', borderWidth:1, margin:10, padding: 10, backgroundColor:'black', height:100,  }}>
                    <View style={{backgroundColor:'black', alignSelf:'center' }}>
                        <Text style={{alignSelf:'flex-start', maxWidth:250, maxHeight:30, fontWeight:'bold', fontSize:20, color:'white'}}>{title}</Text>
                        <Text style={{alignSelf:'flex-start', maxWidth:250, maxHeight:50, fontSize:18, color:'white'}}>{time}</Text>
                    </View>
                    <View style={{backgroundColor:'white', flexDirection:'row', height:60, width:120, padding:5, borderColor:'black', borderRadius:5, borderWidth:1, alignSelf:'center',  }}>
                        <Text style={{alignSelf:'center', alignItems:'center', maxWidth:120, maxHeight:20, fontSize:16, fontWeight:'bold', color:'black', }}>Rs. {price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=> {setModalVisibile(false); handleShowFirebaseModal(false)}} >
            
            <View style={{backgroundColor:'black', flex:1}}>

                <HeaderSection/>

                <View style={{backgroundColor:'black', flex:1}}>
                {
                    ExpenseFirebaseDataSet()
                }
                </View>
            
            </View>

        </Modal>
    )

}


