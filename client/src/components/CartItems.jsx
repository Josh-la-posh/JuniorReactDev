import { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import {addToCart, removeFromCart, nextImg, prevImg} from '../redux/ActionCreators';

const mapStateToProps = (state) => ({
    cart: state.reducer.cart,
    subTotal: state.reducer.subTotal,
    index: state.reducer.index,
    currency: state.reducer.currency,
    totalQuantity: state.reducer.totalQuantity,
})

const mapDispatchToProps = (dispatch) => ({
    addToCart: (product) => {dispatch(addToCart(product))},
    removeFromCart: (product) => {dispatch(removeFromCart(product))},
    nextImg: (product) => {dispatch(nextImg(product))},
    prevImg: (product) => {dispatch(prevImg(product))},
})
    
class CartItems extends PureComponent {
    
    componentDidMount() {
        addToCart();
        removeFromCart();
        nextImg();
        prevImg();
    }

    render() {
        const {addToCart, removeFromCart, cart, subTotal, nextImg, prevImg, currency, totalQuantity} = this.props;



        return (
            <div>
                {cart.map((cartItem, index) => {
                    return (
                        <section key={index}>
                            <div className="cartSection flex-btw-align">
                                <div className="leftContent flex col">
                                    <span className="nameBold font-30 weight-700">{cartItem.name}</span>
                                    <span className="nameLight font-30 weight-400">{cartItem.brand}</span>
                                    <span className="price font-24 weight-700">
                                        {cartItem.prices.map(price => 
                                            this.props.currency === price.currency.symbol && (this.props.currency) + (price.amount)
                                        )}
                                    </span>



                                    {cartItem.attributes.map((attribute, index) => {
                                        return (
                                            <div key={index} className="size flex col">
                                                <span className="font-18 weight-700" >{attribute.name}:</span>
                                                <div className={attribute.type === "swatch" ? 'color flex' : 'sizes flex font-16 weight-400'}>
                                                    {attribute.type === "swatch" ? attribute.items.map((item, index) => {
                                                        return (
                                                            <span key={index} className="flex-center" style={cartItem.selectedAttribute.some(att => Object.keys(att)[0] === attribute.name && Object.values(att)[0] === item.value) ? {backgroundColor: `${item.value}`, outline: '1px solid #5ECE7B'} : {backgroundColor: `${item.value}`}}></span>
                                                            )
                                                        }) : attribute.items.map((item, index) => {
                                                        return (
                                                            <span key={index} className="flex-center" style={cartItem.selectedAttribute.some(att => Object.keys(att)[0] === attribute.name && Object.values(att)[0] === item.value) ? { backgroundColor: '#000', color: '#fff'} : { backgroundColor: '#fff', color: '#000'}}>{item.value}</span>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="rightContent flex">
                                    <div className="button flex-btw-align col">
                                        <button className="add font-15 flex-center" onClick={()=> addToCart(cartItem)}>
                                            <FontAwesomeIcon icon='plus' />
                                        </button>
                                        <span className="font-24 weight-500">{cartItem.qty}</span>
                                        <button className="minus font-15 flex-center" onClick={()=>removeFromCart(cartItem)}>
                                            <FontAwesomeIcon icon='minus' />
                                        </button>
                                    </div>
                                    <div className="content">
                                        <img src={cartItem.gallery[cartItem.index] ? cartItem.gallery[cartItem.index] : cartItem.gallery[0]} alt="" />
                                        <span className="icon flex">
                                            <button onClick={() => prevImg(cartItem)} className="arrow flex-center font-15">
                                                <FontAwesomeIcon icon='chevron-left' />
                                            </button>
                                            <button onClick={() => nextImg(cartItem)} className="arrow flex-center font-15">
                                                <FontAwesomeIcon icon='chevron-right' />
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </section>
                    )
                })}
                <section>
                    <table>
                        <tbody>
                            <tr className="font-24 weight-400">
                                <td>Tax 21%:</td>
                                <td><span className="weight-700">{currency}{(0.21 * subTotal).toFixed(2)}</span></td>
                            </tr>
                            <tr className="font-24 weight-400">
                                <td>Quantity:</td>
                                <td><span className="weight-700">{totalQuantity}</span></td>
                            </tr>
                            <tr className="font-24 weight-400">
                                <td className="weight-500">Total:</td>
                                <td><span className="weight-700">{currency}{Number(subTotal).toFixed(2)}</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="order font-14 weight-600">ORDER</button>
                </section>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);