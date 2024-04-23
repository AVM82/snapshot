import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import getUser from '../../store/reducers/user/actions';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.userData);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  console.log(userData);

  return (
    <header style={{
      height: '150px', fontSize: '32px', textAlign: 'center', backgroundColor: 'aqua',
    }}
    >
      Header
    </header>
  );
}

export default Header;
