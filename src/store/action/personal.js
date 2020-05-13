// /personal_details
import * as types from './../ActionTypes/ActionTypes'
import axios from './axios';
import { message , notification } from 'antd'
import React, { PropTypes } from 'react';
import { reduxForm, submit, getFormValues, Form , formValueSelector , change , initialize } from 'redux-form'

export function get_personal_details(values){
    return dispatch =>{
        return axios.get('/personal_details').then(data => {
            dispatch(initialize('personal_details_form' ,{
                ...data
            }))
        })
    }
}
export function validate_password(values){
    return dispatch =>{
        return axios.post('/validate_password' ,{'pass_word':values} ).then(data => {
            if(data.code>=300){
                notification.open({
                    message: '提示',
                    description: data.message,
                    icon: <img src='./img/错误icon.png'/> ,
                  });
            }else{
                console.log(data)
                notification.open({
                    message: '提示',
                    description: '添加成功',
                    icon: <img src='./img/suc.png'/> ,
                  });
                  dispatch(change('personal_details' , 'password' , ''))
                dispatch({
                    type: types.VALIDATE_PASSWORD,
                    validate_password: data.items
                })
            }
            return data
        })
    }
}
export function clearValidate_password(values) {
    return dispatch => {
        dispatch({
            type: types.VALIDATE_PASSWORD,
            validate_password: []
        })
    }
}
export function addTimeOnline(values){
    return dispatch =>{
        console.log('=============>>>>>>>>>>>>>> ' , values )
        return axios.put('/validate_password/add' , values ).then(data => {
            if(data.code>=300){
                notification.open({
                    message: '提示',
                    description: data.message,
                    icon: <img src='./img/错误icon.png'/> ,
                  });
            }else{
                console.log(data)
                notification.open({
                    message: '提示',
                    description: '添加成功',
                    icon: <img src='./img/suc.png'/> ,
                  });
                  dispatch(change('personal_details' , 'password' , ''))
                dispatch({
                    type: types.VALIDATE_PASSWORD,
                    validate_password: data.items
                })
            }
            return data
        })
    }
}