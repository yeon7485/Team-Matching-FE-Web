import React, { useState } from 'react';
import styles from './NewTeam.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import RoundBtn from '../../components/ui/RoundBtn/RoundBtn';
import classNames from 'classnames/bind';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { createTeam, editTeam } from '../../API/TeamMon';
import { useRecoilValue } from 'recoil';
import { userState } from '../../Recoil/state';

export default function NewTeam() {
  const {
    state: { team },
  } = useLocation();
  const [newTeam, setNewTeam] = useState({
    category: (team && team.category) || '',
    title: (team && team.name) || '',
    description: (team && team.description) || '',
    tag: (team && team.hashtag) || '',
    deadline: (team && team.deadline.replace('T', ' ')) || '',
    capacity: (team && team.capacity) || 1,
    total: 1,
  });

  const navigate = useNavigate();
  const cn = classNames.bind(styles);
  const user = useRecoilValue(userState);

  const today = dateToString(new Date());

  // input onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    if (name === 'date') {
      var date = new Date(e.target.value);
      date.setHours(date.getHours() + 23);
      date = date.toISOString().replace('T', ' ').substring(0, 16);
      console.log(date);
      setNewTeam((team) => ({ ...team, deadline: date }));
      return;
    }
    setNewTeam((team) => ({ ...team, [name]: value }));
  };

  // 취소 버튼
  const cancelClick = () => {
    if (
      window.confirm(
        '취소하시겠습니까? \n확인 선택 시, 작성된 내용은 저장되지 않습니다.'
      ) === true
    ) {
      navigate(-1);
    }
  };

  // 등록 버튼
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkForm(newTeam)) {
      createTeam(newTeam, user.token).then((result) => {
        if (result === 200) {
          navigate('/findteam');
        }
      });
      console.log(newTeam);
      alert('등록되었습니다.');
      navigate(`/findteam`);
    }
  };

  const onEditTeam = () => {
    console.log(checkForm(newTeam));
    if (checkForm(newTeam)) {
      console.log(newTeam.deadline);
      console.log(newTeam);
      editTeam(team.id, newTeam, user.token).then((result) => {
        console.log(result);
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.title}>팀 새로 만들기</h1>
        <button className={styles.list}>목록</button>
      </div>
      <hr />
      <form className={styles.write} onSubmit={handleSubmit}>
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
                  setNewTeam((team) => ({
                    ...team,
                    capacity: team.capacity - 1,
                  }));
                }}
              />
              <p className={styles.num}>{newTeam.capacity}</p>
              <AiOutlinePlusCircle
                className={styles.btn}
                onClick={() => {
                  setNewTeam((team) => ({
                    ...team,
                    capacity: team.capacity + 1,
                  }));
                }}
              />
            </div>
          </div>
        </div>
        <p className={styles.subTitle}>제목</p>
        <input
          type='text'
          name='title'
          value={newTeam.title ?? ''}
          placeholder='제목을 입력해주세요.'
          required
          className={styles.input}
          onChange={handleChange}
        />
        <p className={styles.subTitle}>내용</p>
        <textarea
          name='description'
          wrap='hard'
          value={newTeam.description ?? ''}
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
            onClick={cancelClick}
          />
          <div className={styles.space} />
          {!team && <RoundBtn type={'submit'} text={'등록'} fill={true} />}
          {team && (
            <RoundBtn
              type={'button'}
              text={'수정'}
              fill={true}
              onClick={onEditTeam}
            />
          )}
        </div>
      </form>
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
