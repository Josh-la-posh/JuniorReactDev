import { PureComponent } from "react";
import { connect } from 'react-redux';
import {addToCart, selectAttribute, defaultAttribute} from '../redux/ActionCreators';

const mapStateToProps = (state) => ({
    cart: state.reducer.cart,
    selectedAttribute: state.reducer.selectedAttribute,
    currency: state.reducer.currency,
})

const mapDispatchToProps = (dispatch) => ({
    addToCart: (product) => {dispatch(addToCart(product))},
    selectAttribute: (value, name) => {dispatch(selectAttribute(value, name))},
})

class PdpContent extends PureComponent {
    state = {displayedImg: ''}
    
    componentDidMount() {
        addToCart();
        selectAttribute();
    }

    currentImg = (e) => {
        this.setState({displayedImg: e.target.currentSrc})
    }

    render() {
        const {product, addToCart, selectAttribute, selectedAttribute} = this.props;
        return (
            
            <div className="pdp flex">

                {/* LEFT CONTENT */}

                <div className="product flex">
                    <div className="colorChange flex col">
                        {product.gallery.map(image => {
                            return (
                                <img key={image} onClick={(e) => this.currentImg(e)} src={image} alt="" />
                            )
                        })}
                    </div>
                    <div className="image">
                        <img src={this.state.displayedImg === '' ? product.gallery[0] : this.state.displayedImg} alt="" />
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
                                    {attribute.items.map((item, index) => {
                                        return (
                                            <span key={index} className='flex-center checkmark' style={selectedAttribute.some(att => Object.keys(att)[0] === attribute.name && Object.values(att)[0] === item.value) ? (attribute.type === 'swatch' ? {backgroundColor: `${item.value}`, outline: '1px solid #5ECE7B'} : { backgroundColor: '#000', color: '#fff'}) : (attribute.type === 'swatch' ? {backgroundColor: `${item.value}`} : { backgroundColor: '#fff', color: '#000'})} onClick={() => {selectAttribute(item.value, attribute.name)}}>{attribute.type !== 'swatch' && item.value}</span>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        )
                    })}
                    
                    <div className="size flex col font-18 weight-700">
                        <span>PRICES:</span>
                            {product.prices.map(price =>
                                this.props.currency === price.currency.symbol && (this.props.currency) + (price.amount)                                            
                            )}
                    </div>


                    <button className="font-16 weight-600" onClick={() => addToCart(product)}>ADD TO CART</button>
                    <p className="font-16 weight-400" >{product.description.replace(/<[^>]+>/g, '')}</p>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PdpContent);