import React, { useState } from 'react';
import styles from './ApplyList.module.css';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'Recoil/state';
import { getApplyList } from 'api/TeamMon';
import ApprovalModal from 'components/ApprovalModal/ApprovalModal';
import Profile from 'components/Profile/Profile';
import Loading from 'ui/Loading/Loading';
import NotFound from '../NotFound/NotFound';

export default function ApplyList() {
  const {
    state: {
      team: { id },
    },
  } = useLocation();

  const [totalElements, setTotalElements] = useState(null);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [applyId, setApplyId] = useState(null);

  const user = useRecoilValue(userState);

  const {
    isLoading,
    error,
    data: applyList,
  } = useQuery(['applyList', id], async () => {
    return getApplyList(id, user.token).then((data) => {
      setTotalElements(data.totalElements);
      return data.content;
    });
  });

  const handleClick = (applyId) => {
    setApplyId(applyId);
    setApprovalModalOpen(true);
  };

  if (isLoading) return <Loading />;
  if (error) return <NotFound />;
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>가입 신청 목록</h1>
        {applyList && <p className={styles.total}>[{totalElements}]</p>}
      </div>
      {applyList && totalElements > 0 && (
        <section className={styles.items}>
          {applyList.map((apply) => (
            <Profile
              key={apply.id}
              nickname={apply.userAccountDto.nickname}
              userId={apply.userAccountDto.userId}
              memo={apply.userAccountDto.memo}
              onClick={() => {
                handleClick(apply.id);
              }}
            />
          ))}
        </section>
      )}
      {approvalModalOpen && (
        <ApprovalModal
          setModalOpen={setApprovalModalOpen}
          teamId={id}
          applyId={applyId}
          token={user.token}
        />
      )}
      {applyList && totalElements === 0 && (
        <section className={styles.noItems}>
          <p>신청자가 없습니다.</p>
        </section>
      )}
    </div>
  );
}
