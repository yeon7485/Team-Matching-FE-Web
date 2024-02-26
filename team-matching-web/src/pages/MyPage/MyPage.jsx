import React, { useEffect, useState } from 'react';
import styles from './MyPage.module.css';
import MyInfo from 'components/MyInfo/MyInfo';
import WritePost from 'components/WritePost/WritePost';
import WriteComment from 'components/WriteComment/WriteComment';
import TeamAct from 'components/TeamAct/TeamAct';
import TeamJudging from 'components/TeamJudging/TeamJudging';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

export default function MyPage() {
  const [index, setIndex] = useState('MyInfo');
  const location = useLocation();
  const fromMain = { ...location.state };
  useEffect(() => {
    if (fromMain.index) {
      setIndex(fromMain.index);
    }
  }, [fromMain.index]);

  const cn = classNames.bind(styles);

  return (
    <div className={styles.root}>
      <aside className={styles.sidebar}>
        <ul className={styles.ul}>
          <li
            className={cn('list', `${index === 'MyInfo' ? 'cur' : ''}`)}
            onClick={() => {
              setIndex('MyInfo');
            }}
          >
            내 정보 관리
          </li>
          <li
            className={cn('list', `${index === 'WritePost' ? 'cur' : ''}`)}
            onClick={() => {
              setIndex('WritePost');
            }}
          >
            작성한 글
          </li>
          <li
            className={cn('list', `${index === 'WriteComment' ? 'cur' : ''}`)}
            onClick={() => {
              setIndex('WriteComment');
            }}
          >
            작성한 댓글
          </li>
          <li
            className={cn('list', `${index === 'TeamAct' ? 'cur' : ''}`)}
            onClick={() => {
              setIndex('TeamAct');
            }}
          >
            참여 중인 팀
          </li>
          <li
            className={cn('list', `${index === 'TeamJudging' ? 'cur' : ''}`)}
            onClick={() => {
              setIndex('TeamJudging');
            }}
          >
            신청 중인 팀
          </li>
        </ul>
      </aside>

      <section className={styles.content}>
        {index === 'MyInfo' && <MyInfo />}
        {index === 'WritePost' && <WritePost />}
        {index === 'WriteComment' && <WriteComment />}
        {index === 'TeamAct' && <TeamAct />}
        {index === 'TeamJudging' && <TeamJudging />}
      </section>
    </div>
  );
}
