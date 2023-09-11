<<<<<<< HEAD
import React from 'react';
import styles from './ChangeNickNameModal.module.css';
export default function ChangeNickNameModal({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };
=======
import React, { useState } from 'react';
import styles from './ChangeNickNameModal.module.css';
import { userState } from '../../Recoil/state';
import { useRecoilValue } from 'recoil';
import { upDateMyPageInfo } from '../../API/TeamMon';
export default function ChangeNickNameModal({
  setModalOpen,
  userInfo,
  setUserInfo,
}) {
  const user = useRecoilValue(userState);

  const closeModal = () => {
    setModalOpen(false);
  };
  const [fixName, setFixName] = useState();
  console.log(fixName);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserInfo({ ...userInfo, nickname: fixName });
    upDateMyPageInfo(
      user.userId,
      user.token,
      fixName,
      userInfo.email,
      userInfo.memo
    );
    alert('변경되었습니다.');
    closeModal();
  };
>>>>>>> main
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <span>닉네임 변경</span>
        <button onClick={closeModal} className={styles.closeBtn}>
          X
        </button>
      </header>
<<<<<<< HEAD
      <form className={styles.form}>
=======
      <form className={styles.form} onSubmit={handleSubmit}>
>>>>>>> main
        <label htmlFor='changeNn'>변경할 닉네임</label>
        <input
          type='text'
          name='chageNn'
          className={styles.inputBox}
<<<<<<< HEAD
=======
          value={fixName}
          onChange={(e) => [setFixName(e.target.value)]}
>>>>>>> main
          placeholder='변경할 닉네임을 입력해주세요.'
        />
        <button className={styles.saveBtn}>저장</button>
      </form>
    </div>
  );
}
