import * as ActionTypes from './ActionTypes';

const initialState = {
    cart: [],
    totalQuantity: 0,
    subTotal: 0,
    currency: localStorage.getItem('currency') ? JSON.parse(localStorage.getItem('currency')) : '$',
    selectedAttribute: [],
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

if (localStorage.getItem('selectedAttribute')) {
    initialState.selectedAttribute = JSON.parse(localStorage.getItem('selectedAttribute'))
} else {
    initialState.selectedAttribute = [];
}

export const Reducer = (state=initialState, action) => {
    switch(action.type) {
        case ActionTypes.ADD_TO_CART:
            return addProductToCart(state, action);
        case ActionTypes.REMOVE_FROM_CART:
            var cart = [...action.payload.cart];            
            var totalQuantity = state.totalQuantity - 1;
            localStorage.setItem('Total Quantity', JSON.stringify(totalQuantity));


            let subTotal = cart.reduce((total, cartItem) => {
                cartItem.prices.forEach(({currency, amount}) => {
                    if (currency.symbol === state.currency) {
                        total = total + amount * cartItem.qty
                    }
                });
                return total;
            }, 0);
            state.subTotal = subTotal;
            localStorage.setItem('Total Price', JSON.stringify(subTotal))


            return {
                ...state,
                cart,
                totalQuantity,
                subTotal
            };
        case ActionTypes.REMOVE_ITEM:
            // cart = [...action.payload.cart];
            // // totalQuantity = state.totalQuantity - selectedItem.quantity;
            // // localStorage.setItem('Total Quantity', JSON.stringify(totalQuantity));
            // // subTotal = state.subTotal - (selectedItem.price * selectedItem.quantity);
            // // localStorage.setItem('Total Price', JSON.stringify(subTotal));
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
            return selectedAttribute(state, action)
        case ActionTypes.DEFAULT_ATTRIBUTE:
            const product = action.payload;

            let selectedAttributes = product.inStock
                ? product.attributes.reduce((selectedAttributes, { name, items }) => {
                    selectedAttributes.push({ [name]: items[0].value});
                    localStorage.setItem('selectedAttribute', JSON.stringify(selectedAttributes));
                    return selectedAttributes
                }, [])
                : [];            
            state.selectedAttribute = selectedAttributes
            console.log(selectedAttributes)
            return {
                ...state,
                selectedAttributes
            }

        default:
            return state
    }
}


// ADD TO CART

const addProductToCart = (state, action) => {
    var cart = [...action.payload.cart];
    var product = action.payload.product;
    var {selectedAttribute} = state;
    let counter = 0;
    let totalQuantity;
    let subTotal;

    if (product.attributes.length === selectedAttribute.length) {
        cart.some(cartItem => cartItem.id === product.id)
            ? cart.forEach((cartItem, index) => {
                if (cartItem.id === product.id) {
                    if (JSON.stringify(
                        [...cartItem.selectedAttribute].sort((a,b) =>
                        Object.keys(a)[0].localeCompare(Object.keys(b)[0]),
                        ),
                        ).slice(0, -3) ===
                        JSON.stringify(
                            [...selectedAttribute].sort((a,b) =>
                            Object.keys(a)[0].localeCompare(Object.keys(b)[0]),
                            ),
                            ).slice(0, -3)
                            ) {
                                cart.splice(index, 1, {...cart[index], qty: cart[index].qty + 1,})
                            localStorage.setItem('data', JSON.stringify(cart));
                    } else {
                        counter++;
                    }
                }
            })
        : cart.push({...product, selectedAttribute: selectedAttribute, qty: 1,});
            localStorage.setItem('data', JSON.stringify(cart));

    const uniqueId = [];
    cart.forEach(cartItem => cartItem.id === product.id && uniqueId.push(cartItem.id));

    console.log(counter, uniqueId)

    counter === uniqueId.length &&
        cart.push({...product, selectedAttribute: selectedAttribute, qty: 1})
        localStorage.setItem('data', JSON.stringify(cart));


        //  TOTAL QUANTITY

        totalQuantity = cart.reduce((total, cartItem) => {
            return total + cartItem.qty;
        }, 0);
        state.totalQuantity = totalQuantity;
        localStorage.setItem('Total Quantity', JSON.stringify(totalQuantity))

        // TOTAL PRICE

        subTotal = cart.reduce((total, cartItem) => {
            cartItem.prices.forEach(({currency, amount}) => {
                if (currency.symbol === state.currency) {
                    total = total + amount * cartItem.qty
                }
            });
            return total;
        }, 0);
        state.subTotal = subTotal;
        localStorage.setItem('Total Price', JSON.stringify(subTotal))
    }


    return {
        ...state,
        cart,
        totalQuantity,
        subTotal,
        counter
    }
}


//SELECT ATTRIBUTES

const selectedAttribute = (state, action) => {
    const name = action.payload.name;
    const value = action.payload.value;
    var selectedAttribute = [...state.selectedAttribute];
    selectedAttribute?.some(att => Object.keys(att)[0] === name)
        ? selectedAttribute.forEach((att, index) => {
            Object.keys(selectedAttribute[index])[0] === name &&
                selectedAttribute.splice(index, 1, {...selectedAttribute[index], [name]: value});
            })
        : selectedAttribute.push({ [name]: value});
        localStorage.setItem('selectedAttribute', JSON.stringify(selectedAttribute));
        
        state.selectAttribute = selectedAttribute

    return {
        ...state,
        selectedAttribute
    }
}