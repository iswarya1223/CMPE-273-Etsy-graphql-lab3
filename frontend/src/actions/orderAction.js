import {
    ADD_ORDER_DETAILS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAILURE,
    ORDER_DETAILS_SUCCESS
  } from "../constants/orderConstants";
import axios from "axios";
import {ADD_ORDER} from "../mutation";
import {GET_ORDER_DETAILS} from "../queries"
  // Adding the productdetails to Cart
  export const addOrderDetails = (email,totalprice)  => async (dispatch) => {
    const query = ADD_ORDER
    const variables = {
      email : email,
      totalprice:totalprice
    }
   
    const {data} = await axios.post("/graphql",{query,variables});;
  
    dispatch({
      type: ADD_ORDER_DETAILS,
      payload: data.data.addorder,
    });
  };

  // getting the user order details
  export const getOrderDetails = (email,resultsperpage,currentPage)  => async (dispatch) => {
    console.log('check');
    try {
    const query = GET_ORDER_DETAILS
    const variables = {
      email : email,
      resultsperpage : resultsperpage,
      currentPage: currentPage
    }
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })
    const {data} = await axios.post("/graphql",{query,variables});
  
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.data.getorderdetails.results,
      payload1: data.data.getorderdetails.ordersCount
    });
  }
    catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
 