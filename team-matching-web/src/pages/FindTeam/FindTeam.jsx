import React, { useState, useEffect } from 'react';
import styles from './FindTeam.module.css';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { getCategoryTeamList, getTeamList } from '../../API/TeamMon';
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
  const [size, setSize] = useState(9);
  const [totalElements, setTotalElements] = useState(-1);
  const [total, setTotal] = useState(-1);

  const cn = classNames.bind(styles);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    if (category === 'ALL') {
      getTeamList(page - 1)
        .then((result) => {
          setTeam(result.content);
          setSize(result.size);
          setTotalElements(result.totalElements);
          setTotal(result.totalElements);
        })
        .catch((e) => setError(e))
        .finally(() => {
          setLoading(false);
        });
      return () => {
        console.log('clean');
      };
    } else {
      getCategoryTeamList(page - 1, category)
        .then((result) => {
          setTeam(result.content);
          setSize(result.size);
          setTotalElements(result.totalElements);
          setTotal(result.totalElements);
        })
        .catch((e) => setError(e))
        .finally(() => {
          setLoading(false);
        });
      return () => {
        console.log('clean');
      };
    }
  }, [page]);

  useEffect(() => {
    console.log(category);
    console.log('page', page);
    if (category === 'ALL') {
      getTeamList(page - 1)
        .then((result) => {
          setTeam(result.content);
          setSize(result.size);
          setTotalElements(result.totalElements);
          setTotal(result.totalElements);
        })
        .catch((e) => setError(e))
        .finally(() => {
          setLoading(false);
        });
      return () => {
        console.log('clean');
      };
    } else {
      getCategoryTeamList(page - 1, category)
        .then((result) => {
          setTeam(result.content);
          setSize(result.size);
          setTotalElements(result.totalElements);
          setTotal(result.totalElements);
        })
        .catch((e) => setError(e))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [category]);

  const onCategoryClick = (e) => {
    const cat = e.target.value;
    setCategory(cat);
    setPage(1);
    setLoading(true);
    // if (cat !== 'ALL') {
    //   const newTeam = team.filter((team) => team.category == cat);
    //   console.log('team len', team.length);
    //   console.log(newTeam.length);
    //   setTotal(newTeam.length);
    // } else {
    //   setTotal(totalElements);
    // }
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
          <div className={styles.searchBox}>
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
              <BiSearch className={styles.searchBtn} />
            </form>
          </div>
          <Link to='/teams/new' className={styles.createBtn} state={{}}>
            팀 만들기
          </Link>
        </div>
      </section>
      <section className={styles.teamList}>
        {
          team && team.map((team) => <TeamCard key={team.id} team={team} />)
          // getFilteredItems(team, category).map((team) => (
          //   <TeamCard key={team.id} team={team} />
          // ))
        }
        {team && totalElements === 0 && (
          <p className={styles.empty}>팀이 존재하지 않습니다.</p>
        )}
        {totalElements > 0 &&
          category !== 'ALL' &&
          getFilteredItems(team, category).length === 0 && (
            <p className={styles.empty}>팀이 존재하지 않습니다.</p>
          )}
      </section>
      <div>
        {console.log('total', total)}
        {total > 0 && (
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
