import { Component } from "react";
import CartItems from "../components/CartItems";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="cart flex col">
            <span className="font-32 weight-700">CART</span>
            <hr />
            <CartItems />            
        </div>
        );
    }
}

export default Cart;