import { PureComponent } from "react";
import '../sass/style.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrencySwitcher from "./CurrencySwitcher";
import CategoryOveray from "./CategoryOverlay";
import { Link } from "react-router-dom";

class Header extends PureComponent {
    render() {
        return (
            <div className="header flex-btw-align">
                <div className="categories flex font-16">
                    <Link to='/'><span className="active">WOMEN</span></Link>
                    <span>MEN</span>
                    <span>KIDS</span>
                </div>
                <div className="icons flex">
                    <span className="flex flex-end">
                        <FontAwesomeIcon icon='dollar-sign' className="font-21"/>
                        <FontAwesomeIcon icon='chevron-down' className="down font-12"/>
                        <FontAwesomeIcon icon='chevron-up' className="up font-12"/>
                        <CurrencySwitcher />
                    </span>
                    <span className="icon">
                        <Link to='cart'><FontAwesomeIcon icon='cart-shopping' className="font-18"/><span className="flex-center quantity">{this.props.totalQuantity}</span></Link>
                        <CategoryOveray />
                    </span>
                </div>
            </div>
        );
    }
}

export default Header;