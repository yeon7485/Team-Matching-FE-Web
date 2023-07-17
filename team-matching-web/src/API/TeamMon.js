import axios from 'axios';
export function signUp({ user }) {
  axios
    .post('sign-up', {
      userId: user.id,
      userPassword: user.password,
      email: user.email,
      nickname: user.nickname,
    })
    .then((result) => {
      prompt('회원가입 성공!');
    })
    .catch((error) => {
      prompt(error.response.data.resultMessage);
    });
}
