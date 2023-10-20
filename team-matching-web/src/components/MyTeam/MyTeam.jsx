import React from 'react';
import styles from './MyTeam.module.css';
import useCategory from '../../hooks/useCategory';

export default function MyTeam({
  teamData: { name, category, hashtag, capacity, total },
}) {
  return (
    <li className={styles.teamLi}>
      <div className={styles.item}>{useCategory(category)}</div>
      <div className={styles.item}>{name}</div>
      <div className={styles.item}>#{hashtag}</div>
      <div className={styles.item}>{`${total}/${capacity}`}</div>
    </li>
  );
}
