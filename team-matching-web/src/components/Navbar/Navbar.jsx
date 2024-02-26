import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from 'Recoil/state';
import { logOut, myPageInfo } from 'api/TeamMon';
import SubMenu from '../SubMenu/SubMenu';
import classNames from 'classnames/bind';

export default function Navbar() {
  const user = useRecoilValue(userState);
  const reset = useResetRecoilState(userState);
  const [nickname, setNickname] = useState(user.userId);
  const [isHover, setIsHover] = useState(false);
  const cn = classNames.bind(styles);
  const nav = useNavigate();

  const { data: userInfo } = useQuery(['myPageData'], () => {
    return myPageInfo(user.userId, user.token).then((result) => {
      setNickname(result.nickname);
      return result;
    });
  });

  useEffect(() => {
    const timer = localStorage.getItem('tokenTimer');
    if (timer < new Date().getTime() && user.token !== '') {
      alert('로그인 시간이 만료되었습니다😭 다시 로그인해주세요');
      logOut(user.userId, user.token)
        .then((result) => {
          if (result.status === 200) {
            reset();
            localStorage.removeItem('tokenTimer');
            nav('/login', { replace: true });
          } else {
            reset();
            localStorage.removeItem('tokenTimer');
            nav('/', { replace: true });
          }
        })
        .catch((error) => {
          console.error(error);
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
              <p>{nickname}님, 반가워요!</p>
              {isHover && <SubMenu user={user} />}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
