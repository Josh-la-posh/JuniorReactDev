import { PureComponent } from "react";
import { connect } from 'react-redux'
import { selectCurrency } from "../redux/ActionCreators";

const mapDispatchToProps = (dispatch) => ({
    switchCurrency: (currency) => {dispatch(selectCurrency(currency))}
})

class CurrencySwitcher extends PureComponent {
    componentDidMount() {
        selectCurrency()
    }

    render () {
        const {data, switchCurrency} = this.props;
        return (
            <div className="currency flex col weight-500 font-18">
                {data &&
                data.currencies.map(currency =>{
                    return (
                        <span key={currency.symbol} className={(this.props.currency === currency.symbol) ? 'flex-center active' : 'flex-center'} onClick={() => {switchCurrency(currency)}}><span>{currency.symbol}</span> <span>{currency.label}</span></span>                        
                    )
                })
                }
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(CurrencySwitcher);