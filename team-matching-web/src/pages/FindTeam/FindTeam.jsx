import React from 'react';
import styles from './FindTeam.module.css';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import TeamCard from '../../components/TeamCard/TeamCard';
import classNames from 'classnames/bind';

export default function FindTeam() {
  const team = [
    {
      id: 1,
      category: '개발',
      time: '5분 전',
      date: '6.30',
      title: '사이드 프로젝트 팀원 찾아요',
      nickname: '닉네임',
      tag: '프로젝트',
      count: '1 / 5',
      contents: `안녕하세요! 같이 사이드 프로젝트 할 팀원 찾아요
        스터디 주제 : 고양이를 모시는 집사들을 위한 고양이 울음소리를 분석하는 서비스 
        스터디 목표 : 먀먀먀먀먀먀먀먀먀먀
        예상 커리큘럼 간략히 : 개발 7주
        
        대면으로 모여서 모각코도 하고 고양이 자랑 타임도 가져봐요!
        귀여운 제 고양이 사진 보고 가세요
        https://open.kakao.com/cuttycat
        
        프론트 2명, 백엔드 2명 모집합니다`,
    },
    {
      id: 2,
      category: '취미',
      time: '17분 전',
      date: '7.15',
      title: '뜨개모임 구해요',
      nickname: '닉네임123',
      tag: '뜨개질',
      count: '2 / 4',
    },
    {
      id: 3,
      category: '스포츠',
      time: '1시간 전',
      date: '7.4',
      title: '6대6 풋살할 사람 구해요',
      nickname: '닉네임닉네임',
      tag: '풋살',
      count: '5 / 12',
    },
    {
      id: 4,
      category: '게임',
      time: '16시간 전',
      date: '6.28',
      title: '롤 다이아큐 듀오할 사람',
      nickname: '닉네임123',
      tag: '롤',
      count: '1 / 2',
    },
    {
      id: 5,
      category: '게임',
      time: '16시간 전',
      date: '6.28',
      title: '롤 다이아큐 듀오할 사람',
      nickname: '닉네임123',
      tag: '롤',
      count: '1 / 2',
    },
    {
      id: 6,
      category: '게임',
      time: '16시간 전',
      date: '6.28',
      title: '롤 다이아큐 듀오할 사람',
      nickname: '닉네임123',
      tag: '롤',
      count: '1 / 2',
    },
    {
      id: 7,
      category: '게임',
      time: '16시간 전',
      date: '6.28',
      title: '롤 다이아큐 듀오할 사람',
      nickname: '닉네임123',
      tag: '롤',
      count: '1 / 2',
    },
  ];

  const [search, setSearch] = useState();
  const [current, setCurrent] = useState('전체');
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const cn = classNames.bind(styles);

  return (
    <div className={styles.root}>
      <section className={styles.topBar}>
        <div className={styles.category}>
          <button
            className={cn(
              'categoryBtn',
              `${current === '전체' ? 'black' : ''}`
            )}
            onClick={() => {
              setCurrent('전체');
            }}
          >
            전체
          </button>
          <button
            className={cn('categoryBtn', `${current === '개발' ? 'blue' : ''}`)}
            onClick={() => {
              setCurrent('개발');
            }}
          >
            개발
          </button>
          <button
            className={cn(
              'categoryBtn',
              `${current === '취미' ? 'green' : ''}`
            )}
            onClick={() => {
              setCurrent('취미');
            }}
          >
            취미
          </button>
          <button
            className={cn(
              'categoryBtn',
              `${current === '스포츠' ? 'red' : ''}`
            )}
            onClick={() => {
              setCurrent('스포츠');
            }}
          >
            스포츠
          </button>
          <button
            className={cn('categoryBtn', `${current === '게임' ? 'pink' : ''}`)}
            onClick={() => {
              setCurrent('게임');
            }}
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
          <Link to='/newteam' className={styles.createBtn}>
            팀 만들기
          </Link>
        </div>
      </section>
      <section className={styles.teamList}>
        {team && team.map((team) => <TeamCard key={team.key} team={team} />)}
      </section>
    </div>
  );
}
