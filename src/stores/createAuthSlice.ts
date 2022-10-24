import toast from 'react-hot-toast'
import { BASE_URL } from '@/utils/constants'
import Router from 'next/router'

export interface IPayload {
  phone?: string
  password?: string
  country?: string
  latlong?: string | null
  device_token?: string
  device_type?: '0' | '1' | '2'
}

export interface IOtpMatchPayload {
  user_id?: string
  otp_code?: string
}

export interface AuthSlice {
  authIsLoading: boolean
  otpLoading: boolean
  otpMatchLoading?: boolean
  token: string | null
  notification: {
    show: boolean
    type: string
    message: string
  }
  setNotification: (payload: { show: boolean; message?: string }) => void
  loginRequest: (payload: IPayload) => Promise<void>
  registerRequest: (payload: IPayload) => Promise<void>
  otpRequest: (phone: string) => Promise<void>
  otpMatchRequest: (payload: IOtpMatchPayload) => Promise<void>
}

const createAuthSlice = (set: any, get: any) => ({
  authIsLoading: false,
  otpLoading: false,
  otpMatchLoading: false,
  token: null,
  notification: {
    show: false,
    type: 'success',
    message: '',
  },
  setNotification: (payload: { show: boolean; message?: string }) =>
    set((state: AuthSlice) => ({
      ...state,
      notification: { ...state.notification, ...payload },
    })),
  loginRequest: async (payload: IPayload) => {
    try {
      set({ authIsLoading: true })
      const response = await fetch(`${BASE_URL}/oauth/sign_in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) {
        if (typeof data.error?.errors?.[0] === 'object') {
          if (
            data.error?.errors?.[0]?.message ===
            'You need verification phone number'
          ) {
            Router.push(
              `/otp?send=${payload.phone}&user_id=${encodeURIComponent(
                data.error?.errors?.[0]?.user_id,
              )}`,
            )
            set({
              authIsLoading: false,
            })
          } else {
            toast.error(
              data.error?.errors?.[0]?.message ||
                data.error?.errors?.[0]?.error ||
                data.error?.errors?.[0],
            )
            set({ authIsLoading: false })
          }
        } else {
          toast.error(JSON.stringify(data.error?.errors?.[0]))
          set({ authIsLoading: false })
        }
      } else {
        console.log('[LOGIN SUCCESS]', data, data.data?.user?.access_token)
        set({
          authIsLoading: false,
          token: data.data?.user?.access_token,
        })
        Router.replace('/profile')
      }
    } catch (error) {
      set({ authIsLoading: false })
      toast.error(JSON.stringify(error))
      console.log('[LOGIN ERROR]', error)
    }
  },
  registerRequest: async (payload: IPayload) => {
    try {
      set({ authIsLoading: true })
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          device_type: '2',
          latlong: null,
          device_token: null,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        if (typeof data.error?.errors?.[0] === 'object') {
          toast.error(
            data.error?.errors?.[0]?.message || data.error?.errors?.[0]?.error,
          )
          set({ authIsLoading: false })
        } else {
          toast.error(JSON.stringify(data.error?.errors?.[0]))
          set({ authIsLoading: false })
        }
      } else {
        toast.success('Success')
        set({
          authIsLoading: false,
          notification: {
            show: true,
            type: 'success',
            message: 'Thanks for being our member, please login to continue',
          },
        })
      }
    } catch (error) {
      set({ authIsLoading: false })
      toast.error(JSON.stringify(error))
      console.log('[REGISTER ERROR]', error)
    }
  },
  otpRequest: async (phone: string) => {
    try {
      set({ otpLoading: true })
      const response = await fetch(`${BASE_URL}/register/otp/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      })
      const data = await response.json()
      if (!response.ok) {
        if (typeof data.error?.errors?.[0] === 'object') {
          toast.error(
            data.error?.errors?.[0]?.message || data.error?.errors?.[0]?.error,
          )
          set({ otpLoading: false })
        } else {
          toast.error(JSON.stringify(data.error?.errors?.[0]))
          set({ otpLoading: false })
        }
      } else {
        toast.success('Success')
        set({
          otpLoading: false,
          notification: {
            show: true,
            type: 'info',
            message: `We sent OTP to +${phone}`,
          },
        })
      }
    } catch (error) {
      set({ otpLoading: false })
      toast.error(JSON.stringify(error))
      console.log('[OTP REQ ERROR]', error)
    }
  },
  otpMatchRequest: async (payload: IOtpMatchPayload) => {
    try {
      set({ otpMatchLoading: true })
      const response = await fetch(`${BASE_URL}/register/otp/match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) {
        if (typeof data.error?.errors?.[0] === 'object') {
          toast.error(
            data.error?.errors?.[0]?.message || data.error?.errors?.[0]?.error,
          )
          set({ otpMatchLoading: false })
        } else {
          toast.error(JSON.stringify(data.error?.errors?.[0]))
          set({ otpMatchLoading: false })
        }
      } else {
        toast.success('Success')
        set({
          otpMatchLoading: false,
          token: data.data?.user?.token,
        })
      }
    } catch (error) {
      set({ otpMatchLoading: false })
      toast.error(JSON.stringify(error))
      console.log('[OTP REQ ERROR]', error)
    }
  },
})

export default createAuthSlice
