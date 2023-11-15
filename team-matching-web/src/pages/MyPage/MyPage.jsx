import React, { useState } from 'react';
import styles from './MyPage.module.css';
import MyInfo from '../../components/MyInfo/MyInfo';
import WritePost from '../../components/WritePost/WritePost';
import WriteComment from './../../components/WriteComment/WriteComment';
import TeamAct from '../../components/TeamAct/TeamAct';
export default function MyPage() {
  const [index, setIndex] = useState('MyInfo');
  return (
    <div className={styles.root}>
      <aside className={styles.sidebar}>
        <ul>
          <li className={styles.list}>
            <span
              className={styles.item}
              onClick={() => {
                setIndex('MyInfo');
              }}
            >
              내 정보 관리
            </span>
          </li>
          <li className={styles.list}>
            <span
              className={styles.item}
              onClick={() => {
                setIndex('WritePost');
              }}
            >
              작성한 글
            </span>
          </li>
          <li className={styles.list}>
            <span
              className={styles.item}
              onClick={() => {
                setIndex('WriteComment');
              }}
            >
              작성한 댓글
            </span>
          </li>
          <li className={styles.list}>
            <span
              className={styles.item}
              onClick={() => {
                setIndex('TeamAct');
              }}
            >
              참여 중인 팀
            </span>
          </li>
        </ul>
      </aside>
      <section className={styles.content}>
        {index === 'MyInfo' && <MyInfo />}
        {index === 'WritePost' && <WritePost />}
        {index === 'WriteComment' && <WriteComment />}
        {index === 'TeamAct' && <TeamAct />}
      </section>
    </div>
  );
}
