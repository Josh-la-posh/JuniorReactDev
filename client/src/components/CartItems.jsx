import { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import {addToCart, removeFromCart, nextImg, prevImg} from '../redux/ActionCreators';

const mapStateToProps = (state) => ({
    cart: state.reducer.cart,
    subTotal: state.reducer.subTotal,
    index: state.reducer.index
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
        const {addToCart, removeFromCart, cart, subTotal, nextImg, prevImg} = this.props;



        return (
            <div>
                {cart.map(cartItem => {
                    return (
                        <section key={cartItem.id}>
                            <div className="cartSection flex-btw-align">
                                <div className="leftContent flex col">
                                    <span className="nameBold font-30 weight-700">{cartItem.name}</span>
                                    <span className="nameLight font-30 weight-400">{cartItem.brand}</span>
                                    <span className="price font-24 weight-700">$50.00</span>



                                    {cartItem.attributes.map(attribute => {
                                        return (
                                            <div key={attribute.id} className="size flex col">
                                                <span className="font-18 weight-700" >{attribute.name}:</span>
                                                <div className={attribute.type === "swatch" ? 'color flex' : 'sizes flex font-16 weight-400'}>
                                                    {attribute.type === "swatch" ? attribute.items.map(item => {
                                                        return (
                                                            <span key={item.id} className="flex-center" style={{backgroundColor: `${item.value}`}}></span>
                                                        )
                                                    }) : attribute.items.map(item => {
                                                        return (
                                                            <span key={item.id} className={cartItem.size === item.value ? 'flex-center sizeBg' : 'flex-center'}>{item.value}</span>
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
                                        <button className="add font-15 flex-center" onClick={()=>addToCart(cartItem)}>
                                            <FontAwesomeIcon icon='plus' />
                                        </button>
                                        <span className="font-24 weight-500">{cartItem.quantity}</span>
                                        <button className="minus font-15 flex-center" onClick={()=>removeFromCart(cartItem)}>
                                            <FontAwesomeIcon icon='minus' />
                                        </button>
                                    </div>
                                    <div className="content">
                                        <img src={cartItem.gallery[cartItem.index]} alt="" />
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
                                <td><span className="weight-700">$42.00</span></td>
                            </tr>
                            <tr className="font-24 weight-400">
                                <td>Quantity:</td>
                                <td><span className="weight-700">{cart.length}</span></td>
                            </tr>
                            <tr className="font-24 weight-400">
                                <td className="weight-500">Total:</td>
                                <td><span className="weight-700">$50.00</span></td>
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