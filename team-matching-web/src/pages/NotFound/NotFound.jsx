import React from 'react';
import { BiError } from 'react-icons/bi';
import styles from './NotFound.module.css';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrap}>
      <BiError className={styles.icon} />
      <h1 className={styles.title}>페이지를 찾을 수 없습니다😥</h1>
      <p className={styles.text}>
        존재하지 않는 주소를 입력하셨거나,
        <br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </p>
      <button
        className={styles.btn}
        onClick={() => {
          navigate('/');
        }}
      >
        홈 화면 돌아가기
      </button>
    </div>
  );
}
