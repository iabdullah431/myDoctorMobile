import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,ImageBackground,TouchableNativeFeedback} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

function HomeScreen(props){
    const {navigation} = props;
    const [token,setToken] = useState('');
    const _checkToken = async () => {
        const token = await AsyncStorage.getItem('accessToken');
        setToken(token);
    }

    useEffect(() =>{
        const unsubscribe = navigation.addListener('focus', () => {
            _checkToken();
        })
        return unsubscribe;
    }, [navigation]);

     return(
        <React.Fragment>
            <ImageBackground style={styles.background} source={require('../assets/bg.jpg')}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>أهلا بك في برنامج استشاره</Text>
                        <Text style={styles.text}>التطبيق يهتم بالربط بين الاطباء والمرضى بطريقه سلسة وسريعة</Text>
                    </View>
                    {token ? (
                        <React.Fragment>
                            <Button
                                text="إستعراض قائمة الأطباء"
                                onPress={() => navigation.navigate('Doctors')}
                            />
                            <TouchableNativeFeedback
                            onPress={() => navigation.navigate('Profile')}
                            >
                            <Text style={styles.lableButton} >إستعراض الملف الشخصي</Text>
                            </TouchableNativeFeedback>
                        </React.Fragment>
                    ): (
                        <React.Fragment>
                            <Button
                                text="تسجيل دخول"
                                onPress={() => navigation.navigate('SignIn')}
                            />
                            <TouchableNativeFeedback
                            onPress={() => navigation.navigate('SignUp')}
                            >
                            <Text style={styles.lableButton}>إنشاء حساب جديد</Text>
                            </TouchableNativeFeedback>
                        </React.Fragment>
                    )}
                </View>
            </ImageBackground>
        </React.Fragment>
    )
}

const textStyles ={
    color: '#fff',
    textAlign: 'center',
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%'
    },
    container: {
        backgroundColor: 'rgba(0,0,0, 0.5);',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer:{
        marginBottom: 30
    },
    title: {
        ...textStyles,
        fontSize: 35
    },
    text: {
        ...textStyles,
        fontSize: 20
    },
    lableButton: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
        color: '#fff'
    }
    
})

export default HomeScreen;