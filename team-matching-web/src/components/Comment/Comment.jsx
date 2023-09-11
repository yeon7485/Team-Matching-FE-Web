import React from 'react';
import styles from './Comment.module.css';
export default function Comment({ comment }) {
  return (
    <li className={styles.list}>
      <section className={styles.comment}>
        <div className={styles.header}>
          <span className={styles.nickname}>
            {comment.userAccountDto.nickname}
          </span>
          <span className={styles.date}>{comment.modifiedAt}</span>
        </div>
        <article className={styles.content}>{comment.content}</article>
      </section>
      <hr />
    </li>
  );
}
