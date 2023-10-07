import React, { useState } from 'react';
import styles from './TeamOnly.module.css';

export default function TeamOnly() {
  const [index, setIndex] = useState('TeamBoard');
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>
          <p className={styles.name}>team name</p>
          <p className={styles.hashtag}>#hashtag</p>
        </div>
        <p className={styles.dday}>D-14</p>
      </div>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <ul className={styles.list}>
            <li
              className={styles.listItem}
              onClick={() => {
                setIndex('TeamBoard');
              }}
            >
              게시판
            </li>
            <li
              className={styles.listItem}
              onClick={() => {
                setIndex('TeamInfo');
              }}
            >
              팀 정보
            </li>
            <li
              className={styles.listItem}
              onClick={() => {
                setIndex('LeaveTeam');
              }}
            >
              팀 탈퇴
            </li>
          </ul>
        </aside>
        <section className={styles.contents}>
          {index === 'TeamBoard' && <p>TeamBoard</p>}
          {index === 'TeamInfo' && <p>TeamInfo</p>}
          {index === 'LeaveTeam' && <p>LeaveTeam</p>}
        </section>
      </div>
    </div>
  );
}
