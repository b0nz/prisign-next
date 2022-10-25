export interface CareerTabProps {
  data?: null | {
    company_name?: string | null
    starting_from?: string | null
    ending_in?: string | null
  }
  loading?: boolean
}

export interface CareerFormProps {
  company_name?: string | null
  starting_from?: string | null
  ending_in?: string | null
  position?: string | null
}
