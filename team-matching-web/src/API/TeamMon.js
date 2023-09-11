import axios from 'axios';

export async function signUp({ user }) {
  return axios
    .post('auth/sign-up', {
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
      console.log(error.response);
      return error.response.status;
    });
}

export async function logIn(id, password) {
  return axios
    .post('auth/login', {
      userId: id,
      userPassword: password,
    })
    .then((result) => {
      alert('로그인 성공!!');
      return result;
    })
    .catch((error) => {
      alert(error.response.data.resultMessage);
      console.log(error);
      alert(error.response.data);
      return error.response;
    });
}

export async function createTeam({ team, token }) {
  return axios
    .post(
      '/teams',
      {
        name: team.title,
        description: team.description,
        category: team.category,
        hashtag: team.tag,
        capacity: team.capacity,
        deadline: team.deadline,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((result) => {
      console.log('팀 생성 성공');
      return result;
    })
    .catch((error) => {
      alert(error.response.data);
      return error.response;
    });
}

export async function myPageInfo(userId, token) {
  return axios
    .get(`/my-page/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((result) => {
      return result.data.resultData;
    });
}

export function upDateMyPageInfo(userId, token, nickname, email, memo) {
  axios
    .patch(
      `/my-page/${userId}`,
      {
        email: email,
        nickname: nickname,
        memo: memo,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((result) => {
      console.log(result);
    });
}
