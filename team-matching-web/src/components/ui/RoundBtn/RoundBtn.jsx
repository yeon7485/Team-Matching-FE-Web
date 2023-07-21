import React from 'react';
import styles from './RoundBtn.module.css';

export default function WhiteBtn({ text, fill, onClick }) {
  const style = fill ? styles.fill : styles.white;
  return (
    <button className={`${styles.btn} ${style}`} onClick={onClick}>
      {text}
    </button>
  );
}
