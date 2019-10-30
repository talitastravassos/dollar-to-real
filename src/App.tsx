import React from "react";
import { CurrencyContext } from "./context/CurrencyContext";
import "./App.scss";
import Painel from "./components/Painel";

const App: React.FC = () => {
  const { action: { test } } = React.useContext(CurrencyContext)

  React.useEffect(() => {
    test();
  }, [])

  return (
    <>
      <Painel />
    </>

  );
};

export default App;
