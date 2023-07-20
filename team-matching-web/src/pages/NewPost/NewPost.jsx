import React, { useState } from 'react';
import styles from './NewPost.module.css';
import RoundBtn from '../../components/ui/RoundBtn/RoundBtn';
import { useNavigate } from 'react-router-dom';

export default function NewPost() {
  const [post, setPost] = useState({
    title: '',
    contents: '',
    tag: '',
    team: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPost((post) => ({ ...post, [e.target.name]: e.target.value }));
  };

  const cancelClick = () => {
    if (
      window.confirm(
        '작성 중인 글을 취소하시겠습니까? \n확인 선택 시, 작성된 글은 저장되지 않습니다.'
      ) == true
    ) {
      navigate(-1);
    }
  };

  const addPostClick = (e) => {
    console.log(e.target.text);
    if (post.title.trim() === '') {
      alert('제목을 입력해주세요.');
      return;
    }
    if (post.contents.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    if (post.tag.trim() === '') {
      alert('태그를 입력해주세요.');
      return;
    }
    if (post.title.length > 40) {
      alert('제목은 30글자를 넘을 수 없습니다.');
      return;
    }
    if (post.tag.length > 10) {
      alert('태그는 10글자를 넘을 수 없습니다.');
      return;
    }
    console.log(post);
    alert('등록되었습니다.');
    navigate(`/board`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.title}>자유게시판</h1>
        <button className={styles.list}>목록</button>
      </div>
      <hr />
      <div className={styles.write}>
        <p className={styles.subTitle}>제목</p>
        <input
          type='text'
          name='title'
          placeholder='제목을 입력해주세요.'
          required
          onChange={handleChange}
          className={styles.input}
        ></input>
        <p className={styles.subTitle}>내용</p>
        <textarea
          name='contents'
          wrap='hard'
          placeholder='내용을 입력해주세요.'
          required
          onChange={handleChange}
          className={`${styles.input} ${styles.textArea}`}
        ></textarea>
        <p className={styles.subTitle}>태그</p>
        <input
          type='text'
          name='tag'
          placeholder='태그를 입력해주세요.'
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
          <RoundBtn text={'취소'} fill={false} onClick={cancelClick} />
          <div className={styles.space} />
          <RoundBtn text={'등록'} fill={true} onClick={addPostClick} />
        </div>
      </div>
    </div>
  );
}
