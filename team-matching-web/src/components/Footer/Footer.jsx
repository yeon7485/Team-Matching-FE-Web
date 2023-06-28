import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FiMail, FiInstagram, FiGithub } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h2 className={styles.title}>Team-Matching</h2>
      <div>
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
      <hr className={styles.line} />
      <div>
        <FiMail className={styles.icon} />
        <FiInstagram className={styles.icon} />
        <FiGithub className={styles.icon} />
      </div>
    </footer>
  );
}
