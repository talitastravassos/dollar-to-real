import React from "react";
import InputValue from "../../../../components/InputValue";
import { formatPrice, toNumber, percentageMask } from "../../../../utils/masks";
import styles from "./styles.module.scss";
import RadioButtons from "../../../../components/RadioButtons";
import { CurrencyContext } from "../../../../context/CurrencyContext";
import {
  initialValues,
  DataToProcess
} from "../../../../context/currency.types";

// Home component with the inputs used in the application
export default function Painel() {
  const {
    action: { paymentInCash, paymentInCredit, setDataToConvert },
    state: { currencyRate, paymentMode }
  } = React.useContext(CurrencyContext); // context api

  const [data, setData] = React.useState<DataToProcess>(initialValues); // component state

  const onChange = (name: string, value: string) => {
    // get input data and set into component state
    if (name === "value") {
      setData(prevState => ({
        ...prevState,
        valueToConvert: toNumber(value)
      }));
    } else if (name === "tax") {
      setData(prevState => ({
        ...prevState,
        stateTax: Number(value)
      }));
    }
  };

  const paymentSelected = (mode: string) => {
    // change payment mode in context api
    if (mode === "credit") {
      paymentInCredit();
    } else if (mode === "cash") {
      paymentInCash();
    }
  };

  React.useEffect(() => {
    // send data to be converted to context api
    if (data.stateTax !== 0 && data.valueToConvert) {
      setDataToConvert(data);
    }
    // eslint-disable-next-line
  }, [data]);

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
          label={"Taxa do Estado"}
          withPrefix
          prefix={"%"}
          onChange={onChange}
          name={"tax"}
          mask={percentageMask}
        />
      </div>
      <div>
        <RadioButtons
          legend={"Selecione o modo de pagamento"}
          fields={[
            { value: "credit", label: "Cartão de Crédito" },
            { value: "cash", label: "Em Dinheiro" }
          ]}
          selectedOption={paymentSelected}
        />
        {/* display message about IOF */}
        {paymentMode !== "" ? (
          <article className="message is-info">
            <div className="message-header">
              <p>Valor do IOF</p>
            </div>
            <div className="message-body">
              Em transações com dinheiro é 1,1%, e em trasações com cartão de
              crédito é 6,4%.
            </div>
          </article>
        ) : (
          ""
        )}
      </div>
      {/* display currency rate */}
      {currencyRate.bid ? (
        <div className={styles.info_container}>
          <p className="has-text-weight-bold is-size-5">
            Cotação atual do Dólar Comercial:
          </p>
          <p className="has-text-weight-bold is-size-4">
            R${" "}
            {formatPrice(
              Number(currencyRate.bid.replace(",", "."))
                .toFixed(2)
                .toString()
            )}
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
