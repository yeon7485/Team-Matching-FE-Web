import React, { useEffect, useState } from 'react';
import styles from './NewTeam.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'Recoil/state';
import { createTeam, updateTeam } from 'api/TeamMon';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import RoundBtn from 'ui/RoundBtn/RoundBtn';
import classNames from 'classnames/bind';

export default function NewTeam() {
  const {
    state: { team, myTeam },
  } = useLocation();
  const [newTeam, setNewTeam] = useState({
    category: '',
    title: '',
    description: '',
    tag: '',
    deadline: '',
    capacity: 2,
    total: 1,
  });
  const nav = useNavigate();
  const cn = classNames.bind(styles);
  const userToken = useRecoilValue(userState).token;
  const today = dateToString(new Date());
  const queryClient = useQueryClient();
  const addTeam = useMutation(
    ({ newTeam, userToken }) => createTeam(newTeam, userToken),
    {
      onSuccess: () => queryClient.invalidateQueries(['teams', 0]),
    }
  );

  const editTeam = useMutation(
    ({ newTeam, userToken }) => updateTeam(team.id, newTeam, userToken),
    {
      onSuccess: () => queryClient.invalidateQueries(['teamDetail', team.id]),
    }
  );

  // [TeamDeatil -> 수정]일 떄
  useEffect(() => {
    if (team) {
      setNewTeam((newTeam) => ({
        ...newTeam,
        category: team.category,
        title: team.name,
        description: team.description,
        tag: team.hashtag,
        deadline: team.deadline.replace('T', ' ').substring(0, 16),
        capacity: team.capacity,
      }));
    }
  }, [team]);

  // input onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'date') {
      var date = new Date(e.target.value);
      date.setHours(date.getHours() + 23);
      date = date.toISOString().replace('T', ' ').substring(0, 16);
      setNewTeam((team) => ({ ...team, deadline: date }));
      return;
    }
    setNewTeam((team) => ({ ...team, [name]: value }));
  };

  const handleCounter = (type) => {
    if (type === 'minus' && newTeam.capacity > 2) {
      setNewTeam((team) => ({
        ...team,
        capacity: team.capacity - 1,
      }));
    }
    if (type === 'plus') {
      setNewTeam((team) => ({
        ...team,
        capacity: team.capacity + 1,
      }));
    }
  };

  // 취소 버튼
  const handleCancelClick = () => {
    if (
      window.confirm(
        '취소하시겠습니까? \n확인 선택 시, 작성된 내용은 저장되지 않습니다.'
      ) === true
    ) {
      if (myTeam) nav(`/myteam/${team.id}/info`, { replace: true });
      else nav(-1, { replace: true });
    }
  };

  // 등록 버튼
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleAddClick = () => {
    if (checkForm(newTeam)) {
      addTeam.mutate(
        { newTeam, userToken },
        {
          onSuccess: () => {
            alert('등록되었습니다.');
            nav('/teams', { replace: true });
          },
        }
      );
    }
  };

  const handleEditClick = () => {
    if (checkForm(newTeam)) {
      editTeam.mutate(
        { newTeam, userToken },
        {
          onSuccess: () => {
            if (myTeam) nav(`/myteam/${team.id}/info`, { replace: true });
            else {
              nav(-1, { replace: true });
            }
          },
        }
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.title}>
          {team ? '팀 새로 만들기' : '팀 수정하기'}
        </h1>
        {!team && (
          <button
            className={styles.list}
            onClick={() => {
              nav(`/teams`, { replace: true });
            }}
          >
            목록
          </button>
        )}
      </div>
      <hr />
      <div className={styles.write} onSubmit={handleSubmit}>
        <p className={styles.subTitle}>카테고리</p>
        <div className={styles.category}>
          <button
            type='button'
            className={cn(
              'categoryBtn',
              `${newTeam.category === 'DEVELOPMENT' ? 'blue' : ''}`
            )}
            onClick={() => {
              setNewTeam((team) => ({ ...team, category: 'DEVELOPMENT' }));
            }}
          >
            개발
          </button>
          <button
            type='button'
            className={cn(
              'categoryBtn',
              `${newTeam.category === 'HOBBY' ? 'green' : ''}`
            )}
            onClick={() => {
              setNewTeam((team) => ({ ...team, category: 'HOBBY' }));
            }}
          >
            취미
          </button>
          <button
            type='button'
            className={cn(
              'categoryBtn',
              `${newTeam.category === 'SPORT' ? 'red' : ''}`
            )}
            onClick={() => {
              setNewTeam((team) => ({ ...team, category: 'SPORT' }));
            }}
          >
            스포츠
          </button>
          <button
            type='button'
            className={cn(
              'categoryBtn',
              `${newTeam.category === 'GAME' ? 'pink' : ''}`
            )}
            onClick={() => {
              setNewTeam((team) => ({ ...team, category: 'GAME' }));
            }}
          >
            게임
          </button>
        </div>

        <div className={styles.mid}>
          <div>
            <p className={styles.subTitle}>마감일</p>
            <input
              type='date'
              name='date'
              required
              min={today}
              onChange={handleChange}
              className={styles.date}
              value={team && dateToString(new Date(newTeam.deadline))}
            />
          </div>
          <div className={styles.total}>
            <p className={styles.subTitle}>팀 인원</p>
            <div className={styles.count}>
              <AiOutlineMinusCircle
                className={styles.btn}
                onClick={() => {
                  handleCounter('minus');
                }}
              />
              <p className={styles.num}>{newTeam.capacity}</p>
              <AiOutlinePlusCircle
                className={styles.btn}
                onClick={() => {
                  handleCounter('plus');
                }}
              />
            </div>
          </div>
        </div>
        <p className={styles.subTitle}>제목</p>
        <input
          type='text'
          name='title'
          value={newTeam.title || ''}
          placeholder='제목을 입력해주세요.'
          required
          className={styles.input}
          onChange={handleChange}
        />
        <p className={styles.subTitle}>내용</p>
        <textarea
          name='description'
          wrap='hard'
          value={newTeam.description || ''}
          placeholder='내용을 입력해주세요.'
          required
          className={`${styles.input} ${styles.textArea}`}
          onChange={handleChange}
        />
        <p className={styles.subTitle}>태그</p>
        <input
          type='text'
          name='tag'
          value={newTeam.tag ?? ''}
          placeholder='태그를 입력해주세요.'
          required
          className={styles.input}
          onChange={handleChange}
        />
        <div className={styles.btnArea}>
          <RoundBtn
            type={'button'}
            text={'취소'}
            fill={false}
            onClick={handleCancelClick}
          />
          <div className={styles.space} />
          {!team && (
            <RoundBtn
              type={'button'}
              text={'등록'}
              fill={true}
              onClick={handleAddClick}
            />
          )}
          {team && (
            <RoundBtn
              type={'button'}
              text={'수정'}
              fill={true}
              onClick={handleEditClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function dateToString(date) {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
}

function checkForm(team) {
  if (team.category === '') {
    alert('카테고리를 선택하세요.');
    return false;
  }
  if (team.title.length > 40) {
    alert('제목은 30글자를 넘을 수 없습니다.');
    return false;
  }
  if (team.tag.length > 10) {
    alert('태그는 10글자를 넘을 수 없습니다.');
    return false;
  }
  return true;
}
