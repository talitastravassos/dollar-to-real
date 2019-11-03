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

// global application state definition
interface State {
  currencyRate: CurrencyRate; // cotação atual
  IOFBRL: number;
  paymentMode: string;
  processedData: ProcessedData;
  dataToConvert: DataToProcess; // objeto com os valores para correção
  isProcessed: boolean;
}

// definition of type IContext used by context api
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

const base_url = "https://economia.awesomeapi.com.br/USD-BRL/"; //rest api url

export const CurrencyContext = React.createContext({} as IContext); // create context

// class with the data and operations stored in context api that the application will consume
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

  // set data to convert in global state
  setDataToConvert = (dataToConvert: DataToProcess) => {
    this.setState({ dataToConvert });
  };

  //rest api request for currency rate
  getCurrencyRate = () => {
    axios.get(base_url).then(res => {
      // console.log(res.data[0])
      this.setState({
        currencyRate: res.data[0]
      });
    });
  };

  //change payment mode to 'cash' and set IOF for 1.1% (cash)
  paymentInCash = () => {
    this.setState({
      IOFBRL: 1.1,
      paymentMode: "cash"
    });
  };

  //change payment mode to 'credit' and set IOF for 6.4% (credit)
  paymentInCredit = () => {
    this.setState({
      IOFBRL: 6.4,
      paymentMode: "credit"
    });
  };

  //percentage calculation
  calcPercentage = (percentage: number, value: number): number => {
    let calc = value * (percentage / 100);
    return Number(calc.toFixed(2));
  };

  // calculation of payment processing using data currently in the global state
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

    // set to global state the results
    this.setState({
      processedData: payment,
      isProcessed: true
    });
  };

  componentDidMount() {
    // get the currency rate every time the application starts
    this.getCurrencyRate();
  }

  render() {
    // definition of the data and operations that the entire application will have access
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
