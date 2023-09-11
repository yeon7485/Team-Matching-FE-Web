import React from 'react';
import styles from './SubMenu.module.css';
import { Link } from 'react-router-dom';
import { logOut } from '../../API/TeamMon';
import { useResetRecoilState } from 'recoil';
import { userState } from '../../Recoil/state';

export default function SubMenu({ onMouseEnter, onMouseLeave, user }) {
  const reset = useResetRecoilState(userState);
  const handleClick = () => {
    //back에서 로그아웃
    logOut(user.userId, user.token).then((result) => {
      reset();
      if (result.status === 200) {
        //front에 남아있던 인증토큰 삭제
        reset();
      }
    });
  };
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
      <li className={styles.item} onClick={handleClick}>
        로그아웃
      </li>
    </ul>
  );
}
