import { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    cart: state.reducer.cart,
})
    
class CartItems extends PureComponent {

    render() {
        const {cart } = this.props;



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
                                                            <span key={item.id} className="flex-center">{item.value}</span>
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
                                        <button className="add font-15 flex-center" >
                                            <FontAwesomeIcon icon='plus' />
                                        </button>
                                        <span className="font-24 weight-500">{cartItem.quantity}</span>
                                        <button className="minus font-15 flex-center" >
                                            <FontAwesomeIcon icon='minus' />
                                        </button>
                                    </div>
                                    <div className="content">
                                        <img src={cartItem.gallery[cartItem.index]} alt="" />
                                        <span className="icon flex">
                                            <button className="arrow flex-center font-15">
                                                <FontAwesomeIcon icon='chevron-left' />
                                            </button>
                                            <button className="arrow flex-center font-15">
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

export default connect(mapStateToProps)(CartItems);