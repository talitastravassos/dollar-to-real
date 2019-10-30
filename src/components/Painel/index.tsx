import React from "react";
import InputValue from "../InputValue";
import { formatPrice, numberMask } from "../../utils/masks";
import styles from "./styles.module.scss";
import RadioButtons from "../RadioButtons";
import { CurrencyContext } from "../../context/CurrencyContext";

export default function Painel() {
  const {
    state: { currencyRate }
  } = React.useContext(CurrencyContext);

  const onChange = (name: string, value: string) => {
    console.log(name, value);
    //toNumber(value) * 100
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
        />
      </div>
      {currencyRate.bid ? (
        <div className={styles.info_container}>
          <p>
            Cotação do dia: R$ {currencyRate.bid.toString().replace(".", ",")}
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
