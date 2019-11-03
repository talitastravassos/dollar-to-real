import React from 'react'
import styles from "./styles.module.scss";

interface Props {
    image: string;
  }

// icon component for render a image svg or png
export default function Icon({image}: Props) {
    return (
        <div className={styles.image_container}>
            <img src={image} alt="icon" className={styles.image}/>
        </div>
    )
}
