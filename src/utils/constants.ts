export const BASE_URL =
  process.env.NEXT_PUBLIC_MODE === 'development'
    ? 'http://localhost:8010/proxy'
    : process.env.NEXT_PUBLIC_BASE_URL
export const RE_DIGIT = new RegExp(/^\d+$/);