import React, { lazy, useEffect, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import {
  BOOK_ROUTE,
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SEARCH_ROUTE,
  TEAM_ROUTE,
} from '../../utils/consts';
import { AuthPage } from '../Authentication/AuthPage';
import { Login } from '../Authentication/Login';

const CreateBook = lazy(() => import('../Book/CreateBook'));
const CreateTeam = lazy(() => import('../Team/CreateTeam'));
const AdminPage = lazy(() => import('../Admin/AdminPage'));
const ChapterPage = lazy(() => import('../Book/Chapter/ChapterPage'));
const BookPage = lazy(() => import('../Book/BookPage'));
const TeamsPage = lazy(() => import('../Team/TeamsPage'));
const TeamPage = lazy(() => import('../Team/TeamPage'));
const AddChapterText = lazy(() => import('../Book/Chapter/AddChapterText'));
const Layout = lazy(() => import('../Layout/Layout'));
const ProfilePage = lazy(() => import('../Profile/ProfilePage'));
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { State } from '../../interfaces';
import { getProfile } from '../../actions/profileActions';
import SearchPage from '../SearchPage';

const SuspenseLayout = () => (
  <React.Suspense fallback={<>...</>}>
    <Outlet />
  </React.Suspense>
);

const Router: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(({ root }) => root.user) 
  const { profile } = useAppSelector(({ root }) => root.profile)

  // useEffect(() => {
  //   dispatch(getProfile(user.id));
  // }, [])

//   useEffect(() => {
//     if(profile.id !== 0){
//         dispatch(getNotification(user.id));
//     }
// }, [profile, dispatch])

  return (
    <Routes>
      <Route path={REGISTRATION_ROUTE} element={<AuthPage />} />;
      <Route path={LOGIN_ROUTE} element={<Login />} />;
      <Route path={'user/:id'} element={<ProfilePage />} />
      <Route path={TEAM_ROUTE}>
        <Route path={':id'} element={<TeamPage />} />;
        <Route
          path={'add'}
          element={
              <CreateTeam />
          }></Route>
        <Route path={''} element={<TeamsPage />} />;
      </Route>
      <Route path={SEARCH_ROUTE} element={<SearchPage />} />;
      <Route path={BOOK_ROUTE}>
        <Route path={':book/:id'} element={<ChapterPage />} />;
        <Route path={':book/:id/import'} element={<AddChapterText />} />;
        <Route path={':id'} element={<BookPage />} />;
        <Route path={'add'} element={<CreateBook />} />;
      </Route>
      <Route path={HOME_ROUTE} element={<Layout />} />;
    </Routes>
  );
};

export default Router;
