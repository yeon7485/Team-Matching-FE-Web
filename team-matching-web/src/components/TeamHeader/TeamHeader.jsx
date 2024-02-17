import React from 'react';
import styles from './TeamHeader.module.css';
import { myTeamState } from 'Recoil/state';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

export default function TeamHeader() {
  const myTeam = useRecoilValue(myTeamState);
  const teamId = myTeam.teamId;
  const nav = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <p className={styles.name}>{myTeam && myTeam.teamName}</p>
        <p
          className={styles.goDetail}
          onClick={() => {
            nav(`/teams/${teamId}`, { state: { teamId } });
          }}
        >
          팀 상세글 바로 가기
        </p>
      </div>

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
