import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'Recoil/state';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { userId, token } = useRecoilValue(userState);

  if (token === '') {
    console.log(token);
    alert('로그인 후 이용 가능합니다.');
    return <Navigate to='/login' replace />;
  }
  return children;
}
