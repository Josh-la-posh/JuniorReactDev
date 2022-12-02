import { PureComponent } from "react";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {addToCart, removeFromCart, selectSize} from '../redux/ActionCreators';

const mapStateToProps = (state) => ({
    cart: state.reducer.cart,
})

const mapDispatchToProps = (dispatch) => ({
    addToCart: (product) => {dispatch(addToCart(product))},
    removeFromCart: (product) => {dispatch(removeFromCart(product))},
    selectSize: (value, product) => {dispatch(selectSize(value, product))},
})

class PdpContent extends PureComponent {
    
    componentDidMount() {
        addToCart();
        removeFromCart();
        selectSize();
    }

    render() {
        const {product, cart, addToCart, removeFromCart, selectSize} = this.props;
        const filterCart = cart.filter(cartItem => {
            return (
                cartItem.id === product.id
            )
            })[0];

        return (
            
            <div className="pdp flex">

                {/* LEFT CONTENT */}

                <div className="product flex">
                    <div className="colorChange flex col">
                        {product.gallery.map(image => {
                            return (
                                <img key={image} src={image} alt="" />
                            )
                        })}
                    </div>
                    <div className="image">
                        <img src={product.gallery} alt="" />
                    </div>
                </div>


                {/* RIGHT CONTENT */}

                <div className="description flex col">
                    <span className="nameBold font-30 weight-600">{product.name}</span>
                    <span className="nameLight font-30 weight-400">{product.brand}</span>

                    {/* FOR SIZES */}

                    {product.attributes.map(attribute => {
                        return (
                            <div key={attribute.id} className="size flex col font-18 weight-700">
                                <span>{attribute.name}:</span>
                                <div className={attribute.type === 'swatch' ? 'color flex swatch' : 'sizes flex font-16 text'}>
                                    {attribute.items.map(item => {
                                        return (
                                            <span key={item.id} className='flex-center' style={{ backgroundColor: `${item.value}`}} onClick={() => {selectSize(item, product)}}>{attribute.type !== 'swatch' && item.value}</span>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        )
                    })}
                    
                    {/* <div className="size flex col font-18 weight-700">
                        <span>PRICES:</span>
                        <span className="price font-24">${product.price.toFixed(2)}</span>
                    </div> */}


                    {filterCart ? 
                    <span className="plusMinus flex-align">
                        <button className="font-16 weight-600" onClick={() => removeFromCart(product)}><FontAwesomeIcon icon='minus' /></button>
                        <span>{filterCart.quantity}</span>
                        <button className="font-16 weight-600" onClick={() => addToCart(product)}><FontAwesomeIcon icon='plus' /></button>
                    </span>
                    :
                    <button className="font-16 weight-600" onClick={() => addToCart(product)}>ADD TO CART</button>
                    }
                    <p className="font-16 weight-400">{product.description}</p>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PdpContent);