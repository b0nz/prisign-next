import type { NextPage } from 'next'
import Head from 'next/head'
import dayjs from 'dayjs'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import LoginForm from '@/modules/login-form'
import RegisterForm from '@/modules/register-form'
import Layout from '@/components/Layout'
import { useEffect } from 'react'
import createStore from '@/stores/store'
import { useRouter } from 'next/router'

const Welcome: NextPage = () => {
  const { token } = createStore()
  const router = useRouter()

  useEffect(() => {
    if (token) {
      router.push('/profile')
    }
  }, [token, router])

  return (
    <>
      <Head>
        <title>Welcome to Prisign</title>
        <meta
          name="description"
          content="Is a personal data platform, you can update your information about yourself, customize your profile and change a lot of things"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-white font-poppins">
        <Layout>
          <div className="flex flex-col gap-8 px-8 py-12 lg:pr-48 lg:p-24 md:py-24 md:px-12">
            <p className="text-sm font-normal font-roboto">
              Today {dayjs().format('MMM DD, YYYY')}
            </p>

            <TabsPrimitive.Root
              defaultValue="tab-login"
              className="gap-8 flex flex-col"
            >
              <TabsPrimitive.List
                aria-label="Auth"
                className="border-b border-privblack-0 text-lg font-poppins font-medium text-privblack-0"
              >
                <TabsPrimitive.Trigger
                  data-testid="tab-login"
                  value="tab-login"
                  className="priv-tabs radix-state-active:text-white"
                >
                  Login
                </TabsPrimitive.Trigger>
                <TabsPrimitive.Trigger
                  data-testid="tab-register"
                  value="tab-register"
                  className="priv-tabs radix-state-active:text-white"
                >
                  Registration
                </TabsPrimitive.Trigger>
              </TabsPrimitive.List>

              <TabsPrimitive.Content value="tab-login">
                <LoginForm />
              </TabsPrimitive.Content>
              <TabsPrimitive.Content value="tab-register">
                <RegisterForm />
              </TabsPrimitive.Content>
            </TabsPrimitive.Root>
          </div>
        </Layout>
      </main>
    </>
  )
}

export default Welcome
