import React, { useState } from 'react';
import styles from './Board.module.css';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPosts, getSearchPost } from 'api/TeamMon';
import Post from 'components/Post/Post';
import Paging from 'ui/Paging/Paging';
import Loading from 'ui/Loading/Loading';
import NotFound from '../NotFound/NotFound';
import { GoPencil } from 'react-icons/go';

export default function Board() {
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(-1);
  const nav = useNavigate();

  const {
    isLoading,
    error,
    data: post,
  } = useQuery(['getPosts'], () => {
    return getPosts(page - 1, 15).then((data) => {
      setTotalElements(data.totalElements);
      return data;
    });
  });

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getSearchPost(search, 0, 15).then((result) => {
      setTotalElements(result.data.resultData.totalElements);
    });
  };

  const handleWriteClick = () => {
    nav('new', { state: {} });
  };

  if (isLoading || totalElements === -1) return <Loading />;
  if (error) return <NotFound />;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>자유게시판</h1>
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
              post.content.map((post) => <Post key={post.id} post={post} />)}
          </ul>
        </section>
        <div className={styles.writeBtn} onClick={handleWriteClick}>
          <GoPencil className={styles.writeIcon} />
          <p>글쓰기</p>
        </div>
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
    </div>
  );
}
