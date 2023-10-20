import React, { useEffect, useState } from 'react';
import styles from './TeamPostDetail.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Comment from '../../../components/Comment/Comment';
import { useRecoilValue } from 'recoil';
import { myTeamState, userState } from '../../../Recoil/state';

export default function TeamPostDetail() {
  const {
    state: { postId },
  } = useLocation();

  const [isMine, setIsMine] = useState(false);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState();
  const [postInfo, setPostInfo] = useState();
  const myTeam = useRecoilValue(myTeamState);
  const user = useRecoilValue(userState);
  const nav = useNavigate();

  useEffect(() => {
    fetch('/data/posts.json')
      .then((res) => res.json())
      .then((data) => setPostInfo(data.postDetail));
  }, []);

  const onEditPost = () => {
    nav(`/myteam/${myTeam.teamId}/board/new`, { state: { postInfo } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // writeComment(content, id, user.token).then((result) => {
    //   setContent('');
    //   if (result.status === 401) {
    //     alert('로그인 후 이용해 주세요!!');
    //     return;
    //   }
    // });
  };

  return (
    <div className={styles.root}>
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
      {/* {isMine && (
        <RoundBtn
          type={'button'}
          text={'수정'}
          fill={false}
          onClick={onEditPost}
        ></RoundBtn>
      )}
      {isMine && (
        <RoundBtn
          type={'button'}
          text={'삭제'}
          fill={true}
          onClick={onDeletePost}
        ></RoundBtn>
      )} */}
    </div>
  );
}
