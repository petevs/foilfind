import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../state/UserContext';

const AuthCheck = (props) => {
  const { user, username } = useContext(UserContext);

  console.log(user)

  return (<div>
    hi
  </div>)
}

export default AuthCheck