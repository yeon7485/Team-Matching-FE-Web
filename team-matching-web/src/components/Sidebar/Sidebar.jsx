import React from 'react';
import styles from './Sidebar.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { myTeamState } from 'Recoil/state';
import classNames from 'classnames/bind';

export default function Sidebar() {
  const { team: myTeam, admin } = useRecoilValue(myTeamState);
  const nav = useNavigate();
  const location = useLocation().pathname;
  const cn = classNames.bind(styles);
  console.log(admin);

  return (
    <div>
      <aside className={styles.sidebar}>
        <ul className={styles.list}>
          <li
            className={cn(
              'listItem',
              location === `/myteam/${myTeam.id}/info` && 'paint'
            )}
            onClick={() => {
              nav(`/myteam/${myTeam.id}/info`, { replace: true });
            }}
          >
            팀 정보
          </li>
          <li
            className={cn(
              'listItem',
              location === `/myteam/${myTeam.id}/leave` && 'paint'
            )}
            onClick={() => {
              nav(`/myteam/${myTeam.id}/leave`, { replace: true });
            }}
          >
            {admin ? '팀 삭제' : '팀 탈퇴'}
          </li>
        </ul>
      </aside>
    </div>
  );
}
