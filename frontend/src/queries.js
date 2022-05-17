export const GET_PRODUCT_DETAILS=`query getProductDetails($_id: ID) {
    getProductDetails(_id: $_id) {
        _id,
        productname,
        description,
        price,
        category,
        stock,
        image_URL,
        shopname,
        currency,
        salescount
    }
  }`;

  export const GET_LOGIN_DETAILS=`query userLogin($email: String,$password:String) {
    userLogin(email: $email,password:$password) {
        token,
        message,
        user{
            _id,
            uname,
            email,
            password,
            dateofbirth,
            picture,
            mobile,
            city,
            country,
            address,
            shopname,
            shopimage,
        }
    }
  }`;

  export const GET_PRODUCTS=`query searchProducts($keyword: String,$min_price:Int,$max_price:Int,$sortType:String,$outOfStock:Int){
      searchProducts(keyword: $keyword,min_price:$min_price,max_price:$max_price,sortType:$sortType,outOfStock:$outOfStock) {
        _id,
    productname,
    description,
    price,
    category,
    stock,
    image_URL,
    shopname,
    currency,
    salescount,
  }
  }`;

  export const GET_CART_DETAILS=`query getcartdetails($email: String){
    getcartdetails(email: $email) {
      email,
      quantity,
      shopname,
      price,
      productname,
      image_URL,
      giftoption,
      giftdescription,
      product
      {
      _id,
      stock,
        currency
    }
    }
}`;

export const GET_ORDER_DETAILS=`query getorderdetails($email:String,$resultsperpage:String,$currentPage:Int){
  getorderdetails(email: $email,resultsperpage:$resultsperpage,currentPage:$currentPage) {
    results{
      _id,
      email,
      orderdate,
      totalprice,
      orderdetails{
        product {
          _id
        },
        quantity,
          shopname,
          price,
          productname,
          image_URL,
          giftoption,
          giftdescription,
      }
      
    }
    ordersCount
  }
}`;

export const GET_SHOP_DETAILS=`query getshopdetails($shopname:String){
  getshopdetails(shopname: $shopname) {
    success
    shopdetails{
      _id,
      productname,
      description,
      price,
      category,
      stock,
      image_URL,
      shopname,
      currency,
      salescount,
    }
    results{
      _id,
      uname,
      email,
      password,
      dateofbirth,
      picture,
      mobile,
      city,
      country,
      address,
      shopname,
      shopimage
    }
    totalsalesrevenue
    
  }
}`;

export const GET_SHOP_AVAILABILITY=`query shopavailability($shopname:String){
  shopavailability(shopname: $shopname) {
    success
  }
}`;