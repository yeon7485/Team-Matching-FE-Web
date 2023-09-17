import React, { useEffect, useState } from 'react';
import styles from './TeamCard.module.css';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import useCategory from '../../hooks/useCategory';

export default function TeamCard({
  team,
  team: {
    id,
    adminUserAccountDto,
    name,
    category,
    hashtag,
    capacity,
    total,
    deadline,
    createdAt,
  },
}) {
  const [closed, setClosed] = useState(false);
  const navigate = useNavigate();

  const cn = classNames.bind(styles);
  const cat = useCategory(category);

  const newCreatedAt = formatDate(new Date(createdAt));
  const newDeadline = formatDeadline(new Date(deadline));

  useEffect(() => {
    if (capacity === total || new Date() > new Date(deadline)) {
      setClosed(true);
    }
  }, [capacity, total, deadline]);

  return (
    <li
      className={styles.root}
      onClick={() => {
        navigate(`/findteam/${id}`, { state: { team } });
      }}
    >
      <div className={styles.top}>
        <div className={styles.left}>
          <p className={cn('category', `${closed ? 'closed' : cat}`)}>{cat}</p>
          <p className={styles.createdAt}>{newCreatedAt}</p>
        </div>
        <p className={styles.deadline}>{newDeadline}</p>
      </div>
      <div className={styles.mid}>
        <h3 className={cn('title', `${closed ? 'closed' : ''}`)}>{name}</h3>
        <p className={styles.nickname}>{adminUserAccountDto.nickname}</p>
      </div>
      <div className={styles.bot}>
        <p className={cn('hashtag', `${closed ? 'closed' : cat}`)}>
          #{hashtag}
        </p>
        <div className={cn('count', `${closed ? 'closed' : ''}`)}>
          {total} / {capacity} 명
        </div>
      </div>
    </li>
  );
}

function formatDate(date) {
  const milliSeconds = new Date() - date;
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
}

function formatDeadline(deadline) {
  const today = new Date();
  return today < deadline
    ? `~${deadline.getMonth() + 1}.${deadline.getDate()}`
    : '모집 완료';
}
