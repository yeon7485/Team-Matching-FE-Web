import React, { useEffect, useState } from 'react';
import styles from './Board.module.css';
import { Link } from 'react-router-dom';
import Post from '../../components/Post/Post';
import { getPosts, getSearchPost } from '../../API/TeamMon';
import Paging from '../../components/ui/Paging/Paging';
export default function Board() {
  const [search, setSearch] = useState();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(-1);
  const [post, setPost] = useState();
  useEffect(() => {
    getPosts(page - 1, 15).then((result) => {
      setPost(result.data.resultData);
      setTotalElements(result.data.resultData.totalElements);
    });
  }, [page]);
  const handleSubmit = (e) => {
    e.preventDefault();
    getSearchPost(search, 0, 15).then((result) => {
      setPost(result.data.resultData);
      setTotalElements(result.data.resultData.totalElements);
    });
  };
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>자유게시판</h1>
      <hr />
      <div className={styles.searchBox}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input
            type='text'
            name='search'
            id='search'
            value={search}
            className={styles.inputSearch}
            placeholder='제목, 태그, 작성자 검색 ...'
            onChange={handleChange}
          />
        </form>
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
            post.content.map((post) => (
              <Post key={post.id} post={post} teamOnly={false} onClick />
            ))}
        </ul>
      </section>
      <Link to='new' state={{}} className={styles.writeLink}>
        글쓰기
      </Link>
      <div className={styles.pageArea}>
        {totalElements !== 0 && (
          <Paging
            page={page}
            totalElements={totalElements}
            size={15}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
}
