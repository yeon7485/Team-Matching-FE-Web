import React, { useState } from 'react';
import styles from './MyInfo.module.css';
import ChangePwModal from '../ChangePwModal/ChangePwModal';
import ChangeNickNameModal from '../ChangeNickNameModal/ChangeNickNameModal';
export default function MyInfo() {
  const [user, setUser] = useState({
    id: 'seyeon1011',
    nickname: '냥이가최고야',
    email: 'seyeon1011@naver.com',
    self: '25살입니다.',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  //비밀번호 변경 팝업창 관리
  const [pwModalOpen, setPwModalOpen] = useState(false);
  //닉네임 찾기 팝업창 관리
  const [nnModalOpen, setNnModalOpen] = useState(false);
  const showPwModal = () => {
    setPwModalOpen(true);
  };

  const showNnModal = () => {
    setNnModalOpen(true);
  };
  return (
    <>
      <h3>내 정보 관리</h3>
      <hr />
      <div className={styles.infoBox}>
        <div className={styles.idBox}>
          <p className={styles.title}>아이디</p>
          <p className={styles.user}>{user.id}</p>
        </div>
        <div className={styles.pwBox}>
          <p className={styles.title}>비밀번호</p>
          <button onClick={showPwModal} className={styles.infoBtn}>
            비밀번호 변경
          </button>
          {pwModalOpen && <ChangePwModal setModalOpen={setPwModalOpen} />}
        </div>
        <div className={styles.nicknameBox}>
          <p className={styles.title}>닉네임</p>
          <p className={styles.user}>{user.nickname}</p>
          <button onClick={showNnModal} className={styles.infoBtn}>
            변경
          </button>
          {nnModalOpen && <ChangeNickNameModal setModalOpen={setNnModalOpen} />}
        </div>
        <div className={styles.emailBox}>
          <p className={styles.title}>이메일</p>
          <p className={styles.user}>{user.email}</p>
        </div>
      </div>
      <article className={styles.selfBox}>
        <p className={styles.selfTitle}>자기 소개</p>
        <form className={styles.selfForm} onSubmit={handleSubmit}>
          <textarea
            name=''
            id=''
            cols='70'
            rows='10'
            value={user.self}
            className={styles.textarea}
            onChange={(e) => {
              setUser({ ...user, self: e.target.value });
            }}
          >
            {user.self}
          </textarea>
          <button className={styles.saveBtn}>저장</button>
        </form>
      </article>
    </>
  );
}
