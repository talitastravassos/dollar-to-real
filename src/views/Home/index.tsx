import React from "react";
import ProcessedResult from "./components/ProcessedResult";
import Painel from "./components/Painel";
import styles from "./styles.module.scss";
import Footer from "../../components/Footer";

// Home view: view responsible for the application homepage
export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <h1 className="is-size-1 is-size-2-mobile has-text-weight-bold">
          USD 2 Real
        </h1>
        <p className="is-size-5">
          Simule a compra de dólares americanos, levando em consideração o valor
          do IOF e a taxa do estado americano. Para realizar uma simulação basta
          digitar no campo indicado o valor que deseja converter, a taxa do
          estado americano e selecionar o modo de pagamento (dinheiro ou cartão
          de crédito), logo em seguida irá aparecer o resultado do cálculo.
        </p>
        <h3
          className="is-size-4 is-size-5-mobile has-text-weight-bold"
          style={{ marginTop: 20 }}
        >
          {" "}
          Informações importantes:{" "}
        </h3>
        <ul>
          <li>
            - Sobre o IOF: é um imposto federal sobre operações de crédito,
            câmbio e seguros.
          </li>
          <li>
            - Sobre a taxa do estado: nos EUA cada estado tem sua politica de
            cobrança de impostos sobre transações bancarias.
          </li>
        </ul>
        <div className={styles.painel_container}>
          <Painel />
          <ProcessedResult />
        </div>
      </div>
      <Footer />
    </>
  );
}
