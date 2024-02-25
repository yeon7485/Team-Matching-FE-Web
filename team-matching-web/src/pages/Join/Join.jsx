import React, { useState } from 'react';
import styles from './Join.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from 'api/TeamMon';

export default function Join() {
  const [user, setUser] = useState({});
  const [pwType, setPwType] = useState({
    type: 'password',
    visible: false,
  });
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

  return (
    <div className={styles.root}>
      <section className={styles.container}>
        <h1 className={styles.title}>TeamMon</h1>
        <p>
          이미 회원이신가요?{' '}
          <Link to='/login' className={styles.loginBtn}>
            로그인
          </Link>
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor='id' className={styles.label}>
            아이디
          </label>
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

          <label htmlFor='password' className={styles.label}>
            비밀번호
          </label>
          <input
            className={styles.inputBox}
            id='password'
            type={pwType.type}
            name='password'
            value={user.password}
            placeholder='비밀번호를 입력해주세요.'
            required
            onChange={handleChange}
          />
          <div className={styles.pwCheckBox}>
            <input
              type='checkbox'
              className={styles.checkBox}
              onChange={handleShowPwChecked}
            />
            비밀번호 보기
          </div>

          <label htmlFor='email' className={styles.label}>
            이메일
          </label>
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

          <label htmlFor='nickname' className={styles.label}>
            닉네임
          </label>
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
          <div className={styles.agreeBox}>
            <input
              type='checkbox'
              id='agree'
              name='agree'
              className={styles.checkBox}
            />
            <span>개인정보처리방침 및 이용약관에 동의합니다.</span>
          </div>

          <button className={styles.joinButton}>회원가입</button>
        </form>
      </section>
    </div>
  );
}
