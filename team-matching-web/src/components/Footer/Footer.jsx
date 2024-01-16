import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FiMail, FiInstagram, FiGithub } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr className={styles.line} />
      <div className={styles.logo}>
        <h2 className={styles.title}>Team-Mon</h2>
        <div className={styles.icons}>
          <FiMail className={styles.icon} />
          <FiInstagram className={styles.icon} />
          <FiGithub className={styles.icon} />
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
    </footer>
  );
}
