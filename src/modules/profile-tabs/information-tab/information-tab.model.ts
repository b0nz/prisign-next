export interface InformationTabProps {
  data?: null | {
    id?: string | null
    name?: string | null
    gender?: number | null
    burthday?: string | null
    hometown?: string | null
    bio?: string | null
    user_picture?: null | {
      id?: string | null
      picture?: null | {
        url?: string | null
      }
    }
  }
  loading?: boolean
}

export interface InformationFormProps {
  name?: string
  gender?: number | null
  birthday?: string | null
  hometown?: string | null
  bio?: string | null
}
