export const REGISTER_USER=`mutation saveUser($uname: String,$email:String,$password:String) {
    saveUser(uname: $uname,email:$email,password:$password)
  }`;

  export const UPDATE_USER=`mutation updateUser($uname:String,$email:String,$city:String,$dateofbirth:String,$mobile:String,$address:String,$country:String,$picture:String) {
    updateUser(uname:$uname,email:$email,city:$city,dateofbirth:$dateofbirth,mobile:$mobile,address:$address,country:$country,picture:$picture)
    {
      success
    }
  }`;

  export const ADD_ITEMS_CART=`mutation additemstocart($email:String,$product:ID,$quantity:Int,$price:Float,$shopname:String,$productname:String,$image_URL:String) {
    additemstocart(email:$email,product:$product,quantity:$quantity,price:$price,shopname:$shopname,productname:$productname,image_URL:$image_URL)
  }`;

  export const REMOVE_CART_ITEMS=`mutation removecartitems($email:String,$product:ID) {
    removecartitems(email:$email,product:$product)
  }`;

  export const ADD_GIFT_OPTION=`mutation addgiftoption($email:String,$product:ID,$giftoption:Boolean) {
    addgiftoption(email:$email,product:$product,giftoption:$giftoption)
    {
      success
    }
  }`;

  export const ADD_GIFT_DESCRIPTION=`mutation addgiftdescription($email:String,$product:ID,$giftdescription:String) {
    addgiftdescription(email:$email,product:$product,giftdescription:$giftdescription)
    {
      success
    }
  }`;

  export const ADD_ORDER=`mutation addorder($email:String,$totalprice:Float) {
    addorder(email:$email,totalprice:$totalprice)
    {
      success
    }
  }`;

  export const CREATE_PRODUCT=`mutation createproduct($productname:String,$description:String,$price:String,$category:String,$stock:String,$image_URL:String,$shopname:String,$currency:String) {
    createproduct(productname:$productname,description:$description,price:$price,category:$category,stock:$stock,image_URL:$image_URL,shopname:$shopname,currency:$currency)
    {
      success
    }
  }`;

  export const UPDATE_PRODUCT=`mutation updateproduct($_id:ID,$productname:String,$description:String,$price:String,$category:String,$stock:String,$image_URL:String,$shopname:String,$currency:String) {
    updateproduct(_id:$_id,productname:$productname,description:$description,price:$price,category:$category,stock:$stock,image_URL:$image_URL,shopname:$shopname,currency:$currency)
    {
      success
    }
  }`;

  export const DELETE_SHOP_PRODUCT=`mutation deleteproduct($_id:ID,$product:ID) {
    deleteproduct(_id:$_id,product:$product)
    {
      success
    }
  }`;

  export const SAVE_IMAGE=`mutation saveshopimage($email:String,$shopimage:String) {
    saveshopimage(email:$email,shopimage:$shopimage)
    {
      success
    }
  }`;

  export const CREATE_SHOP=`mutation createshop($email:String,$shopname:String) {
    createshop(email:$email,shopname:$shopname)
    {
      success
    }
  }`;