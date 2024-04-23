import { useContext } from 'react';

import { ModalContext } from '../../components/Layout/Layout';

function InterviewItem(): JSX.Element {
  const setInterviewOpened = useContext(ModalContext);

  return (
    <div
      onClick={() => {
        if (setInterviewOpened) setInterviewOpened(true);
      }}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
    >
      <p>Interview name</p>
      <p>with: user228</p>
    </div>
  );
}

export default InterviewItem;
