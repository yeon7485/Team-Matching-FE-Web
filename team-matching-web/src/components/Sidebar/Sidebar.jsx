import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { myTeamState } from '../../Recoil/state';

export default function Sidebar() {
  const myTeam = useRecoilValue(myTeamState);
  const nav = useNavigate();
  return (
    <div>
      <aside className={styles.sidebar}>
        <ul className={styles.list}>
          <li
            className={styles.listItem}
            onClick={() => {
              nav(`/myteam/${myTeam.teamId}/board`);
            }}
          >
            게시판
          </li>
          <li
            className={styles.listItem}
            onClick={() => {
              nav(`/myteam/${myTeam.teamId}/info`);
            }}
          >
            팀 정보
          </li>
          <li
            className={styles.listItem}
            onClick={() => {
              nav(`/myteam/${myTeam.teamId}/leave`);
            }}
          >
            팀 탈퇴
          </li>
        </ul>
      </aside>
    </div>
  );
}
