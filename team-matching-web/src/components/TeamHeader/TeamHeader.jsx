import React, { useState } from 'react';
import styles from './TeamHeader.module.css';
import { myTeamState, userState } from '../../Recoil/state';
import { useRecoilValue } from 'recoil';

export default function TeamHeader() {
  const myTeam = useRecoilValue(myTeamState);
  const user = useRecoilValue(userState);

  console.log(myTeam.deadline);
  console.log(getDday(myTeam.deadline));

  return (
    <div className={styles.header}>
      <p className={styles.name}>{myTeam && myTeam.teamName}</p>
      <p className={styles.Dday}>{myTeam && `D-${getDday(myTeam.deadline)}`}</p>
    </div>
  );
}

function getDday(date) {
  const setDate = new Date(date);
  const now = new Date();
  const dis = setDate.getTime() - now.getTime();
  const min1 = 1000 * 60;
  const h = Math.floor(dis / (min1 * 60 * 24));
  return h;
}
