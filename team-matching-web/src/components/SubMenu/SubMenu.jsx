import React from 'react';
import styles from './SubMenu.module.css';
import { Link } from 'react-router-dom';

export default function SubMenu({ onMouseEnter, onMouseLeave }) {
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
      <li className={styles.item}>로그아웃</li>
    </ul>
  );
}
