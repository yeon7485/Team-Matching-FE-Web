import React from 'react';
import styles from './ChangePwModal.module.css';
export default function ChangePwModal({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <span>비밀번호 변경</span>
        <button onClick={closeModal} className={styles.closeBtn}>
          X
        </button>
      </header>
      <form className={styles.form}>
        <label htmlFor='nowPw'>현재 비밀번호</label>
        <input
          type='password'
          name='nowPw'
          className={styles.inputBox}
          placeholder='비밀번호를 입력해주세요.'
        />
        <span>비밀번호를 잊으셨나요? 비밀번호 재설정</span>
        <label htmlFor='newPw'>새로운 비밀번호</label>
        <input
          type='password'
          name='newPw'
          className={styles.inputBox}
          placeholder='비밀번호를 입력해주세요.'
        />
        <label htmlFor='newPw2'>비밀번호 확인</label>
        <input
          type='password'
          name='newPw2'
          className={styles.inputBox}
          placeholder='비밀번호를 입력해주세요.'
        />
        <button className={styles.saveBtn}>저장</button>
      </form>
    </div>
  );
}
