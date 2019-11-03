import React from "react";
import styles from "./styles.module.scss";
import { formatPrice } from "../../../../utils/masks";
import { CurrencyContext } from "../../../../context/CurrencyContext";

// Home component that will display the data processing results
export default function ProcessedResult() {
  const {
    action: { paymentProcessing },
    state: { processedData, paymentMode, isProcessed }
  } = React.useContext(CurrencyContext);

  React.useEffect(() => {
    // When the payment mode changes, the function paymentProcessing will be executed to display the new results.
    paymentProcessing();
    console.log(processedData);
    // eslint-disable-next-line
  }, [paymentMode]);

  return isProcessed && processedData.totalIOF !== 0 ? (
    <div className={styles.container}>
      <h1 className="is-size-2 is-size-3-mobile has-text-weight-bold">
        Resultado
      </h1>
      <div className={styles.info_container}>
        <div className={styles.info_column}>
          <h3 className="is-size-5">Valor Total (com IOF):</h3>
          <p className="is-size-4">
            R${" "}
            {formatPrice(processedData.totalBRLWithTax.toFixed(2).toString())}
          </p>
          <h3 className="is-size-5">Valor Total (sem IOF):</h3>
          <p className="is-size-4">
            R${" "}
            {formatPrice(
              processedData.totalBRLWithoutTax.toFixed(2).toString()
            )}
          </p>
          <h3 className="is-size-5">Total do IOF:</h3>
          <p className="is-size-4">
            R$ {formatPrice(processedData.totalIOF.toFixed(2).toString())}
          </p>
        </div>
        <div>
          <h3 className="is-size-5">Valor (com a taxa do estado):</h3>
          <p className="is-size-4">
            USD{" "}
            {formatPrice(processedData.totalUSDWithTax.toFixed(2).toString())}
          </p>
          <h3 className="is-size-5">Valor (sem a taxa do estado):</h3>
          <p className="is-size-4">
            USD{" "}
            {formatPrice(
              processedData.totalUSDWithoutTax.toFixed(2).toString()
            )}
          </p>
          <h3 className="is-size-5">Total da taxa de estado:</h3>
          <p className="is-size-4">
            USD {formatPrice(processedData.totalStateTax.toFixed(2).toString())}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
