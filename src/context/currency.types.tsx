export interface CurrencyRate {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

export const initialCurrency = {
  code: "",
  codein: "",
  name: "",
  high: "",
  low: "",
  varBid: "",
  pctChange: "",
  bid: "",
  ask: "",
  timestamp: "",
  create_date: ""
};

export interface ValuesToProcess {
  valueToConvert: number;
  stateTax: number;
  IOF: number;
}

export const initialValues = {
  valueToConvert: 0,
  stateTax: 0,
  IOF: 0
};

export interface ProcessedData {
  totalUSDWithoutTax: number;
  totalUSDWithTax: number;
  totalBRLWithoutTax: number;
  totalBRLWithTax: number;
  totalIOF: number;
  totalStateTax: number;
}

export const initialProcessedData = {
  totalUSDWithoutTax: 0,
  totalUSDWithTax: 0,
  totalBRLWithoutTax: 0,
  totalBRLWithTax: 0,
  totalIOF: 0,
  totalStateTax: 0
};
