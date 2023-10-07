import { useRecoilValue } from 'recoil';
import { userState } from '../../Recoil/state';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import SubMenu from '../SubMenu/SubMenu';
import classNames from 'classnames/bind';

export default function Navbar() {
  const user = useRecoilValue(userState);
  const [isHover, setIsHover] = useState(false);
  const handleIsHover = () => {
    setIsHover(true);
  };
  const handleIsNotHover = () => {
    setIsHover(false);
  };
  const cn = classNames.bind(styles);

  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo}>
        <h2>Team-Mon</h2>
      </Link>
      <nav className={styles.nav}>
        <Link
          to='/board'
          className={cn(
            'item',
            `${window.location.pathname === '/board' ? 'select' : ''}`
          )}
        >
          게시판
        </Link>
        <Link
          to='/teams'
          className={cn(
            'item',
            `${window.location.pathname === '/teams' ? 'select' : ''}`
          )}
        >
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
        {user.userId && (
          <div
            className={styles.user}
            onMouseEnter={handleIsHover}
            onMouseLeave={handleIsNotHover}
          >
            <p>{user.userId}님, 반가워요!</p>
            {isHover && <SubMenu user={user} />}
          </div>
        )}
      </div>
    </header>
  );
}
