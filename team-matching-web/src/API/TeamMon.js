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

export async function createTeam(team, token) {
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

// 팀 수정
export async function editTeam(id, team, token) {
  return axios
    .patch(
      `/teams/${id}`,
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
      alert('팀 수정 성공');
      return result;
    })
    .catch((error) => {
      alert(error.response.data.error);
      console.log(error);
      return error.response;
    });
}

// 팀 삭제
export async function deleteTeam(id, token) {
  return axios
    .delete(`/teams/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((result) => {
      return result;
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

// 팀 리스트 간단 조회
export async function getTeamList(page) {
  return axios
    .get(`/teams?page=${page}`)
    .then((result) => {
      return result.data.resultData;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
}

// 팀 상세조회
export async function getTeamDetail(id) {
  return axios
    .get(`/teams/${id}`)
    .then((result) => {
      return result.data.resultData;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
}

// 팀 가입 신청
export async function admissionTeam(id, message, token) {
  console.log(id);
  return axios
    .post(
      `/teams/${id}/admission`,
      {
        application: message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
}
