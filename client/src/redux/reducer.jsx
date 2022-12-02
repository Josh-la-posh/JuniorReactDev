import * as ActionTypes from './ActionTypes';

const initialState = {
    cart: [],
    totalQuantity: 0,
    subTotal: 0,
    isSelect: false,
    currency: JSON.parse(localStorage.getItem('currency'))
}

if (localStorage.getItem('data')) {
    initialState.cart = JSON.parse(localStorage.getItem('data'))
} else {
    initialState.cart = [];
}

if (localStorage.getItem('Total Quantity')) {
    initialState.totalQuantity = JSON.parse(localStorage.getItem('Total Quantity'))
} else {
    initialState.totalQuantity = 0;
}

if (localStorage.getItem('Total Price')) {
    initialState.subTotal = JSON.parse(localStorage.getItem('Total Price'))
} else {
    initialState.subTotal = 0;
}

export const Reducer = (state=initialState, action) => {
    switch(action.type) {
        case ActionTypes.ADD_TO_CART:
            var cart = [...action.payload.cart];
            var totalQuantity = state.totalQuantity + 1;
            localStorage.setItem('Total Quantity', JSON.stringify(totalQuantity));
            const selectedItem = cart.filter(cartItem => cartItem.id === action.payload.product.id[0]);
            var subTotal = state.subTotal + selectedItem.price;
            localStorage.setItem('Total Price', JSON.stringify(subTotal));

            return {
                ...state,
                cart,
                totalQuantity,
                subTotal
            };
        case ActionTypes.REMOVE_FROM_CART:
            cart = [...action.payload.cart];
            totalQuantity = state.totalQuantity - 1;
            localStorage.setItem('Total Quantity', JSON.stringify(totalQuantity));
            subTotal = state.subTotal - action.payload.product.price;
            localStorage.setItem('Total Price', JSON.stringify(subTotal));
            return {
                ...state,
                cart,
                totalQuantity,
                subTotal
            };
        case ActionTypes.REMOVE_ITEM:
            cart = [...action.payload.cart];
            totalQuantity = state.totalQuantity - selectedItem.quantity;
            localStorage.setItem('Total Quantity', JSON.stringify(totalQuantity));
            subTotal = state.subTotal - (selectedItem.price * selectedItem.quantity);
            localStorage.setItem('Total Price', JSON.stringify(subTotal));
            return {
                ...state,
                cart,
                totalQuantity,
                subTotal
            }
        case ActionTypes.NEXT_IMAGE:
            cart = [...action.payload.cart]
            
            return {
                ...state,
                cart
            }
        case ActionTypes.PREV_IMAGE:
            cart = [...action.payload.cart]
            
            return {
                ...state,
                cart
            }
        case ActionTypes.SELECT_CURRENCY:
            const currency = [...action.payload.currencySymbol][0]
            return {
                ...state,
                currency
            }
        case ActionTypes.SELECT_SIZE:
            const isSelect = !state.isSelect
            return {
                ...state,
                isSelect
            }

        default:
            return state
    }
}