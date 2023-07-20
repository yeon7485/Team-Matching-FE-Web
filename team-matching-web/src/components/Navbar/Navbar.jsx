import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo}>
        <h2>Team-Matching</h2>
      </Link>
      <nav className={styles.nav}>
        <Link to='/' className={styles.item}>
          홈
        </Link>
        <Link to='/board' className={styles.item}>
          게시판
        </Link>
        <Link to='/findteam' className={styles.item}>
          팀 찾기
        </Link>
      </nav>
      <div className={styles.btn}>
        <Link to='/join' className={styles.join}>
          회원가입
        </Link>
        <Link to='/login' className={styles.login}>
          로그인
        </Link>
        <Link to='/mypage'>임시mypage</Link>
      </div>
    </header>
  );
}
