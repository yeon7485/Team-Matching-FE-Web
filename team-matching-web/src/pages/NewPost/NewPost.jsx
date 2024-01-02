import React, { useState } from 'react';
import styles from './NewPost.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'Recoil/state';
import { editPost, writePost } from 'api/TeamMon';
import RoundBtn from 'ui/RoundBtn/RoundBtn';

export default function NewPost() {
  const {
    state: { postInfo },
  } = useLocation();
  const [post, setPost] = useState({
    title: (postInfo && postInfo.title) || '',
    contents: (postInfo && postInfo.content) || '',
    tag: (postInfo && postInfo.hashtag) || '',
    team: '',
  });
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPost((post) => ({ ...post, [e.target.name]: e.target.value }));
  };

  const cancelClick = () => {
    if (
      window.confirm(
        '작성 중인 글을 취소하시겠습니까? \n확인 선택 시, 작성된 글은 저장되지 않습니다.'
      ) === true
    ) {
      navigate(-1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post.title.length > 40) {
      alert('제목은 30글자를 넘을 수 없습니다.');
      return;
    }
    if (post.tag.length > 10) {
      alert('태그는 10글자를 넘을 수 없습니다.');
      return;
    }
    writePost(post, user.token).then((result) => {
      if (result.status === 200) {
        navigate('/board');
      }
    });
  };

  const editClick = () => {
    if (post.title.length > 40) {
      alert('제목은 30글자를 넘을 수 없습니다.');
      return;
    }
    if (post.tag.length > 10) {
      alert('태그는 10글자를 넘을 수 없습니다.');
      return;
    }
    editPost(postInfo.id, post, user.token).then((result) => {
      if (result.status === 200) {
        navigate('/board');
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.title}>자유게시판</h1>
        <button className={styles.list}>목록</button>
      </div>
      <hr />
      <form className={styles.write} onSubmit={handleSubmit}>
        <p className={styles.subTitle}>제목</p>
        <input
          type='text'
          name='title'
          placeholder='제목을 입력해주세요.'
          value={post.title}
          required
          onChange={handleChange}
          className={styles.input}
        ></input>
        <p className={styles.subTitle}>내용</p>
        <textarea
          name='contents'
          wrap='hard'
          placeholder='내용을 입력해주세요.'
          value={post.contents}
          required
          onChange={handleChange}
          className={`${styles.input} ${styles.textArea}`}
        ></textarea>
        <p className={styles.subTitle}>태그</p>
        <input
          type='text'
          name='tag'
          placeholder='태그를 입력해주세요.'
          value={post.tag}
          required
          onChange={handleChange}
          className={styles.input}
        ></input>
        <p className={styles.subTitle}>참여 중인 팀 태그 (선택)</p>
        <input
          type='text'
          name='team'
          placeholder='내가 참여 중인 팀을 선택해주세요. (하나만 선택 가능)'
          onChange={handleChange}
          className={styles.input}
        ></input>
        <div className={styles.btnArea}>
          <RoundBtn
            type={'button'}
            text={'취소'}
            fill={false}
            onClick={cancelClick}
          />
          <div className={styles.space} />
          {!postInfo && <RoundBtn text={'등록'} fill={true} />}
          {postInfo && (
            <RoundBtn
              type={'button'}
              text={'수정'}
              fill={true}
              onClick={editClick}
            />
          )}
        </div>
      </form>
    </div>
  );
}
