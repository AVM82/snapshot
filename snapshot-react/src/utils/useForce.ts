import { useEffect } from 'react';

import { useAppDispatch } from '../hooks/redux';
import getUser from '../store/reducers/user/actions';

function useForce(): void {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) dispatch(getUser());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useForce;
