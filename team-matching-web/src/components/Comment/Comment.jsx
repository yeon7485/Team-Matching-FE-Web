import React, { useEffect, useState } from 'react';
import styles from './Comment.module.css';
import { useRecoilValue } from 'recoil';
import { userState } from 'Recoil/state';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from 'api/TeamMon';

export default function Comment({ comment, comment: { id, postId } }) {
  const { userId, token } = useRecoilValue(userState);
  const [isMine, setIsMine] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (comment.createdBy === userId) {
      setIsMine(true);
    }
  });

  const removeComment = useMutation(
    ({ postId, id, token }) => deleteComment(postId, id, token),
    {
      onSuccess: () => queryClient.invalidateQueries(['getPost', postId]),
    }
  );

  const handleDeleteClick = () => {
    removeComment.mutate({ postId, id, token });
  };

  return (
    <li className={styles.list}>
      <section className={styles.comment}>
        <div className={styles.header}>
          <span className={styles.nickname}>
            {comment.userAccountDto.nickname}
          </span>
          <span className={styles.date}>{formatDate(comment.modifiedAt)}</span>
          {isMine && (
            <span className={styles.delBtn} onClick={handleDeleteClick}>
              X
            </span>
          )}
        </div>
        <article className={styles.content}>{comment.content}</article>
      </section>
    </li>
  );
}

function formatDate(date) {
  return `${date.substr(2, 2)}.${date.substr(5, 2)}.${date.substr(8, 2)} 
  ${date.substr(11, 5)}`;
}
