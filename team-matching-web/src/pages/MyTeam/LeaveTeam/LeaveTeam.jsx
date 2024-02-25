import React, { useEffect, useState } from 'react';
import styles from './LeaveTeam.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { myTeamState, userState } from 'Recoil/state';
import { deleteTeam } from 'api/TeamMon';
import RoundBtn from 'ui/RoundBtn/RoundBtn';

export default function LeaveTeam() {
  const { team: myTeam, admin } = useRecoilValue(myTeamState);
  const teamId = myTeam.id;
  const { userId, userToken } = useRecoilValue(userState);
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const leaveTeam = useMutation(
    ({ teamId, userToken }) => deleteTeam(teamId, userToken),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['getMyTeamList', userId, 0]),
    }
  );

  const handleClick = () => {
    leaveTeam.mutate(
      { teamId, userToken },
      {
        onSuccess: () => {
          alert(`${admin ? '팀이 삭제되었습니다.' : '팀을 탈퇴하였습니다.'}`);
          nav('/mypage', { replace: true });
        },
      }
    );
  };
  return (
    <div className={styles.root}>
      {!admin && (
        <p className={styles.text}>
          팀을 탈퇴하시겠습니까? <br />팀 탈퇴 시 팀 전용 페이지에 접속할 수
          없으며, 내가 속한 팀에서 삭제됩니다.
        </p>
      )}
      {admin && (
        <p className={styles.text}>
          팀을 삭제하시겠습니까? <br />팀 삭제 시 팀 전용 페이지가 삭제되며 참여
          중인 팀원들의 게시글, 참여 기록 등이 모두 삭제됩니다.
        </p>
      )}
      <RoundBtn
        type={'button'}
        text={admin ? '팀 삭제' : '팀 탈퇴'}
        fill
        onClick={handleClick}
      />
    </div>
  );
}
