import './oauth2.scss';

function OAuth2(): JSX.Element {
  const frontUri = 'http://localhost:5173';
  const backUri = 'http://localhost:8080';
  const googleAuthUri = `${backUri}/rest/oauth2/authorize/google?redirect_uri=${frontUri}/oauth2/redirect`;

  return (
    <div className="oauth2">
      <a href={googleAuthUri}>
        Login
      </a>
      {/* <GoogleButton
        label="Google"
        onClick={handleClick}
        style={{
          backgroundColor: 'transparent',
          width: '100%',
          borderRadius: '6px',
          border: '2px solid #535365',
          color: '#535365',
          fontWeight: 500,
          letterSpacing: '1.25px',
          textAlign: 'center',
        }}
      /> */}
    </div>
  );
}

export default OAuth2;
