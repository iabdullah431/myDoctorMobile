import React, { useState, useEffect } from "react";
import { Text, View, Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PROFILE_URL } from "../config/urls";
import instance from "../config/axios";
import Loader from '../components/Loader';
import Button  from "../components/Button";
import { transformName } from "../config/helpers";
import styles from "./styles/profileStyles";

function ProfileScreen(props){
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() =>{
        _getProfile();
    }, []);

    const _getProfile = () =>{
        (async()=>{
            setLoading(true);

            try{
                const token = await AsyncStorage.getItem('accessToken');
                instance.defaults.headers.common.Authorization = `JWT ${token}`;
                const response = await instance.get (PROFILE_URL);
                setUser(response.data);
                setLoading(false);
            } catch(e){
                setLoading(false);
            }
        })();
    }

   const signOut = () =>{
        Alert.alert(
            '',
            'هل أنت متأكد من أنك تريد تسجيل الخروج؟',
            [
                {
                    text:'إغلاق',
                    style: 'cancel',
                },
                {
                    text: 'موافق',
                    onPress: async () =>{
                        await AsyncStorage.clear();
                        props.navigation.navigate('Home');
                    },
                },
            ],
            {cancelable:false}
        );
    };

    return(
        <View style={styles.container}>
            <Loader title="إحضار بيانات الملف الشخصي" loading={isLoading}/>
            {user && (
            <View>
                <View style={styles.userMetaContainer}>
                    <View style={styles.userAvtar}>
                        <Text style={styles.userAvtarText}>
                            {transformName(user.name)}
                        </Text>
                    </View>

                    <View style={styles.userMeta}>
                        <Text>{user.name}</Text>
                        <Text>{user.email}</Text>
                    </View>
                </View>
                {user.profile && (
                <View>
                    <View style={styles.doctorInfo}>
                            <View style={styles.infoCell}>
                            <Text style={styles.infoTitle}>الإختصاص</Text>
                            <Text style={styles.infoText}>
                                {user.profile.specialization}
                            </Text>
                        </View>

                        <View style={styles.infoCell}>
                            <Text style={styles.infoTitle}>العنوان</Text>
                            <Text style={styles.infoText}>
                                {user.profile.address}
                            </Text>
                        </View>

                        <View style={styles.infoCell}>
                            <Text style={styles.infoTitle}>ساعات العمل</Text>
                            <Text style={styles.infoText}>
                                {user.profile.workingHours}
                            </Text>
                        </View>

                        <View style={styles.lastCell}>
                            <Text style={styles.infoTitle}>رقم الجوال</Text>
                            <Text style={styles.infoText}>
                                {user.profile.phone}
                            </Text>
                        </View>
                    </View>
                </View>
                )}
                <Button
                    buttonStyles={styles.logoutButton}
                    textStyles={styles.buttonText}
                    text="تسجيل خروج"
                    onPress={signOut}
                />
            </View>
            )}
        </View>
    );
}

export default ProfileScreen;