import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import Button from '../ui/Button/Button';
import { useRecoilValue } from 'recoil';
import { userState } from '../../Recoil/state';

export default function Navbar() {
  const user = useRecoilValue(userState);
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
        {!user.userId && (
          <Link to='/join' className={styles.join}>
            회원가입
          </Link>
        )}
        {!user.userId && (
          <Link to='/login' className={styles.login}>
            로그인
          </Link>
        )}
        {user.userId && <Link to='/mypage'>{user.userId}님 환영합니다</Link>}
      </div>
    </header>
  );
}
