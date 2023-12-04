import React from 'react';
import styles from './Profile.module.css';

export default function Profile({ nickname, userId, memo, onClick }) {
  return (
    <div className={styles.container} onClick={onClick}>
      <p className={styles.nickname}>
        {nickname} <span>({userId})</span>
      </p>
      <p className={styles.memo}>{memo}</p>
    </div>
  );
}
