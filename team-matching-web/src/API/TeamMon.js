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
      alert('로그인 성공!!');
      return result;
    })
    .catch((error) => {
      alert(error.response.data);
      return error.response;
    });
}
