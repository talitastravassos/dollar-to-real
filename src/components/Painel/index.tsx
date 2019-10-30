import React from "react";
import InputValue from "../InputValue";
import { formatPrice, numberMask } from "../../utils/masks";

export default function Painel() {

    const onChange = (name: string, value: string) => {
        console.log(name, value)
        //toNumber(value) * 100
    }

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <InputValue label={"Valor Solicitado"} withPrefix prefix={"$"} mask={formatPrice} onChange={onChange} name={"value"}/>
            <InputValue label={"Taxa do Estado (%)"} withPrefix={false} onChange={onChange} name={'tax'} mask={numberMask}/>
        </div>
    );
}
