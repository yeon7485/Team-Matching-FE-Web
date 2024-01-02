import React, { useState } from 'react';
import styles from './TeamAct.module.css';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMyTeamList } from 'api/TeamMon';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { myTeamState, userState } from 'Recoil/state';
import TeamItem from '../TeamItem/TeamItem';
import Loading from 'ui/Loading/Loading';
import NotFound from 'pages/NotFound/NotFound';
import Paging from 'ui/Paging/Paging';

export default function TeamAct() {
  const { userId, token } = useRecoilValue(userState);
  const [page, setPage] = useState(1);
  const [totalTeams, setTotalTeams] = useState(0);
  const setMyTeam = useSetRecoilState(myTeamState);

  const {
    isLoading,
    error,
    data: teamList,
  } = useQuery(
    ['getMyTeamList', userId, page - 1],
    () => {
      return getMyTeamList(userId, token, page - 1).then((data) => {
        setTotalTeams(data.totalElements);
        return data.content;
      });
    },
    { enabled: !!userId }
  );
  const nav = useNavigate();

  const handleClick = (team) => {
    setMyTeam({
      teamId: team.id,
      admin: team.adminUserAccountDto.userId,
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
        {totalTeams === 0 && <p>현재 참여 중인 팀이 없습니다.</p>}
        {totalTeams > 0 && (
          <header className={styles.header}>
            <div className={styles.item}>카테고리</div>
            <div className={styles.item}>팀이름</div>
            <div className={styles.item}>태그</div>
            <div className={styles.item}>인원</div>
          </header>
        )}
        <ul className={styles.ul}>
          {teamList &&
            teamList.map((team) => (
              <TeamItem
                key={team.id}
                teamData={team}
                type={'act'}
                onClick={() => {
                  handleClick(team);
                }}
              />
            ))}
        </ul>
        {totalTeams > 0 && (
          <Paging
            page={page}
            totalElements={totalTeams}
            size={10}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
}
