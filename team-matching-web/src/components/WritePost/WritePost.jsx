import React, { useState } from 'react';
import styles from './WritePost.module.css';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userState } from 'Recoil/state';
import { getMyPosts } from 'api/TeamMon';
import Post from '../Post/Post';
import Loading from 'ui/Loading/Loading';
import NotFound from 'pages/NotFound/NotFound';
import Paging from 'ui/Paging/Paging';

export default function WritePost() {
  const { userId, token } = useRecoilValue(userState);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const {
    isLoading,
    error,
    data: postList,
  } = useQuery(['getMyPosts', userId, page - 1], () => {
    return getMyPosts(userId, token, page - 1).then((data) => {
      setTotalPosts(data.totalElements);
      return data.content;
    });
  });

  if (isLoading) return <Loading />;
  if (error) return <NotFound />;

  return (
    <>
      <h3>작성한 글</h3>
      <hr />
      <div className={styles.content}>
        {totalPosts === 0 && <p>작성한 글이 없습니다.</p>}
        {totalPosts > 0 && (
          <header className={styles.header}>
            <div className={styles.item}>번호</div>
            <div className={styles.item}>제목</div>
            <div className={styles.item}>태그</div>
            <div className={styles.item}>작성자</div>
            <div className={styles.item}>작성일</div>
          </header>
        )}
        <ul className={styles.ul}>
          {postList &&
            postList.map((myPost) => <Post key={myPost.id} post={myPost} />)}
        </ul>

        {totalPosts > 0 && (
          <Paging
            page={page}
            totalElements={totalPosts}
            size={10}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
}
