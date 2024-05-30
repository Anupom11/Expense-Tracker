import React, {useState, useContext, useEffect} from "react";
import {Text, Button, TextInput, View, Alert, TouchableOpacity, StatusBar, FlatList, RefreshControl } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';
import UpdateExpensesModal from "./UpdateExpenses";
import AddExpenseModal from "./AddExpenses";

//import { DATA } from "./dataset/datavalue";
import { getDataValue, deleteDataValue } from "./store/sqlite_storage";

import {ExpensesContext} from "./store/Expenses-context";

import { FetchExpenseData } from "./component/ServerRequest";
import ShowFirebaseExpenses from "./ShowFirebaseExpenses";

import LoadingOverlay from "./component/LoadingOverlay";

const HeaderSection=({handleAddExpenseModal, handleShowFirebaseExpenseModal})=> {
    return (
        <>
            <View style={{flexDirection:'row', backgroundColor:'#1a1919', height:50, justifyContent:'space-between'}}>
                <Text style={{color:'white', alignSelf:'center', fontSize:18, margin:5, fontWeight:'normal'}}>Expense Tracker</Text>
                
                <View style={{alignContent:'flex-end', alignSelf:'center', flexDirection:'row'}}>
                    <TouchableOpacity style={{alignSelf:'center',  margin: 10}} onPress={()=> handleShowFirebaseExpenseModal(true)}>
                        <Icon name='fire' text="Firebase" size={30} color="#ffffff" />
                    </TouchableOpacity>

                    <TouchableOpacity style={{alignSelf:'center', marginStart:15, marginEnd:15 }} onPress={()=> handleAddExpenseModal(true)}>
                        <Icon name='plus' size={30} color="#ffffff" />
                    </TouchableOpacity>
                </View>
                
            </View>
        </>
    )
}

