import React, { useEffect, useState } from 'react';
import styles from './MyInfo.module.css';
import ChangePwModal from '../ChangePwModal/ChangePwModal';
import ChangeNickNameModal from '../ChangeNickNameModal/ChangeNickNameModal';
import { useRecoilValue } from 'recoil';
import { userState } from '../../Recoil/state';
import { myPageInfo, upDateMyPageInfo } from '../../API/TeamMon';
export default function MyInfo() {
  const [userInfo, setUserInfo] = useState({
    id: '',
    nickname: '',
    email: '',
    memo: '',
  });

  const user = useRecoilValue(userState);
  const handleSubmit = (e) => {
    e.preventDefault();
    upDateMyPageInfo(
      user.userId,
      user.token,
      userInfo.nickname,
      userInfo.email,
      userInfo.memo
    );
  };
  useEffect(() => {
    myPageInfo(user.userId, user.token).then((result) => {
      setUserInfo({
        id: result.userId,
        nickname: result.nickname,
        email: result.email,
        memo: result.memo,
      });
    });
  }, []);

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
          <p className={styles.user}>{userInfo.id}</p>
        </div>
        <div className={styles.pwBox}>
          <p className={styles.title}>비밀번호</p>
          <button onClick={showPwModal} className={styles.infoBtn}>
            비밀번호 변경
          </button>
          {pwModalOpen && (
            <ChangePwModal
              setModalOpen={setPwModalOpen}
              setUserInfo={setUserInfo}
            />
          )}
        </div>
        <div className={styles.nicknameBox}>
          <p className={styles.title}>닉네임</p>
          <p className={styles.user}>{userInfo.nickname}</p>
          <button onClick={showNnModal} className={styles.infoBtn}>
            변경
          </button>
          {nnModalOpen && (
            <ChangeNickNameModal
              setModalOpen={setNnModalOpen}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          )}
        </div>
        <div className={styles.emailBox}>
          <p className={styles.title}>이메일</p>
          <p className={styles.user}>{userInfo.email}</p>
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
            value={userInfo.memo || ''}
            className={styles.textarea}
            onChange={(e) => {
              setUserInfo({ ...userInfo, memo: e.target.value });
            }}
          >
            {userInfo.memo}
          </textarea>
          <button className={styles.saveBtn}>저장</button>
        </form>
      </article>
    </>
  );
}
