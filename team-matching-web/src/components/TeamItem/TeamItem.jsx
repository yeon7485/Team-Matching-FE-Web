import React from 'react';
import styles from './TeamItem.module.css';
import useCategory from 'hooks/useCategory';

export default function TeamItem({
  teamData: { name, category, hashtag, capacity, total },
  onClick,
  handleCancel,
  type,
}) {
  return (
    <li className={styles.teamLi}>
      <div className={styles.item}>{useCategory(category)}</div>
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
        <div className={styles.item}>{`${total}/${capacity}`}</div>
      )}
    </li>
  );
}
