import React from "react";
import InputValue from "../InputValue";
import { formatPrice, numberMask, toNumber } from "../../utils/masks";
import styles from "./styles.module.scss";
import RadioButtons from "../RadioButtons";
import { CurrencyContext } from "../../context/CurrencyContext";

export default function Painel() {
  const {
    action: { paymentInCash, paymentInCredit, setDataToConvert },
    state: { currencyRate }
  } = React.useContext(CurrencyContext);

  const onChange = (name: string, value: string) => {
    if (name === "value") {
      setDataToConvert(name, toNumber(value) * 10);
    } else if (name === "tax") {
      setDataToConvert(name, Number(value));
    }
  };

  const paymentSelected = (mode: string) => {
    if (mode === "credit") {
      paymentInCredit();
    } else if (mode === "cash") {
      paymentInCash();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <InputValue
          label={"Valor Solicitado"}
          withPrefix
          prefix={"$"}
          mask={formatPrice}
          onChange={onChange}
          name={"value"}
        />
        <InputValue
          label={"Taxa do Estado (%)"}
          withPrefix={false}
          onChange={onChange}
          name={"tax"}
          mask={numberMask}
        />
      </div>
      <div>
        <RadioButtons
          legend={"Modo de Pagamento"}
          fields={[
            { value: "credit", label: "Cartão de Crédito" },
            { value: "cash", label: "Em Dinheiro" }
          ]}
          selectedOption={paymentSelected}
        />
      </div>
      {currencyRate.bid ? (
        <div className={styles.info_container}>
          <p>
            Cotação do dia: R$ { Number(currencyRate.bid.replace(",", ".")).toFixed(2) }
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
