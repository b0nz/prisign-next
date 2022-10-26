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

export interface IPayloadInformation {
  name?: string | null
  gender?: number | null
  birthday?: string | null
  hometown?: string | null
  bio?: string | null
}

export interface IPayloadCareer {
  company_name?: string | null
  starting_from?: string | null
  ending_in?: string | null
  position?: string | null
}

export interface IPayloadEducation {
  school_name?: string | null
  graduation_time?: string | null
}

export interface ProfileSlice {
  status: 'pending' | 'loading' | 'granted' | 'rejected' | null
  profile: IUserProfile | null
  profileIsLoading: boolean
  checkCredentials: () => void
  postInformation: (payload: IPayloadInformation) => void
  getProfile: () => void
  postCareer: (payload: IPayloadCareer) => void
  postEducation: (payload: IPayloadEducation) => void
  uploadCover: (payload: any) => void
  uploadProfile: (payload: any) => void
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
          profile: {
            ...data?.data?.user,
            gender: data?.data?.user?.gender === 'male' ? 0 : 1,
          },
          status: 'granted',
        })
      }
    } catch (error) {
      set({ profileIsLoading: false, profile: null, status: 'rejected' })
      toast.error(JSON.stringify(error))
      console.log('[OTP REQ ERROR]', error)
    }
  },
  postInformation: async (payload: IPayloadInformation) => {
    try {
      set({ profileIsLoading: true })
      const response = await fetch(`${BASE_URL}/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${get().token}`,
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) {
        if (typeof data.error?.errors?.[0] === 'object') {
          toast.error(
            data.error?.errors?.[0]?.message || data.error?.errors?.[0]?.error,
          )
          set({ profileIsLoading: false, profile: null })
        } else {
          toast.error(JSON.stringify(data.error?.errors?.[0]))
          set({ profileIsLoading: false, profile: null })
        }
      } else {
        toast.success('Success')
        set({
          profileIsLoading: false,
          profile: data?.data?.user,
        })
      }
    } catch (error) {
      set({ profileIsLoading: false, profile: null })
      toast.error(JSON.stringify(error))
      console.log('[OTP REQ ERROR]', error)
    }
  },
  getProfile: async () => {
    try {
      set({ profileIsLoading: true })
      const response = await fetch(`${BASE_URL}/profile/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${get().token}`,
        },
      })
      const data = await response.json()
      if (!response.ok) {
        if (typeof data.error?.errors?.[0] === 'object') {
          toast.error(
            data.error?.errors?.[0]?.message || data.error?.errors?.[0]?.error,
          )
          set({ profileIsLoading: false, profile: null })
        } else {
          toast.error(JSON.stringify(data.error?.errors?.[0]))
          set({ profileIsLoading: false, profile: null })
        }
      } else {
        set({
          profileIsLoading: false,
          profile: data?.data?.user,
        })
      }
    } catch (error) {
      set({ profileIsLoading: false, profile: null })
      toast.error(JSON.stringify(error))
      console.log('[GET PROFILE ERROR]', error)
    }
  },
  postCareer: async (payload: IPayloadCareer) => {
    try {
      set({ profileIsLoading: true })
      const response = await fetch(`${BASE_URL}/profile/career`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${get().token}`,
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) {
        if (typeof data.error?.errors?.[0] === 'object') {
          toast.error(
            data.error?.errors?.[0]?.message || data.error?.errors?.[0]?.error,
          )
          set({ profileIsLoading: false, profile: null })
        } else {
          toast.error(JSON.stringify(data.error?.errors?.[0]))
          set({ profileIsLoading: false, profile: null })
        }
      } else {
        toast.success('Success')
        set({
          profileIsLoading: false,
          profile: data?.data?.user,
        })
      }
    } catch (error) {
      set({ profileIsLoading: false, profile: null })
      toast.error(JSON.stringify(error))
      console.log('[POST CAREER ERROR]', error)
    }
  },
  postEducation: async (payload: IPayloadEducation) => {
    try {
      set({ profileIsLoading: true })
      const response = await fetch(`${BASE_URL}/profile/education`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${get().token}`,
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) {
        if (typeof data.error?.errors?.[0] === 'object') {
          toast.error(
            data.error?.errors?.[0]?.message || data.error?.errors?.[0]?.error,
          )
          set({ profileIsLoading: false, profile: null })
        } else {
          toast.error(JSON.stringify(data.error?.errors?.[0]))
          set({ profileIsLoading: false, profile: null })
        }
      } else {
        toast.success('Success')
        set({
          profileIsLoading: false,
          profile: data?.data?.user,
        })
      }
    } catch (error) {
      set({ profileIsLoading: false, profile: null })
      toast.error(JSON.stringify(error))
      console.log('[POST EDUCATION ERROR]', error)
    }
  },
  uploadCover: async (payload: FormData) => {
    console.log(payload)
    try {
      set({ profileIsLoading: true })
      const response = await fetch(`${BASE_URL}/uploads/cover`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${get().token}`,
        },
        body: payload,
      })
      const data = await response.json()
      if (!response.ok) {
        if (typeof data.error?.errors?.[0] === 'object') {
          toast.error(
            data.error?.errors?.[0]?.message || data.error?.errors?.[0]?.error,
          )
          set({ profileIsLoading: false })
        } else {
          toast.error(JSON.stringify(data.error?.errors?.[0]))
          set({ profileIsLoading: false })
        }
      } else {
        toast.success('Success')
        set({
          profileIsLoading: false,
        })
      }
    } catch (error) {
      set({ profileIsLoading: false })
      toast.error(JSON.stringify(error))
      console.log('[UPLOAD COVER ERROR]', error)
    }
  },
  uploadProfile: async (payload: FormData) => {
    try {
      set({ profileIsLoading: true })
      const response = await fetch(`${BASE_URL}/uploads/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${get().token}`,
        },
        body: payload,
      })
      const data = await response.json()
      if (!response.ok) {
        if (typeof data.error?.errors?.[0] === 'object') {
          toast.error(
            data.error?.errors?.[0]?.message || data.error?.errors?.[0]?.error,
          )
          set({ profileIsLoading: false })
        } else {
          toast.error(JSON.stringify(data.error?.errors?.[0]))
          set({ profileIsLoading: false })
        }
      } else {
        toast.success('Success')
        set({
          profileIsLoading: false,
        })
      }
    } catch (error) {
      set({ profileIsLoading: false })
      toast.error(JSON.stringify(error))
      console.log('[UPLOAD COVER ERROR]', error)
    }
  },
})

export default createProfileSlice
