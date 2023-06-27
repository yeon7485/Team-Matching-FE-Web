import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import Button from '../ui/Button/Button';

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
        <Link to='/post' className={styles.item}>
          게시판
        </Link>
        <Link to='/' className={styles.item}>
          팀 찾기
        </Link>
      </nav>
      <div className={styles.btn}>
        <Button text='회원가입' fill={false} />
        <Button text='로그인' fill />
      </div>
    </header>
  );
}
