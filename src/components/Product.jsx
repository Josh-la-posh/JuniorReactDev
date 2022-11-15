import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         };
    }
    render() {
        const {data} = this.props;
        return (            
            <div className="row font-18">
                {data.map(item => {
                    return(
                        <Link key={item.id} to={`pdp/${item.id}`}>
                            <div className={item.quantity ? 'col-lg-4 flex col' : 'col-lg-4 flex col outOfStock'}>                            
                                <div className="img">
                                    <img src={item.img} alt="" />
                                    {item.quantity === 0 && <span className="font-24 weight-400">OUT OF STOCK</span>}
                                    <span className="icon-cart"><FontAwesomeIcon icon='cart-shopping' className="icon" /></span>
                                </div>
                                <span className="name">{item.name}</span>
                                <span className="price weight-500">${item.price.toFixed(2)}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        );
    }
}

export default Product;