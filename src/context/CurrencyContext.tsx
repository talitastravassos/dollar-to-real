import React from 'react'
import axios from "axios";

interface State {
    exchangeRate: number;
    currencyRate: any;
}

interface IContext {
    state: State;
    action: {
        getCurrencyRate(): void;
    };
}

const base_url = "https://economia.awesomeapi.com.br/USD-BRL/"

export const CurrencyContext = React.createContext({} as IContext);

export default class CurrencyProvider extends React.Component<{}, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            exchangeRate: 0,
            currencyRate: {}
        }
    }

    getCurrencyRate = () => {
        axios.get(base_url)
        .then(res => {
            // console.log(res.data[0])
            this.setState({
                currencyRate: res.data[0]
            })
        })

    }


    componentDidMount() {
        this.getCurrencyRate()
    }

    render() {
        const value = {
            state: { ...this.state },
            action: {
                getCurrencyRate: this.getCurrencyRate
            }
        }

        return <CurrencyContext.Provider value={value} {...this.props} />;
    }
}