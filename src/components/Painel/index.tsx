import React from "react";
import InputValue from "../InputValue";
import { formatPrice, numberMask } from "../../utils/masks";
import styles from './styles.module.scss'

export default function Painel() {

    const onChange = (name: string, value: string) => {
        console.log(name, value)
        //toNumber(value) * 100
    }

    return (
        <div className={styles.container}>
            <div className={styles.input_container}>
                <InputValue label={"Valor Solicitado"} withPrefix prefix={"$"} mask={formatPrice} onChange={onChange} name={"value"}/>
                <InputValue label={"Taxa do Estado (%)"} withPrefix={false} onChange={onChange} name={'tax'} mask={numberMask}/>
            </div>
            <div className={styles.info_container}>
                <p>cotaçao do dia: R$ 4,00</p>
            </div>
        </div>
    );
}
