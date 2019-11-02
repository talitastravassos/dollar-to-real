import React from "react";
import ProcessedResult from "./components/ProcessedResult";
import Painel from "./components/Painel";
// import styles from "./styles.module.scss";

export default function Home() {
  return (
    <div>
      <Painel />
      <ProcessedResult />
    </div>
  );
}
