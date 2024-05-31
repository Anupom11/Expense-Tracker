import React, {useState, useRef} from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    Button, 
    Image, 
    Platform, 
    StatusBar, 
    TouchableOpacity,
    Modal,
    ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

//import AuthContext from "./AppContext";  
//import AuthContext from '../source/AppContext';

//import { Colors } from 'react-native/Libraries/NewAppScreen';
//import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

//import 'react-native-gesture-handler';

//var app_logo = require('../../TestNavigation/img/camera_lens.png');

function SignIn({navigation}) {

    //const {signIn, signOut, signUp, forgotPwd} = React.useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const [userEmail, setUserEmail]     = useState('');
    const [userPasswd, setUserPasswd]   = useState('');

    function doSignInOp() {
        navigation.navigate('Main');
        /* setLoading(true);

        if(userEmail != '' || userPasswd != '') {
            var userDetails = { 
                email: userEmail,
                password: userPasswd
            };

            signIn(userDetails);
        }
        else {
            alert("Please enter the details!");
        } */
    }

    function doForgetPwd() {
        forgotPwd();
    }

    const LoaderSection=(props)=> {
        {console.log("Load::"+props.loading)}
        return (
            <Modal
                transparent={true}
                animationType={'fade'}
                visible={props.loading}
                onRequestClose={()=> { setLoading(false) }}>
                
                <View style={{backgroundColor:'#ff0000'}}>
                    <View>
                        <TouchableOpacity onPress={()=> setLoading(false)}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                        
                        <ActivityIndicator animating={props.loading}  size="small" color="mediumblue" />
                        <Text style={{color:'blue', fontSize:13}}>Loading</Text>
                    </View>
                </View>

            </Modal>
        )
    }

    return (
        <>
        <View style={styleSheet.container}>

            {loading ? <LoaderSection loading={loading} /> : null }

            <StatusBar style="auto"/>

            <View style={{flexDirection:'row', justifyContent:'center'}}>                
               {/*  <Image 
                    style={styleSheet.logoView} 
                    source={app_logo}/> */}
            </View>

            <View style={{alignSelf:'center', marginTop:50, width:'80%', flex:1}}>

                <Text style={{fontSize:20, color:'#000000', marginBottom:20, fontWeight:'bold'}}>Welcome</Text>

                <Text style={{padding:5}}>Email</Text>
                <View style={styleSheet.inputView}>
                    <TextInput 
                        style={styleSheet.textInput} 
                        keyboardType={'email-address'}
                        onChangeText={(text)=>setUserEmail(text)}
                        placeholder='Please enter your email'/>
                </View>

                <Text style={{padding:5}}>Password</Text>
                <View style={styleSheet.inputView}>
                    <TextInput 
                        style={styleSheet.textInput} 
                        keyboardType={'default'}
                        placeholder='Please enter your password' 
                        onChangeText={(text)=>setUserPasswd(text)}
                        secureTextEntry={true}/>
                </View>
                
                <View style={{marginTop: 20,}}>
                    <TouchableOpacity 
                        style={styleSheet.loginButton}
                        onPress={()=> doSignInOp() }>
                        <Text style={{color:'#ffffff', fontSize:16}}>Log In</Text>
                    </TouchableOpacity>
                </View>

                {/* <View style={{alignItems:'center', marginTop:25}}>
                    <TouchableOpacity
                        onPress={()=> doForgetPwd()}>
                        <Text style={{color:'#f73e05', fontSize: 16}}>Forgot Password!</Text>
                    </TouchableOpacity>
                </View> */}

                <View style={{alignItems:'center', marginTop:25}}>
                    <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                        <Text style={{color:'#f73e05', fontSize:16}}>Create new account</Text>
                    </TouchableOpacity>
                </View>

                <View style={{alignItems:'center', marginTop:25}}>
                    {/* <GoogleSigninButton
                        style={{width:200, height:50}}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Light}/> */}
                </View>

            </View>

            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={styleSheet.semiCircle1}></View> 
                
                <View style={{width:10}}></View>
                
                <View style={[styleSheet.semiCircle2, {width:100}]}></View>
            </View>

        </View>
        </>
    )
}

export default SignIn;

const styleSheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logoView: {
        width: 60,
        height: 60, 
        marginTop: 40,
        shadowColor: '#9f9fa1',
        alignContent:'center', 
        alignItems:'center', 
        alignSelf:'center',
    },
    inputView: {
        backgroundColor: "#f5f5fa",
        borderRadius: 10,
        width: "100%",
        height: 45,
        marginBottom: 20,
    },
    textInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 5,
    },
    loginButton: {
        width: "100%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f73e05",
    },
    square: {
        height:100,
        width:50,
        backgroundColor:'#f73e05',
    },
    semiCircle1: {
        width: 60,
        height: 50,
        borderTopLeftRadius: 0,
        borderTopRightRadius:50,
        backgroundColor: '#fab7a2',
        marginTop:70,
    },
    semiCircle2: {
        width: 100,
        height: 100,
        marginTop:20,
        borderTopLeftRadius: 100,
        borderBottomLeftRadius:0,
        backgroundColor: '#fab7a2',
    },
});

