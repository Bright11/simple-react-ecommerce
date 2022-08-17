import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    // cartItems: [], it was this
    //we also use this to store our information to local storage below
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity:0,
    cartTotalAmount:0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
addToCart(state, action){
    // state.cartItems.push(action.payload)
    const itemIndex = state.cartItems.findIndex(
        (item) => item.id == action.payload.id
    );
    if(itemIndex >= 0){
        state.cartItems[itemIndex].cartQuantity +=1
        //for message
        toast.info(`increased ${state.cartItems[itemIndex].name} to cart quantity`, {
            // position: "bottom-left",
            position: "top-right",
        });
    }else{
        const tempProduct = {...action.payload, cartQuantity: 1};
        state.cartItems.push(tempProduct);
        //for message
        // toast.success('Added a new product to cart', {
            toast.success(`${action.payload.name} added product to cart`, {
            position: "bottom-left",
        });
    }
    //storing our cart into localstorage
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
},
//adding remove cart to the reduser
//this code is for add to cart
removeFromCart(state, action){
    const nextCartItems = state.cartItems.filter(
       (cartItem) =>cartItem.id !== action.payload.id
    );
    state.cartItems = nextCartItems;
   localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    toast.error(`${action.payload.name} remove from cart`, {
        position: "top-right",
    });
    //after here, export the removeFromCart
},
//the end of remove cart code

//decreasing cart quantity

decreaseCart(state, action){
    const itemIndex = state.cartItems.findIndex(
        cartItem => cartItem.id == action.payload.id
    )
    if(state.cartItems[itemIndex].cartQuantity > 1){
        state.cartItems[itemIndex].cartQuantity -=1
        toast.error(`Decreased ${action.payload.name} cart quantity`, {
            position: "top-right",
        });
    }else if(state.cartItems[itemIndex].cartQuantity == 1){
        const nextCartItems = state.cartItems.filter(
            (cartItem) =>cartItem.id !== action.payload.id
         );
         state.cartItems = nextCartItems;
         toast.error(`${action.payload.name} remove from cart`, {
             position: "top-right",
         });
    }
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
},

//the end

//clear all cart
clearCart(state,action){
state.cartItems =[];
toast.error(`All items are removed from cart`, {
    position: "top-right",
});
localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
},
//the end

//getting cart total
getTotals(state, action){
   let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem) =>{
        const { price, cartQuantity} = cartItem;
        const itemTotal = price * cartQuantity;

        cartTotal.total += itemTotal;
        cartTotal.quantity += cartQuantity;

        return cartTotal;
    }, {
        total:0,
        quantity:0,
    });
    state.cartTotalQuantity = quantity;
    state.cartTotalAmount = total;
},
//After exporting getTotals, we have to dispatch it also in the index.js
//after that, we will dispatch it again inside cart.js page
//the end
    },
});

export const {addToCart,removeFromCart, decreaseCart,clearCart, getTotals} = cartSlice.actions;
export default cartSlice.reducer;