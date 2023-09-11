import React from 'react';
import styles from './WriteComment.module.css';
export default function WriteComment() {
  return (
    <>
      <h3>작성한 댓글</h3>
      <hr />
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.item}>댓글</div>
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
