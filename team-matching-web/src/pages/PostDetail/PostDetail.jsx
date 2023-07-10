import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './PostDetail.module.css';
export default function PostDetail() {
  const {
    state: {
      post: { num, title, tag, name, date, content },
    },
  } = useLocation();
  return (
    <div className={styles.root}>
      <div className={styles.titleHeader}>
        <h1 className={styles.title}>자유게시판</h1>
        <Link className={styles.boardLink} to='/board'>
          목록
        </Link>
      </div>
      <div className={styles.titleBox}>
        <span>{title}</span>
      </div>
      <div className={styles.infoBox}>
        <span className={styles.name}>{name}</span>
        <span className={styles.date}>{date}</span>
      </div>
      <article className={styles.post}>
        <div className={styles.content}>{content}</div>
        <div className={styles.tag}>{tag}</div>
      </article>
      <section className={styles.comment}>
        <div className={styles.commentHeader}>댓글</div>
        <ul>
          <li>닉네임1 응 안해</li>
          <li>닉네임1 응 안해</li>
          <li>닉네임1 응 안해</li>
          <li>닉네임1 응 안해</li>
        </ul>
        <div className={styles.newComment}>
          <form className={styles.form}>
            <input
              type='text'
              className={styles.commentInput}
              placeholder='댓글을 입력해주세요....'
            />
            <button className={styles.submitBtn}>등록</button>
          </form>
        </div>
      </section>
    </div>
  );
}
