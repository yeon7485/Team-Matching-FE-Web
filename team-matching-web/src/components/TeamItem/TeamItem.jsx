import React from 'react';
import styles from './TeamItem.module.css';
import useCategory from 'hooks/useCategory';
import classNames from 'classnames/bind';

export default function TeamItem({
  teamData: { name, category, hashtag, capacity, total },
  onClick,
  handleCancel,
  type,
}) {
  const cat = useCategory(category);
  const cn = classNames.bind(styles);
  return (
    <li className={styles.teamLi}>
      <div className={cn('item', cat)}>{cat}</div>
      <div className={styles.item} onClick={onClick}>
        {name}
      </div>
      <div className={styles.item}>#{hashtag}</div>
      {type !== 'act' && (
        <div className={styles.cancel} onClick={handleCancel}>
          취소
        </div>
      )}
      {type === 'act' && (
        <div className={styles.item}>{`${total} / ${capacity}`}</div>
      )}
    </li>
  );
}
