import toast from 'react-hot-toast'
import { BASE_URL } from '@/utils/constants'

export interface IUserProfile {
  id?: string | null
  name?: string | null
  level?: number | null
  age?: string | null
  birthday?: string | null
  gender?: number | null
  zodiac?: string | null
  hometown?: string | null
  bio?: string | null
  latlong?: string | null
  education?: {
    school_name?: string | null
    graduation_time?: string | null
  }
  career?: {
    company_name?: string | null
    starting_from?: string | null
    ending_in?: string | null
  }
  user_pictures?: string[] | null
  user_picture?: null | {
    id?: string | null
    picture?: null | {
      url?: string | null
    }
  }
  cover_picture?: {
    url?: string | null
  }
}

export interface ProfileSlice {
  status: 'pending' | 'loading' | 'granted' | 'rejected' | null
  profile: IUserProfile | null
  profileIsLoading: boolean
  checkCredentials: () => void
}

const createProfileSlice = (set: any, get: any) => ({
  status: null,
  profile: null,
  profileIsLoading: false,
  checkCredentials: async () => {
    try {
      set({ profileIsLoading: true, status: 'pending' })
      const response = await fetch(
        `${BASE_URL}/oauth/credentials?access_token=${encodeURIComponent(
          get().token,
        )}`,
        {
          method: 'GET',
        },
      )
      const data = await response.json()
      if (!response.ok) {
        if (typeof data.error?.errors?.[0] === 'object') {
          toast.error(
            data.error?.errors?.[0]?.message || data.error?.errors?.[0]?.error,
          )
          set({ profileIsLoading: false, profile: null, status: 'rejected' })
        } else {
          toast.error(JSON.stringify(data.error?.errors?.[0]))
          set({ profileIsLoading: false, profile: null, status: 'rejected' })
        }
      } else {
        set({
          profileIsLoading: false,
          profile: data?.data?.user,
          status: 'granted',
        })
      }
    } catch (error) {
      set({ profileIsLoading: false, profile: null, status: 'rejected' })
      toast.error(JSON.stringify(error))
      console.log('[OTP REQ ERROR]', error)
    }
  },
})

export default createProfileSlice
