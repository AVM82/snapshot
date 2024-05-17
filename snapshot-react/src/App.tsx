import './App.scss';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/Auth/AuthPage';
import OAuth2RedirectHandler from './pages/Auth/OAuth2RedirectHandler';
import SignInPage from './pages/Auth/SignInPage';
import SignUpPage from './pages/Auth/SignUpPage';
import CandidateSearch from './pages/CandidateSearch/CandidateSearch';
import Home from './pages/Home/Home';
import InterviewPage from './pages/Interview/InterviewPage';
import Statistics from './pages/Profile/components/Statistics/Statistics';
import MyInterviews from './pages/Profile/MyInterviews';
import Profile from './pages/Profile/Profile';
import UserRoles from './pages/Profile/UserRoles';
import ProtectedRoute from './utils/ProtectedRoute';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<Home />} index />
        <Route
          path="sign-in"
          element={(
            <AuthPage>
              <SignInPage />
            </AuthPage>
          )}
        />
        <Route
          path="sign-up"
          element={(
            <AuthPage>
              <SignUpPage />
            </AuthPage>
          )}
        />
        <Route path="oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="candidate-search" element={<CandidateSearch />} />
        <Route element={<ProtectedRoute />}>
          <Route path="interview" element={<InterviewPage />} />
          <Route path="interview/:id" element={<InterviewPage />} />
          <Route path="profile/:userId" element={<Profile />}>
            <Route path="interview-journal" element={<MyInterviews />} />
            <Route path="settings" element={<UserRoles />} />
            <Route path="statistics" element={<Statistics />} />
          </Route>
        </Route>
        <Route path="*" element={<p>404</p>} />
      </Route>
    </Routes>
  );
}

export default App;
