import './App.scss';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import OAuth2RedirectHandler from './pages/Auth/OAuth2RedirectHandler';
import SignInPage from './pages/Auth/SignInPage';
import SignUpPage from './pages/Auth/SignUpPage';
import Home from './pages/Home/Home';
import UserRoles from './pages/Profile/UserRoles';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<Home />} index />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="profile" element={<UserRoles />} />
        <Route path="*" element={<p>404</p>} />
      </Route>
    </Routes>
  );
}

export default App;
