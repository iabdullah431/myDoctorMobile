import react from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    checkboxContainer:{
        flexDirection: 'row-reverse',

    },
    checkbox:{
        marginRight: -5
    },
    checkboxLable:{
        fontSize:18
    }
});

export default styles;