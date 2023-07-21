import axios from 'axios';
export async function signUp({ user }) {
  return axios
    .post('sign-up', {
      userId: user.id,
      userPassword: user.password,
      email: user.email,
      nickname: user.nickname,
    })
    .then((result) => {
      alert('회원가입 성공!!');
      return result.status;
    })
    .catch((error) => {
      alert(error.response.data.resultMessage);
      return error.response.status;
    });
}

export async function logIn(id, password) {
  return axios
    .post('/login', {
      userId: id,
      userPassword: password,
    })
    .then((result) => {
      alert('로그인 성공!!');
      return result;
    })
    .catch((error) => {
      alert(error.response.data);
      return error.response;
    });
}
