import './Layout.scss';

import { Outlet } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../header/Header';

function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
