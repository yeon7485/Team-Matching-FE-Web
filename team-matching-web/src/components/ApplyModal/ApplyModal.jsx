import React, { useState } from 'react';
import styles from './ApplyModal.module.css';
import { admissionTeam } from 'api/TeamMon';
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export default function ApplyModal({ setModalOpen, id, token }) {
  const [message, setMessage] = useState();
  const nav = useNavigate();
  const queryClient = useQueryClient();
  console.log(id);

  const applyForTeam = useMutation(
    ({ id, message, token }) => admissionTeam(id, message, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['applyList', id]);
      },
    }
  );

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setMessage(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyForTeam.mutate(
      { id, message, token },
      {
        onSuccess: (result) => {
          if (result.status === 200) {
            alert('신청이 완료되었습니다.');
            nav('/teams');
          } else if (result.status === 409) {
            alert('이미 신청한 내역이 있습니다.');
          }
          closeModal();
        },
        onError: (err) => {
          console.log(err);
          alert('오류가 발생했습니다.');
          nav('/teams');
          closeModal();
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.title}>신청하기</p>
        <button type='button' onClick={closeModal} className={styles.closeBtn}>
          X
        </button>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor='message'>가입 신청 메시지</label>
        <textarea
          name='message'
          wrap='hard'
          placeholder='메시지를 입력해주세요.'
          required
          onChange={handleChange}
          className={styles.textArea}
        />
        <button type='submit' className={styles.saveBtn}>
          저장
        </button>
      </form>
    </div>
  );
}
