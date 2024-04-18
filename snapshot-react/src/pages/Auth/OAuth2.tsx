import './oauth2.scss';

import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';

function OAuth2(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const navigate = useNavigate();

  // const login = useGoogleLogin({
  //   flow: 'auth-code',
  //   onSuccess: async (response) => {
  //     try {
  //       dispatch(authAction.loginWithOAuth2({ code: response.code }))
  //         .unwrap()
  //         .then((action): void => {
  //           storage.setItem(StorageKey.USER, JSON.stringify(action.user));
  //           if (action.user.roles.includes('GUEST')) {
  //             storage.removeItem(StorageKey.TOKEN);
  //             navigate('/sign-up', { state: { userData: action.user } });
  //           } else {
  //             storage.setItem(StorageKey.TOKEN, action.token);
  //             navigate('/');
  //           }
  //         });
  //     } catch (error) {
  //       toast.error(`Error making POST request to backend: ${error.message}`);
  //     }
  //   },
  // });

  return (
    <div className="oauth2">
      <GoogleButton
        label="Google"
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
      />
    </div>
  );
}

export default OAuth2;
