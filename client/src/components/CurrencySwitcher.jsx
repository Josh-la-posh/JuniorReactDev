import { useQuery } from "@apollo/client";
import { QUERY_CURRENCIES } from '../FetchData/DisplayData';

function CurrencySwitcher () {
    const {data, loading, error} = useQuery(QUERY_CURRENCIES);

        return (
            <div className="currency flex col weight-500 font-18">
                {data &&
                data.currencies.map(currency =>{
                    return (
                            <span key={currency.symbol} className="flex-center"><span>{currency.symbol}</span> <span>{currency.label}</span></span>
                            
                            )
                        })
                    }
            </div>
        )
}

export default CurrencySwitcher;