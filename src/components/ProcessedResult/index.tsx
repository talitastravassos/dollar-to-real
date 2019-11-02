import React from "react";
import styles from "./styles.module.scss";
import { CurrencyContext } from "../../context/CurrencyContext";
import { formatPrice } from "../../utils/masks";

export default function ProcessedResult() {
  const {
    action: {
      paymentProcessing
    },
    state: {
      processedData,
      paymentMode,
      isProcessed
    }
  } = React.useContext(CurrencyContext);

  React.useEffect(() => {
    paymentProcessing();
    console.log(processedData);
  }, [paymentMode]);

  return (isProcessed && processedData.totalIOF !== 0) ? (
    <div className={styles.container}>
      <h1 className="is-size-2 is-size-3-mobile has-text-weight-bold">
        Resultado
      </h1>
      <div className={styles.info_container}>
        <div className={styles.info_column}>
          <h3 className="is-size-5 is-size-6-mobile">
            Valor (com IOF): R${" "}
            {formatPrice(processedData.totalBRLWithTax.toFixed(2).toString())}
          </h3>
          <h3 className="is-size-5 is-size-6-mobile">
            Valor (sem IOF): R${" "}
            {formatPrice(
              processedData.totalBRLWithoutTax.toFixed(2).toString()
            )}
          </h3>
          <h3 className="is-size-5 is-size-6-mobile">
            Total do IOF: R${" "}
            {formatPrice(processedData.totalIOF.toFixed(2).toString())}
          </h3>
        </div>
        <div>
          <h3 className="is-size-5 is-size-6-mobile">
            Valor (com a taxa do estado): USD{" "}
            {formatPrice(processedData.totalUSDWithTax.toFixed(2).toString())}
          </h3>
          <h3 className="is-size-5 is-size-6-mobile">
            Valor (sem a taxa do estado): USD{" "}
            {formatPrice(
              processedData.totalUSDWithoutTax.toFixed(2).toString()
            )}
          </h3>
          <h3 className="is-size-5 is-size-6-mobile">
            Total da taxa de estado: USD{" "}
            {formatPrice(processedData.totalStateTax.toFixed(2).toString())}
          </h3>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
