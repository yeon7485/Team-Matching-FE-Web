import React from 'react';
import styles from './RoundBtn.module.css';

export default function WhiteBtn({ type, text, fill, onClick }) {
  const style = fill ? styles.fill : styles.white;
  return (
    <button type={type} className={`${styles.btn} ${style}`} onClick={onClick}>
      {text}
    </button>
  );
}
