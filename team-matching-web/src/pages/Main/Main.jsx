import React from 'react';
import styles from './Main.module.css';
import Button from '../../components/ui/Button/Button';

export default function Main() {
  return (
    <section className={styles.section}>
      <div className={styles.image}>
        <div className={styles.unit}>
          <h1 className={styles.title}>팀 매칭 서비스</h1>
          <p className={styles.text}>
            Team-Matching 서비스는 다양한 방면에서 그룹을 쉽게 만들 수 있게
            도와주는 서비스입니다.
          </p>
          <div className={styles.btn}>
            <Button text={'지금 시작하기'} fill />
          </div>
        </div>
      </div>
    </section>
  );
}
