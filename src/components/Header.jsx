import { Component } from "react";
import '../sass/style.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrencySwitcher from "./CurrencySwitcher";
import CategoryOveray from "./CategoryOverlay";
import { Link } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="header flex-btw-align">
                <div className="categories flex font-16">
                    <span className="active">WOMEN</span>
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
                        <Link to='cart'><FontAwesomeIcon icon='cart-shopping' className="font-18"/></Link>
                        <CategoryOveray />
                    </span>
                </div>
            </div>
        );
    }
}

export default Header;