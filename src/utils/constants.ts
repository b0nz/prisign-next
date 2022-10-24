export const BASE_URL =
  process.env.NEXT_PUBLIC_MODE === 'development'
    ? process.env.NEXT_PUBLIC_PROXY_URL
    : process.env.NEXT_PUBLIC_BASE_URL
export const RE_DIGIT = new RegExp(/^\d+$/)
