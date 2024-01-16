import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from 'Recoil/state';
import { Link, useNavigate } from 'react-router-dom';
import SubMenu from '../SubMenu/SubMenu';
import classNames from 'classnames/bind';
import { logOut } from 'api/TeamMon';

export default function Navbar() {
  const user = useRecoilValue(userState);
  const reset = useResetRecoilState(userState);
  const [isHover, setIsHover] = useState(false);
  const cn = classNames.bind(styles);
  const nav = useNavigate();

  useEffect(() => {
    const timer = localStorage.getItem('tokenTimer');
    if (timer < new Date().getTime() && user.token !== '') {
      alert('로그인 시간이 만료되었습니다😭 다시 로그인해주세요');
      logOut(user.userId, user.token)
        .then((result) => {
          if (result.status === 200) {
            reset();
            localStorage.removeItem('tokenTimer');
          }
        })
        .finally(() => {
          nav('/', { replace: true });
        });
    }
  });

  const handleIsHover = () => {
    setIsHover(true);
  };
  const handleIsNotHover = () => {
    setIsHover(false);
  };

  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo}>
        <h2 className={styles.title}>TeamMon</h2>
      </Link>
      <div className={styles.subHeader}>
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
        <div className={styles.userBtn}>
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
      </div>
    </header>
  );
}
