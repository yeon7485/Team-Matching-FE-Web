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
          <span className={styles.date}>{formatDate(comment.modifiedAt)}</span>
        </div>
        <article className={styles.content}>{comment.content}</article>
      </section>
    </li>
  );
}

function formatDate(date) {
  return `${date.substr(2, 2)}.${date.substr(5, 2)}.${date.substr(8, 2)} 
  ${date.substr(11, 5)}`;
}
