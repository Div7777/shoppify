import React, { createContext, useReducer } from 'react'
import SigninScreen from './screens/SigninScreen';

// we create store which can be send to other sub files and call the updated dispatch function
export const Store = createContext();

// make a variable wihch store the all items with their quantity in the cart page
const inintialState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    cart: {
        // here it will check that if any item present in localstore then it will not remove after refresh otherwise if item not present in localStorage then it become show empty after refersh

        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},

        paymentMethod: localStorage.getItem('paymentMethod')
            ? localStorage.getItem('paymentMethod')
            : '',

        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
    },
};
function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            // here it will check the update item is presend or not in cart page
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                (item) => item._id === newItem._id
            );
            // if present then we simply update that item otherwise we add that item 
            const cartItems = existItem
                ? state.cart.cartItems.map((item) =>
                    item._id === existItem._id ? newItem : item
                )
                : [...state.cart.cartItems, newItem];
            // here 'cartItems' is the key where the json string of cartItem is save in localstore 
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };

        case 'CART_REMOVE_ITEM': {
            // this action.type call from cartscreen by dispatch function 
            // in this we update the cart so that the item which has to be deleted not match the any item in cart 
            const cartItems = state.cart.cartItems.filter(
                (item) => item._id !== action.payload._id
            );
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case 'CART_CLEAR':
            return { ...state, cart: { ...state.cart, cartItems: [] } }

        //IT CALL FROM SigninScreen AND SAVE INFO IN STATE 
        case 'USER_SIGNIN':
            return { ...state, userInfo: action.payload };

        // when user logout the cart item or shipping info will be clear
        case 'USER_SIGNOUT':
            return {
                ...state, userInfo: null,
                cart: {
                    cartItems: [],
                    shippingAddress: {},
                    paymentMethod: ''
                }
            };

        case 'SAVE_SHIPPING_ADDRESS':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress: action.payload,
                },
            };

        case 'SAVE_PAYMENT_METHOD':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    paymentMethod: action.payload,
                },
            };

        default:
            return state;
    }
}
export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, inintialState);
    const value = { state, dispatch };
    // here it is we call the store to other files and update dispatch func by usecontext
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}