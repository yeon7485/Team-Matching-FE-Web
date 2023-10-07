import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteTeam, getTeamDetail } from '../../API/TeamMon';
import styles from './TeamDetail.module.css';
import classNames from 'classnames/bind';
import ApplyModal from '../../components/ApplyModal/ApplyModal';
import RoundBtn from '../../components/ui/RoundBtn/RoundBtn';
import useCategory from '../../hooks/useCategory';
import Loading from '../../components/ui/Loading/Loading';
import NotFound from './../NotFound/NotFound';
import { userState } from './../../Recoil/state';
import { useRecoilValue } from 'recoil';

export default function TeamDetail() {
  const {
    state: {
      team: { id },
    },
  } = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [team, setTeam] = useState({});
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyListModalOpen, setApplyListModalOpen] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const [closed, setClosed] = useState(false);
  const user = useRecoilValue(userState);
  const nav = useNavigate();
  const today = new Date();

  useEffect(() => {
    setLoading(true);
    getTeamDetail(id)
      .then((result) => {
        setTeam(result);
        if (result.adminUserAccountDto.userId === user.userId) {
          setIsMine(true);
        }
        if (
          result.capacity === result.total ||
          today > new Date(result.deadline)
        ) {
          setClosed(true);
        }
      })
      .catch((e) => setError(e))
      .finally(() => {
        setLoading(false);
      });
    return () => {
      console.log('clean');
    };
  }, [id]);

  const cn = classNames.bind(styles);
  const cat = useCategory(team ? team.category : '');

  const showModal = () => {
    isMine
      ? nav(`/teams/${id}/admission`, { state: { team } })
      : setApplyModalOpen(true);
  };

  const onEditTeam = () => {
    nav('/teams/new', { state: { team } });
  };

  const onDeleteTeam = () => {
    if (
      window.confirm(
        '삭제하시겠습니까? \n팀 삭제 시 팀 관련 정보가 모두 삭제됩니다.'
      ) === true
    ) {
      deleteTeam(id, user.token).then((result) => {
        alert('삭제되었습니다.');
        if (result.status === 200) {
          nav('/teams');
        }
      });
    }
  };
  console.log(team);
  if (loading || !team) return <Loading />;
  if (error) return <NotFound />;
  return (
    <>
      <div className={styles.root}>
        <div className={styles.top}>
          <div className={styles.left}>
            <p className={cn('category', cat)}>{cat}</p>
            <p className={styles.title}>{team.name}</p>
            <p className={styles.nickname}>
              {team.adminUserAccountDto && team.adminUserAccountDto.nickname}
            </p>
            <div className={styles.times}>
              <p>{formatDate(team.createdAt)} 작성</p>
              <p className={cn('dot')}>•</p>
              {team.createdAt !== team.modifiedAt && (
                <p>{formatDate(team.modifiedAt)} 수정</p>
              )}
            </div>
          </div>
          <div className={cn('right')}>
            <p className={styles.deadline}>{`마감일  ${formatDeadline(
              new Date(team.deadline)
            )}`}</p>
            <p
              className={cn('count')}
            >{`${team.total} / ${team.capacity} 명`}</p>
            {closed && (
              <button className={styles.closed} disabled>
                모집완료
              </button>
            )}
            {!closed && (
              <button className={styles.apply} onClick={showModal}>
                {isMine ? '신청 확인하기' : '신청하기'}
              </button>
            )}

            {applyModalOpen && (
              <ApplyModal
                setModalOpen={setApplyModalOpen}
                id={id}
                token={user.token}
              />
            )}
          </div>
        </div>
        <hr />
        <p className={styles.description}>{team.description}</p>
        <div className={cn('tag', cat)}>{`#${team.hashtag}`}</div>
      </div>
      {isMine && (
        <div className={styles.btnArea}>
          <RoundBtn
            type={'button'}
            text={'수정'}
            fill={false}
            onClick={onEditTeam}
          />
          <div className={styles.space} />
          <RoundBtn
            type={'button'}
            text={'삭제'}
            fill={true}
            onClick={onDeleteTeam}
          />
        </div>
      )}
    </>
  );
}

function formatDeadline(deadline) {
  return `~${deadline.getMonth() + 1}.${deadline.getDate()}`;
}

function formatDate(date) {
  const newDate = new Date(date);
  return `${newDate.getFullYear()}.${
    newDate.getMonth() + 1
  }.${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`;
}
