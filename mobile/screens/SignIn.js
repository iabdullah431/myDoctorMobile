import React, { useState, useEffect } from "react";
import { ScrollView, KeyboardAvoidingView,View,StyleSheet,ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from "../config/axios";
import {SIGNIN_URL} from '../config/urls'
import Input from "../components/Input";
import ScreenTitle from "../components/ScreenTitle";
import Button  from "../components/Button";
import Loader from '../components/Alert';
import Alert from '../components/Alert';
import styles  from './styles/authStyles';

function SignInScreen(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [alert, setAlert] = useState({message: null, type: ''});

    useEffect(() => {
        const timer =  setTimeout(() =>{
            setAlert({message:null})
        }, 2000);
        return () => clearTimeout(timer);
    }, [alert.message]);

    const changeEmailHandler = (value) => {
        setEmail(value);
    }
    const changePasswordHandler = (value) => {
        setPassword(value);
    }

    const validate = () =>{

        let validationErrors = [];
        let passed = true;

        if (!email){
            validationErrors.push('الرجاء كتابة الإيميل');
            passed = false
        }
        if (!password){
            validationErrors.push('الرجاء إدخال كلمة المرور');
            passed = false
        }
        if (validationErrors.length > 0){
            setAlert({message: validationErrors, type: 'danger'});
        }

        return passed;
    }

    _signIn = () => {
        (async() =>{
            if(!validate()) return;
            setLoading(true);

            try{
              const response = await instance.post(SIGNIN_URL, {email,password});
              setLoading(false);
              setEmail('');
              setPassword('');
              await AsyncStorage.setItem('accessToken', response.data.accessToken);
              props.navigation.navigate('Home');
            }catch (e){
                setLoading(false)
                setAlert({message: e.response.data.message, type: 'danger'});
            }
        })();
    }
    return(

        <ScrollView contentContainerStyle={{paddingVertical:40 }}>
            <View style={styles.container}>
             <Loader title='جاري إنشاء حساب جديد' loading={isLoading}/>
             <ScreenTitle title="تسجيل الدخول" icon="md-log-in"/>
             <Alert messages={alert.message} type={alert.type}/>
                <KeyboardAvoidingView>
                <Input
                    placeholder="البريد الإلكتروني"
                    value={email}
                    onChangeText={(text) => changeEmailHandler(text)}
                />
                <Input
                    placeholder="كلمة المرور"
                    value={password}
                    onChangeText={(text) => changePasswordHandler(text)}
                    secureTextEntry
                 />
                 <Button text='دخول' onPress={_signIn} />
                </KeyboardAvoidingView>
            </View>
            </ScrollView>

    )
}

export default SignInScreen;