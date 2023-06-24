import React from 'react';
import styles from './Button.module.css';

export default function Button({ text, fill }) {
  const style = fill ? styles.fill : styles.outline;
  return <button className={`${styles.btn} ${style}`}>{text}</button>;
}
