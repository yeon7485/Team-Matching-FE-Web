import React, { useState } from 'react';
import styles from './TeamInfo.module.css';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { myTeamState } from 'Recoil/state';
import { useRecoilValue } from 'recoil';
import { getTeamDetail } from 'api/TeamMon';
import useCategory from 'hooks/useCategory';
import RoundBtn from 'ui/RoundBtn/RoundBtn';
import Loading from 'ui/Loading/Loading';
import NotFound from 'pages/NotFound/NotFound';

export default function TeamInfo() {
  const { team: myTeam, admin } = useRecoilValue(myTeamState);
  const [category, setCategory] = useState('');

  const nav = useNavigate();

  const {
    isLoading,
    error,
    data: team,
  } = useQuery(['teamDetail', myTeam.id], () => {
    return getTeamDetail(myTeam.id).then((data) => {
      setCategory(data.category);
      return data;
    });
  });

  const cat = useCategory(category);

  if (isLoading) return <Loading />;
  if (error) return <NotFound />;
  return (
    <div className={styles.root}>
      <div className={styles.mainBox}>
        <div className={styles.infoBox}>
          <p className={styles.subTitle}>팀 이름</p>
          <p>{team && team.name}</p>

          <p className={styles.subTitle}>카테고리</p>
          <p>{team && cat}</p>

          <p className={styles.subTitle}>태그</p>
          <p>{team && `#${team.hashtag}`}</p>

          <p className={styles.subTitle}>마감일</p>
          <p>{team && formatDate(team.deadline)}</p>

          <p className={styles.subTitle}>팀 생성일</p>
          <p>{team && formatDate(team.createdAt)}</p>
        </div>
        <div className={styles.infoBox}>
          <p className={styles.subTitle}>팀원</p>
          <p>{`${team.total}명`}</p>
          <p className={styles.subTitle}>팀 관리자</p>

          <p>
            {team && team.adminUserAccountDto.nickname}
            <span className={styles.userId}>
              {team && `  (${team.adminUserAccountDto.userId})`}
            </span>
          </p>
        </div>
      </div>
      {admin && (
        <div className={styles.saveBox}>
          <RoundBtn
            type={'button'}
            text='수정'
            fill
            onClick={() => {
              nav(`/teams/new`, { state: { team, myTeam } });
            }}
          />
        </div>
      )}
    </div>
  );
}

function formatDate(date) {
  const newDate = new Date(date);
  let year = newDate.getFullYear();
  let month = ('0' + (newDate.getMonth() + 1)).slice(-2);
  let day = ('0' + newDate.getDate()).slice(-2);
  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
  let week = WEEKDAY[newDate.getDay()];

  return `${year}.${month}.${day} (${week})`;
}
