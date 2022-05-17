import axios from "axios";
import {
    SHOP_NAME_REQUEST,
    SHOP_NAME_SUCCESS,
    SHOP_NAME_FAIL,
    CLEAR_ERRORS,
    CREATE_SHOP_REQUEST,
    CREATE_SHOP_SUCCESS,
    CREATE_SHOP_FAIL,
    SHOP_DETAILS_REQUEST,
    SHOP_DETAILS_SUCCESS,
    SHOP_DETAILS_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT,
    SAVE_SHOP_IMAGE,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,

} from "../constants/shopConstants";
import {GET_SHOP_AVAILABILITY} from "../queries";
import {GET_SHOP_DETAILS} from "../queries";
import {CREATE_PRODUCT} from "../mutation";
import { UPDATE_PRODUCT } from "../mutation";
import { DELETE_SHOP_PRODUCT } from "../mutation";
import { SAVE_IMAGE } from "../mutation";
import {CREATE_SHOP} from "../mutation";
// chekcing the shopname is created or not
export const getShopAvailability =
  (keyword) =>
  async (dispatch) => {
    try {
      const query = GET_SHOP_AVAILABILITY
      dispatch({ type: SHOP_NAME_REQUEST });
      const variables = {
          shopname : keyword
      }
      const {data} = await axios.post('/graphql',{query,variables});
   
      if (data.data.shopavailability.success) {
        dispatch({
          type: SHOP_NAME_SUCCESS,
          payload: data.data.shopavailability.success,
        });
      } else {
        dispatch({
          type: SHOP_NAME_FAIL,
          payload: data.data.shopavailability.success
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      
    }
  };

// creating the shopname
  export const createShop =
  (keyword,email) =>
  async (dispatch) => {
    try {
      const query = CREATE_SHOP;
      dispatch({ type: CREATE_SHOP_REQUEST });
      const variables = {
          shopname : keyword,
          email : email
      }
     
      const {data} = await axios.post('/graphql',{query,variables});
      dispatch({
        type: CREATE_SHOP_SUCCESS,
        payload: data.data.createshop.success,
      });
    } catch (error) {
      dispatch({
        type: CREATE_SHOP_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//getting shop details
  export const getShopDetails = (shopname) => async (dispatch) => {
    //const body = JSON.stringify({productid});
    try {
      const query = GET_SHOP_DETAILS;
      const variables = {shopname:shopname}
      dispatch({ type: SHOP_DETAILS_REQUEST });
      console.log("action shop",shopname);
      const {data} = await axios.post("/graphql",{query,variables});

      dispatch({
        
        type: SHOP_DETAILS_SUCCESS,
        payload: data.data.getshopdetails.results,
        payload2 :data.data.getshopdetails.shopdetails,
        payload1: data.data.getshopdetails.totalsalesrevenue, 
      });
    } catch (error) {
      dispatch({
        type: SHOP_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  //creating a product

  export const createProduct = (productname,description,price,stock,currency,category,image_URL,shopname) => async (dispatch) => {
    try {
      const query = CREATE_PRODUCT
      dispatch({ type: CREATE_PRODUCT_REQUEST });
  
      const variables = {
        productname : productname,
        description : description,
        price : price,
        stock :stock,
        currency : currency,
      category :category,
        image_URL : image_URL ,
        shopname :shopname,
      }
   
      const { data } = await axios.post("/graphql", {query,variables});
  
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.data.createproduct.success });
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const updateProduct = (productid,productname,description,price,stock,currency,category,image_URL) => async (dispatch) => {
    try {
      const query = UPDATE_PRODUCT
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
  
      const variables = {
        _id:productid,
        productname : productname,
        description : description,
        price : price,
        stock :stock,
        currency : currency,
      category :category,
        image_URL : image_URL ,
      }
      
      const { data } = await axios.post("/graphql", {query,variables});
  
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.data.updateproduct.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const DeleteProduct = (productid) => async (dispatch) => {
    const query = DELETE_SHOP_PRODUCT
    const variables = {
      _id :productid,
      product :productid,
    }
  
    const {data} = await axios.post("/graphql",{query,variables});;
    dispatch({
      type: DELETE_PRODUCT,
      payload: data.data.deleteproduct.success,
    });
  };


  export const saveShopImage = (shopimage,email) => async (dispatch) => {
    
    const query = SAVE_IMAGE;
    const variables = {
      shopimage :shopimage,
      email:email,
    }
  
    const {data} = await axios.post("/graphql",{query,variables});
      dispatch({
        type: SAVE_SHOP_IMAGE,
        payload: data.data.saveshopimage.success,
      });
    };

    export const insertCategory = (shopname,category) => async (dispatch) => {
      try {
    
        const config = { headers: {  'Content-Type': 'application/json'} };
        const productData = {
          shopname : shopname,
          category :category,
        }
        const { data } = await axios.post(`/api/shopname/shopcategory`, productData, config);
    
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data.success });
      } catch (error) {
        dispatch({
          type: CREATE_CATEGORY_FAIL,
          payload: error.response.data.message,
        });
      }
    };

    export const getCategory = (shopname) => async (dispatch) => {
      try {
    
        const config = { headers: {  'Content-Type': 'application/json'} };
        const productData = {
          shopname : shopname,
        }
        const { data } = await axios.post(`/api/shopname/getshopcategory`, productData, config);
    
        dispatch({ type: GET_CATEGORY_SUCCESS, payload: data.results });
      } catch (error) {
        dispatch({
          type: GET_CATEGORY_FAIL,
          payload: error.response.data.message,
        });
      }
    };

  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
