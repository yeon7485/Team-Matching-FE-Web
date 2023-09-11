import React, { useEffect, useState } from 'react';
import styles from './Board.module.css';
import { Link } from 'react-router-dom';
import Post from '../../components/Post/Post';
import { BiSearch } from 'react-icons/bi';
import { getPosts } from '../../API/TeamMon';
export default function Board() {
  const [search, setSearch] = useState();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const [post, setPost] = useState();
  useEffect(() => {
    getPosts(0, 15).then((result) => {
      setPost(result.data.resultData);
    });
  }, []);
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
          {post &&
            post.content.map((post) => <Post key={post.id} post={post} />)}
        </ul>
      </section>
      <Link to='new' state={{}} className={styles.writeLink}>
        글쓰기
      </Link>
    </div>
  );
}
