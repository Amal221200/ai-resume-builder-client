"use client"
import { use } from "react";
import { EditResumeContext, TEditResumeContext } from "../../../_components/providers/EditResumeProvider";


const SummaryPreview = ({  }: { }) => {

    const { resumeInfo, setResumeInfo } = use(EditResumeContext) as TEditResumeContext;
    return (
        <p className="text-xs font-medium">
            {resumeInfo.attributes?.summary}
        </p>
    )
}

export default SummaryPreview