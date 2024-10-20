import { create } from 'zustand';

import { db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';

const useUserStore = create((set, get) => ({
  email: '',
  uid: '',
  actions: {
    setUser: (user) =>
      set((state) => ({
        ...state,
        ...user,
      })),
    getUserInfo: async () => {
      console.log(get().uid);
      
      const userDoc = await getDoc(doc(db, 'users', get().uid));

      console.log(userDoc.data());
      return userDoc.data();
    },
  },
}));


export const useUserActions = () => useUserStore((state) => state.actions);
