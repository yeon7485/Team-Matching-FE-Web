import styles from './Main.module.css';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTeamList } from 'api/TeamMon';
import TeamCard from 'components/TeamCard/TeamCard';
import { FaAngleRight } from 'react-icons/fa6';
import classNames from 'classnames/bind';
import Wave from '../../components/ui/Wave/Wave';

export default function Main() {
  const { isLoading, error, data } = useQuery(['getTeamList'], () => {
    return getTeamList(0, 6);
  });

  const cn = classNames.bind(styles);

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
          <section className={styles.teamTitle}>
            <h2 className={styles.teamText}>새로 올라온 팀을 확인해보세요!</h2>
            <Link className={styles.moreTeams} to='/teams'>
              <span>더 보기</span> <FaAngleRight />
            </Link>
          </section>
          <section className={styles.teamList}>
            {data &&
              data.content.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
          </section>
        </div>
      </div>
    </div>
  );
}
