import * as ActionTypes from './ActionTypes';
import { Data } from "../file/data";

const initialState = {
    data: Data,
    cart: []
}

if (localStorage.getItem('data')) {
    initialState.cart = JSON.parse(localStorage.getItem('data'))
} else {
    initialState.cart = [];
}

export const Reducer = (state=initialState, action) => {
    switch(action.type) {
        case ActionTypes.ADD_TO_CART:
            var cart = [...action.payload.cart];
            return {
                ...state,
                cart
            };
        case ActionTypes.REMOVE_FROM_CART:
            var cart = [...action.payload.cart];
            return {
                ...state,
                cart
            };
        case ActionTypes.REMOVE_ITEM:
            var cart = [...action.payload.cart];
            return {
                ...state,
            }

        default:
            return state
    }
}