import React from 'react';
import styles from './ChangeNickNameModal.module.css';
export default function ChangeNickNameModal({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <span>닉네임 변경</span>
        <button onClick={closeModal} className={styles.closeBtn}>
          X
        </button>
      </header>
      <form className={styles.form}>
        <label htmlFor='changeNn'>변경할 닉네임</label>
        <input
          type='text'
          name='chageNn'
          className={styles.inputBox}
          placeholder='변경할 닉네임을 입력해주세요.'
        />
        <button className={styles.saveBtn}>저장</button>
      </form>
    </div>
  );
}
