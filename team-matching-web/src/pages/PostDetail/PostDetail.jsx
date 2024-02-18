import React, { useState } from 'react';
import styles from './PostDetail.module.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'Recoil/state';
import { deletePost, getPostsDetail, writeComment } from 'api/TeamMon';
import Comment from 'components/Comment/Comment';
import RoundBtn from 'ui/RoundBtn/RoundBtn';
import Loading from 'ui/Loading/Loading';
import NotFound from '../NotFound/NotFound';

export default function PostDetail() {
  const {
    state: {
      post: { id },
    },
  } = useLocation();
  const [isMine, setIsMine] = useState(false);
  const [content, setContent] = useState('');
  const user = useRecoilValue(userState);
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: postInfo,
  } = useQuery(['getPost', id], () => {
    return getPostsDetail(id).then((data) => {
      if (data.userAccountDto.userId === user.userId) {
        setIsMine(true);
      }
      return data;
    });
  });

  const editClickListener = () => {
    nav('/board/new', { state: { postInfo } });
  };

  const deleteClickListener = () => {
    deletePost(postInfo.id, user.token).then((result) => {
      if (result.status === 200) {
        alert('게시글이 삭제되었습니다.');
        nav('/board');
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === '') {
      alert('댓글을 작성해주세요.');
      return;
    }
    writeComment(content.trim(), id, user.token).then((result) => {
      setContent('');
      if (result.status === 401) {
        alert('로그인 후 이용해 주세요!!');
        return;
      }
      queryClient.invalidateQueries(['getPost', id]);
    });
  };

  if (isLoading) return <Loading />;
  if (error) return <NotFound />;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.titleHeader}>
          <Link to='/board' className={styles.title}>
            자유게시판
          </Link>
          <Link className={styles.boardLink} to='/board'>
            목록
          </Link>
        </div>
        <div className={styles.titleBox}>
          <span>{postInfo && postInfo.title}</span>
        </div>
        <div className={styles.infoBox}>
          <span className={styles.name}>
            {postInfo && postInfo.userAccountDto.nickname}
          </span>
          <span className={styles.date}>
            {postInfo && formatDate(postInfo.createdAt)}
          </span>
        </div>
        <article className={styles.post}>
          <div className={styles.content}>{postInfo && postInfo.content}</div>
          <div className={styles.tag}>{`#${postInfo && postInfo.hashtag}`}</div>
        </article>
        <section className={styles.comment}>
          <div className={styles.commentHeader}>
            댓글{' '}
            <span className={styles.commentsLength}>
              {`(${postInfo.commentDtos.length})`}
            </span>
          </div>
          <ul className={styles.commentUl}>
            {postInfo.commentDtos &&
              [...postInfo.commentDtos]
                .reverse()
                .map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
          </ul>
          <div className={styles.newComment}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <textarea
                name='comment'
                wrap='hard'
                placeholder='댓글을 입력해주세요....'
                required
                value={content}
                className={styles.commentInput}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
              <button className={styles.submitBtn}>등록</button>
            </form>
          </div>
        </section>
        <div className={styles.buttonDiv}>
          {isMine && (
            <RoundBtn
              type={'button'}
              text={'수정'}
              fill={false}
              onClick={editClickListener}
            ></RoundBtn>
          )}
          <div className={styles.space} />
          {isMine && (
            <RoundBtn
              type={'button'}
              text={'삭제'}
              fill={true}
              onClick={deleteClickListener}
            ></RoundBtn>
          )}
        </div>
      </div>
    </div>
  );
}

function formatDate(date) {
  return `${date.substr(2, 2)}.${date.substr(5, 2)}.${date.substr(8, 2)} 
  ${date.substr(11, 5)}`;
}
