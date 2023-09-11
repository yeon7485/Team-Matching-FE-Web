import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './TeamDetail.module.css';
import classNames from 'classnames/bind';
import ApplyModal from '../../components/ApplyModal/ApplyModal';

export default function TeamDetail() {
  const {
    state: {
      team: { id, category, time, date, title, nickname, tag, count, contents },
    },
  } = useLocation();

  const [color, setColor] = useState();
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const cn = classNames.bind(styles);

  useEffect(() => {
    if (category === '개발') {
      setColor('dev');
    } else if (category === '취미') {
      setColor('hobby');
    } else if (category === '스포츠') {
      setColor('sports');
    } else if (category === '게임') {
      setColor('game');
    }
  }, [category]);

  const showApplyModal = () => {
    setApplyModalOpen(true);
  };

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.left}>
          <p className={cn('category', color)}>{category}</p>
          <p className={styles.title}>{title}</p>
          <p className={cn('nickname')}>{nickname}</p>
          <div className={styles.times}>
            <p>2023.07.05 20:13 작성</p>
            <p>•</p>
            <p>2023.07.05 20:30 수정</p>
          </div>
        </div>
        <div className={cn('right')}>
          <p className={cn('date')}>{`마감일  ~${date}`}</p>
          <p className={cn('count')}>{`${count} 명`}</p>
          <button className={styles.apply} onClick={showApplyModal}>
            신청하기
          </button>
          {applyModalOpen && <ApplyModal setModalOpen={setApplyModalOpen} />}
        </div>
      </div>
      <hr />
      <p className={styles.contents}>{contents}</p>
      <div className={cn('tag', color)}>{`#${tag}  #고양이  #태그태그`}</div>
    </div>
  );
}
