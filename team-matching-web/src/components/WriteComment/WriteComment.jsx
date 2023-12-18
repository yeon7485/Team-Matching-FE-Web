import React, { useEffect, useState } from 'react';
import styles from './WriteComment.module.css';
import { useRecoilValue } from 'recoil';
import { userState } from 'Recoil/state';
import { getMyComments } from 'api/TeamMon';
import MyComment from '../MyComment/MyComment';

export default function WriteComment() {
  const user = useRecoilValue(userState);
  const [myComments, setMyComments] = useState();

  useEffect(() => {
    getMyComments(user.userId, user.token).then((result) => {
      setMyComments(result);
    });
  }, []);
  return (
    <>
      <h3>작성한 댓글</h3>
      <hr />
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.item}>댓글</div>
        </header>
        <ul className={styles.ul}>
          {myComments &&
            myComments.map((myComments) => (
              <MyComment key={myComments.id} comment={myComments}></MyComment>
            ))}
        </ul>
      </div>
    </>
  );
}
