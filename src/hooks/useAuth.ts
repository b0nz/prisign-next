import createStore from '@/stores/store'
import { useCallback, useEffect, useState } from 'react'

const useAuth = () => {
  const { status, checkCredentials, profile, profileIsLoading } = createStore()
  useEffect(() => {
    checkCredentials()
  }, [checkCredentials])

  return { status, profile, profileIsLoading }
}

export default useAuth
