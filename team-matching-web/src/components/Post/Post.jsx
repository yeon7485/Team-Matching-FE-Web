import React from 'react';
import styles from './Post.module.css';
import { useNavigate } from 'react-router-dom';
export default function Post({
  post,
  post: { id, title, hashtag, createdAt, commentsCount },
}) {
  const navigate = useNavigate();
  let today = new Date();
  let year = String(today.getFullYear());
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let date = String(today.getDate()).padStart(2, '0');
  let today_date = year + '-' + month + '-' + date;
  return (
    <li
      className={styles.postLi}
      onClick={() => {
        navigate(`/board/${id}`, { state: { post } });
      }}
    >
      <div className={styles.item}>{id}</div>
      <div className={styles.item}>
        {title}
        <span className={styles.commentsCount}>
          {commentsCount !== 0 && `[${commentsCount}]`}
        </span>
      </div>
      <div className={styles.item}>{hashtag}</div>

      {post.userAccountDto && (
        <div className={styles.item}>{post.userAccountDto.nickname}</div>
      )}

      <div className={styles.item}>
        {(today_date == createdAt.substr(0, 10) && createdAt.substr(11, 5)) ||
          createdAt.substr(0, 10)}
      </div>
    </li>
  );
}
