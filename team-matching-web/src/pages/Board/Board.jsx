import React, { useState } from 'react';
import styles from './Board.module.css';
import { Link } from 'react-router-dom';
import Post from '../../components/Post/Post';
import { BiSearch } from 'react-icons/bi';
export default function Board() {
  const [search, setSearch] = useState();
  console.log(search);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const [post, setPost] = useState([
    {
      num: '1',
      title: '자유게시판 글 제목입니다.',
      tag: '#태그',
      name: '닉네임',
      date: '2023-07-06',
      content:
        '로렘 입숨(lorem ipsum; 줄여서 립숨, lipsum)은 출판이나 그래픽 디자인 분야에서 폰트, 타이포그래피, 레이아웃 같은 그래픽 요소나 시각적 연출을 보여줄 때 사용하는 표준 채우기 텍스트로, 최종 결과물에 들어가는 실제적인 문장 내용이 채워지기 전에 시각 디자인 프로젝트 모형의 채움 글로도 이용된다. 이런 용도로 사용할 때 로렘 입숨을 그리킹(greeking)이라고도 부르며, 때로 로렘 입숨은 공간만 차지하는 무언가를 지칭하는 용어로도 사용된다.',
    },
    {
      num: '2',
      title: '자유게시판 글 제목입니다.123123123',
      tag: '#태그',
      name: '닉네임123',
      date: '2023-07-06',
    },
    {
      num: '3',
      title: '자유게시판 글 제목입니다.123123123',
      tag: '#태그',
      name: '닉네임123',
      date: '2023-07-06',
    },
    {
      num: '4',
      title: '자유게시판 글 제목입니다.123123123',
      tag: '#태그',
      name: '닉네임123',
      date: '2023-07-06',
    },
    {
      num: '5',
      title: '자유게시판 글 제목입니다.123123123',
      tag: '#태그',
      name: '닉네임123',
      date: '2023-07-06',
    },
    {
      num: '6',
      title: '자유게시판 글 제목입니다.123123123',
      tag: '#태그',
      name: '닉네임123',
      date: '2023-07-06',
    },
    {
      num: '7',
      title: '자유게시판 글 제목입니다.123123123',
      tag: '#태그',
      name: '닉네임123',
      date: '2023-07-06',
    },
    {
      num: '8',
      title: '자유게시판 글 제목입니다.123123123',
      tag: '#태그',
      name: '닉네임123',
      date: '2023-07-06',
    },
    {
      num: '9',
      title: '자유게시판 글 제목입니다.123123123',
      tag: '#태그',
      name: '닉네임123',
      date: '2023-07-06',
    },
    {
      num: '10',
      title: '자유게시판 글 제목입니다.123123123',
      tag: '#태그',
      name: '닉네임123',
      date: '2023-07-06',
    },
  ]);
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>자유게시판</h1>
      <hr />
      <div className={styles.searchBox}>
        <select>
          <option value='title'>제목</option>
          <option value='content'>내용</option>
          <option value='name'>작성자</option>
          <option value='tag'>태그</option>
        </select>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type='text'
            name='search'
            id='search'
            value={search}
            className={styles.inputSearch}
            onChange={handleChange}
          />
        </form>
        <BiSearch className={styles.searchBtn} />
      </div>
      <section className={styles.boardList}>
        <header className={styles.boardHeader}>
          <div className={styles.item}>번호</div>
          <div className={styles.item}>제목</div>
          <div className={styles.item}>태그</div>
          <div className={styles.item}>작성자</div>
          <div className={styles.item}>날짜</div>
        </header>
        <ul className={styles.boardUl}>
          {post && post.map((post) => <Post key={post.number} post={post} />)}
        </ul>
      </section>
      <Link to='#' className={styles.writeLink}>
        글쓰기
      </Link>
    </div>
  );
}
