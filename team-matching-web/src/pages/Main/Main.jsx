import styles from './Main.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTeamList, getMyTeamList } from 'api/TeamMon';
import { FaAngleRight } from 'react-icons/fa6';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, myTeamState } from 'Recoil/state';
import Loading from 'ui/Loading/Loading';
import TeamCard from 'components/TeamCard/TeamCard';
import NotFound from 'pages/NotFound/NotFound';
import TeamItem from 'components/TeamItem/TeamItem';
import { useState } from 'react';

export default function Main() {
  const userId = useRecoilValue(userState).userId;
  const token = useRecoilValue(userState).token;
  const setMyTeam = useSetRecoilState(myTeamState);
  const [totalTeam, setTotalTeam] = useState(-1);
  const [totalMyTeam, setTotalMyTeam] = useState(-1);
  const {
    isLoading,
    error,
    data: teamList,
  } = useQuery(['getTeamList'], () => {
    return getTeamList(0, 6).then((data) => {
      setTotalTeam(data.totalElements);
      return data.content;
    });
  });

  const {
    isLoadingMt,
    errorMt,
    data: myTeamList,
  } = useQuery(
    ['getMyTeamList', userId, 0],
    () => {
      return getMyTeamList(userId, token, 0, 3).then((data) => {
        setTotalMyTeam(data.totalElements);
        return data.content;
      });
    },
    { enabled: !!userId }
  );

  const nav = useNavigate();

  const gotoTeams = () => {
    nav('/teams');
  };

  const gotoMyTeams = () => {
    nav('/mypage', { state: { index: 'TeamAct' } });
  };

  const handleClick = (team) => {
    setMyTeam({
      team: team,
      admin: team.adminUserAccountDto.userId === userId ? true : false,
    });
    nav(`/myteam/${team.id}/info`);
  };

  if (isLoading || isLoadingMt) return <Loading />;
  if (error || errorMt) return <NotFound />;

  return (
    <div>
      <section>
        <div className={styles.banner}>
          <p className={styles.title}>팀 매칭은 TeamMon에서!</p>
          <p className={styles.text}>
            개발, 취미, 스포츠 등 다양한 방면에서
            <br />
            Team Mon 서비스를 통해 팀을 모집해보세요!
          </p>
          <Link to='/teams' className={styles.btn}>
            지금 시작하기
          </Link>
        </div>
      </section>
      <div className={styles.main}>
        <div className={styles.teams}>
          <section className={styles.gotoBox} onClick={gotoTeams}>
            <h2 className={styles.subTitle}>새로 올라온 팀을 확인해보세요!</h2>
            <FaAngleRight className={styles.arrow} />
          </section>
          <section className={styles.teamList}>
            {totalTeam === -1 && <Loading />}
            {totalTeam === 0 && <p>현재 참여 중인 팀이 없습니다.</p>}
            {totalTeam > 0 &&
              teamList.map((team) => <TeamCard key={team.id} team={team} />)}
          </section>
        </div>
        {userId && (
          <div className={styles.myTeams}>
            <section className={styles.gotoBox} onClick={gotoMyTeams}>
              <h2 className={styles.subTitle}>내 팀 바로가기</h2>
              <FaAngleRight className={styles.arrow} />
            </section>
            <section className={styles.myTeamList}>
              {totalMyTeam === -1 && <Loading />}
              {totalMyTeam === 0 && <p>현재 참여 중인 팀이 없습니다.</p>}
              {totalMyTeam > 0 &&
                myTeamList.map((team) => (
                  <TeamItem
                    key={team.id}
                    teamData={team}
                    type={'act'}
                    onClick={() => {
                      handleClick(team);
                    }}
                  />
                ))}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
