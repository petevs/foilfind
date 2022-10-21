
import { doc, onSnapshot, } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [userDetails, setUserDetails] = useState({})

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      // const ref = firestore.collection('users').doc(user.uid);
      const ref = doc(db, 'users', user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
        setUserDetails({
          photoURL: doc.data().photoURL,
          displayName: doc.data().displayName,
        });
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username, userDetails };
}