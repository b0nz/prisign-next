import Layout from '@/components/Layout'
import { NextPage } from 'next'
import Head from 'next/head'
import { MdOutlineAddAPhoto } from 'react-icons/md'
import useAuth from '@/hooks/useAuth'
import Link from 'next/link'
import ProfileTabs from '@/modules/profile-tabs'
import FileUpload from '@/components/FileUpload'
import createStore from '@/stores/store'

const Profile: NextPage = () => {
  const { status, profile, profileIsLoading } = useAuth()
  const { uploadCover } = createStore()

  if (profileIsLoading && status === 'pending')
    return (
      <div className="bg-privblack-0 min-h-screen w-full flex flex-col justify-center align-middle text-center text-white">
        Loading...
      </div>
    )
  if (!profileIsLoading && status === 'rejected')
    return (
      <div className="bg-privblack-0 min-h-screen w-full flex flex-col justify-center align-middle text-center">
        <h1 className="text-3xl font-bold font-poppins text-white">{`You don't have permission`}</h1>
        <Link href="/">
          <a className="text-privgreen-500 hover:underline">Back to Login</a>
        </Link>
      </div>
    )

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta
          name="description"
          content="Is a personal data platform, you can update your information about yourself, customize your profile and change a lot of things"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-white font-poppins">
        <Layout>
          <div className="pb-16">
            <div
              style={{
                backgroundColor: '#c4c4c4',
                backgroundImage: `url(${
                  profile?.cover_picture?.url
                    ? profile?.cover_picture?.url
                    : 'https://images.unsplash.com/photo-1665149368357-864968813478?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&auto=format%2Ccompress&fit=crop&w=1000&h=1000'
                })`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
              className="h-[293px]"
            />
            <div className="flex flex-col -mt-40 mx-auto md:max-w-[688px] gap-4">
              <div className="flex flex-row justify-end">
                <FileUpload
                  buttonUpload={
                    <button
                      className="py-1 px-2 rounded-full backdrop-blur-[22px]"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
                    >
                      <span className="flex gap-[2px] text-xs">
                        <MdOutlineAddAPhoto
                          className="scale-x-[-1] text-privgreen-500"
                          size={14}
                        />
                        <span>Change Cover</span>
                      </span>
                    </button>
                  }
                  onUpload={(payload) => uploadCover(payload)}
                />
              </div>
              <div
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                className="rounded-2xl min-h-screen w-full px-8 py-16 backdrop-blur-[50px] border border-opacity-30 border-privgreen-500"
              >
                <div className="flex flex-col gap-16">
                  <div>
                    <h3 className="font-semibold text-[2rem]">
                      {profile?.name}
                    </h3>
                    <p className="text-sm font-normal">{`Level ${profile?.level} - #${profile?.id}`}</p>
                  </div>
                  <div>
                    <ProfileTabs data={profile} loading={profileIsLoading} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </>
  )
}

export default Profile
