import axios from 'axios';

//회원가입
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

//로그인
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

//로그아웃
export async function logOut(id, token) {
  return axios
    .post('auth/logout', {
      userId: id,
      accessToken: token,
    })
    .then((result) => {
      alert('로그아웃 성공!!');
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

//마이페이지 정보 받아오기
export async function myPageInfo(userId, token) {
  return axios
    .get(`/my-page/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((result) => {
      return result.data.resultData;
    });
}

//마이페이지 정보 수정하기
export function upDateMyPageInfo(userId, token, nickname, memo) {
  axios
    .patch(
      `/my-page/${userId}/info`,
      {
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

//글 작성하기
export async function writePost(post, token) {
  return axios
    .post(
      '/posts',
      {
        title: post.title,
        content: post.contents,
        hashtag: post.tag,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((result) => {
      alert('글쓰기 성공!!');
      return result;
    })
    .catch((error) => {
      alert(error.response.data.resultMessage);
      console.log(error);
      alert(error.response.data);
      return error.response;
    });
}

//간단한 게시글 정보 받아오기
export async function getPosts(page, size) {
  return axios
    .get(`/posts?page=${page}&size=${size}`)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
}

//자세한 게시글 정보 받아오기
export async function getPostsDetail(id) {
  return axios
    .get(`/posts/${id}`)
    .then((result) => {
      console.log(result);
      return result.data.resultData;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
}

//글 삭제하기
export async function deletePost(id, token) {
  return axios
    .delete(`/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((result) => {
      return result;
    });
}
//댓글 쓰기
export async function writeComment(content, id, token) {
  return axios
    .post(
      `/posts/${id}/comments`,
      {
        content: content,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((result) => {
      alert('댓글 쓰기 성공!!');
      return result;
    })
    .catch((error) => {
      alert(error.response.data.resultMessage);
      console.log(error);
      alert(error.response.data);
      return error.response;
    });
}

//내가 쓴 게시글 조회
export async function getMyPosts(id, token) {
  return axios
    .get(`my-page/${id}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((result) => {
      return result.data.resultData.content;
    })
    .catch((error) => {
      alert(error.response.data.error);
      return error.response;
    });
}

//게시글 수정하기
export async function editPost(id, post, token) {
  return axios
    .patch(
      `/posts/${id}`,
      {
        title: post.title,
        content: post.contents,
        hashtag: post.tag,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((result) => {
      alert('글 수정 성공!!');
      return result;
    })
    .catch((error) => {
      alert(error.response.data.resultMessage);
      console.log(error);
      alert(error.response.data);
      return error.response;
    });
}
