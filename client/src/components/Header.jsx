import { PureComponent } from "react";
import { connect } from "react-redux";
import '../sass/style.scss';
import { client } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrencySwitcher from "./CurrencySwitcher";
import CategoryOveray from "./CategoryOverlay";
import { Link } from "react-router-dom";
import { QUERY_ALL_CATEGORIES } from "../FetchData/Categories";

const mapStateToProps = (state) => ({
    totalQuantity: state.reducer.totalQuantity,
    currency: state.reducer.currency
})
class Header extends PureComponent {
    state = { 
        categories: [],
    };

    componentDidMount() {
        this.categoryNames();
    }

    async categoryNames() {
        const result = await client.query({
            query: QUERY_ALL_CATEGORIES
        
        });

        this.setState({
            categories: [...result.data.categories],
        });
    }

    render() {
        const { categories } = this.state;

        const {data, totalQuantity, currency} = this.props
        return (
            <div className="header flex-btw-align">
                <div className="categories flex font-16">
                    {categories?.map(({name}, index) => {
                        return (                            
                            <Link to={`category/${name}`} key={index}>{name}</Link>
                        )
                    })}
                </div>
                <div className="icons flex">
                    <span className="flex flex-end">
                        <span className="font-21">{currency}</span>
                        <FontAwesomeIcon icon='chevron-down' className="down font-12"/>
                        <FontAwesomeIcon icon='chevron-up' className="up font-12"/>
                        <CurrencySwitcher data={data} currency={currency}/>
                    </span>
                    <span className="icon">
                        <Link to='cart'><FontAwesomeIcon icon='cart-shopping' className="font-18"/><span className="flex-center quantity">{totalQuantity ? totalQuantity : 0}</span></Link>
                        <CategoryOveray/>
                    </span>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Header);