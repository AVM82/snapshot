import './oauth2.scss';

function OAuth2(): JSX.Element {
  return (
    <div className="oauth2">
      <a href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:5173/oauth2/redirect">
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
