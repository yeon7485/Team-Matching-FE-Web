import React, { useState } from 'react';
import styles from './Board.module.css';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPosts, getSearchPosts } from 'api/TeamMon';
import Post from 'components/Post/Post';
import Paging from 'ui/Paging/Paging';
import Loading from 'ui/Loading/Loading';
import NotFound from '../NotFound/NotFound';
import { GoPencil } from 'react-icons/go';

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(-1);
  const [isSearch, setIsSearch] = useState(false);
  const nav = useNavigate();

  const { isLoading, error } = useQuery(
    ['getPosts', page - 1],
    () => {
      return getPosts(page - 1, 15).then((data) => {
        console.log('getPost query');
        setPosts(data);
        setTotalElements(data.totalElements);
        return data;
      });
    },
    {
      enabled: !isSearch,
    }
  );

  const { isLoading: isSearchLoading, error: searchError } = useQuery(
    ['getSearchPosts', search, page - 1],
    () => {
      return getSearchPosts(search, page - 1, 15).then((data) => {
        setTotalElements(data.totalElements);
        setPosts(data);

        return data;
      });
    },
    {
      enabled: isSearch,
    }
  );

  const handleChange = (e) => {
    setSearch(e.target.value.trim());
    setIsSearch(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSearch(true);
  };

  const handleWriteClick = () => {
    nav('new', { state: {} });
  };

  if (
    totalElements === -1 ||
    (!isSearch && isLoading) ||
    (isSearch && isSearchLoading)
  )
    return <Loading />;

  if ((!isSearch && error) || (isSearch && searchError)) return <NotFound />;

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
        {posts && totalElements === 0 && (
          <p className={styles.noPost}>게시글이 존재하지 않습니다.</p>
        )}
        {posts && totalElements > 0 && (
          <section className={styles.boardList}>
            <header className={styles.boardHeader}>
              <div className={styles.item}>번호</div>
              <div className={styles.item}>제목</div>
              <div className={styles.item}>태그</div>
              <div className={styles.item}>작성자</div>
              <div className={styles.item}>날짜</div>
            </header>
            <ul className={styles.boardUl}>
              {posts &&
                posts.content.map((post) => <Post key={post.id} post={post} />)}
            </ul>
          </section>
        )}
        <div className={styles.writeBtn} onClick={handleWriteClick}>
          <GoPencil className={styles.writeIcon} />
          <p>글쓰기</p>
        </div>
        <div className={styles.pageArea}>
          {totalElements > 0 && (
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
