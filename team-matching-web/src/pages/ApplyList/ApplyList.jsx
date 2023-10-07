import React, { useEffect, useState } from 'react';
import styles from './ApplyList.module.css';
import Profile from '../../components/Profile/Profile';
import { useRecoilValue } from 'recoil';
import { userState } from '../../Recoil/state';
import { getApplyList } from '../../API/TeamMon';
import { useLocation } from 'react-router-dom';
import ApprovalModal from '../../components/ApprovalModal/ApprovalModal';

export default function ApplyList() {
  const {
    state: {
      team: { id },
    },
  } = useLocation();
  const [applyList, setApplyList] = useState([]);
  const [totalElements, setTotalElements] = useState(null);
  const [loading, setLoading] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [applyId, setApplyId] = useState(null);
  const data = [
    {
      id: 0,
      nickname: '닉네임',
      userId: '아이디',
      memo: '마이페이지에서 등록한 자기소개가 여기에 표시돼요!',
    },
    {
      id: 1,
      nickname: '닉네임',
      userId: '아이디',
      memo: '마이페이지에서 등록한 자기소개가 여기에 표시돼요!',
    },
    {
      id: 2,
      nickname: '닉네임',
      userId: '아이디',
      memo: '마이페이지에서 등록한 자기소개가 여기에 표시돼요!',
    },
    {
      id: 3,
      nickname: '닉네임',
      userId: '아이디',
      memo: '마이페이지에서 등록한 자기소개가 여기에 표시돼요!',
    },
    {
      id: 4,
      nickname: '닉네임',
      userId: '아이디',
      memo: '마이페이지에서 등록한 자기소개가 여기에 표시돼요!',
    },
  ];

  const user = useRecoilValue(userState);

  useEffect(() => {
    setLoading(true);
    getApplyList(id, user.token)
      .then((result) => {
        setApplyList(result.content);
        setTotalElements(result.totalElements);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);
  console.log(applyList);

  const handleClick = (params, e) => {
    setApplyId(params);
    setApprovalModalOpen(true);
  };

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
              onClick={(e) => {
                handleClick(apply.id, e);
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
