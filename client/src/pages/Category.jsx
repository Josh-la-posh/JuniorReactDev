import { PureComponent } from "react";
import '../sass/style.scss';
import Product from "../components/Product";

class Category extends PureComponent {
    render() {
        const {data} = this.props;
        return ( 
            <div className="category">                
                <Product data={data}/>
            </div>
        );
    }
}
 
export default Category;