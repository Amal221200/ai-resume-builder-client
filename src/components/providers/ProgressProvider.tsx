'use client';
import dynamic from 'next/dynamic';
const Next13ProgressBar = dynamic(() => import('next13-progressbar'), { ssr: false })

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <Next13ProgressBar height="2px" color="#6A00FF" options={{ showSpinner: false }} showOnShallow />
            {children}
        </>
    );
};

export default ProgressProvider;