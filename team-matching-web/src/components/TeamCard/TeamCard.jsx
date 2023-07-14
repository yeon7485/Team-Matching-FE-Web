import React from 'react';
import styles from './TeamCard.module.css';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

export default function TeamCard({
  team,
  team: { id, category, time, date, title, nickname, tag, count, contents },
}) {
  const navigate = useNavigate();

  const cn = classNames.bind(styles);
  let color = '';
  if (category === '개발') {
    color = 'dev';
  } else if (category === '취미') {
    color = 'hobby';
  } else if (category === '스포츠') {
    color = 'sports';
  } else if (category === '게임') {
    color = 'game';
  }

  return (
    <li
      className={styles.root}
      onClick={() => {
        navigate(`/findteam/${id}`, { state: { team } });
      }}
    >
      <div className={styles.top}>
        <div className={styles.left}>
          <p className={cn('category', color)}>{category}</p>
          <p className={styles.time}>{time}</p>
        </div>
        <p className={styles.date}>~{date}</p>
      </div>
      <div className={styles.mid}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.nickname}>{nickname}</p>
      </div>
      <div className={styles.bot}>
        <p className={cn('tag', color)}>#{tag}</p>
        <div className={styles.count}>{count} 명</div>
      </div>
    </li>
  );
}
