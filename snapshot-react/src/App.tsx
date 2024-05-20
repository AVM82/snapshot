import './App.scss';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/Auth/AuthPage';
import ForgotPassword from './pages/Auth/ForgotPassword';
import OAuth2RedirectHandler from './pages/Auth/OAuth2RedirectHandler';
import SignInPage from './pages/Auth/SignInPage';
import SignUpPage from './pages/Auth/SignUpPage';
import SuccessfulSignUp from './pages/Auth/SuccessfulSignUp';
import CandidateSearch from './pages/CandidateSearch/CandidateSearch';
import Home from './pages/Home/Home';
import InterviewPage from './pages/Interview/InterviewPage';
import Feedback from './pages/Profile/components/Feedback/Feedback.tsx';
import Statistics from './pages/Profile/components/Statistics/Statistics';
import MyInterviews from './pages/Profile/MyInterviews';
import Profile from './pages/Profile/Profile';
import UserRoles from './pages/Profile/UserRoles';
import ProtectedRoute from './utils/ProtectedRoute';

function App(): React.JSX.Element {
  return (
    <Routes>
      <Route
        path="sign-in"
        element={(
          <AuthPage>
            <SignInPage />
          </AuthPage>
        )}
      />
      <Route
        path="forgot-password"
        element={(
          <AuthPage>
            <ForgotPassword />
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
      <Route
        path="thank-you"
        element={(
          <AuthPage>
            <SuccessfulSignUp />
          </AuthPage>
        )}
      />
      <Route path="/" element={<Layout />}>
        <Route element={<Home />} index />
        <Route path="oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="candidate-search" element={<CandidateSearch />} />

        <Route element={<ProtectedRoute />}>
          <Route path="interview" element={<InterviewPage />} />
          <Route path="interview/:id" element={<InterviewPage />} />
          <Route path="profile/:userId/:id" element={<Feedback />}/>
          <Route path="profile/:userId" element={<Profile />}>
            <Route index element={<MyInterviews status="COMPLETED" />} />
            <Route path="planned" element={<MyInterviews status="PLANNED" />} />
            <Route path="active" element={<MyInterviews status="ACTIVE" />} />
            <Route path="finished" element={<MyInterviews status="FINISHED" />} />
            <Route path="all" element={<MyInterviews status="" />} />
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