export default Main=()=> {

    const [addExpenseModal, setAddExpenseModal]             = useState(false);
    const [updateExpenseModal, setUpdateExpenseModal]       = useState(false);

    const [addDataOnFirebase, setAddDataOnFirebase]         = useState(false);     //<--- whether firebase or local DB data add operation
    const [updateFirebaseMode, setUpdateFirebaseMode]       = useState(false);     //<--- whether firebase or local DB update operation

    const [showFirebaseModal, setShowFirebaseModal]         = useState(false);

    const [selectedExpenseID, setSelectedExpenseID]         = useState('');
    const [selectedExpenseTitle, setSelectedExpenseTitle]   = useState('');
    const [selectedExpensePrice, setSelectedExpensePrice]   = useState();
    const [selectedExpenseTime, setSelectedExpenseTime]     = useState('');
    const [selectedExpenseDesc, setSelectedExpenseDesc]     = useState('');

    const [isRefreshing, setisRefreshing] = useState(false);

    const [isFetchingData, setIsFetchingData] = useState(true);

    //const expensesCtx = useContext(ExpensesContext);
    //const DATA = expensesCtx.expenses;

    const [DATA, setDATA] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);

    useEffect(()=> {
        
        //<<<--------------------------->>>
        // get the data value
       /*  getDataValue(response=> {
            setDATA(response); 
            calcTotalExpense(response);
        }); */

        getExpenseData();

        //<<<--------------------------->>>

        //--------------------------------------------------------
        // method to get the data from firebase
        /* async function getExpenseDataSet() {            
            const dataset = await FetchExpenseData(); 
            console.log("Data1::"+JSON.stringify(dataset));
        }
        
        getExpenseDataSet(); */    // call the method
        //--------------------------------------------------------

    }, []);

    // method to get the list of expense details
    const getExpenseData=()=> {
        
        setisRefreshing(true);

        getDataValue(response=> {
            //console.log("Data:"+JSON.stringify(response));
            setisRefreshing(false);

            setIsFetchingData(false);

            setDATA(response); 
            calcTotalExpense(response);
        });
    }

    const ExpenseBodySection=()=> { 
        return (
            <View style={{backgroundColor:'black', flex:1}}>
    
                {
                    DATA.length > 0 ?
                        <View>
                            <View style={{flexDirection:'row', justifyContent:'space-between', borderRadius:10, margin:10, padding: 10, backgroundColor:'white', height:50,  }}>
                                <Text style={{alignSelf:'center', fontSize:16, color:'black'}}>Last 7 days</Text>
                                <Text style={{alignSelf:'center', fontSize:18, fontWeight:'bold', color:'black'}}>Rs. {totalExpense}</Text>
                            </View>

                            <FlatList
                                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={()=> getExpenseData() } /> }
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

    const ExpenseDtlSection=({id, title, price, time, desc})=> { 
        return (            
            <TouchableOpacity 
                onPress={()=> handleUpdateExpenseModal(true, id, title, price, time, desc)}
                onLongPress={()=> handleDeleteOperation(id)}>
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

        setAddDataOnFirebase(false);

        // refresh the expense list
        refreshData();
    }

    const handleShowFirebaseExpenseModal=(flag)=> {
        setShowFirebaseModal(flag);
    }

    const handleUpdateExpenseModal=(flag, id, title, price, time, desc)=> {
        setUpdateExpenseModal(flag);

        setUpdateFirebaseMode(false);

        setSelectedExpenseID(id);
        setSelectedExpenseTitle(title);
        setSelectedExpensePrice(price);
        setSelectedExpenseTime(time);
        setSelectedExpenseDesc(desc);

        // refresh the expense list
        refreshData();

    }

    const refreshData=()=> {
        // refresh the expense list
        getDataValue(response=> {
            setDATA(response); 
            calcTotalExpense(response);
        });
    }

    const calcTotalExpense=(expenseDataSet)=> {
        var totalExpenseVal = 0;

        expenseDataSet.map(item=> {
            totalExpenseVal += parseFloat(item.price);
        });

        setTotalExpense(totalExpenseVal);
    }

    const handleDeleteOperation=(id)=> {
        Alert.alert('Confirm', 'Are you sure you want to delete?', [
            {
                text:'Yes',
                onPress:()=> { 
                    //expensesCtx.deleteExpenses(id); 

                    deleteDataValue(id, response=> {
                        alert(response);
                        refreshData();
                    });

                    //alert("Data delete successfully") 
                }
            },
            {
                text:'No',
                onPress:()=> {}
            }
        ]);
        
    }

    // method to handle the add operation for the firebase
    const addFirebaseDataOpFlag=(flag)=> {  
        setAddDataOnFirebase(flag);         //<--- set the firebase data add operation

        setAddExpenseModal(flag);           //<--- flag on the data add modal
    }

    // method to handle the update for the firebase
    const handleFirebaseUpdateOp=({id, title, price, time, desc})=> {
        
        handleUpdateExpenseModal(true, id, title, price, time, desc);

        // set the firebase data update op flag 
        setUpdateFirebaseMode(true)
    }

    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor="#262626" 
                hidden={false} />

            {
                //headerSection()
                <HeaderSection handleAddExpenseModal={handleAddExpenseModal} handleShowFirebaseExpenseModal={handleShowFirebaseExpenseModal}/>
            }

            {
                isFetchingData ? 
                    <LoadingOverlay/>
                :
                    null
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
                        handleAddExpenseModal = {handleAddExpenseModal}
                        addFirebaseDataMode= {addDataOnFirebase}  />
                : null
            }

            {
                showFirebaseModal ?
                    <ShowFirebaseExpenses
                        modalVisibility={showFirebaseModal}
                        handleShowFirebaseModal={handleShowFirebaseExpenseModal}
                        addFirebaseDataOpFlag= {addFirebaseDataOpFlag}
                        handleFirebaseUpdateOp= {handleFirebaseUpdateOp}    />
                : null
            }

            {
                updateExpenseModal ? 
                    <UpdateExpensesModal 
                        modalVisibility={updateExpenseModal} 
                        handleUpdateExpenseModal={handleUpdateExpenseModal}
                        updateMode={updateFirebaseMode}
                        id={selectedExpenseID}
                        title={selectedExpenseTitle} 
                        price={selectedExpensePrice} 
                        timeVal={selectedExpenseTime}
                        desc = {selectedExpenseDesc} /> 
                : null
            }

        </>
    )
}

