import React, { useState } from 'react';
import styles from './WriteComment.module.css';
import { useRecoilValue } from 'recoil';
import { userState } from 'Recoil/state';
import { getMyComments } from 'api/TeamMon';
import MyComment from '../MyComment/MyComment';
import { useQuery } from '@tanstack/react-query';
import Loading from 'ui/Loading/Loading';
import NotFound from 'pages/NotFound/NotFound';
import Paging from 'ui/Paging/Paging';

export default function WriteComment() {
  const { userId, token } = useRecoilValue(userState);
  const [page, setPage] = useState(1);
  const [totalComments, setTotalComments] = useState(-1);

  const {
    isLoading,
    error,
    data: commentList,
  } = useQuery(
    ['getMyComments', userId, page - 1],
    () => {
      return getMyComments(userId, token, page - 1).then((data) => {
        setTotalComments(data.totalElements);
        return data.content;
      });
    },
    { enabled: !!userId }
  );

  if (isLoading || totalComments === -1) return <Loading />;
  if (error) return <NotFound />;

  return (
    <div className={styles.container}>
      <h3 className={styles.index}>작성한 댓글</h3>
      <div className={styles.content}>
        {totalComments === 0 && <p>작성한 댓글이 없습니다.</p>}
        {totalComments > 0 && (
          <header className={styles.header}>
            <div className={styles.item}>댓글</div>
          </header>
        )}
        <ul className={styles.ul}>
          {commentList &&
            commentList.map((comment) => (
              <MyComment key={comment.id} comment={comment}></MyComment>
            ))}
        </ul>
        {totalComments > 0 && (
          <Paging
            page={page}
            totalElements={totalComments}
            size={10}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
}
