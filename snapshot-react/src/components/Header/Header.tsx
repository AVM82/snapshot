import { Link, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';
import useForce from '../../utils/useForce';

function Header(): JSX.Element {
  const user = useAppSelector((state) => state.user.userData);
  const location = useLocation();
  useForce(location);

  return (
    <header style={{
      height: '150px', fontSize: '32px', textAlign: 'center', backgroundColor: 'aqua',
    }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
        }}
      >
        <Link to="/">
          ЛОГО
          <br />
          ТИП
        </Link>
        <Link to="/candidate-search">
          Знайти кандидата
        </Link>
        <Link to={`/profile/${user.id}`}>
          {user.firstname}
          {' '}
          {user.lastname}
        </Link>
      </div>
    </header>
  );
}

export default Header;
