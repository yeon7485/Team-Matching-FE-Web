import React from 'react';
import styles from './SubMenu.module.css';
import { Link } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { userState } from './../../Recoil/state';

export default function SubMenu({ onMouseEnter, onMouseLeave }) {
  const reset = useResetRecoilState(userState);
  return (
    <ul
      className={styles.submenu}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <li className={styles.item}>
        <Link to='mypage' className={styles.link}>
          마이페이지
        </Link>
      </li>
      <li
        className={styles.item}
        onClick={() => {
          reset();
        }}
      >
        로그아웃
      </li>
    </ul>
  );
}
