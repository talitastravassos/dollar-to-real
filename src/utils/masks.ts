import numeral from 'numeral';
import 'numeral/locales';
numeral.locale('pt-br');

export function formatPrice(str: string | number): string {
    if (typeof str === "string") {
      const value = str.length === 1 ? `0${str}` : str;
      return numeral(
        Number(parseFloat(value.replace(/[\D]/g, "").replace(/(\d\d?)$/g, ".$1"))) * 1
      ).format("0,0.00");
    } else {
      return numeral(str / 100).format("0,0.00");
    }
  }

export const formatNumber = (number: any, num: number = 100): string => {
    if (number) {
      return numeral(Number((number / num).toFixed(2))).format("0,0.00");
    } else return "0,00";
};

export const numberMask = (str: string): string => {
    const format = str
      .replace(/[^0-9,.]/g, "")
      .replace(",", ".")
      .match(/^\d+\.?\d{0,2}/g);
  
    return format ? format[0] : "";
  };

export function applyNumberFormat(str: any): string {
	return numeral(str).format('0.0%');
}

export const toNumber = (str: string): number => {
	return numeral(str).value();
};

export const onlyNumber = (str: string): string => {
	return str.replace(/\D/g, '');
};