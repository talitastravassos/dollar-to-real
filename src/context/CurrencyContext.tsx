import React from "react";
import axios from "axios";
import {
  CurrencyRate,
  initialCurrency,
  ProcessedData,
  initialProcessedData,
  DataToProcess,
  initialValues
} from "./currency.types";
import { numberMask } from "../utils/masks";

interface State {
  currencyRate: CurrencyRate; // cotação atual
  IOFBRL: number;
  paymentMode: string;
  processedData: ProcessedData;
  dataToConvert: DataToProcess; // objeto com os valores para correção
  isProcessed: boolean;
}

interface IContext {
  state: State;
  action: {
    getCurrencyRate(): void;
    paymentInCash(): void;
    paymentInCredit(): void;
    setDataToConvert(dataToConvert: DataToProcess): void;
    paymentProcessing(): void;
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
      dataToConvert: initialValues,
      IOFBRL: 0,
      paymentMode: "",
      isProcessed: false
    };
  }

  setDataToConvert = (dataToConvert: DataToProcess) => {
    this.setState({ dataToConvert });
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
  };

  paymentInCredit = () => {
    this.setState({
      IOFBRL: 6.4,
      paymentMode: "credit"
    });
  };

  calcPercentage = (percentage: number, value: number): number => {
    let calc = value * (percentage / 100);
    return Number(calc.toFixed(2));
  };

  paymentProcessing = () => {
    const { IOFBRL, currencyRate } = this.state;
    const { stateTax, valueToConvert } = this.state.dataToConvert;

    let payment: ProcessedData = initialProcessedData;

    payment.totalUSDWithoutTax = valueToConvert;
    payment.totalUSDWithTax =
      valueToConvert + this.calcPercentage(stateTax, valueToConvert);
    payment.totalStateTax = this.calcPercentage(stateTax, valueToConvert);
    payment.totalBRLWithoutTax =
      payment.totalUSDWithTax * Number(numberMask(currencyRate.bid));
    payment.totalIOF = this.calcPercentage(
      IOFBRL,
      payment.totalUSDWithTax * Number(numberMask(currencyRate.bid))
    );

    payment.totalBRLWithTax =
      payment.totalUSDWithTax * Number(numberMask(currencyRate.bid)) +
      payment.totalIOF;

    // console.log(payment);

    this.setState({
      processedData: payment,
      isProcessed: true
    });
  };

  componentDidMount() {
    this.getCurrencyRate();
  }

  componentDidUpdate() {
    // this.paymentProcessing();
    // console.log(this.state);
  }

  render() {
    const value = {
      state: { ...this.state },
      action: {
        getCurrencyRate: this.getCurrencyRate,
        paymentInCash: this.paymentInCash,
        paymentInCredit: this.paymentInCredit,
        setDataToConvert: this.setDataToConvert,
        paymentProcessing: this.paymentProcessing
      }
    };

    return <CurrencyContext.Provider value={value} {...this.props} />;
  }
}
