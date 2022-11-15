import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import {addToCart, removeFromCart} from '../redux/ActionCreators';
import { Link } from "react-router-dom";

const mapStateToProps = (state) => ({
    cart: state.reducer.cart
})

const mapDispatchToProps = (dispatch) => ({
    addToCart: (product) => {dispatch(addToCart(product))},
    removeFromCart: (product) => {dispatch(removeFromCart(product))},
})

class CategoryOverlay extends Component {
    componentDidMount() {
        addToCart();
        removeFromCart();
    }

    render() {
        const {addToCart, removeFromCart, cart} = this.props

        return (
            <div className="overlay">
                <div className="categoryOverlay">
                    <p className="font-16 weight-700">My Bag, 
                        <span className="weight-500"> 3 items</span>
                    </p>

                    {cart.map(cartItem => {
                        return (
                            <section className="flex-btw-align" key={cartItem.id}>
                                    <div className="leftContent flex col font-16">
                                        <span className="weight-300">{cartItem.name}</span>
                                        <span className="nameLight weight-300">{cartItem.description}</span>
                                        <span className="price weight-500">${cartItem.price.toFixed(2)}</span>
                                        <div className="size flex col font-14 weight-400">
                                            <span>SIZE:</span>
                                            <div className="sizes flex">
                                                {cartItem.sizes.map(size => {
                                                    return (
                                                        <span className="flex-center" key={size}>{size}</span>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="size flex col font-14 weight-400">
                                            <span>COLOR:</span>
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
                                            <button className="add flex-center font-14" onClick={() => {addToCart(cartItem)}}>
                                                <FontAwesomeIcon icon='plus' />
                                            </button>
                                            <span className="weight-500">{cartItem.quantity}</span>
                                            <button className="minus flex-center font-14" onClick={() => {removeFromCart(cartItem)}}>
                                                <FontAwesomeIcon icon='minus' />
                                            </button>
                                        </div>
                                        <div className="content">
                                            <img src="../../images/img.jpg" alt="" />                                
                                        </div>
                                    </div>
                            </section>
                        )
                    })}

                    <div className="total flex-btw-align">
                        <span className="weight-500">Total</span>
                        <span className="weight-700">$200.00</span>
                    </div>
                    
                    <div className="button flex-btw-align font-14 weight-600">
                        <Link to='cart'><button className="view">VIEW BAG</button></Link>
                        <button className="checkout">ORDER</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOverlay);