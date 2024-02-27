import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { logIn } from 'api/TeamMon';
import { userState } from 'Recoil/state';
import { useSetRecoilState } from 'recoil';

export default function Login() {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [pwType, setPwType] = useState({
    type: 'password',
    visible: false,
  });
  const setUser = useSetRecoilState(userState);
  //recoil 사용 선언부

  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(id, password).then((result) => {
      if (result.status === 200) {
        setUser({ userId: id, token: result.headers.authorization });
        const timer = new Date(result.headers.date).getTime() + 60 * 1000 * 60;
        localStorage.setItem('tokenTimer', timer);
        nav('/', { replace: true });
      } else {
        alert('아이디 또는 비밀번호를 확인해주세요.');
      }
    });
  };

  const handleShowPwChecked = (e) => {
    setPwType(() => {
      // 만약 현재 pwType.visible이 false 라면
      if (!pwType.visible) {
        return { type: 'text', visible: true };

        //현재 pwType.visible이 true 라면
      } else {
        return { type: 'password', visible: false };
      }
    });
  };

  const goToMain = () => {
    nav('/');
  };

  return (
    <div className={styles.root}>
      <section className={styles.container}>
        <h1 className={styles.title} onClick={goToMain}>
          TeamMon
        </h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor='id' className={styles.label}>
            아이디
          </label>
          <input
            type='text'
            className={styles.inputBox}
            name='id'
            id='id'
            value={id || ''}
            placeholder='아이디를 입력해주세요.'
            required
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <label htmlFor='password' className={styles.label}>
            비밀번호
          </label>
          <input
            type={pwType.type}
            name='password'
            className={styles.inputBox}
            id='password'
            value={password || ''}
            placeholder='비밀번호를 입력해주세요.'
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className={styles.pwCheckBox}>
            <input
              type='checkbox'
              className={styles.checkBox}
              onChange={handleShowPwChecked}
            />
            비밀번호 보기
          </div>

          <button className={styles.loginButton}>로그인</button>
        </form>
        <p>
          아직 회원이 아니신가요?{' '}
          <Link to='/join' className={styles.joinBtn}>
            회원가입
          </Link>
        </p>
      </section>
    </div>
  );
}
