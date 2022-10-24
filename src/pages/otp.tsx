import OtpInput from '@/components/Input/OtpInput'
import Layout from '@/components/Layout'
import createStore from '@/stores/store'
import dayjs from 'dayjs'
import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { IoReload } from 'react-icons/io5'

const Button = dynamic(() => import('@/components/Button'), {
  ssr: false,
})

interface OtpProps {
  send?: string
  user_id?: string
}

const Otp: NextPage<OtpProps> = ({ send = '', user_id = '' }) => {
  const { otpRequest, otpMatchRequest, otpLoading, otpMatchLoading } =
    createStore()
  const [otp, setOtp] = useState('')
  const otpLength = useMemo(
    () => otp.split('').filter((f) => f && f !== '' && f !== ' ').length,
    [otp],
  )
  const onChange = (value: string) => setOtp(value)

  useEffect(() => {
    if (send && send !== '') {
      otpRequest(send)
    }
  }, [send, otpRequest])

  return (
    <>
      <Head>
        <title>Welcome to Prisign | OTP</title>
        <meta
          name="description"
          content="Is a personal data platform, you can update your information about yourself, customize your profile and change a lot of things"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-white font-poppins">
        <Layout>
          <div className="flex flex-col gap-16 px-8 py-12 lg:pr-48 lg:p-24 md:py-24 md:px-12">
            {send ? (
              <>
                <p className="text-sm font-normal font-roboto">
                  Today {dayjs().format('MMM DD, YYYY')}
                </p>
                <div className="flex flex-col gap-8">
                  <div className="card">
                    <div>
                      <h3 className="heading">
                        OTP Verification
                      </h3>
                      <p className="sub-heading">
                        Insert OTP code sent to your phone
                      </p>
                    </div>
                    <form className="flex flex-row gap-6">
                      <OtpInput
                        valueLength={4}
                        value={otp}
                        onChange={onChange}
                      />
                      <Button
                        type="button"
                        className="w-full flex-1"
                        loading={otpMatchLoading}
                        disabled={
                          !user_id ||
                          otpLength < 4 ||
                          otpLoading ||
                          otpMatchLoading
                        }
                        onClick={() =>
                          otpMatchRequest({ otp_code: otp, user_id })
                        }
                      >
                        Verify
                      </Button>
                    </form>
                  </div>
                  <div>
                    <Button
                      style={{ padding: 0 }}
                      variant="transparent"
                      className="active:opacity-90"
                      loading={otpLoading}
                      disabled={otpMatchLoading || otpLoading}
                      onClick={() => otpRequest(send)}
                    >
                      <span className="flex justify-center align-middle text-privgreen-500">
                        <span className="flex justify-center align-middle">
                          <IoReload size={20} />
                        </span>
                        <span className="ml-[10px] text-base font-medium">
                          Resend OTP Code
                        </span>
                      </span>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <h4>404 Not Found</h4>
            )}
          </div>
        </Layout>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      send: context?.query?.send || '',
      user_id: context?.query?.user_id || '',
    },
  }
}

export default Otp
