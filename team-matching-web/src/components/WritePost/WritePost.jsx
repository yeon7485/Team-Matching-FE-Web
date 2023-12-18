import React, { useEffect, useState } from 'react';
import styles from './WritePost.module.css';
import { useRecoilValue } from 'recoil';
import { userState } from 'Recoil/state';
import { getMyPosts } from 'api/TeamMon';
import Post from '../Post/Post';

export default function WritePost() {
  const user = useRecoilValue(userState);
  const [myPost, setMyPost] = useState();
  useEffect(() => {
    getMyPosts(user.userId, user.token).then((result) => {
      result.map((result) => (result.userAccountDto = null));
      setMyPost(result);
    });
  }, []);

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
          {myPost &&
            myPost.map((myPost) => <Post key={myPost.id} post={myPost} />)}
        </ul>
      </div>
    </>
  );
}
