import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { logIn } from 'api/TeamMon';
import { userState } from 'Recoil/state';
import { useSetRecoilState } from 'recoil';

export default function Login() {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const setUser = useSetRecoilState(userState);
  //recoil 사용 선언부

  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(id, password).then((result) => {
      console.log(result);
      if (result.status === 200) {
        setUser({ userId: id, token: result.headers.authorization });
        nav('/');
      }
    });
  };

  return (
    <div className={styles.root}>
      <section className={styles.container}>
        <h1 className={styles.title}>Team-Matching</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor='id'>아이디</label>
          <input
            type='text'
            className={styles.inputBox}
            name='id'
            id='id'
            value={id}
            placeholder='아이디를 입력해주세요.'
            required
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <label htmlFor='password'>비밀번호</label>
          <input
            type='password'
            name='password'
            className={styles.inputBox}
            id='password'
            value={password}
            placeholder='비밀번호를 입력해주세요.'
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button className={styles.loginButton}>로그인</button>
        </form>
        <p>
          아직 회원이 아니신가요? <Link to='/join'>회원가입</Link>
        </p>
      </section>
    </div>
  );
}
