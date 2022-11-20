import { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

class Product extends PureComponent {
    render() {
        const {data} = this.props

        return (
            <div>
                {data &&         
                    data.categories.map(category => {                
                        return (
                            <div key={category.name} className="content">
                                <span className="title font-42 weight-400">{category.name}</span>
                                <div className="container">                    
                                    <div className="row font-18">
                                        {category.products.map(item => {
                                            return(
                                                <Link key={item.id} to={`pdp/${item.id}`}>
                                                    <div className={item.inStock ? 'col-lg-4 flex col' : 'col-lg-4 flex col outOfStock'}>                            
                                                    <div className="img">
                                                        <img src={item.gallery} alt="" />
                                                        {item.inStock === false && <span className="font-24 weight-400">OUT OF STOCK</span>}
                                                        <span className="icon-cart"><FontAwesomeIcon icon='cart-shopping' className="icon" /></span>
                                                    </div>
                                                    <span className="name">{item.brand}</span>
                                                    <span className="price weight-500">$50.00</span>
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>         
                            </div> 
                        );
                    })
                }
            </div>
        )
    }    
}

export default Product;