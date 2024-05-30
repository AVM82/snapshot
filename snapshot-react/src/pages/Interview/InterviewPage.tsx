import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';
import InterviewCreator from './components/InterviewCreator/InterviewCreator';
import InterviewerInterviewPage from './components/InterviewerInterviewPage/InterviewerInterviewPage';

function InterviewPage(): React.JSX.Element {
  const { roles } = useAppSelector((state) => state.user.userData);
  const { id } = useParams();
  const isInterviewer = roles.some((role) => role.id === 2);

  let componentToRender;

  if (!id) {
    componentToRender = <InterviewCreator />;
  } else if (isInterviewer) {
    componentToRender = <InterviewerInterviewPage />;
  } else {
    componentToRender =  <InterviewerInterviewPage />;
    // <SeacrcherInterviewPage />;
  }

  return (
    <div>
      {componentToRender}
    </div>
  );
}
export default InterviewPage;
