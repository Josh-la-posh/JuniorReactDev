import { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import {addToCart, removeFromCart} from '../redux/ActionCreators';
import { Link } from "react-router-dom";

const mapStateToProps = (state) => ({
    cart: state.reducer.cart,
    currency: state.reducer.currency,
    subTotal: state.reducer.subTotal
})

const mapDispatchToProps = (dispatch) => ({
    addToCart: (product) => {dispatch(addToCart(product))},
    removeFromCart: (product) => {dispatch(removeFromCart(product))}
})

class CategoryOverlay extends PureComponent {
    componentDidMount() {
        addToCart();
        removeFromCart();
    }

    render() {
        const {addToCart, removeFromCart, cart, currency, subTotal} = this.props

        return (
            <div className="overlay">
                <div className="background">
                </div>

                <div className="categoryOverlay">
                    <p className="font-16 weight-700">My Bag, 
                        <span className="weight-500"> 3 items</span>
                    </p>

                    {cart.map(cartItem => {
                        return (
                            <section className="flex" key={cartItem.id}>
                                    <div className="leftContent flex col font-16">
                                        <span className="weight-300">{cartItem.name}</span>
                                        <span className="nameLight weight-300">{cartItem.brand}</span>
                                        <span className="price weight-500">
                                            {cartItem.prices.map(price => 
                                                this.props.currency === price.currency.symbol && (this.props.currency) + (price.amount)
                                            )}
                                        </span>


                                        {cartItem.attributes.map(attribute => {
                                            return (
                                                <div key={attribute.id} className="size flex col font-14 weight-400">
                                                    <span>{attribute.name}:</span>
                                                    <div className={attribute.type === "swatch" ? 'color flex' : 'sizes flex'}>
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
                                            <button className="add flex-center font-14" onClick={() => {addToCart(cartItem)}}>
                                                <FontAwesomeIcon icon='plus' />
                                            </button>
                                            <span className="weight-500">{cartItem.quantity}</span>
                                            <button className="minus flex-center font-14" onClick={() => {removeFromCart(cartItem)}}>
                                                <FontAwesomeIcon icon='minus' />
                                            </button>
                                        </div>
                                        <div className="content">
                                            <img src={cartItem.gallery[0]} alt="" />                                
                                        </div>
                                    </div>
                            </section>
                        )
                    })}

                    <div className="total flex-btw-align">
                        <span className="weight-500">Total</span>
                        <span className="weight-700">{currency}{subTotal}</span>
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