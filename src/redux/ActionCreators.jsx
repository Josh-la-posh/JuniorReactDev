import * as ActionTypes from './ActionTypes';
import { Data } from '../file/data';

export const addToCart = (product) => async (dispatch) => {

    // CART
    const cart = localStorage.getItem('data') ?
            JSON.parse(localStorage.getItem('data')) :
            [];
            
    //TO INCREASE THE QUANTITY IN CART
    cart.forEach(cartItem => {
        if (cartItem.id === product.id) {
            cartItem.quantity += 1;
            console.log(cartItem.quantity)
            localStorage.setItem('data', JSON.stringify(cart));
        }
    })

    // FOR EXISTING PRODUCT IN CART
    const existingItem = cart.filter(cartItem => cartItem.id === product.id);

    //IF PRODUCT DOES NOT EXIST IN CART, CREATE ONE
    if (existingItem.length === 0) {
        const newItem = {...product};
        cart.push(newItem);
        localStorage.setItem('data', JSON.stringify(cart));
    }
    
    dispatch({
        type: ActionTypes.ADD_TO_CART,
        payload: {
            cart,
            product
        }
    })
}

export const removeFromCart = (product) => async (dispatch) => {

    // CART
    const cart = localStorage.getItem('data') ?
            JSON.parse(localStorage.getItem('data')) :
            [];
            
    //TO INCREASE THE QUANTITY IN CART
    cart.forEach(cartItem => {
        if (cartItem.id === product.id) {
            cartItem.quantity -= 1;
            console.log(cartItem.quantity)
            localStorage.setItem('data', JSON.stringify(cart));
        }
    })

    // FOR EXISTING PRODUCT IN CART
    const existingItem = cart.findIndex(cartItem =>{return cartItem.id === product.id});

    //IF PRODUCT DOES NOT EXIST IN CART, CREATE ONE
    if (cart[existingItem].quantity === 0) {
        cart.splice(existingItem, 1);
        localStorage.setItem('data', JSON.stringify(cart));
    }
    
    dispatch({
        type: ActionTypes.REMOVE_FROM_CART,
        payload: {
            cart,
            product
        }
    })
}

export const removeItem = (product) => async (dispatch) => {

    // CART
    const cart = localStorage.getItem('data') ?
            JSON.parse(localStorage.getItem('data')) :
            [];
            
    // FOR EXISTING PRODUCT IN CART
    const index = cart.findIndex(cartItem => { return cartItem.id === product.id});

    cart.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(cart));
    
    dispatch({
        type: ActionTypes.REMOVE_ITEM,
        payload: {
            cart,
            product
        }
    })
}