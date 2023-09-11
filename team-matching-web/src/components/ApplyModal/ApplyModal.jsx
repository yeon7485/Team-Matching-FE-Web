import React, { useState } from 'react';
import styles from './ApplyModal.module.css';
export default function ApplyModal({ setModalOpen }) {
  const [message, setMessage] = useState();
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>신청하기</span>
        <button onClick={closeModal} className={styles.closeBtn}>
          X
        </button>
      </header>
      <form className={styles.form}>
        <label htmlFor='nowPw'>가입 신청 메시지</label>
        <textarea
          name='contents'
          wrap='hard'
          placeholder='메시지를 입력해주세요.'
          required
          onChange={handleChange}
          className={styles.textArea}
        />
        <button className={styles.saveBtn}>저장</button>
      </form>
    </div>
  );
}
