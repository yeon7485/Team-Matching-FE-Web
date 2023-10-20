import React from 'react';
import styles from './Post.module.css';
import { useNavigate } from 'react-router-dom';
export default function Post({
  post,
  teamOnly,
  onClick,
  post: { id, title, hashtag, createdAt, commentsCount },
}) {
  const navigate = useNavigate();

  return (
    <li
      className={styles.postLi}
      onClick={
        teamOnly
          ? onClick
          : () => {
              navigate(`/board/${id}`, { state: { post } });
            }
      }
    >
      <div className={styles.item}>{id}</div>
      <div className={styles.item}>
        {title}
        <span className={styles.commentsCount}>
          {commentsCount !== 0 && `[${commentsCount}]`}
        </span>
      </div>
      {!teamOnly && <div className={styles.item}>{hashtag}</div>}

      {post.userAccountDto && (
        <div className={styles.item}>{post.userAccountDto.nickname}</div>
      )}

      <div className={styles.item}>{createdAt}</div>
    </li>
  );
}
