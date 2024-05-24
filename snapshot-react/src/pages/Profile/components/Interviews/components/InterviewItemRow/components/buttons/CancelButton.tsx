import React  from 'react';

import { useAppDispatch } from '../../../../../../../../hooks/redux';
import { updateInterviewStatus } from '../../../../../../../../store/reducers/interwiew/actions';
import styles from '../../InterviewItemRow.module.scss';

interface CancelButtonProps{
  id:number,
  disabled?:boolean
}

function CancelButton({ id,disabled=false }:CancelButtonProps):React.JSX.Element{
  const dispatch = useAppDispatch();
  const handleCancelInterview = () :void => {
    dispatch(updateInterviewStatus({ id, status: 'CANCELLED' }));
  };

  return (
    <button className={styles.tableButton} disabled={disabled} type="button" onClick={handleCancelInterview}>
    Скасувати
      <span className={styles.cancelIcon}/>
    </button>);
}

CancelButton.defaultProps = {
  disabled: false,
};
export default CancelButton;
