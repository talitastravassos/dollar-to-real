import React from "react";
import axios from "axios";
import { CurrencyRate, initialCurrency } from "./currency.types";
import { numberMask } from "../utils/masks";

interface State {
  exchangeRate: number;
  currencyRate: CurrencyRate; // cotação atual
  value: number; // valor que sera convertido para reais
  tax: number;
  IOF: number;
  paymentMode: string;
}

interface IContext {
  state: State;
  action: {
    getCurrencyRate(): void;
    paymentInCash(): void;
    paymentInCredit(): void;
    setDataToConvert(name: string, value: number): void;
  };
}

const base_url = "https://economia.awesomeapi.com.br/USD-BRL/";

export const CurrencyContext = React.createContext({} as IContext);

export default class CurrencyProvider extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      exchangeRate: 0,
      currencyRate: initialCurrency,
      value: 0,
      tax: 0,
      IOF: 0,
      paymentMode: ""
    };
  }

  setDataToConvert = (name: string, value: number) => {
    if (name === "tax") {
      this.setState({
        tax: value
      });
    } else if (name === "value") {
      this.setState({ value });
    }
  };

  getCurrencyRate = () => {
    axios.get(base_url).then(res => {
      // console.log(res.data[0])
      this.setState({
        currencyRate: res.data[0]
      });
    });
  };

  paymentInCash = () => {
    this.setState({
      IOF: 1.1,
      paymentMode: "cash"
    });

    console.log("cash selected");
  };

  paymentInCredit = () => {
    this.setState({
      IOF: 6.4,
      paymentMode: "credit"
    });
    // console.log("credit selected");
  };

  calcPercentage = (percentage: number, value: number): number => {
    let calc = value * (percentage / 100);
    return Number(calc.toFixed(2));
  };

  componentDidMount() {
    this.getCurrencyRate();
  }

  componentDidUpdate() {
    const { IOF, currencyRate } = this.state;

    console.log(this.calcPercentage(IOF, Number(numberMask(currencyRate.bid))));
    console.log(this.state);
  }

  render() {
    const value = {
      state: { ...this.state },
      action: {
        getCurrencyRate: this.getCurrencyRate,
        paymentInCash: this.paymentInCash,
        paymentInCredit: this.paymentInCredit,
        setDataToConvert: this.setDataToConvert
      }
    };

    return <CurrencyContext.Provider value={value} {...this.props} />;
  }
}
