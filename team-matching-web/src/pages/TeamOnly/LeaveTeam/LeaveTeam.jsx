import React from 'react';
import styles from './LeaveTeam.module.css';
import RoundBtn from '../../../components/ui/RoundBtn/RoundBtn';

export default function LeaveTeam() {
  const handleClick = () => {
    console.log('leave team!!');
  };
  return (
    <div className={styles.root}>
      <p className={styles.text}>
        팀을 탈퇴하시겠습니까? <br />팀 탈퇴 시 팀에서 작성한 게시글, 참여 기록
        등이 모두 삭제됩니다.
      </p>
      <RoundBtn type={'button'} text={'팀 탈퇴'} fill onClick={handleClick} />
    </div>
  );
}
