import React from "react";
import { CurrencyContext } from "./context/CurrencyContext";
import "./App.css";

const App: React.FC = () => {
  const { action: { test}} = React.useContext(CurrencyContext)

  React.useEffect(() => {
    test();
  }, [])

  return <></>;
};

export default App;
