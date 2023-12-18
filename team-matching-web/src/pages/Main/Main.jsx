import styles from './Main.module.css';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTeamList } from 'api/TeamMon';
import TeamCard from 'components/TeamCard/TeamCard';

export default function Main() {
  const { isLoading, error, data } = useQuery(['getTeamList'], () => {
    return getTeamList(0, 6);
  });

  return (
    <div>
      <section>
        <div className={styles.banner}>
          <h1 className={styles.title}>TEAMMON</h1>
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
        <h2 className={styles.newTeam}>
          새로 올라온 팀을 확인해보세요!{' '}
          <Link className={styles.more} to='/teams'>{`더보기 >`}</Link>
        </h2>

        <section className={styles.teamList}>
          {data &&
            data.content.map((team) => <TeamCard key={team.id} team={team} />)}
        </section>
      </div>
    </div>
  );
}
