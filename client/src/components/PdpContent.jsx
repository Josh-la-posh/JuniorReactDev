import { PureComponent } from "react";

class PdpContent extends PureComponent {

    render() {
        const {product} = this.props;
        
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
                                <div className={attribute.type === 'swatch' ? 'color flex' : 'sizes flex font-16'}>
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
                    
                    <div className="size flex col font-18 weight-700">
                        <span>PRICES:</span>
                        <span className="price font-24">${product.price.toFixed(2)}</span>
                    </div>


                    
                    <button className="font-16 weight-600" >ADD TO CART</button>
                    
                    <p className="font-16 weight-400">{product.description}</p>
                </div>
            </div>
        );
    }
}

export default PdpContent;