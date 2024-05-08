import { useEffect } from 'react';

import { useAppDispatch } from '../hooks/redux';
import getUser from '../store/reducers/user/actions';

function useForce(): void {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) dispatch(getUser());
  }, [dispatch, token]);
}

export default useForce;
