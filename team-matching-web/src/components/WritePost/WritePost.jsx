import React from 'react';
import styles from './WritePost.module.css';
export default function WritePost() {
  return (
    <>
      <h3>작성한 글</h3>
      <hr />
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.item}>번호</div>
          <div className={styles.item}>제목</div>
          <div className={styles.item}>태그</div>
          <div className={styles.item}>날짜</div>
        </header>
        <ul className={styles.ul}>
          <li>나중에 추가 할 것</li>
          <li>나중에 추가 할 것</li>
          <li>나중에 추가 할 것</li>
        </ul>
      </div>
    </>
  );
}
