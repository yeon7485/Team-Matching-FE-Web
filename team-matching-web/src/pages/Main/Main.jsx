import React, { useEffect } from 'react';
import styles from './Main.module.css';
import { Link, useLocation } from 'react-router-dom';

export default function Main() {
  return (
    <div>
      <section>
        <div className={styles.banner}>
          <h1 className={styles.title}>팀 매칭 서비스</h1>
          <p className={styles.text}>
            Team-Matching 서비스는 다양한 방면에서
            <br />
            그룹을 쉽게 만들 수 있게 도와주는 서비스입니다.
          </p>
          <Link to='/' className={styles.btn}>
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
