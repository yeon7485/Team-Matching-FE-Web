import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FiMail, FiGithub } from 'react-icons/fi';
import Swal from 'sweetalert2';

export default function Footer() {
  const handleMailClick = () => {
    navigator.clipboard
      .writeText(process.env.REACT_APP_MAIL_ADDRESS)
      .then(() => {
        Swal.fire({
          icon: 'success',
          text: '메일 주소가 복사되었습니다.',
          width: '20rem',
        });
      })
      .catch((error) => {
        console.error('복사 실패', error);
      });
  };

  const handleGithubClick = () => {
    window.open(process.env.REACT_APP_GITHUB_URL);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <hr className={styles.line} />
        <div className={styles.logo}>
          <h2 className={styles.title}>TeamMon</h2>
          <div className={styles.icons}>
            <FiMail className={styles.icon} onClick={handleMailClick} />
            <FiGithub className={styles.icon} onClick={handleGithubClick} />
          </div>
        </div>
        <div className={styles.linkDiv}>
          <Link to='#' className={styles.link}>
            공지사항
          </Link>
          <Link to='#' className={styles.link}>
            개인정보처리방침
          </Link>
          <Link to='#' className={styles.link}>
            이용약관
          </Link>
        </div>
      </div>
    </footer>
  );
}
