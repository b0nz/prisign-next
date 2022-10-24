import create from 'zustand'
import { persist } from 'zustand/middleware'

import createAuthSlice, { AuthSlice } from './createAuthSlice'
import createProfileSlice, { ProfileSlice } from './createProfileSlice'

import type { IPayload } from './createAuthSlice'

interface IStore extends AuthSlice, ProfileSlice {}

const createStore = create<IStore>()(
  persist(
    (set, get) => ({
      ...createAuthSlice(set, get),
      ...createProfileSlice(set, get),
    }),
    {
      name: 'prisign-storage',
      partialize: (state) => ({ token: state.token }),
    },
  ),
)
export type { IPayload }
export default createStore
