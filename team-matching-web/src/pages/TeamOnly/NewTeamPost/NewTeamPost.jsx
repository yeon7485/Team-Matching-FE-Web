import React, { useState } from 'react';
import styles from './NewTeamPost.module.css';
import RoundBtn from '../../../components/ui/RoundBtn/RoundBtn';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { myTeamState } from '../../../Recoil/state';

export default function NewTeamPost({ postInfo }) {
  const [post, setPost] = useState({
    title: (postInfo && postInfo.title) || '',
    contents: (postInfo && postInfo.content) || '',
    tag: (postInfo && postInfo.hashtag) || '',
    team: '',
  });

  const nav = useNavigate();
  const myTeam = useRecoilValue(myTeamState);

  const handleChange = (e) => {
    setPost((post) => ({ ...post, [e.target.name]: e.target.value }));
  };

  const onListClick = () => {
    nav(`/myteam/${myTeam.teamId}/board`);
  };
  const onCancelClick = () => {
    if (
      window.confirm(
        '작성 중인 글을 취소하시겠습니까? \n확인 선택 시, 작성된 글은 저장되지 않습니다.'
      ) === true
    ) {
      nav(`/myteam/${myTeam.teamId}/board`);
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
    console.log('팀 전용 게시판 새글 작성 성공~!');
  };

  const onEditClick = () => {
    if (post.title.length > 40) {
      alert('제목은 30글자를 넘을 수 없습니다.');
      return;
    }
    if (post.tag.length > 10) {
      alert('태그는 10글자를 넘을 수 없습니다.');
      return;
    }
    console.log('팀 전용 게시판 글 수정!');
  };
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p className={styles.title}>새 글 쓰기</p>
        <button className={styles.listBtn} onClick={onListClick}>
          목록
        </button>
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
        <div className={styles.btnArea}>
          <RoundBtn
            type={'button'}
            text={'취소'}
            fill={false}
            onClick={onCancelClick}
          />
          <div className={styles.space} />
          {!postInfo && <RoundBtn text={'등록'} fill={true} />}
          {postInfo && (
            <RoundBtn
              type={'button'}
              text={'수정'}
              fill={true}
              onClick={onEditClick}
            />
          )}
        </div>
      </form>
    </div>
  );
}
