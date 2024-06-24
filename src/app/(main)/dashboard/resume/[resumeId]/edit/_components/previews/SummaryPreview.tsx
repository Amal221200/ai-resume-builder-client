"use client"
import { use } from "react";
import { EditResumeContext, TEditResumeContext } from "../../../_components/providers/EditResumeProvider";


const SummaryPreview = ({  }: { }) => {

    const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;
    return (
        <p className="text-[8px] font-medium sm:text-xs">
            {resumeInfo?.summary}
        </p>
    )
}

export default SummaryPreview