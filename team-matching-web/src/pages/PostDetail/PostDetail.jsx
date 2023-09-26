import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import styles from './PostDetail.module.css';
import { deletePost, getPostsDetail, writeComment } from '../../API/TeamMon';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { userState } from '../../Recoil/state';
import Comment from '../../components/Comment/Comment';
import RoundBtn from '../../components/ui/RoundBtn/RoundBtn';
import Loading from '../../components/ui/Loading/Loading';
import NotFound from '../NotFound/NotFound';
export default function PostDetail() {
  const {
    state: {
      post: { id },
    },
  } = useLocation();

  const [isMine, setIsMine] = useState(false);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState();
  const [postInfo, setPostInfo] = useState();
  const user = useRecoilValue(userState);
  const nav = useNavigate();
  const editClickListner = () => {
    nav('/board/new', { state: { postInfo } });
  };
  const { isLoading, error, data } = useQuery(
    ['getPost', id],
    () => {
      return getPostsDetail(id);
    },
    {
      onSuccess: (data) => {
        setPostInfo(data.data.resultData);
        setComments(data.data.resultData.commentDtos);
        if (data.data.resultData.userAccountDto.userId === user.userId) {
          setIsMine(true);
        }
      },
    }
  );

  const deleteClickListner = () => {
    deletePost(postInfo.id, user.token).then((result) => {
      if (result.status === 200) {
        alert('게시글이 삭제되었습니다.');
        nav('/board');
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    writeComment(content, id, user.token).then((result) => {
      setContent('');
      if (result.status === 401) {
        alert('로그인 후 이용해 주세요!!');
        return;
      }
    });
  };
  if (isLoading) return <Loading />;
  if (error) return <NotFound />;
  return (
    <div className={styles.root}>
      <div className={styles.titleHeader}>
        <h1 className={styles.title}>자유게시판</h1>
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
        <span className={styles.date}>{postInfo && postInfo.createdAt}</span>
      </div>
      <article className={styles.post}>
        <div className={styles.content}>{postInfo && postInfo.content}</div>
        <div className={styles.tag}>{postInfo && postInfo.hashtag}</div>
      </article>
      <section className={styles.comment}>
        <div className={styles.commentHeader}>
          댓글 <span className={styles.commentsLength}>{comments.length}</span>
        </div>
        <ul className={styles.commentUl}>
          {comments &&
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
        </ul>
        <div className={styles.newComment}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type='text'
              className={styles.commentInput}
              placeholder='댓글을 입력해주세요....'
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <button className={styles.submitBtn}>등록</button>
          </form>
        </div>
      </section>
      {isMine && (
        <RoundBtn
          type={'button'}
          text={'수정'}
          fill={false}
          onClick={editClickListner}
        ></RoundBtn>
      )}
      {isMine && (
        <RoundBtn
          type={'button'}
          text={'삭제'}
          fill={true}
          onClick={deleteClickListner}
        ></RoundBtn>
      )}
    </div>
  );
}
