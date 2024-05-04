import './App.scss';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import OAuth2RedirectHandler from './pages/Auth/OAuth2RedirectHandler';
import SignInPage from './pages/Auth/SignInPage';
import SignUpPage from './pages/Auth/SignUpPage';
import Feedback from './pages/Feedback/Feedback';
import Home from './pages/Home/Home';
import InterviewPage from './pages/Interview/InterviewPage';
import InterviewModal from './pages/Profile/InterviewModal';
import MyInterviews from './pages/Profile/MyInterviews';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './utils/ProtectedRoute';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<Home />} index />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route element={<ProtectedRoute />}>
          <Route path="feedback" element={<Feedback />} />
          <Route path="interview" element={<InterviewPage />} />
          <Route path="interview/:id" element={<InterviewPage />} />
          <Route path="profile" element={<Profile />}>
            <Route path="interview-journal" element={<MyInterviews />}>
              <Route path=":interviewId" element={<InterviewModal />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<p>404</p>} />
      </Route>
    </Routes>
  );
}

export default App;
