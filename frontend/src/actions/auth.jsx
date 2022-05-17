import axios from 'axios';
import { setAlert } from './alert';
import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    CLEAR_ERRORS,
    CURRENCY_SET,
} from './types';
//import setAuthToken from '../utils/setAuthToken';
import { GET_LOGIN_DETAILS } from '../queries';
import {REGISTER_USER} from '../mutation';
import { UPDATE_USER } from '../mutation';
export const loadUser = () =>async dispatch => {
    
    try {
        // axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        const res = await axios.get('/api/auth/authentication', {
            headers: {
              'authorization': localStorage.getItem('token')
            }
          });
        console.log(res.data.user);
        dispatch({
            type: USER_LOADED,
            payload: res.data.user,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors)
        dispatch({
            type: AUTH_ERROR,
        })
    }
};

export const register = ({uname, email, password}) => async dispatch =>{

const body = JSON.stringify({uname, email, password});

try{
    const query = REGISTER_USER;
    const variables = {uname:uname,email:email,password:password}
    const res = await axios.post('/graphql',{query,variables});
    if(res.data.data.saveUser==='failure'){
        alert("user already existed");
    }
    else{
        alert("user added")
    }
    dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    })
}catch(err){
    const errors = err.response.data.errors;
    if(errors){
        errors.forEach(err => dispatch(setAlert(err.msg)));
    }
    dispatch({
        type: REGISTER_FAIL
    })
}
}

export const login = ({ email, password}) => async dispatch =>{
   
    const query = GET_LOGIN_DETAILS;
    const variables = { email:email, password:password};
    localStorage.setItem('email', email);
    try{
        const res = await axios.post('/graphql',{query,variables});
        console.log(res.data);
        if(res.data.data.userLogin.message !== "failure"){
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.data.userLogin.user,
                payload1 : res.data.data.userLogin.token
            });
            //dispatch(loadUser());
            
         }
         else{
            dispatch({
                type: LOGIN_FAIL,
            })
            alert("Invalid credentials!");
         }
        
        
    }catch(err){
        console.log(JSON.stringify(err));
        const errors = err.response.data.errors;
                if(errors){
            errors.forEach(err => dispatch(setAlert(err.msg)));
        }
        if(err)
        {
            alert("user is not valid");
    }
    }
    };
export const logout = () => dispatch => {
    dispatch({type: LOGOUT});
}

//update user

export const updateProfile = (email,uname,city,mobile,address,dateofbirth,country,picture) => async (dispatch) => {
    try {

      dispatch({ type: UPDATE_PROFILE_REQUEST });
     const query = UPDATE_USER;
      const variables = {
        uname : uname,
        email : email,
        dateofbirth : dateofbirth,
        mobile : mobile,
        city : city,
      country :country,
        address : address,
        picture :picture
      }
   
      const { data } = await axios.post("/graphql", {query,variables});
      
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.data.updateUser.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export function addUserCurrency(data) {
    return {
       type: CURRENCY_SET,
       payload: data
    }
 }
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };