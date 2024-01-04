import React from 'react';
import styles from './MyComment.module.css';
import { useNavigate } from 'react-router-dom';
export default function MyComment({ comment, comment: { postDto } }) {
  const nav = useNavigate();
  const post = postDto;
  console.log(post);
  return (
    <li
      className={styles.list}
      onClick={() => {
        nav(`/board/${comment.id}`, { state: { post } });
      }}
    >
      <p className={styles.content}>{comment.content}</p>
      <p className={styles.date}>{comment.createdAt}</p>
      <p className={styles.postData}>
        {comment.postDto.title}
        <span
          className={styles.commentsCount}
        >{`[${post.commentDtos.length}]`}</span>
      </p>
    </li>
  );
}
