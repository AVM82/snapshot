import './Layout.scss';

import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

import InterviewModal from '../../pages/Profile/InterviewModal';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

type ModalContextType = React.Dispatch<React.SetStateAction<boolean>> | null;
export const ModalContext = createContext<ModalContextType>(null);

function Layout(): JSX.Element {
  const [interviewOpened, setInterviewOpened] = useState(false);

  return (
    <>
      <Header />
      <ModalContext.Provider value={setInterviewOpened}>
        <main className="container">
          <Outlet />

        </main>
        {interviewOpened && <InterviewModal />}
      </ModalContext.Provider>
      <Footer />
    </>
  );
}

export default Layout;
