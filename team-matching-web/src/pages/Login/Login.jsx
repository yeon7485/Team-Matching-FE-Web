import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

export default function Login() {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
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
