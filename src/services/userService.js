import { db } from '../utils/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const getUserInfo = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    const userInfo = userDoc.data();
    return userInfo;
  } catch (error) {
    console.error(error);
  }
};

export const updateUserBlocks = async (uid, newBlocks) => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      blocks: newBlocks,
    });
  } catch (error) {
    console.error(error);
  }
};