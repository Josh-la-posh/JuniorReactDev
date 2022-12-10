import { PureComponent } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {addToCart, removeFromCart, selectAttribute, defaultAttribute} from '../redux/ActionCreators';

const mapStateToProps = (state) => ({
    currency: state.reducer.currency,
    selectedAttribute: state.reducer.selectedAttribute
})

const mapDispatchToProps = (dispatch) => ({
    addToCart: (product) => {dispatch(addToCart(product))},
    defaultAttribute: (product) => (dispatch(defaultAttribute(product)))
})

class Product extends PureComponent {
    constructor(props) {
        super(props);
        this.defAtt = this.defAtt.bind(this)
    }
    
    componentDidMount() {
        // this.defAtt()
        addToCart();
        setTimeout(() => {
            this.defAtt()
          }, 1000)
    }

    defAtt = () => {
        this.props.products.map((product) => {
            if (this.props.products.length) {
                this.props.defaultAttribute(product);            
            }
        });
    }
    
    render() {
        const {products, addToCart, categoryName, defaultAttribute} = this.props

        return (
            <div className="content">
                <span className="title font-42 weight-400">{categoryName()}</span>
                <div className="container">                    
                    <div className="row font-18">
                        {products.length ?
                            products.map(product => {
                                return(
                                    <Link key={product.id} to={product.inStock && (`pdp/${product.id}`)}>
                                        <div className={product.inStock ? 'col-lg-4 flex col' : 'col-lg-4 flex col outOfStock'}>                            
                                            <div className="img">
                                                <img src={product.gallery[0]} alt="" />
                                                {product.inStock === false && <span className="font-24 weight-400">OUT OF STOCK</span>}
                                                {product.inStock && <span className="icon-cart" onClick={() => addToCart(product)}><FontAwesomeIcon icon='cart-shopping' className="icon" /></span>}
                                            </div>
                                            <span className="name">{product.brand}</span>
                                            <span className="price weight-500">
                                                {product.prices.map(price => 
                                                    this.props.currency === price.currency.symbol && (this.props.currency) + (price.amount)
                                                )}
                                            </span>
                                        </div>
                                    </Link>
                                )
                            }) : ''
                        }
                    </div>
                </div>
            </div>
        )
    }    
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);