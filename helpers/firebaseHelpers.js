
import { query, collection, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase'

export const getCollection = async (collectionName) => {
  const q = query(collection(db, collectionName));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({id: doc.id, ...doc.data()});
    });
  return JSON.stringify(data);
};

export const getDocument = async (collection, id) => {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
      return docSnap.data();
  } else {
      return null;
  }
}

export const createDocument = async (collection, id, data) => {
  const docRef = doc(db, collection, id);
  await setDoc(docRef, data);
}

export const cloneToNewDocument = async (collection, id, newId, removePrevious) => {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
      const data = docSnap.data();
      await createDocument(collection, newId, data);
  }

  if(removePrevious){
      await deleteDoc(docRef);
  }

  console.log('done')
}

export const deleteDocument = async (collection, id) => {
  const docRef = doc(db, collection, id);
  await deleteDoc(docRef);
}

export const addNewFieldToAllDocuments = async (collectionName, field, value = '') => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      data[field] = value;
      await setDoc(doc.ref, data);
  });
}

export const deleteFieldFromAllDocuments = async (collectionName, field) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      delete data[field];
      await setDoc(doc.ref, data);
  });
}