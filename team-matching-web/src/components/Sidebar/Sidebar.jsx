import React from 'react';
import styles from './Sidebar.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { myTeamState } from 'Recoil/state';
import classNames from 'classnames/bind';

export default function Sidebar() {
  const myTeam = useRecoilValue(myTeamState);
  const nav = useNavigate();
  const location = useLocation().pathname;
  const cn = classNames.bind(styles);
  return (
    <div>
      <aside className={styles.sidebar}>
        <ul className={styles.list}>
          <li
            className={cn(
              'listItem',
              location === `/myteam/${myTeam.teamId}/info` && 'paint'
            )}
            onClick={() => {
              nav(`/myteam/${myTeam.teamId}/info`);
            }}
          >
            팀 정보
          </li>
          <li
            className={cn(
              'listItem',
              location === `/myteam/${myTeam.teamId}/leave` && 'paint'
            )}
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
