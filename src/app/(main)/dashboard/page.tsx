import { getResumes } from '@/lib/actions/resume'
import dynamic from 'next/dynamic'
import CardLoading from './_components/CardLoading'
import { Metadata } from 'next'
import { currentUser } from '@clerk/nextjs/server'

const AddResume = dynamic(() => import('./_components/AddResume'), { ssr: false, loading: () => <CardLoading /> })
const ResumeCard = dynamic(() => import('./_components/ResumeCard'), { ssr: true, loading: () => <CardLoading /> })

export const generateMetadata = async (): Promise<Metadata> => {
  const user = await currentUser()

  if (!user) {
    return {}
  }

  return {
    title: `${user?.username}'s Dashboard`,
    description: `${user?.username}'s all resumes in the dashboard page`
  }
}
const DashboardPage = async () => {
  const resumes = await getResumes()
  if (!resumes) {
    return null
  }
  
  return (
    <main className='p-5 sm:p-10 md:px-20 lg:px-32'>
      <h2 className='text-3xl font-bold'>My Resume</h2>
      <p>Start Creating AI resume for your next job application</p>
      <div className='mx-auto my-2 grid max-w-64 grid-cols-1 gap-2 xs:mx-0 xs:max-w-none xs:grid-cols-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5'>
        <AddResume />
        {
          resumes.map(resume => (
            <ResumeCard key={resume.id} resume={resume} />
          ))
        }
      </div>
    </main>
  )
}

export default DashboardPage