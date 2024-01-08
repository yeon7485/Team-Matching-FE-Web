import React, { useState } from 'react';
import styles from './Join.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from 'api/TeamMon';

export default function Join() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signUp({ user }).then((result) => {
      if (result === 200) {
        navigate('/login');
      }
    });
  };

  return (
    <div className={styles.root}>
      <section className={styles.container}>
        <h1 className={styles.title}>Team-Matching</h1>
        <p className={styles.already}>
          이미 회원이신가요? <Link to='/login'>로그인</Link>
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor='id'>아이디</label>
          <input
            className={styles.inputBox}
            type='text'
            name='id'
            id='id'
            value={user.id}
            placeholder='아이디를 입력해주세요.'
            required
            onChange={handleChange}
          />

          <label htmlFor='password'>비밀번호</label>
          <input
            className={styles.inputBox}
            id='password'
            type='password'
            name='password'
            value={user.password}
            placeholder='비밀번호를 입력해주세요.'
            required
            onChange={handleChange}
          />

          <label htmlFor='email'>이메일</label>
          <input
            className={styles.inputBox}
            type='email'
            id='email'
            name='email'
            value={user.email}
            placeholder='이메일을 입력해주세요.'
            required
            onChange={handleChange}
          />

          <label htmlFor='nickname'>닉네임</label>
          <input
            className={styles.inputBox}
            type='text'
            name='nickname'
            id='nickname'
            value={user.nickname}
            placeholder='닉네임을 입력해주세요.'
            required
            onChange={handleChange}
          />
          {/* <p className={styles.message}>{message}</p> */}
          <div className={styles.agreeBox}>
            <input
              type='checkbox'
              id='agree'
              name='agree'
              className={styles.checkBox}
            />
            <label htmlFor='agree'>
              개인정보처리방침 및 이용약관에 동의합니다.
            </label>
          </div>

          <button className={styles.joinButton}>회원가입</button>
        </form>
      </section>
    </div>
  );
}
