import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

function Toast(): JSX.Element {
  return <ToastContainer style={{ position:'absolute' }}/>;
}

export default Toast;
