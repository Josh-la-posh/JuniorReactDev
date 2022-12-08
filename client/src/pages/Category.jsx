import { PureComponent } from "react";
import '../sass/style.scss';
import Product from "../components/Product";
import { client } from '..';
import { QUERY_ALL_PRODUCTS } from "../FetchData/Products";

class Category extends PureComponent {
    state = { products: [] }

    componentDidMount() {
        this.fetchProducts();
    }

    componentDidUpdate() {
        this.fetchProducts()
    }

    async fetchProducts() {
        const result = await client.query({
            query: QUERY_ALL_PRODUCTS,
            variables: {
                category: 'all',
            },
        });

        this.setState({products: result.data.category.products})
    }

    categoryName() {
        const categoryName = "all";        
        return categoryName[0].toUpperCase() + categoryName.substring(1);        
    }

    
    render() {
        const {products} = this.state;
        return ( 
            <div className="category">
                <Product products={products} categoryName={this.categoryName} />
            </div>
        );
    }
}
 
export default (Category);