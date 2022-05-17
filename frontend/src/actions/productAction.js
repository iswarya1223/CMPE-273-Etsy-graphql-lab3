import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS,
   
} from "../constants/productConstants";
import { GET_PRODUCTS } from '../queries';
import {GET_PRODUCT_DETAILS} from '../queries';
export const getProduct =
  (keyword='',price=[0,10000],sortType='price',outOfStock=0) =>
  async (dispatch) => {
    //console.log("the one value" +one);
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      console.log("the keyword is ", +keyword);
      //let temp = "temp";
      console.log("in actions",outOfStock);
      const variables= {keyword:keyword,min_price:price[0],max_price:price[1],sortType: sortType,outOfStock: outOfStock};
      const query=GET_PRODUCTS
      const res = await axios.post("/graphql",{query,variables});
      console.log("received data" + res.data.data.searchProducts);
    
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: res.data.data.searchProducts,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const getProductDetails = (_id) => async (dispatch) => {
    //const body = JSON.stringify({productid});
    try {
      const query =GET_PRODUCT_DETAILS;
      const variables ={_id:_id}
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
  
      const {data} = await axios.post("/graphql",{query,variables});
  
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.data.getProductDetails, 
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };