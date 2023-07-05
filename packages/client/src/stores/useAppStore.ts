import {create} from 'zustand';

type User = {email: string};

interface AppStore {
  authToken?: string;
  user?: User;
  setUser: (token: string, user: User) => void;
  clearUser: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  authToken: undefined,
  user: undefined,
  setUser: (authToken: string, user: User) => set({authToken, user}),
  clearUser: () => set({authToken: undefined, user: undefined}),
}));
