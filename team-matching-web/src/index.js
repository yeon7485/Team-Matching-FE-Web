import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Main from './pages/Main/Main';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import Join from './pages/Join/Join';
import Login from './pages/Login/Login';
import Board from './pages/Board/Board';
import PostDetail from './pages/PostDetail/PostDetail';
import MyPage from './pages/MyPage/MyPage';
import FindTeam from './pages/FindTeam/FindTeam';
import TeamDetail from './pages/TeamDetail/TeamDetail';
import NewPost from './pages/NewPost/NewPost';
import NewTeam from './pages/NewTeam/NewTeam';
import ApplyList from './pages/ApplyList/ApplyList';
import TeamBoard from './pages/TeamOnly/TeamBoard/TeamBoard';
import TeamPostDetail from './pages/TeamOnly/TeamPostDetail/TeamPostDetail';
import LeaveTeam from './pages/TeamOnly/LeaveTeam/LeaveTeam';
import TeamInfo from './pages/TeamOnly/TeamInfo/TeamInfo';
import NewTeamPost from './pages/TeamOnly/NewTeamPost/NewTeamPost';

const router = createBrowserRouter([
  {
    part: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Main /> },
      { path: 'join', element: <Join /> },
      { path: 'login', element: <Login /> },
      { path: 'board', element: <Board /> },
      { path: 'board/:num', element: <PostDetail /> },
      { path: 'board/new', element: <NewPost /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'teams', element: <FindTeam /> },
      { path: 'teams/:num', element: <TeamDetail /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'teams/new', element: <NewTeam /> },
      { path: 'teams/:num/admission', element: <ApplyList /> },
      { path: 'myteam/:num/board', element: <TeamBoard /> },
      { path: 'myteam/:num/board/:num', element: <TeamPostDetail /> },
      { path: 'myteam/:num/board/new', element: <NewTeamPost /> },
      { path: 'myteam/:num/info', element: <TeamInfo /> },
      { path: 'myteam/:num/leave', element: <LeaveTeam /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
