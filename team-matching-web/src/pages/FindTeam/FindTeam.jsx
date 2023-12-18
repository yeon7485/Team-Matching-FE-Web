import React, { useState } from 'react';
import styles from './FindTeam.module.css';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  getCategoryTeamList,
  getSearchTeamList,
  getTeamList,
} from 'api/TeamMon';
import TeamCard from 'components/TeamCard/TeamCard';
import classNames from 'classnames/bind';
import Paging from 'ui/Paging/Paging';
import Loading from 'ui/Loading/Loading';
import NotFound from '../NotFound/NotFound';

export default function FindTeam() {
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState();
  const [category, setCategory] = useState('ALL');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(9);
  const [totalElements, setTotalElements] = useState(-1);

  const cn = classNames.bind(styles);

  const {
    isLoading,
    error,
    data: teams,
  } = useQuery(
    ['teams', page],
    () => {
      return getTeamList(page - 1, 9).then((data) => {
        setTotalElements(data.totalElements);
        setIsSearch(false);
        return data.content;
      });
    },
    {
      enabled: category === 'ALL',
    }
  );

  const {
    isLoadingCat,
    errorCat,
    data: categoryTeams,
  } = useQuery(
    ['teams', { category: `${category}` }, page],
    () => {
      return getCategoryTeamList(page - 1, category).then((data) => {
        setTotalElements(data.totalElements);
        return data.content;
      });
    },
    { enabled: category !== 'ALL' }
  );

  const { data: searchTeams } = useQuery(
    ['teams', 'search', search, page],
    () => {
      return getSearchTeamList(search, page - 1, 9).then((data) => {
        setTotalElements(data.totalElements);
        console.log(data);
        return data.content;
      });
    },
    {
      enabled: isSearch,
    }
  );
  const handleSearchChange = (e) => {
    setSearch(e.target.value);

    if (e.target.value === '') {
      setIsSearch(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearch(true);
  };
  console.log(isSearch);

  const onCategoryClick = (e) => {
    const cat = e.target.value;
    setCategory(cat);
    setPage(1);
    setIsSearch(false);
    setSearch('');
  };

  if (isLoading || isLoadingCat) return <Loading />;
  if (error || errorCat) return <NotFound />;
  console.log(totalElements);
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
          <div className={styles.searchBox}>
            <form onSubmit={handleSearchSubmit}>
              <input
                type='text'
                name='search'
                id='search'
                value={search || ''}
                className={styles.inputSearch}
                onChange={handleSearchChange}
                placeholder='제목, 작성자, 태그 검색...'
              />
            </form>
          </div>
          <Link to='/teams/new' className={styles.createBtn} state={{}}>
            팀 만들기
          </Link>
        </div>
      </section>
      <section className={styles.teamList}>
        {console.log(isSearch, teams)}
        {console.log(category, categoryTeams)}
        {teams &&
          !isSearch &&
          category === 'ALL' &&
          teams.map((team) => <TeamCard key={team.id} team={team} />)}
        {categoryTeams &&
          !isSearch &&
          category !== 'ALL' &&
          categoryTeams.map((team) => <TeamCard key={team.id} team={team} />)}
        {searchTeams &&
          isSearch &&
          searchTeams.map((team) => <TeamCard key={team.id} team={team} />)}
        {teams && totalElements === 0 && (
          <p className={styles.empty}>팀이 존재하지 않습니다.</p>
        )}
      </section>
      <div>
        {console.log('total', totalElements)}
        {totalElements > 0 && (
          <Paging
            page={page}
            totalElements={totalElements}
            size={size}
            setPage={setPage}
          />
        )}
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
