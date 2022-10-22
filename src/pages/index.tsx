import type { NextPage } from 'next'
import Head from 'next/head'
import dayjs from 'dayjs'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import Sider from '@/components/Sider'
import LoginForm from '@/modules/login-form'
import RegisterForm from '@/modules/register-form'

const Welcome: NextPage = () => {
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
        <div className="md:flex">
          <Sider />
          <div className="w-full min-h-screen bg-privblack-100 px-8 py-12 lg:pr-48 lg:p-24 md:py-24 md:px-12">
            <div className="flex flex-col gap-8">
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
                    className="px-4 py-2 border-b-4  border-transparent radix-state-active:border-privgreen-500 radix-state-active:text-white"
                  >
                    Login
                  </TabsPrimitive.Trigger>
                  <TabsPrimitive.Trigger
                    data-testid="tab-register"
                    value="tab-register"
                    className="px-4 py-2 border-b-4 border-transparent radix-state-active:border-privgreen-500 radix-state-active:text-white"
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
          </div>
        </div>
      </main>
    </>
  )
}

export default Welcome
