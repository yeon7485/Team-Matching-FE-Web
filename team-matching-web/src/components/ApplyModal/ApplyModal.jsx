import React, { useState } from 'react';
import styles from './ApplyModal.module.css';
import { admissionTeam } from '../../API/TeamMon';
import { useNavigate } from 'react-router-dom';

export default function ApplyModal({ setModalOpen, id, token }) {
  const [message, setMessage] = useState();
  const nav = useNavigate();

  console.log(id, token);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    console.log(id);
    console.log(token);
    admissionTeam(id, message, token).then((result) => {
      if (result.status === 200) {
        alert('신청이 완료되었습니다.');
        nav('/findteam');
      }
    });
    closeModal();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>신청하기</span>
        <button type='button' onClick={closeModal} className={styles.closeBtn}>
          X
        </button>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor='nowPw'>가입 신청 메시지</label>
        <textarea
          name='contents'
          wrap='hard'
          placeholder='메시지를 입력해주세요.'
          required
          onChange={handleChange}
          className={styles.textArea}
        />
        <button type='submit' className={styles.saveBtn}>
          저장
        </button>
      </form>
    </div>
  );
}
