import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";

class CurrencySwitcher extends Component {
    render() {
        return (
            <div className="currency flex col weight-500 font-18">
                <span className="flex-center"><FontAwesomeIcon icon='dollar-sign' /> <span>USD</span></span>
                <span className="flex-center active"><FontAwesomeIcon icon='euro-sign' /> <span>EUR</span></span>
                <span className="flex-center"><FontAwesomeIcon icon='yen-sign' /> <span>JPY</span></span>
            </div>
        );
    }
}

export default CurrencySwitcher;