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
  const [totalTeams, setTotalTeams] = useState(-1);
  const setMyTeam = useSetRecoilState(myTeamState);

  const {
    isLoading,
    error,
    data: teamList,
  } = useQuery(
    ['getMyTeamList', userId, page - 1],
    () => {
      return getMyTeamList(userId, token, page - 1, 10).then((data) => {
        const list = data.content.filter((team) => {
          if (new Date(team.deadline) >= new Date()) return team;
        });
        setTotalTeams(list.length);
        console.log(list);
        return list;
      });
    },
    { enabled: !!userId }
  );
  const nav = useNavigate();

  const handleClick = (team) => {
    setMyTeam({
      teamId: team.id,
    });
    nav(`/myteam/${team.id}/info`);
  };
  console.log(totalTeams);
  if (isLoading || totalTeams === -1) return <Loading />;
  if (error) return <NotFound />;

  return (
    <div className={styles.container}>
      <h3 className={styles.index}>참여 중인 팀</h3>
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
            teamList.map((team) => {
              return (
                <TeamItem
                  key={team.id}
                  teamData={team}
                  type={'act'}
                  onClick={() => {
                    handleClick(team);
                  }}
                />
              );
            })}
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
    </div>
  );
}
