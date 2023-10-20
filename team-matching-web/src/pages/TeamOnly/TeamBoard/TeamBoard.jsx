import React, { useEffect, useState } from 'react';
import styles from './TeamBoard.module.css';
import Post from '../../../components/Post/Post';
import RoundBtn from '../../../components/ui/RoundBtn/RoundBtn';
import { useNavigate } from 'react-router-dom';

export default function TeamBoard() {
  const [myPost, setMyPost] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    fetch('/data/posts.json')
      .then((res) => res.json())
      .then((data) => setMyPost(data.posts));
  }, []);

  const handleClick = (postId) => {
    nav(`${postId}`, { state: { postId } });
  };

  const onWritePostClick = () => {
    nav(`new`);
  };
  return (
    <div className={styles.root}>
      <div className={styles.postList}>
        <header className={styles.header}>
          <div className={styles.item}>번호</div>
          <div className={styles.item}>제목</div>
          <div className={styles.item}>작성자</div>
          <div className={styles.item}>날짜</div>
        </header>
        <ul className={styles.ul}>
          {myPost &&
            myPost.map((myPost) => (
              <Post
                key={myPost.id}
                post={myPost}
                teamOnly
                onClick={() => {
                  handleClick(myPost.id);
                }}
              />
            ))}
        </ul>
      </div>
      <div className={styles.btnArea}>
        <RoundBtn
          type={'button'}
          text={'글쓰기'}
          fill={false}
          onClick={onWritePostClick}
        />
      </div>
    </div>
  );
}
