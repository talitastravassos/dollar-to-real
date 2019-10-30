import React from "react";
import { CurrencyContext } from "./context/CurrencyContext";
import "./App.css";
import InputValue from "./components/InputValue";

const App: React.FC = () => {
  const { action: { test}} = React.useContext(CurrencyContext)

  React.useEffect(() => {
    test();
  }, [])

  return (
    <div>
      <InputValue label={"Valor Solicitado"} withPrefix={true} prefix={"US$"}/>
    </div>

  );
};

export default App;
