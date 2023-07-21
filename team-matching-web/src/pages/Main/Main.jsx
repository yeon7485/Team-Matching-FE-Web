import React, { useEffect } from 'react';
import styles from './Main.module.css';
import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <div>
      <section>
        <div className={styles.banner}>
          <h1 className={styles.title}>팀 매칭은 Team Mon에서!</h1>
          <p className={styles.text}>
            개발, 취미, 스포츠 등 다양한 방면에서
            <br />
            Team Mon 서비스를 통해 팀을 모집해보세요!
          </p>
          <Link to='/findteam' className={styles.btn}>
            지금 시작하기
          </Link>
        </div>
      </section>
      <div className={styles.main}>
        <p>팀 둘러보기 </p>
        <p>팀 둘러보기 </p>
        <p>팀 둘러보기 </p>
        <p>팀 둘러보기 </p>
        <p>팀 둘러보기 </p>
        <p>팀 둘러보기 </p>
        <p>팀 둘러보기 </p>
        <p>팀 둘러보기 </p>
        <p>팀 둘러보기 </p>
        <p>팀 둘러보기 </p>
        <p>팀 둘러보기 </p>
        <p>팀 둘러보기 </p>
        <p>팀 둘러보기 </p>
        <p>팀 둘러보기 </p>
        <p>팀 둘러보기 </p>
      </div>
    </div>
  );
}
