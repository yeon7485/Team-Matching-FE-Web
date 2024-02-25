import React, { useState } from 'react';
import styles from './TeamDetail.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { userState } from 'Recoil/state';
import { useRecoilValue } from 'recoil';
import { deleteTeam, getTeamDetail } from 'api/TeamMon';
import classNames from 'classnames/bind';
import ApplyModal from 'components/ApplyModal/ApplyModal';
import useCategory from 'hooks/useCategory';
import RoundBtn from 'ui/RoundBtn/RoundBtn';
import Loading from 'ui/Loading/Loading';
import NotFound from 'pages/NotFound/NotFound';

export default function TeamDetail() {
  const { teamId } = useParams();
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const [closed, setClosed] = useState(false);
  const user = useRecoilValue(userState);
  const userToken = user.token;
  const nav = useNavigate();
  const today = new Date();
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: team,
  } = useQuery(['teamDetail', teamId], () => {
    return getTeamDetail(teamId).then((data) => {
      if (data.adminUserAccountDto.userId === user.userId) {
        setIsMine(true);
      }
      if (data.capacity === data.total || today > new Date(data.deadline)) {
        setClosed(true);
      }
      console.log(data);
      return data;
    });
  });

  const removeTeam = useMutation(
    ({ teamId, userToken }) => deleteTeam(teamId, userToken),
    {
      onSuccess: () => queryClient.invalidateQueries(['teams', 0]),
    }
  );

  const cn = classNames.bind(styles);
  const cat = useCategory(team ? team.category : '');
  const showModal = () => {
    isMine
      ? nav(`/teams/${team.id}/admission`, { state: { team } })
      : setApplyModalOpen(true);
  };

  const handleEdit = () => {
    nav('/teams/new', { state: { team } });
  };

  const handleDelete = () => {
    if (
      window.confirm(
        '삭제하시겠습니까? \n팀 삭제 시 팀 관련 정보가 모두 삭제됩니다.'
      ) === true
    ) {
      removeTeam.mutate(
        { teamId, userToken },
        {
          onSuccess: () => {
            alert('삭제되었습니다.');
            nav('/teams', { replace: true });
          },
        }
      );
    }
  };

  if (isLoading || !team) return <Loading />;
  if (error) return <NotFound />;
  return (
    <div className={styles.container}>
      <div className={styles.team}>
        <div className={styles.top}>
          <div className={styles.left}>
            <p className={cn('category', cat)}>{cat}</p>
            <p className={styles.title}>{team.name}</p>
            <p className={styles.nickname}>
              {team.adminUserAccountDto && team.adminUserAccountDto.nickname}
            </p>
            <div className={styles.times}>
              <p>{formatDate(team.createdAt)} 작성</p>
              <p className={styles.dot}>•</p>
              {team.createdAt !== team.modifiedAt && (
                <p>{formatDate(team.modifiedAt)} 수정</p>
              )}
            </div>
          </div>
          <div className={styles.right}>
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
                id={teamId}
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
            onClick={handleEdit}
          />
          <div className={styles.space} />
          <RoundBtn
            type={'button'}
            text={'삭제'}
            fill={true}
            onClick={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

function formatDeadline(deadline) {
  return `~${deadline.getMonth() + 1}.${deadline.getDate()}`;
}

function formatDate(date) {
  const newDate = new Date(date);
  let year = newDate.getFullYear();
  let month = ('0' + (newDate.getMonth() + 1)).slice(-2);
  let day = ('0' + newDate.getDate()).slice(-2);
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();

  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
}
