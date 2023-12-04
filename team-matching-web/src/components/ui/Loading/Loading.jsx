import React from 'react';
import { SyncLoader } from 'react-spinners';
import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <h3 className={styles.text}>잠시만 기다려주세요.</h3>
      <SyncLoader size='10px' color='#7373DE' />
    </div>
  );
}
