const UserResolvers = require("./resolvers/UserResolvers.js");
const ProductResolvers = require("./resolvers/ProductResolvers.js");
const CartResolvers = require("./resolvers/CartResolvers.js");
const OrderResolvers = require("./resolvers/OrderResolvers.js");
const resolvers= {
        ...UserResolvers.Query,
        ...ProductResolvers.Query,
        ...UserResolvers.Mutation,
        ...ProductResolvers.Mutation,
        ...CartResolvers.Mutation,
        ...CartResolvers.Query,
        ...OrderResolvers.Mutation,
        ...OrderResolvers.Query,
}
module.exports=resolvers