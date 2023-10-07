import React, { useEffect, useState } from 'react';
import styles from './ApprovalModal.module.css';
import Loading from '../ui/Loading/Loading';
import RoundBtn from '../ui/RoundBtn/RoundBtn';
import { approvalApply, getApplyDetail } from '../../API/TeamMon';
import { AiOutlineClose } from 'react-icons/ai';
import { rejectApply } from '../../API/TeamMon';

export default function ApprovalModal({
  setModalOpen,
  teamId,
  applyId,
  token,
}) {
  const [loading, setLoading] = useState(false);
  const [applyDetail, setApplyDetail] = useState({});

  useEffect(() => {
    setLoading(true);
    getApplyDetail(teamId, applyId, token)
      .then((result) => {
        console.log(result);
        setApplyDetail({
          nickname: result.userAccountDto.nickname,
          userId: result.userAccountDto.userId,
          application: result.application,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };

  const onApprovalClick = () => {
    approvalApply(teamId, applyDetail.userId, token).then((result) => {
      console.log(result);
      closeModal();
    });
  };

  const onRejectClick = () => {
    if (window.confirm('팀 가입 신청을 거절하시겠습니까?') === true) {
      rejectApply(teamId, applyDetail.userId, token).then((result) => {
        console.log(result);
        closeModal();
      });
    }
  };

  if (loading) return <Loading />;
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.title}>
          {applyDetail.nickname}
          <span>{`(${applyDetail.userId})`}</span>
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
