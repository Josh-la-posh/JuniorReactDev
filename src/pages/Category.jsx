import { Component } from "react";
import '../sass/style.scss';
import Product from "../components/Product";

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const {data} = this.props;
        return ( 
            <div className="category">
                <span className="title font-42 weight-400">Category name</span>
                <div className="container">
                    <Product data={data}/>
                </div>
            </div>
        );
    }
}
 
export default Category;