import { IUserProfile } from '@/stores/createProfileSlice'

export interface ProfileTabsProps {
  data?: IUserProfile | null
  loading?: boolean
}
