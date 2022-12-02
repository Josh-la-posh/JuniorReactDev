import { PureComponent } from "react";
import { connect } from "react-redux";
import '../sass/style.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrencySwitcher from "./CurrencySwitcher";
import CategoryOveray from "./CategoryOverlay";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => ({
    totalQuantity: state.reducer.totalQuantity,
    currency: state.reducer.currency
})
class Header extends PureComponent {
    render() {
        const {data, totalQuantity, currency} = this.props
        return (
            <div className="header flex-btw-align">
                <div className="categories flex font-16">
                    <Link to='/'><span className="active">WOMEN</span></Link>
                    <span>MEN</span>
                    <span>KIDS</span>
                </div>
                <div className="icons flex">
                    <span className="flex flex-end">
                        <span className="font-21">{!currency ? data && data.currencies[0].symbol : currency}</span>
                        <FontAwesomeIcon icon='chevron-down' className="down font-12"/>
                        <FontAwesomeIcon icon='chevron-up' className="up font-12"/>
                        <CurrencySwitcher data={data} currency={currency}/>
                    </span>
                    <span className="icon">
                        <Link to='cart'><FontAwesomeIcon icon='cart-shopping' className="font-18"/><span className="flex-center quantity">{totalQuantity}</span></Link>
                        <CategoryOveray/>
                    </span>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Header);