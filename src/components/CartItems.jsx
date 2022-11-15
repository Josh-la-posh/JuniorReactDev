import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import {addToCart, removeFromCart} from '../redux/ActionCreators';

const mapStateToProps = (state) => ({
    cart: state.reducer.cart
})

const mapDispatchToProps = (dispatch) => ({
    addToCart: (product) => {dispatch(addToCart(product))},
    removeFromCart: (product) => {dispatch(removeFromCart(product))},
})
    
class CartItems extends Component {
    componentDidMount() {
        addToCart();
        removeFromCart();
    }

    render() {
        const {addToCart, removeFromCart, cart} = this.props
        return (
            <div>
                {cart.map(cartItem => {
                    return (
                        <section key={cartItem.id}>
                            <div className="cartSection flex-btw-align">
                                <div className="leftContent flex col">
                                    <span className="nameBold font-30 weight-700">{cartItem.name}</span>
                                    <span className="nameLight font-30 weight-400">{cartItem.description}</span>
                                    <span className="price font-24 weight-700">${cartItem.price.toFixed(2)}</span>
                                    <div className="size flex col">
                                        <span className="font-18 weight-700" >SIZE:</span>
                                        <div className="sizes flex font-16 weight-400">
                                            {cartItem.sizes.map(size => {
                                                return (
                                                    <span key={size} className="flex-center">{size}</span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="size flex col">
                                        <span className="font-18 weight-700">COLOR:</span>
                                        <div className="color flex">
                                            {cartItem.colors.map(color => {
                                                return (
                                                    <span key={color} style={{backgroundColor: `${color}`}}></span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="rightContent flex">
                                    <div className="button flex-btw-align col">
                                        <button className="add font-15 flex-center" onClick={()=>addToCart(cartItem)}>
                                            <FontAwesomeIcon icon='plus' />
                                        </button>
                                        <span className="font-24 weight-500">{cartItem.quantity}</span>
                                        <button className="minus font-15 flex-center" onClick={()=>removeFromCart(cartItem)}>
                                            <FontAwesomeIcon icon='minus' />
                                        </button>
                                    </div>
                                    <div className="content">
                                        <img src={cartItem.img} alt="" />
                                        <span className="icon flex">
                                            <span className="arrow flex-center font-15">
                                                <FontAwesomeIcon icon='chevron-left' />
                                            </span>
                                            <span className="arrow flex-center font-15">
                                                <FontAwesomeIcon icon='chevron-right' />
                                            </span>
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
                                <td><span className="weight-700">$42.00</span></td>
                            </tr>
                            <tr className="font-24 weight-400">
                                <td>Quantity:</td>
                                <td><span className="weight-700">{cart.length}</span></td>
                            </tr>
                            <tr className="font-24 weight-400">
                                <td className="weight-500">Total:</td>
                                <td><span className="weight-700">$200.00</span></td>
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