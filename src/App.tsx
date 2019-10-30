import React from "react";
import { CurrencyContext } from "./context/CurrencyContext";
import "./App.scss";
import Painel from "./components/Painel";

const App: React.FC = () => {
  const {
    state: { currencyRate }
  } = React.useContext(CurrencyContext);

  React.useEffect(() => {
    console.log(currencyRate);
  }, [currencyRate]);

  return (
    <>
      <Painel />
    </>
  );
};

export default App;
