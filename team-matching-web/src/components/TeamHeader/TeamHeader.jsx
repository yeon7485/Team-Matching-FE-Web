import React from 'react';
import styles from './TeamHeader.module.css';
import { myTeamState, userState } from '../../Recoil/state';
import { useRecoilValue } from 'recoil';

export default function TeamHeader() {
  const myTeam = useRecoilValue(myTeamState);
  const user = useRecoilValue(userState);

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <p className={styles.name}>team name</p>
        <p className={styles.hashtag}>#hashtag</p>
      </div>
      <p className={styles.Dday}>D-14</p>
    </div>
  );
}
