import React from 'react'
import axios from "axios";

interface State {
    exchangeRate: number;
}

interface IContext {
    state: State;
    action: {
        test(): void;
    };
}

export const CurrencyContext = React.createContext({} as IContext);

export default class CurrencyProvider extends React.Component<{}, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            exchangeRate: 0
        }
    }

    test = () => {
        console.log("currency context ok")
    }

    componentDidMount() {

    }

    render() {
        const value = {
            state: { ...this.state },
            action: {
                test: this.test
            }
        }

        return <CurrencyContext.Provider value={value} {...this.props} />;
    }
}