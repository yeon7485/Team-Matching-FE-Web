import React, { useState, useEffect } from 'react';
import styles from './FindTeam.module.css';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { getTeamList } from '../../API/TeamMon';
import TeamCard from '../../components/TeamCard/TeamCard';
import classNames from 'classnames/bind';
import Paging from '../../components/ui/Paging/Paging';
import Loading from '../../components/ui/Loading/Loading';
import NotFound from '../NotFound/NotFound';

export default function FindTeam() {
  const [team, setTeam] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [search, setSearch] = useState();
  const [category, setCategory] = useState('ALL');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(0);
  const [totalElements, setTotalElements] = useState(-1);
  const [total, setTotal] = useState(0);
  const cn = classNames.bind(styles);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    getTeamList(page - 1)
      .then((result) => {
        console.log(result);
        setTeam(result.content);
        setSize(result.size);
        setTotalElements(result.totalElements);
      })
      .catch((e) => setError(e))
      .finally(() => {
        setLoading(false);
        setTotal(totalElements);
      });
    return () => {
      console.log('clean');
    };
  }, [page]);

  // useEffect(() => {
  //   if (category !== 'ALL') {
  //     const newTeam = team.filter((team) => team.category == category);
  //     setTotal(newTeam.length);
  //   } else {
  //     setTotal(totalElements);
  //   }
  //   console.log(total);
  // }, [category]);

  const onCategoryClick = (e) => {
    const cat = e.target.value;
    setCategory(cat);
    setPage(1);
    if (category !== 'ALL') {
      const newTeam = team.filter((team) => team.category == cat);
      setTotal(newTeam.length);
    } else {
      setTotal(totalElements);
    }
    console.log(total);
  };

  if (loading) return <Loading />;
  if (error) return <NotFound />;

  return (
    <div className={styles.root}>
      <section className={styles.topBar}>
        <div className={styles.category}>
          <button
            value='ALL'
            className={cn(
              'categoryBtn',
              `${category === 'ALL' ? 'black' : ''}`
            )}
            onClick={onCategoryClick}
          >
            전체
          </button>
          <button
            value='DEVELOPMENT'
            className={cn(
              'categoryBtn',
              `${category === 'DEVELOPMENT' ? 'blue' : ''}`
            )}
            onClick={onCategoryClick}
          >
            개발
          </button>
          <button
            value='HOBBY'
            className={cn(
              'categoryBtn',
              `${category === 'HOBBY' ? 'green' : ''}`
            )}
            onClick={onCategoryClick}
          >
            취미
          </button>
          <button
            value='SPORT'
            className={cn(
              'categoryBtn',
              `${category === 'SPORT' ? 'red' : ''}`
            )}
            onClick={onCategoryClick}
          >
            스포츠
          </button>
          <button
            value='GAME'
            className={cn(
              'categoryBtn',
              `${category === 'GAME' ? 'pink' : ''}`
            )}
            onClick={onCategoryClick}
          >
            게임
          </button>
        </div>

        <div className={styles.rightBox}>
          <div className={styles.selectBox}>
            <select className={styles.searchSelect}>
              <option value='title'>카테고리</option>
              <option value='content'>제목</option>
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
          <Link to='/newteam' className={styles.createBtn} state={{}}>
            팀 만들기
          </Link>
        </div>
      </section>
      <section className={styles.teamList}>
        {team &&
          getFilteredItems(team, category).map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        {team && totalElements === 0 && (
          <p className={styles.empty}>팀이 존재하지 않습니다.</p>
        )}
        {category !== 'ALL' &&
          getFilteredItems(team, category).length === 0 && (
            <p className={styles.empty}>팀이 존재하지 않습니다.</p>
          )}
      </section>
      <div className={styles.pageArea}>
        <Paging
          page={page}
          totalElements={category === 'ALL' ? totalElements : total}
          size={size}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

function getFilteredItems(team, filter) {
  if (filter === 'ALL') {
    return team;
  }
  return team.filter((team) => team.category === filter);
}
