import React, { useState } from 'react';
import styles from './ChangePwModal.module.css';
import { changePassword, checkPassword } from '../../API/TeamMon';
export default function ChangePwModal({ setModalOpen, user }) {
  const closeModal = () => {
    setModalOpen(false);
  };
  const [password, setPassword] = useState();
  const [newPw, setNewPw] = useState();
  const [checkPw, setCheckPw] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    checkPassword(user.userId, user.token, password)
      .then((result) => {
        console.log(result);
        changePassword(user.userId, user.token, newPw, checkPw).then(
          (result) => {
            if (result.status === 200) {
              setModalOpen(false);
            }
          }
        );
      })
      .catch((e) => {
        alert(e.response.data.resultMessage);
        return;
      });
  };
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <span>비밀번호 변경</span>
        <button onClick={closeModal} className={styles.closeBtn}>
          X
        </button>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor='nowPw'>현재 비밀번호</label>
        <input
          type='password'
          name='nowPw'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className={styles.inputBox}
          placeholder='비밀번호를 입력해주세요.'
        />

        <label htmlFor='newPw'>새로운 비밀번호</label>
        <input
          type='password'
          name='newPw'
          className={styles.inputBox}
          value={newPw}
          onChange={(e) => {
            setNewPw(e.target.value);
          }}
          placeholder='비밀번호를 입력해주세요.'
        />
        <label htmlFor='newPw2'>비밀번호 확인</label>
        <input
          type='password'
          name='newPw2'
          className={styles.inputBox}
          value={checkPw}
          onChange={(e) => {
            setCheckPw(e.target.value);
          }}
          placeholder='비밀번호를 입력해주세요.'
        />
        <button className={styles.saveBtn}>저장</button>
      </form>
    </div>
  );
}
