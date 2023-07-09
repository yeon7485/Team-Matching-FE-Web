import React from 'react';
import styles from './Post.module.css';
export default function Post({ post: { num, title, tag, name, date } }) {
  return (
    <li className={styles.postLi}>
      <div className={styles.item}>{num}</div>
      <div className={styles.item}>
        {title}
        {num && `[${num}]`}
      </div>
      <div className={styles.item}>{tag}</div>
      <div className={styles.item}>{name}</div>
      <div className={styles.item}>{date}</div>
    </li>
  );
}
