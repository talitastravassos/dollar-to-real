import React from "react";
import axios from "axios";
import {
  CurrencyRate,
  initialCurrency,
  ProcessedData,
  initialProcessedData
} from "./currency.types";
import { numberMask } from "../utils/masks";

interface State {
  currencyRate: CurrencyRate; // cotação atual
  valueUSD: number; // valor que sera convertido para reais
  taxUSD: number;
  IOFBRL: number;
  paymentMode: string;
  processedData: ProcessedData;
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
      currencyRate: initialCurrency,
      processedData: initialProcessedData,
      valueUSD: 0,
      taxUSD: 0,
      IOFBRL: 0,
      paymentMode: ""
    };
  }

  setDataToConvert = (name: string, value: number) => {
    if (name === "tax") {
      this.setState({
        taxUSD: value
      });
    } else if (name === "value") {
      this.setState({ valueUSD: value });
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
      IOFBRL: 1.1,
      paymentMode: "cash"
    });

    // console.log("cash selected");
  };

  paymentInCredit = () => {
    this.setState({
      IOFBRL: 6.4,
      paymentMode: "credit"
    });
    // console.log("credit selected");
  };

  calcPercentage = (percentage: number, value: number): number => {
    let calc = value * (percentage / 100);
    return Number(calc.toFixed(2));
  };

  paymentProcessing = () => {
    const { IOFBRL, currencyRate, paymentMode, valueUSD, taxUSD } = this.state;

    let payment: ProcessedData = initialProcessedData;

    payment.totalUSDWithoutTax = valueUSD;
    payment.totalUSDWithTax = valueUSD + this.calcPercentage(taxUSD, valueUSD);
    payment.totalStateTax = this.calcPercentage(taxUSD, valueUSD);
    payment.totalBRLWithoutTax = (valueUSD + this.calcPercentage(taxUSD, valueUSD)) * Number(numberMask(currencyRate.bid));
    payment.totalIOF = this.calcPercentage(IOFBRL, (valueUSD + this.calcPercentage(taxUSD, valueUSD)) * Number(numberMask(currencyRate.bid)) );

    if (paymentMode === "cash") {
      payment.totalBRLWithTax = (valueUSD + this.calcPercentage(taxUSD, valueUSD)) * (Number(numberMask(currencyRate.bid)) + payment.totalIOF);
    } else if (paymentMode === "credit") {
      payment.totalBRLWithTax = (valueUSD + this.calcPercentage(taxUSD, valueUSD)) * Number(numberMask(currencyRate.bid)) + payment.totalIOF;
    }
    console.log(payment);
  };

  componentDidMount() {
    this.getCurrencyRate();
  }

  componentDidUpdate() {
    const { IOFBRL, currencyRate } = this.state;
    this.paymentProcessing();

    // console.log(this.state);
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
