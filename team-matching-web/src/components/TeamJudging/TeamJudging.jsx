import React, { useState } from 'react';
import styles from './TeamJudging.module.css';
import { useRecoilValue } from 'recoil';
import { userState } from './../../Recoil/state';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getMyJudging, rejectApply } from '../../API/TeamMon';
import Loading from '../ui/Loading/Loading';
import NotFound from '../../pages/NotFound/NotFound';
import TeamItem from '../TeamItem/TeamItem';
import Paging from './../ui/Paging/Paging';

export default function TeamJudging() {
  const { userId, token } = useRecoilValue(userState);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const queryClient = useQueryClient();

  const {
    isSuccess,
    isLoading,
    error,
    data: apples,
  } = useQuery(['getMyJudging', page, userId], () => {
    return getMyJudging(userId, token).then((data) => {
      setTotalElements(data.totalElements);
      console.log(data);
      return data.content;
    });
  });

  const cancelApply = useMutation(
    ({ teamId, applyId, token }) => rejectApply(teamId, applyId, token),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['getMyJudging', 0, userId]),
    }
  );

  const nav = useNavigate();

  const handleClick = (team) => {
    nav(`/teams/${team.id}`);
  };

  const handleCancel = (teamId, applyId) => {
    if (window.confirm('가입 신청을 취소하시겠습니까?') === true) {
      cancelApply.mutate(
        { teamId, applyId, token },
        {
          onSuccess: (result) => {
            if (result.status === 200) alert('취소되었습니다.');
            else alert('오류가 발생했습니다. 다시 시도해주세요.');
          },
        }
      );
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <NotFound />;
  return (
    <>
      <h3>신청 중인 팀</h3>
      <hr />
      <div className={styles.content}>
        {totalElements > 0 && (
          <header className={styles.header}>
            <div className={styles.item}>카테고리</div>
            <div className={styles.item}>팀이름</div>
            <div className={styles.item}>태그</div>
            <div className={styles.item}>가입 신청</div>
          </header>
        )}
        {totalElements === 0 && <p>현재 신청 중인 팀이 없습니다.</p>}
        <ul className={styles.ul}>
          {isSuccess &&
            apples.map((apply) => (
              <TeamItem
                key={apply.teamSimpleResponse.id}
                teamData={apply.teamSimpleResponse}
                type={'judging'}
                handleCancel={() => {
                  handleCancel(apply.teamSimpleResponse.id, apply.id);
                }}
                onClick={() => {
                  handleClick(apply.teamSimpleResponse);
                }}
              />
            ))}
        </ul>

        {totalElements > 0 && (
          <Paging
            page={page + 1}
            totalElements={totalElements}
            size={10}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
}
