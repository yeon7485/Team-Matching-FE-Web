import React from 'react';
import styles from './Post.module.css';
import { useNavigate } from 'react-router-dom';
export default function Post({ post, post: { num, title, tag, name, date } }) {
  const navigate = useNavigate();
  return (
    <li
      className={styles.postLi}
      onClick={() => {
        navigate(`/board/${num}`, { state: { post } });
      }}
    >
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
