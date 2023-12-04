import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyTeamList } from '../../API/TeamMon';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { myTeamState, userState } from '../../Recoil/state';
import styles from './TeamAct.module.css';
import MyTeam from '../MyTeam/MyTeam';
import { useNavigate } from 'react-router-dom';
import Loading from './../ui/Loading/Loading';
import NotFound from './../../pages/NotFound/NotFound';
export default function TeamAct() {
  const user = useRecoilValue(userState);
  const setMyTeam = useSetRecoilState(myTeamState);
  const { isLoading, error, data } = useQuery(['getMyTeamList'], () => {
    return getMyTeamList(user.userId, user.token);
  });
  const nav = useNavigate();

  const handleClick = (team) => {
    setMyTeam({
      teamId: team.id,
      admin: user.userId,
      teamName: team.name,
      deadline: team.deadline,
    });
    nav(`/myteam/${team.id}/info`);
  };

  if (isLoading) return <Loading />;
  if (error) return <NotFound />;

  return (
    <>
      <h3>참여 중인 팀</h3>
      <hr />
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.item}>카테고리</div>
          <div className={styles.item}>팀이름</div>
          <div className={styles.item}>태그</div>
          <div className={styles.item}>인원</div>
        </header>
        <ul className={styles.ul}>
          {data &&
            data.content.map((data) => (
              <MyTeam
                key={data.id}
                teamData={data}
                onClick={() => {
                  handleClick(data);
                }}
              />
            ))}
        </ul>
      </div>
    </>
  );
}
