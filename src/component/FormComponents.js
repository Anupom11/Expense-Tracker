import React, {useState} from "react";

import {Text, TextInput, View, StyleSheet} from 'react-native';

export const TextInputComponent=({label, textInputConfig})=> {
    return (
        <View>
            <Text style={{color:'white', marginStart:10, fontSize:16}}>{label}</Text>
            <TextInput
                style={{backgroundColor:'white', margin:10, borderRadius:5}}
                {...textInputConfig} />
        </View>
    )
}

export const DescInputComponent=({label, textInputConfig})=> {
    return (
        <View>
            <Text style={{color:'white', marginStart:10, fontSize:16}}>{label}</Text>
            <TextInput
                style={styles.descStyle}
                {...textInputConfig}    />
        </View>
    )
}

const styles = StyleSheet.create({
    descStyle: {
        margin:10,
        alignItems: 'center', 
        height: 100, 
        width: '95%', 
        backgroundColor: 'white', 
        borderRadius: 5, 
        textAlignVertical:'top'
    }
})

export const TextInputComponent1 =({label, keyboardType, maxLengthVal, placeHolder})=> {

    const [expenseTitle, setExpenseTitle] = useState('');

    return (
        <View>
            <Text style={{color:'white', marginStart:10, fontSize:16}}>{label}</Text>
            
            <TextInput 
                style={{backgroundColor:'white', margin:10, borderRadius:5}}
                onChangeText={(text)=> setExpenseTitle(text)}
                value={expenseTitle}
                placeholder={placeHolder}
                keyboardType={keyboardType}
                maxLength={maxLengthVal} />

        </View>
    )

}