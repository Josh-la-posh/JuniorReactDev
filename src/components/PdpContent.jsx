import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { connect } from 'react-redux';
import {addToCart, removeFromCart} from '../redux/ActionCreators';

const mapStateToProps = (state) => ({
    cart: state.reducer.cart
})

const mapDispatchToProps = (dispatch) => ({
    addToCart: (product) => {dispatch(addToCart(product))},
    removeFromCart: (product) => {dispatch(removeFromCart(product))},
})

class PdpContent extends Component {
    
    componentDidMount() {
        addToCart();
        removeFromCart();
    }

    render() {
        const {data, cart, addToCart, removeFromCart} = this.props;
        const filterCart = cart.filter(cartItem => cartItem.id === data.id);
        return (
            <div className="pdp flex">

                {/* LEFT CONTENT */}

                <div className="product flex">
                    <div className="colorChange flex col">
                        <img src={data.img} alt="" />
                        <img src={data.img} alt="" />
                        <img src={data.img} alt="" />
                    </div>

                    <div className="image">
                        <img src={data.img} alt="" />
                    </div>
                </div>

                {/* RIGHT CONTENT */}

                <div className="description flex col">
                    <span className="nameBold font-30 weight-600">{data.name}</span>
                    <span className="nameLight font-30 weight-400">{data.description}</span>
                    <div className="size flex col font-18 weight-700">
                        <span>SIZE:</span>
                        <div className="sizes flex font-16">
                            {data.sizes.map(size => {
                                return (
                                    <span key={size} className="flex-center">{size}</span>
                                )
                            })}
                        </div>
                    </div>
                    <div className="size flex col font-18 weight-700">
                        <span>COLOR:</span>
                        <div className="color flex">
                            {data.colors.map(color => {
                                return (
                                    <span key={color} style={{backgroundColor: `${color}`}}></span>
                                )
                            })}
                        </div>
                    </div>
                    <div className="size flex col font-18 weight-700">
                        <span>PRICES:</span>
                        <span className="price font-24">${data.price.toFixed(2)}</span>
                    </div>


                    {filterCart.quantity === 0 ? 
                    <button className="font-16 weight-600" onClick={() => addToCart(data)}>ADD TO CART</button>
                    :
                    <span className="plusMinus flex-align">
                        <button className="font-16 weight-600" onClick={() => removeFromCart(data)}><FontAwesomeIcon icon='minus' /></button>
                        <span>{filterCart.quantity}</span>
                        {/* {console.log(filterCart[0].quantity)} */}
                        <button className="font-16 weight-600" onClick={() => addToCart(data)}><FontAwesomeIcon icon='plus' /></button>
                    </span>
                    }
                    <p className="font-16 weight-400">Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.</p>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PdpContent);