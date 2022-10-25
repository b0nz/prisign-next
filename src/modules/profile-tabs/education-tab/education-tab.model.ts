export interface EducationTabProps {
  data?: null | {
    school_name?: string | null
    graduation_time?: string | null
  }
  loading?: boolean
}

export interface EducationFormProps {
  school_name?: string | null
  graduation_time?: string | null
}
