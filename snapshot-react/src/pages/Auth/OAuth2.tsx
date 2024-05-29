import './oauth2.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import api from '../../common/api';
import styles from './AuthPage.module.scss';

interface OAuth2Params {
  text: string
}

function OAuth2({ text }: OAuth2Params): React.JSX.Element {
  const googleAuthUri = `${api.baseURL}/oauth2/authorize/google?redirect_uri=${api.frontURL}/oauth2/redirect`;

  return (
    <>
      <h4 className={styles.text}>{text}</h4>
      <div className={styles.googleButtonContainer}>
        <Link to={googleAuthUri} className={styles.googleButtonText}>
          <button type="button" tabIndex={0} className={styles.googleButton}>
            GOOGLE
          </button>
        </Link>
      </div>

    </>
  );
}

export default OAuth2;
