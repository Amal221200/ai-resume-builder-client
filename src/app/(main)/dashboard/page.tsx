import { getResumes } from '@/lib/actions/resume'
import dynamic from 'next/dynamic'
import CardLoading from './_components/CardLoading'

const AddResume = dynamic(() => import('./_components/AddResume'), { ssr: false, loading: () => <CardLoading /> })
const ResumeCard = dynamic(() => import('./_components/ResumeCard'), { ssr: true, loading: () => <CardLoading /> })

const DashboardPage = async () => {
  const resumes = await getResumes()

  if (!resumes) {
    return null
  }

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='text-3xl font-bold'>My Resume</h2>
      <p>Start Creating AI resume for your next job application</p>
      <div className='mt-10 grid grid-cols-2 content-center items-center gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-5'>
        <AddResume />
        {
          resumes.map(resume => (
            <ResumeCard key={resume.id} resume={resume} />
          ))
        }
      </div>
    </div>
  )
}

export default DashboardPage