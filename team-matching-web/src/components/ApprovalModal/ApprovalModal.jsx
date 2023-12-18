import React, { useEffect, useState } from 'react';
import styles from './ApprovalModal.module.css';
import Loading from 'ui/Loading/Loading';
import RoundBtn from 'ui/RoundBtn/RoundBtn';
import { approvalApply, rejectApply, getApplyDetail } from 'api/TeamMon';
import { AiOutlineClose } from 'react-icons/ai';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import NotFound from 'pages/NotFound/NotFound';

export default function ApprovalModal({
  setModalOpen,
  teamId,
  applyId,
  token,
}) {
  const {
    isLoading,
    error,
    data: applyDetail,
  } = useQuery(['applyDetail', applyId], () => {
    return getApplyDetail(teamId, applyId, token).then((data) => {
      return data;
    });
  });

  const queryClient = useQueryClient();

  const approvalItem = useMutation(
    ({ teamId, applyId, token }) => approvalApply(teamId, applyId, token),
    {
      onSuccess: () => queryClient.invalidateQueries(['applyList', teamId]),
    }
  );

  const rejectItem = useMutation(
    ({ teamId, applyId, token }) => rejectApply(teamId, applyId, token),
    {
      onSuccess: () => queryClient.invalidateQueries(['applyList', teamId]),
    }
  );

  const closeModal = () => {
    window.location.reload();
    setModalOpen(false);
  };

  const onApprovalClick = () => {
    approvalItem.mutate(
      { teamId, applyId, token },
      {
        onSuccess: () => {
          alert('가입 신청이 승인되었습니다.');
          closeModal();
        },
      }
    );
  };

  const onRejectClick = () => {
    if (window.confirm('팀 가입 신청을 거절하시겠습니까?') === true) {
      rejectItem.mutate(
        { teamId, applyId, token },
        {
          onSuccess: (result) => {
            console.log(result.status);
            result.status === 200
              ? alert('가입 신청이 거절되었습니다.')
              : alert('오류가 발생했습니다. 다시 시도해주세요.');
            closeModal();
          },
        }
      );
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <NotFound />;
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.title}>
          {applyDetail && applyDetail.userAccountDto.nickname}
          <span>{`  (${applyDetail.userAccountDto.userId})`}</span>
        </p>
        <AiOutlineClose onClick={closeModal} className={styles.closeBtn} />
      </header>
      <div className={styles.message}>
        <p>가입 신청 메시지</p>
        <textarea
          name='message'
          wrap='hard'
          value={applyDetail.application}
          readOnly
          className={styles.textArea}
        />
      </div>
      <div className={styles.btnArea}>
        <RoundBtn type='button' text='거절' onClick={onRejectClick} />
        <div className={styles.space}></div>
        <RoundBtn type='button' text='수락' fill onClick={onApprovalClick} />
      </div>
    </div>
  );
}
