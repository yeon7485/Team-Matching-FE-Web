import React from 'react';
import styles from './TeamInfo.module.css';
import RoundBtn from '../../../components/ui/RoundBtn/RoundBtn';

export default function TeamInfo() {
  return (
    <div className={styles.root}>
      <div className={styles.infoBox}>
        <p className={styles.subTitle}>팀 이름</p>
        <p>팀 이름 보여주기</p>

        <p className={styles.subTitle}>카테고리</p>
        <p>개발</p>

        <p className={styles.subTitle}>태그</p>
        <p>#태그</p>

        <p className={styles.subTitle}>마감일</p>
        <p>2023.09.19 (토)</p>

        <p className={styles.subTitle}>팀 생성일</p>
        <p>2023.09.19 (토)</p>
      </div>
      <div className={styles.memberBox}>
        <p className={styles.subTitle}>
          팀원 목록 <span className={styles.total}>5명</span>
        </p>
        <div className={styles.userList}>
          <div className={styles.user}>
            <p>냥이가 최고야</p>
            <p className={styles.userId}>sy1011</p>
          </div>
          <div className={styles.user}>
            <p>냥이가 최고야</p>
            <p className={styles.userId}>sy1011</p>
          </div>
          <div className={styles.user}>
            <p>냥이가 최고야</p>
            <p className={styles.userId}>sy1011</p>
          </div>
          <div className={styles.user}>
            <p>냥이가 최고야</p>
            <p className={styles.userId}>sy1011</p>
          </div>
          <div className={styles.user}>
            <p>냥이가 최고야</p>
            <p className={styles.userId}>sy1011</p>
          </div>
        </div>
        <div className={styles.saveBox}>
          <RoundBtn
            type={'button'}
            text='저장'
            fill
            onClick={() => {
              console.log('save');
            }}
          />
        </div>
      </div>
    </div>
  );
}
